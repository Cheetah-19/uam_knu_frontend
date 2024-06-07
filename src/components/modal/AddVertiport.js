import "../../styles/App.css"
import { useState } from "react";
import { privateApi, fetchData } from "../Functions";
import React from 'react';
import { alertToast } from "../Notification";
function AddVertiport(props) {
    const [maxFatoUAM, setMaxFatoUAM] = useState('');
    const [maxPathInUAM, setMaxPathInUAM] = useState('');
    const [maxPathOutUAM, setMaxPathOutUAM] = useState('');
    const [maxGateUAM, setMaxGateUAM] = useState('');
    const [maxGatePassengers, setMaxGatePassengers] = useState('');
    const [selectedVertiport, setSelectedVertiport] = useState(null);
    const [addVertiport, setAddvertiport ] = useState(true);

    const fetchVertiport = async () => {
      try {
          const vertiportsData = await fetchData('/vertiports'); //다음과 같이 endpoint에 /vertiports만 지정해줘도 BASE_URL/vertiports로 요청이 들어간다.
          if (vertiportsData && vertiportsData.data) {
          //console.log('버티포트 정보:', vertiportsData.data);
          props.setVertiports(vertiportsData.data);
          }
      } catch (error) {
          console.error('버티포트 정보를 가져오는 중 오류 발생:', error);
      }
    };

    const handleVertiportSelect = (selectedVertiport) => {
      console.log('선택된 버티포트:', selectedVertiport);
      setSelectedVertiport(selectedVertiport);
      if (selectedVertiport) {
        setSelectedVertiport(selectedVertiport.name.toString());
        setMaxFatoUAM(selectedVertiport.fato.toString());
        setMaxPathInUAM(selectedVertiport.path_in.toString());
        setMaxPathOutUAM(selectedVertiport.path_out.toString());
        setMaxGateUAM(selectedVertiport.gate.toString());
        setMaxGatePassengers(selectedVertiport.waiting_room.toString());
        setAddvertiport(false);
      //   document.getElementById('dropdown-left').innerText = selectedVertiport.name;
      } else {
        setSelectedVertiport(null);
        setMaxFatoUAM('');
        setMaxPathInUAM('');
        setMaxPathOutUAM('');
        setMaxGateUAM('');
        setMaxGatePassengers('');
        setAddvertiport(true);
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      switch (name) {
        case 'selectedVertiport':
          setSelectedVertiport(value);
          break;
        case 'maxFatoUAM':
          setMaxFatoUAM(value);
          break;
        case 'maxPathInUAM':
          setMaxPathInUAM(value);
          break;
        case 'maxPathOutUAM':
          setMaxPathOutUAM(value);
          break;
        case 'maxGateUAM':
          setMaxGateUAM(value);
          break;
        case 'maxGatePassengers':
          setMaxGatePassengers(value);
          break;
        default:
          break;
      }
    };
    console.log(props.vertiports);
    
    const handlePost = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        try {
            const response = await privateApi.post("/vertiports",{
                "name": selectedVertiport,
                "fato": maxFatoUAM,
                "path_in": maxPathInUAM,
                "gate": maxGateUAM,
                "path_out": maxPathOutUAM,
                "waiting_room": maxGatePassengers
            });
            console.log(response);
            if (response.status === 200) {
                alertToast({msg: selectedVertiport + " 버티포트를 추가하였습니다", type: "success", pos: "top-center"});
                fetchVertiport();
                handleVertiportSelect();
            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 400) {
                alertToast({msg: "버티포트 추가 실패 : " + error.message, type: "error", pos: "top-center"});
            } else {
                alertToast({msg: "버티포트 추가 실패 : 알 수 없는 이유", type: "error", pos: "top-center"});
            }
            console.error("Login failed:", error.response ? error.response.data : error.message);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        try {
            const response = await privateApi.put("/vertiports",{
                "name": selectedVertiport,
                "fato": maxFatoUAM,
                "path_in": maxPathInUAM,
                "gate": maxGateUAM,
                "path_out": maxPathOutUAM,
                "waiting_room": maxGatePassengers
            });
            console.log(response);
            if (response.status === 200) {
                alertToast({msg: selectedVertiport + "를 수정하였습니다", type: "success", pos: "top-center"});
                fetchVertiport();
            }
        } catch (error) {
            if (error.response){
                if(error.response.status === 400) {
                    alertToast({msg: "버티포트 수정 실패 : " + error.response.data.message, type: "error", pos: "top-center"});
                }
                else if(error.response.status === 401) {
                    alertToast({msg: "버티포트 수정 실패 : " + error.response.data.message, type: "error", pos: "top-center"});
                }
            } else {
                alertToast({msg: "버티포트 수정 실패 : 알 수 없는 이유", type: "error", pos: "top-center"});
            }
            console.error("Login failed:", error.response ? error.response.data : error.message);
        }
    };
    
    const handleDelete = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        if(window.confirm(selectedVertiport + "를 삭제하시겠습니까?")){
            try {
                const response = await privateApi.delete(`/vertiports/${selectedVertiport}`);
                console.log(response);
                if (response.status === 200) {
                    alertToast({msg: selectedVertiport + "를 삭제하였습니다", type: "success", pos: "top-center"});
                    fetchVertiport();
                    handleVertiportSelect();
                }
            } catch (error) {
                if (error.response){
                    if(error.response.status === 401) {
                        alertToast({msg: "버티포트 삭제 실패 : " + error.response.data.message, type: "error", pos: "top-center"});
                    }
                    else {
                        alertToast({msg: "버티포트 삭제 실패 : " + error.message, type: "error", pos: "top-center"});
                    }
                } else {
                    alertToast({msg: "버티포트 삭제 실패 : 알 수 없는 이유", type: "error", pos: "top-center"});
                }
                console.error("Login failed:", error.response ? error.response.data : error.message);
            }
        }
    };

    return (
        <>
            <span className="Addmodal-left">
                <button className="Addbutton" onClick={() => handleVertiportSelect()}>
                    +
                </button>
                <div className="vertiports-list">
                    {props.vertiports && props.vertiports.map(verts => (
                        <button
                            className={`vertiports-name button-style ${selectedVertiport === verts.name ? "selected" : ""}`}
                            onClick={() => handleVertiportSelect(verts)}
                        >{verts.name}
                        </button>
                    ))}
                </div>
            </span>
            <span id="v-line" />
            <span className="Addmodal-right">
                <h4>버티포트 관리</h4>
                <div className="constant-settings" id='modal'>
                    <div className="constants-container">
                        <div className="constant-input-container">
                            <label>{addVertiport === true ? "새 버티포트 이름" : "현재 선택한 버티포트"}</label>
                            <input
                                type="text"
                                name="selectedVertiport"
                                value={selectedVertiport === null ? "":selectedVertiport }
                                className="constant-input"
                                onChange={handleInputChange}
                                disabled={addVertiport === true ? false : true }
                            ></input>
                        </div>
                        {props.constants && props.constants.map(input => (
                        <div className="constant-input-container" key={input.name}>
                            <label>{input.label}</label>
                            <input
                                type="text"
                                name={input.name}
                                value={input.name.includes('max') ? eval(input.name) : ''}
                                className={input.className}
                                onChange={handleInputChange}
                                disabled={addVertiport === true || props.user === 2 ? false : true }
                            />
                        </div>
                        ))}
                    </div>
                </div>
                <div className="constant-settings" id='button'>
                    {addVertiport === true ?
                        <button className="post-button" onClick={handlePost}>추가</button>
                        :
                        props.user === 2 ?
                        <div className="post-button-container">
                            <button className="post-button" onClick={handleUpdate}>수정</button>
                            <button className="post-button delete" onClick={handleDelete}>삭제</button>
                        </div>
                        :
                        <></>
                    }
                </div>
            </span>
        </>
    );
}

export default AddVertiport;