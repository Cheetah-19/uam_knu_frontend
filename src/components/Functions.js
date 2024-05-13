import axios from "axios";
import { BASE_URL } from "./Url";

export const privateApi = axios.create ({
    baseURL: `${BASE_URL}`,
});

