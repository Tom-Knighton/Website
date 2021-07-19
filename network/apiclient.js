import axios from "axios";

let config = {
    baseURL: "https://f2b5d0197184.ngrok.io/api/"
};

const httpClient = axios.create(config);

const loggerInterceptor = config => {
    return config;
};

httpClient.interceptors.request.use(loggerInterceptor);
httpClient.interceptors.response.use(response => response, error => {
    return Promise.reject(error);
});

class ApiClient {

  static async get(url, authToken) {
    return httpClient.get(url, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`
        }
    });
  }

  static async post(url, body, authToken) {
    return httpClient.post(url, JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authToken ?? ""}`
      },
    });
  }

  static async put(url, body, authToken) {
    return httpClient.put(url, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
  }
}

export default ApiClient;
