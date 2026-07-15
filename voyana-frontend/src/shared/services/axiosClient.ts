import axios from "axios";
import { API_BASE_URL } from "../constants/api.constants";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
