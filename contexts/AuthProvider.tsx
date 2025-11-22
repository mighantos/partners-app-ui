import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import * as WebBrowser from "expo-web-browser";
import {
    AuthError,
    exchangeCodeAsync,
    makeRedirectUri,
    refreshAsync,
    revokeAsync,
    useAuthRequest,
    useAutoDiscovery,
} from "expo-auth-session";
import {Token, TokenUtils} from "@/utils/tokenUtils";
import {Platform} from "expo-modules-core";
import {TokenStorage} from "@/utils/tokenStorage";
import {Profile, ProfileUtils} from "@/utils/profileUtils";
import {get, HttpMethod} from "@/modules/api/http";
import {Endpoints} from "@/modules/api/endpoints";

const AuthContext = createContext({
    user: null as Profile | null,
    signIn: () => {
    },
    signOut: () => {
    },
    isLoggedIn: (): boolean => false,
    requestWithAuth: <T, >(method: HttpMethod, endpoint: Endpoints, config?: any): Promise<T> => {
        return {} as Promise<T>;
    },
    isLoading: false,
    error: null as AuthError | null,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

WebBrowser.maybeCompleteAuthSession();
// TODO: refactor
export default function AuthProvider({children}: { children: ReactNode }) {
    const discovery = useAutoDiscovery(process.env.EXPO_PUBLIC_KEYCLOAK_URL!)!;
    const clientId = process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID!;
    const redirectUri = makeRedirectUri({scheme: "partnersappui://"});
    const [user, setUser] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<AuthError | null>(null);
    const [accessToken, setAccessToken] = useState<Token | null>(null);
    const [refreshToken, setRefreshToken] = useState<Token | null>(null);
    const isWeb = Platform.OS === "web";

    const signIn = async () => {
        try {
            if (!request) console.error("No auth request."); // TODO: go over error logs and consider error prompts
            await promptAsync();
        } catch (e) {
            console.error(e);
        }
    };
    const signOut = async () => {
        setIsLoading(true);
        try {
            await revokeToken(accessToken);
            setAccessToken(null);
            await revokeToken(refreshToken);
            setRefreshToken(null);
            await TokenStorage.clearRefreshToken();
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };
    const isLoggedIn = () => refreshToken != null;

    const requestWithAuth = async <T, >(method: HttpMethod, endpoint: Endpoints, config?: any) => {
        if (!accessToken) {
            throw new Error("Access token is missing");
        }
        if (!TokenUtils.isFresh(accessToken)) {
            await refreshAccessToken()
        }
        return get<T>(endpoint, {
            Authorization: `${accessToken.tokenType} ${accessToken.token}`,
        });

    };

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId,
            redirectUri,
            scopes: ["openid", "profile"],
            usePKCE: true,
        },
        discovery,
    );

    // exchange code for tokens
    useEffect(() => {
        if (response?.type === "success") {
            const {code} = response.params;
            exchangeCodeAsync(
                {
                    clientId,
                    code,
                    redirectUri,
                    extraParams: {code_verifier: request?.codeVerifier!},
                },
                discovery,
            ).then(async (tokenResponse) => {
                const accessToken = TokenUtils.createToken(tokenResponse.accessToken);
                const refreshToken = TokenUtils.createToken(tokenResponse.refreshToken!);
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                await TokenStorage.saveRefreshToken(refreshToken);
            });
        }
    }, [response]);

    // restore session
    useEffect(() => {
        restoreSession();
    }, [isWeb, discovery]);

    // setUser
    useEffect(() => {
        if (!accessToken) {
            setUser(null);
            return;
        }
        setUser(ProfileUtils.createUser(accessToken.token));
    }, [accessToken]);

    const refreshAccessToken = async (refreshTokenProp?: Token | null) => {
        const refreshTokenValue = refreshTokenProp ? refreshTokenProp : refreshToken;
        if (!TokenUtils.isFresh(refreshTokenValue)) {
            await clearTokens()
            return;
        }
        const tokenResponse = await refreshAsync({
            clientId,
            refreshToken: refreshTokenValue?.token,
        }, discovery);
        const accessToken = TokenUtils.createToken(tokenResponse.accessToken);
        setAccessToken(accessToken);
    };

    const restoreSession = async () => {
        if (!discovery) return;
        try {
            const refreshToken = await TokenStorage.getRefreshToken();
            if (TokenUtils.isFresh(refreshToken)) {
                setRefreshToken(refreshToken);
                await refreshAccessToken(refreshToken);
            } else {
                await TokenStorage.clearRefreshToken();
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const clearTokens = async () => {
        setAccessToken(null)
        setRefreshToken(null)
        await TokenStorage.clearRefreshToken();
    }

    const revokeToken = async (token: Token | null) => {
        if (TokenUtils.isFresh(token)) {
            await revokeAsync({clientId, token: token!.token}, discovery);
        }
    };

    return (
        <AuthContext value={{
            user,
            signIn,
            signOut,
            isLoggedIn,
            requestWithAuth,
            isLoading,
            error,
        }}>
            {children}
        </AuthContext>
    );
}
