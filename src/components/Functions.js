import axios from "axios";
import { BASE_URL } from "./Url";

export const privateApi = axios.create ({
    baseURL: `${BASE_URL}`,
    withCredentials: true
});

export async function fetchData(endpoint) {
    try {
        const response = await privateApi.get(endpoint); // 이곳에서의 endpoint란 BASE_URL뒤에 붙는 Api 주소.
        return response.data;
    } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        throw error;
    }
}

export async function postData(endpoint, dataToSend) {
    try {
        const response = await privateApi.post(endpoint, dataToSend);
        return response.data;
    } catch (error) {
        console.error("데이터 전송 실패:", error);
        throw error; // 오류를 다시 던져서 호출하는 쪽에서 오류 처리할 수 있도록 함.
    }
}
