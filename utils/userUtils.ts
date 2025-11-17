import {jwtDecode} from "jwt-decode";
import {JwtBody} from "@/utils/tokenUtils";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
}

export const UserUtils = {
    createUser(accessToken: string): User {
        const jwtBody = jwtDecode<JwtBody>(accessToken);

        return {
            firstName: jwtBody.given_name,
            lastName: jwtBody.family_name,
            email: jwtBody.email,
        };
    },
};