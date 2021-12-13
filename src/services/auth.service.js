import axios from "axios";

const HOST_URL = process.env.NODE_ENV === 'production' ? "http://www.citajmo.ba" : "http://localhost:8080";
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