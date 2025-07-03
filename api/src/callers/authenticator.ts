import { ApiCaller } from "./apiCaller";
import dotenv from 'dotenv';

/**
 * Authenticator class to handle API authentication.
 * It retrieves and stores an authentication token from the API.
 */
export class Authenticator {
    private apiCaller: ApiCaller;
    private token: string = '';

    /**
     * Initializes the Authenticator with the API caller.
     * Loads environment variables from .env file.
     */
    constructor() {
        dotenv.config();
        this.apiCaller = new ApiCaller(process.env.API_AUTH_URL!);
    }

    /**
     * Retrieves the authentication token from the API.
     * Throws an error if the request fails.
     */
    public async getToken() {
        try {
            const response = await this.apiCaller.get<{ token: string }>('');
            this.token = response.data.token;
        } catch (error) {
            console.error('Authentication error:', error);
            throw new Error('Failed to retrieve authentication token');
        }
    }

    /**
     * Returns the authentication token.
     * @returns The authentication token as a string.
     */
    public getTokenValue(): string {
        return this.token;
    }
}