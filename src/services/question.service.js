import authHeader from "./auth-header";
import axios from "axios";

const HOST_URL = process.env.NODE_ENV === 'production' ? "https://citajmo.ba" : "http://localhost:8080";
const API_URL =  HOST_URL + "/api/questions";

class QuestionDataService {

  // find all questions from a book with bookId
  find(bookId) {
    return axios.get(API_URL + `/${bookId}`, { headers: authHeader()});
  }

  add(data) {
    return axios.post(API_URL, data, { headers: authHeader()});
  }

 //update question with question id 
  update(id, data) {
    return axios.put(API_URL + `/${id}`, data, { headers: authHeader()});
  }
}

export default new QuestionDataService();
