import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://localhost:3000/`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;

// https://service-booking-platform-server.vercel.app/