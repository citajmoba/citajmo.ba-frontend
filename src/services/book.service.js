import authHeader from "./auth-header";
import axios from "axios";

const HOST_URL = process.env.NODE_ENV === 'production' ? "https://www.citajmo.ba" : "http://localhost:8080";
const API_URL =  HOST_URL + "/api/books";

class BookDataService {

  //find book satisfying the query given in the data
  findAll(data) {
    return axios.get(API_URL, {params: data});
  }

  //find book with id
  find(bookId) {

    return axios.get(API_URL + `/${bookId}`);
  }

  //create book
  add(data) {
    return axios.post(API_URL, data, { headers: authHeader()});
  }

  //update book
  update(bookId, data) {

    return axios.put(API_URL + `/${bookId}`, data);
  }
}

export default new BookDataService();
