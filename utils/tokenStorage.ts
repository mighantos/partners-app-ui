import {SecureStorage} from "@/modules/api/secureStorage";
import {TOKEN_STORE_NAME} from "@/utils/constants";
import {Token} from "@/utils/tokenUtils";

export const TokenStorage = {
    async saveRefreshToken(refreshToken: Token) {
        await SecureStorage.setItem(TOKEN_STORE_NAME, JSON.stringify(refreshToken));
    },

    async clearRefreshToken() {
        await SecureStorage.deleteItem(TOKEN_STORE_NAME);
    },

    async getRefreshToken() {
        const refreshToken = await SecureStorage.getItem(TOKEN_STORE_NAME);
        if (!refreshToken) {
            return null;
        }
        return JSON.parse(refreshToken) as Token;
    },
};