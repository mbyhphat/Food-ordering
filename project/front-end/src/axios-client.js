import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("USER_INFO");
            window.location.href = "/login";
        } else if (response.status === 404) {
            //Show not found
        } else if (response.status === 403) {
            // Forbidden - role-based access denied
            const currentHost = window.location.host;
            if (currentHost === "localhost:5173") {
                window.location.href = "http://localhost:3000";
            }
        }

        throw error;
    }
);

export default axiosClient;
