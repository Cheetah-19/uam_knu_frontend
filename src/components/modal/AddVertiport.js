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
    console.log(props.vertiports)

    const closeModal = (e) => {
        props.closeModal();
    };
    
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
            },{
                withCredentials: true
            });
            console.log(response);
            if (response.status === 200) {
                alert("새 버티포트 추가!");
                // Handle successful login (e.g., save token, redirect)
                // closeModal();
            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 400) {
                alert("버티포트 추가 실패 : 400");
            } else {
                alert("버티포트 실패 : other");
            }
            console.error("Login failed:", error.response ? error.response.data : error.message);
        }
    };

    

    const handleUpdate = async (event) => {
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
                alert("새 버티포트 추가!");
                // Handle successful login (e.g., save token, redirect)
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("버티포트 추가 실패 : 400");
            } else {
                alert("버티포트 추가 실패 : other");
            }
            console.error("Login failed:", error.response ? error.response.data : error.message);
        }
    };



    return (

        <div className="Addmodal">
            <span className="Addmodal-left">
                <button className="Addbutton" onClick={() => handleVertiportSelect()}>
                    <span className="plusmark">+</span>
                    <span className="plustext">버티포트 추가</span>
                </button>
                <div className="vertiports-list">
                    {props.vertiports && props.vertiports.map(verts => (
                        <button className="vertiports-index" onClick={() => handleVertiportSelect(verts)}>
                            <div className="vertiports-name">
                                {verts.name}
                            </div>
                            <div className="vertiports-info">
                                fato : {verts.fato} path_in: {verts.path_in} gate: {verts.gate} path_out:{verts.path_out} waiting_room: {verts.waiting_room}
                            </div>

                        </button>
                    ))}
                </div>
                
            </span>
            <span id="v-line">
            </span>
            <span className="Addmodal-right">
                <div className="constant-settings" id='modal'>
                    <h5>버티포트 수용량 관리</h5>
                    <div className="constant-input-container">
                        <label>{addVertiport === true ? "새 버티포트 이름" : "현재 선택한 버티포트"}</label>
                        <input
                            type="text"
                            name="selectedVertiport"
                            value={selectedVertiport === null ? "":selectedVertiport }
                            className="constant-input"
                            onChange={handleInputChange}
                            disabled={addVertiport === true ? false: true }
                        ></input>
                    </div>
                    
                    {props.constants && props.constants.map(input => (
                    <div className="constant-input-container" key={input.name}> {/* 수정 */}
                    <label>{input.label}</label>
                    <input
                        type="text"
                        name={input.name}
                        value={input.name.includes('max') ? eval(input.name) : ''}
                        className={input.className}
                        onChange={handleInputChange}
                    />
                    </div>
                    ))}
                </div>
                <div className="constant-settings" id='button'>
                    <button className="post-button" onClick={addVertiport === true ? handlePost : handleUpdate}>수정</button>

                </div>
            </span>


        </div>

    );
}


export default AddVertiport;