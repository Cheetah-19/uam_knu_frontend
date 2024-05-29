import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

const Header = () => {
    const navigate = useNavigate();

    return (
        <header>
            <img src={logo}/>
            <div>
                <div className="header-btn" onClick={() => navigate("/start")}>
                    최적화하기
                </div>
                <div className="header-btn selected" onClick={() => navigate("/user")}>
                    마이페이지
                </div>
            </div>
        </header>
    );
};

export default Header;
