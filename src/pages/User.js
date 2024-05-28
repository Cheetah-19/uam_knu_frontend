import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { privateApi, fetchData, postData } from "../components/Functions";

const User = (props) => {
    const [old_password, setOld] = useState("");
    const [new_password1, setNew1] = useState("");
    const [new_password2, setNew2] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewAccessToken = async () => {
            try {
                const response = await fetchData("/api/token/refresh");
            } catch (error) {
                console.log(error.response.data.message);
                alert("로그아웃 됩니다");
                props.setUser(0);
                navigate("/");
            }
        };

        fetchNewAccessToken();
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
            if (error.response && error.response.status === 400) {
                alert("비밀번호 변경 실패: " + error.response.data.message);
            } else {
                alert("비밀번호 변경 실패: 서버 오류");
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
        <div>
            <h1>사용자 정보 페이지</h1>
            <form onSubmit={handleChangePW}>
                <div>
                    <label htmlFor="old_password">기존 비밀번호:</label>
                    <input
                        type="password"
                        id="old_password"
                        name="old_password"
                        value={old_password}
                        onChange={(e) => setOld(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="new_password1">새 비밀번호:</label>
                    <input
                        type="password"
                        id="new_password1"
                        name="new_password1"
                        value={new_password1}
                        onChange={(e) => setNew1(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="new_password2">새 비밀번호 확인:</label>
                    <input
                        type="password"
                        id="new_password2"
                        name="new_password2"
                        value={new_password2}
                        onChange={(e) => setNew2(e.target.value)}
                    />
                </div>
                <button type="submit">변경하기</button>
            </form>
            <button onClick={handleDeleteUser}>회원탈퇴</button>
        </div>
    );
};

export default User;
