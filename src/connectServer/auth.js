import axios from 'axios';
import conf from '../conf/conf.js';

class AuthService {
    constructor() {
        this.api = axios.create({
            baseURL: `${conf.apiUrl}/api/v1/users`,
            withCredentials: true,
        });
    }

    async register({ fullName, email, password }) {
        return this.sendRequest('/register', 'post', { fullName, email, password });
    }

    async login({ email, password }) {
        const response = await this.sendRequest('/login', 'post', { email, password });
        console.log('Login Response:', response); 
        return response;
    }
    

    async logout() {
        return this.sendRequest('/logout', 'post');
    }

    async getCurrentUser() {
        const accessToken = localStorage.getItem('accessToken'); // Get the access token
        const response = await this.sendRequest('/current-user', 'get', {
            headers: {
                Authorization: `Bearer ${accessToken}`, 
            },
        });
        console.log('Retrieved Access Token for Current User:', accessToken); // Log the token being sent
        console.log('Current User Data:', response.data);
        return response.data; 
    }
    
    

    async refreshAccessToken() {
        return this.sendRequest('/refresh-token', 'post');
    }

    async changeUserPassword({ oldPassword, newPassword, confPassword }) {
        return this.sendRequest('/change-password', 'put', {
            oldPassword,
            newPassword,
            confPassword,
        });
    }

    async updateAccountDetails({ fullName, email }) {
        return this.sendRequest('/update-account', 'put', { fullName, email });
    }

    // Centralized request handling with token from localStorage
    async sendRequest(endpoint, method, data = null) {
        const accessToken = localStorage.getItem('accessToken'); // Get the access token from localStorage

        try {
            const response = await this.api({
                url: endpoint,
                method,
                data,
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Set the authorization header
                },
            });
            return response.data;
        } catch (error) {
            console.error(`AuthService :: ${method.toUpperCase()} ${endpoint} :: error`, error);

            if (error.response) {
                const { status, data } = error.response;

                if (status === 401) {
                    console.warn("Unauthorized access - possibly invalid or expired token.");
                }

                throw new Error(data.message || "An error occurred");
            }
            throw new Error("Network error. Please try again.");
        }
    }
}

const authService = new AuthService();
export default authService;
