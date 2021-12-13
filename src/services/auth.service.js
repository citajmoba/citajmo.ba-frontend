import axios from "axios";
require('dotenv').config();

const HOST_URL = process.env.NODE_ENV === 'production' ? process.env.REST_APP_SERVER_URL : "http://localhost:8080";
const API_URL =  HOST_URL + "/api/auth/";

class AuthService {
    login(username, password) {
        return axios.post(API_URL + "signin", {
            "username": username,
            "password": password
        })
        
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            "username": username,
            "email": email,
            "password": password
        });
    }
    
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();