import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateApi } from "../components/Functions";
import "./Login.css";

function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        try {
            const response = await privateApi.post("/users/auth", {
                id: id,
                password: password
            },
            {
                withCredentials: true
            });
            console.log(response);
            if (response.status === 200) {
                alert("로그인 성공");
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

    return (
        <div className="login-container">
            <h1>MILP Simulator</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <label className="login-label" htmlFor="id">아이디</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    className="login-input"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <label className="login-label" htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-button">로그인</button>
            </form>
        </div>
    );
}

export default Login;
