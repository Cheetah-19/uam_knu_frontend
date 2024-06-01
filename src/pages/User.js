import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { privateApi, fetchData, postData } from "../components/Functions";
import Header from "../components/Header";
import "../styles/App.css";
import profile from "../assets/profile.png";

const User = (props) => {
    const [old_password, setOld] = useState("");
    const [new_password1, setNew1] = useState("");
    const [new_password2, setNew2] = useState("");
    const [info, setInfo] = useState({id: "", is_admin: false, phone_number: ""});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewAccessToken = async () => {
            try {
                const responseData = await fetchData("/api/token/refresh");
            } catch (error) {
                console.log(error.response.data.message);
                alert("로그아웃 됩니다");
                props.setUser(0);
                navigate("/");
            }
        };

        fetchNewAccessToken();
    
        const fetchMyInfo = async () => {
            try {
                const responseData = await fetchData("/users/info");
                setInfo(responseData.data);
            } catch (error) {
                console.log(error.response.data.detail);
                alert("로그아웃 됩니다");
                props.setUser(0);
                navigate("/");
            }
        }

        fetchMyInfo();
    }, []);

    const handleChangePW = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        try {
            const responseData = await postData("users/info", {
                old_password: old_password,
                new_password1: new_password1,
                new_password2: new_password2
            })

            alert("비밀번호 변경 성공");
        } catch (error) {
            if (error.response){
                if (error.response.status === 400) {
                    alert("비밀번호 변경 실패: " + error.response.data.message);
                }
                else if (error.response.status === 401) {
                    alert("비밀번호 변경 실패: " + error.response.data.detail);
                    props.setUser(0);
                    navigate("/");
                }
            } else {
                alert("비밀번호 변경 실패: 서버 오류");
            }
        }
    };

    const handleLogout = async (event) => {
        try {
            const response = await privateApi.delete("users/auth")

            alert("로그아웃 되었습니다.");
            props.setUser(0);
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status !== 202) {
                alert("로그아웃 실패: " + error.response.data.detail);
                props.setUser(0);
                navigate("/");
            } else {
                alert("로그아웃 실패: 서버 오류");
            }
        }
    };

    const handleDeleteUser = async (event) => {
        if(window.confirm("회원탈퇴를 하시겠습니까?")){
            try {
                const response = await privateApi.delete("users")
    
                alert("회원탈퇴가 되었습니다");
                navigate("/");
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert("회원탈퇴 실패: " + error.response.data.message);
                    navigate("/");
                } else {
                    alert("회원탈퇴 실패: 서버 오류");
                }
            }
        }
    };

    return (
        <div className="bigcontainer">
            <Header user={props.user}/>
            <div id="sub-container">
                <div className="sub" style={{marginRight: "20px"}}>
                    <div id="profile">
                        <img src={profile} style={{width: "120px"}}/>
                        <div id="user-id">
                            {info.id}
                        </div>
                    </div>
                    <div>
                        회원정보
                        <div className="sub-info">
                            그룹
                            <div className="sub-info-contents">
                                {info.is_admin ? "관리자":""}
                            </div>
                        </div>
                        <div className="sub-info">
                            전화번호
                            <div id="user-phone-number" className="sub-info-contents">
                                {info.phone_number}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sub" style={{marginLeft: "20px"}}>
                    관리
                    <div>
                    <form onSubmit={handleChangePW}>
                        <div className="sub-info password-reset">
                            <label htmlFor="old_password">현재 비밀번호</label>
                            <input className="sub-info-contents"
                                type="password"
                                id="old_password"
                                name="old_password"
                                value={old_password}
                                onChange={(e) => setOld(e.target.value)}
                            />
                        </div>
                        <div className="sub-info password-reset">
                            <label htmlFor="new_password1">새 비밀번호</label>
                            <input className="sub-info-contents"
                                type="password"
                                id="new_password1"
                                name="new_password1"
                                value={new_password1}
                                onChange={(e) => setNew1(e.target.value)}
                            />
                        </div>
                        <div className="sub-info password-reset">
                            <label htmlFor="new_password2">새 비밀번호 확인</label>
                            <input className="sub-info-contents"
                                type="password"
                                id="new_password2"
                                name="new_password2"
                                value={new_password2}
                                onChange={(e) => setNew2(e.target.value)}
                            />
                        </div>
                        <button id="reset-btn" className="sub-btn" type="submit">변경하기</button>
                    </form>
                    <button id="logout-btn" className="sub-btn" onClick={handleLogout}>로그아웃</button>
                    <button id="delete-btn" className="sub-btn" onClick={handleDeleteUser}>회원탈퇴</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
