import {jwtDecode} from "jwt-decode";
import {JwtBody} from "@/utils/tokenUtils";

export interface Profile {
    firstName: string;
    lastName: string;
    email: string;
}

export const ProfileUtils = {
    createUser(accessToken: string): Profile {
        const jwtBody = jwtDecode<JwtBody>(accessToken);

        return {
            firstName: jwtBody.given_name,
            lastName: jwtBody.family_name,
            email: jwtBody.email,
        };
    },
};