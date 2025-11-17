import {TOKEN_EXPIRATION_TIME_BUFFER} from "@/utils/constants";
import {jwtDecode} from "jwt-decode";
import {getCurrentTimeInSeconds} from "expo-auth-session/src/TokenRequest";

export interface Token {
    token: string;
    expiration: number; // expiration time epoch in seconds
    tokenType: string;
}

export type JwtBody = {
    exp: number;
    iat: number;
    auth_time: number;
    iss: string;
    aud: string;
    typ: TokenType;
    scope: string;
    given_name: string;
    family_name: string;
    email: string;
}

export enum TokenType {
    Bearer = "Bearer",
    Refresh = "Refresh",
}

export const TokenUtils = {

    createToken(tokenString: string): Token {
        const jwtBody = jwtDecode<JwtBody>(tokenString);
        return {
            token: tokenString,
            expiration: jwtBody.exp,
            tokenType: jwtBody.typ,
        };
    },

    isFresh(token: Token | null) {
        if (!token) {
            return false;
        }
        return token.expiration > getCurrentTimeInSeconds() - TOKEN_EXPIRATION_TIME_BUFFER;
    },

    getExpiresIn(token: Token) {
        let expiresIn = token.expiration - getCurrentTimeInSeconds();
        if (expiresIn < 0) {
            expiresIn = 0;
        }
        return expiresIn;
    },

    getExpiresInWithBuffer(token: Token) {
        let expiresIn = TokenUtils.getExpiresIn(token) - TOKEN_EXPIRATION_TIME_BUFFER;
        if (expiresIn < 0) {
            expiresIn = 0;
        }
        return expiresIn;
    },
};