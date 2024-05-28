import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateApi } from "../components/Functions";


function Login(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        try {
            const response = await privateApi.post("/users/auth", {
                    id: id,
                    password: password
                }
            );
            console.log(response);
            if (response.status === 200) {
                alert("로그인 성공");

                // 사용자 구분
                props.setUser(response.data.data.admin ? 2:1);
                
                // Handle successful login (e.g., save token, redirect)
                handleLoginSuccess();
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("로그인 실패: 잘못된 아이디 또는 비밀번호");
            } else {
                alert("로그인 실패: 서버 오류");
            }
            console.error("Login failed:", error.response ? error.response.data : error.message);
        }
    };

    const handleLoginSuccess = () => {
        navigate("/start"); // 페이지 이동을 useNavigate로 변경
    };

    const handleNonMember = () => {
        props.setUser(0);
        navigate("/start");
    };

    return (
        <div>
            <h1>로그인 페이지</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="id">아이디:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">로그인</button>
            </form>
            <button onClick={handleNonMember}>비회원으로 시작하기</button>
        </div>
    );
}

export default Login;
