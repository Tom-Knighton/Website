import axios from "axios";

let urls = {
    test: "https://0132f521665e.ngrok.io/api/",
    development: "https://0132f521665e.ngrok.io/api/",
    production: "https://0132f521665e.ngrok.io/api/"
}

const api = axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;