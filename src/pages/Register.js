import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../components/Functions";
import "./Login.css";

const Register = ({ setIsLogin }) => {
    const [id, setId] = useState("");
    const [password, setPassword1] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        try {
            const responseData = await postData("/users", {
                id: id,
                password: password,
                phone_number: phone_number
            });

            alert("회원가입 성공");
            setIsLogin(1);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("회원가입 실패: 잘못된 아이디 또는 비밀번호");
            } else {
                alert("회원가입 실패: 서버 오류");
            }
        }
    };

    return (
        <form className="login-form" onSubmit={handleRegister}>
            <label className="login-label" htmlFor="id">아이디</label>
            <input
                type="text"
                id="id"
                name="id"
                className="login-input"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <label className="login-label" htmlFor="password1">비밀번호</label>
            <input
                type="password"
                id="password"
                name="password1"
                className="login-input"
                value={password}
                onChange={(e) => setPassword1(e.target.value)}
            />
            <label className="login-label" htmlFor="phone_number">전화번호</label>
            <input
                type="text"
                name="phone_number"
                className="login-input"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button type="submit" className="login-button">회원가입</button>
        </form>
    );
};

export default Register;
