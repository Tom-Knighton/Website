import axios from "axios";

let urls = {
    test: "https://f2b5d0197184.ngrok.io/api/",
    development: "https://f2b5d0197184.ngrok.io/api/",
    production: "https://api.garyportal.tomk.online/api/"
}

const api = axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;