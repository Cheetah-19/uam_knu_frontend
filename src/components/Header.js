import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png"
import "../styles/App.css";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation(); // 현재 위치 정보

    // 현재 경로에 따라 selected 클래스를 추가
    const isSelected = (path) => {
        return location.pathname === path ? "selected" : "";
    };

    return (
        <header>
            <img src={logo} alt="logo" />
            <div>
                <div className={`header-btn ${isSelected('/start')}`} onClick={() => navigate("/start")}>
                    최적화하기
                </div>
                <div className={`header-btn ${isSelected('/user')}`} onClick={() => navigate("/user")}>
                    마이페이지
                </div>
            </div>
        </header>
    );
};

export default Header;