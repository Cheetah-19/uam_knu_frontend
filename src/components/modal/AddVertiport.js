import "../../styles/App.css"
import { useState } from "react";
import { privateApi } from "../Functions";
import React from 'react';
function AddVertiport(props) {
    const [maxFatoUAM, setMaxFatoUAM] = useState('');
    const [maxPathInUAM, setMaxPathInUAM] = useState('');
    const [maxPathOutUAM, setMaxPathOutUAM] = useState('');
    const [maxGateUAM, setMaxGateUAM] = useState('');
    const [maxGatePassengers, setMaxGatePassengers] = useState('');
    const [selectedVertiport, setSelectedVertiport] = useState(null);
    const [addVertiport, setAddvertiport ] = useState(true);
    
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
                alert(selectedVertiport + " 버티포트를 추가하였습니다");
                // Handle successful login (e.g., save token, redirect)
                // closeModal();
            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 400) {
                alert("버티포트 추가 실패 : " + error.message);
            } else {
                alert("버티포트 실패 : other");
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
                alert(selectedVertiport + "를 수정하였습니다");
                // Handle successful login (e.g., save token, redirect)
            }
        } catch (error) {
            if (error.response){
                if(error.response.status === 400) {
                    alert("버티포트 수정 실패 : " + error.response.data.message);
                }
                else if(error.response.status === 401) {
                    alert("버티포트 수정 실패 : " + error.response.data.message);
                }
            } else {
                alert("버티포트 수정 실패 : other");
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
                    alert(selectedVertiport + "를 삭제하였습니다");
                    // Handle successful login (e.g., save token, redirect)
                }
            } catch (error) {
                if (error.response){
                    if(error.response.status === 401) {
                        alert("버티포트 삭제 실패 : " + error.response.data.message);
                    }
                    else {
                        alert("버티포트 삭제 실패 : " + error.message);
                    }
                } else {
                    alert("버티포트 삭제 실패 : other");
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
                                disabled={props.user === 2 ? false : true }
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