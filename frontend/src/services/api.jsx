import axios from "axios";

const token = localStorage.getItem("token");

export const api = axios.create({
    baseURL: "http://44.202.17.197:3001",
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
