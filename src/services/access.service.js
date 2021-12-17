import authHeader from "./auth-header";
import axios from "axios";

const HOST_URL = process.env.NODE_ENV === 'production' ? "https://www.citajmo.ba" : "http://localhost:8080";
const API_URL =  HOST_URL + "/api/access/";

class AccessService {
    getPublicContent() {
        return axios.get(API_URL + "all");
    }

    getUserBoard() {
        return axios.get(API_URL + "user", { headers: authHeader()});
    }

    getContributorBoard() {
        return axios.get(API_URL + "contributor", { headers: authHeader()});
    }

    getAdminBoard() {
        return axios.get(API_URL + "admin", { headers: authHeader()});
    }
}

export default new AccessService();