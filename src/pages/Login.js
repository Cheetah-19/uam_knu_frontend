import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateApi } from "../components/Functions";
import logo from "../assets/logo.png";
import Register from "../pages/Register";
import { alertToast } from "../components/Notification";
import "./Login.css";

function Login(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(1);

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
                alertToast({msg: "로그인 성공", type: "success", pos: "top-center"});

                // 사용자 구분
                props.setUser(response.data.data.admin ? 2:1);
                
                // Handle successful login (e.g., save token, redirect)
                handleLoginSuccess(response);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alertToast({msg: "로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.", type: "error", pos: "top-center"});
            } else {
                alertToast({msg: "로그인 실패: 서버 오류", type: "error", pos: "top-center"});
            }
            console.error("Login failed:", error.response ? error.response.data : error.message);
        }
    };

    const handleLoginSuccess = (response) => {
        navigate("/start"); // 페이지 이동을 useNavigate로 변경
    };

    const handleNonMember = () => {
        props.setUser(0);
        navigate("/start");
    };

    return (
        <div className="login-container">
            <img src={logo} alt="logo" />
            {/* <h1>MILP Simulator</h1> */}
                {isLogin === 1 ?
                    <>
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
                    <div className="login-option">
                        계정이 필요하신가요?
                        <button onClick={() => setIsLogin(0)}>회원가입</button>
                    </div>
                    <button className="non-memebr-button" onClick={handleNonMember}>비회원으로 시작하기</button>
                </>
                :
                <>
                    <Register setIsLogin={setIsLogin}/>
                    <div className="login-option">
                        이미 가입하셨나요?
                        <button onClick={() => setIsLogin(1)}>로그인</button>
                    </div>
                </>
            }
        </div>
    );
}

export default Login;
