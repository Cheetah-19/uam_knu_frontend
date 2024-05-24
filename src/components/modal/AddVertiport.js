import "../../styles/App.css"
import { useState } from "react";
function AddVertiport(props) {

    const [maxFatoUAM, setMaxFatoUAM] = useState('');
    const [maxPathInUAM, setMaxPathInUAM] = useState('');
    const [maxPathOutUAM, setMaxPathOutUAM] = useState('');
    const [maxGateUAM, setMaxGateUAM] = useState('');
    const [maxGatePassengers, setMaxGatePassengers] = useState('');
    const [selectedVertiport, setSelectedVertiport] = useState(null);
    const handleVertiportSelect = (selectedVertiport) => {
        console.log('선택된 버티포트:', selectedVertiport);
        setSelectedVertiport(selectedVertiport);
        if (selectedVertiport) {
          setMaxFatoUAM(selectedVertiport.fato.toString());
          setMaxPathInUAM(selectedVertiport.path_in.toString());
          setMaxPathOutUAM(selectedVertiport.path_out.toString());
          setMaxGateUAM(selectedVertiport.gate.toString());
          setMaxGatePassengers(selectedVertiport.waiting_room.toString());
        //   document.getElementById('dropdown-left').innerText = selectedVertiport.name;
        } else {
          setMaxFatoUAM('');
          setMaxPathInUAM('');
          setMaxPathOutUAM('');
          setMaxGateUAM('');
          setMaxGatePassengers('');
        }
      };
    const addVertiportsetting = () => {
        setMaxFatoUAM('');
        setMaxPathInUAM('');
        setMaxPathOutUAM('');
        setMaxGateUAM('');
        setMaxGatePassengers('');

    }
    console.log(props.vertiports)
    return (

        <div className="Addmodal">
            <span className="Addmodal-left">
                <button className="Addbutton" onClick={() => addVertiportsetting()}>
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
                    {props.constants && props.constants.map(input => (
                    <div className="constant-input-container" key={input.name}> {/* 수정 */}
                    <label>{input.label}</label>
                    <input
                        type="text"
                        name={input.name}
                        value={input.name.includes('max') ? eval(input.name) : ''}
                        className={input.className}
                    />
                    </div>
                    ))}
                </div>
                <div className="constant-settings" id='button'>
                    <button className="post-button">수정</button>

                </div>
            </span>


        </div>

    );
}


export default AddVertiport;