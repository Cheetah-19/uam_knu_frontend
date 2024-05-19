import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Donutchart from "../components/chart/DonutChart";
import Piechart from "../components/chart/PieChart";
import "../styles/App.css";
import { privateApi } from "../components/Functions";

async function fetchData(endpoint) {
  try {
    const response = await privateApi.get(endpoint); // 이곳에서의 endpoint란 BASE_URL뒤에 붙는 Api 주소.
    return response.data;
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
    return null;
  }
}

async function postData(endpoint, dataToSend) {
  try {
    const response = await privateApi.post(endpoint, dataToSend);
    return response.data;
  } catch (error) {
    console.error('데이터 전송 실패:', error);
    throw error; // 오류를 다시 던져서 호출하는 쪽에서 오류 처리할 수 있도록 함.
  }
}



const Start = () => {
  const [weight, setWeight] = useState(0.5); // State variable to hold the weight value
  const [vertiports, setVertiports] = useState([]);
  const [selectedVertiport, setSelectedVertiport] = useState(null);
  const [maxFatoUAM, setMaxFatoUAM] = useState('');
  const [maxPathInUAM, setMaxPathInUAM] = useState('');
  const [maxPathOutUAM, setMaxPathOutUAM] = useState('');
  const [maxGateUAM, setMaxGateUAM] = useState('');
  const [maxGatePassengers, setMaxGatePassengers] = useState('');
  const [currentFatoInUAM, setcurrentFatoInUAM] = useState('');
  const [currentPathInUAM, setCurrentPathInUAM] = useState('');
  const [currentGateUAM, setCurrentGateUAM] = useState('');
  const [currentPathOutUAM, setcurrentPathOutUAM] = useState('');
  const [currentFatoOutUAM, setCurrentFatoOutUAM] = useState('');
  const [currentGatePassengers, setCurrentGatePassengers] = useState('');
  const [currentBoardedPassengers, setCurrentBoardedPassengers] = useState('');
  const [selectedGraph, setSelectedGraph] = useState(null);
  const [showChart, setShowChart] = useState(false); // State for showing chart after calculation
  const [solution, setSolution] = useState(null); // solution 상태 추가
  const [occupancyData, setOccupancyData] = useState([]);
  const [congetion_utilization_Data, Setcongetion_utilization_Data] = useState([]);


  useEffect(() => {
    const fetchDataFromServer = async () => {
      try {
        const vertiportsData = await fetchData('/vertiports'); //다음과 같이 endpoint에 /vertiports만 지정해줘도 BASE_URL/vertiports로 요청이 들어간다.
        if (vertiportsData && vertiportsData.data) {
          console.log('버티포트 정보:', vertiportsData.data);
          setVertiports(vertiportsData.data);
        }
      } catch (error) {
        console.error('버티포트 정보를 가져오는 중 오류 발생:', error);
      }
    };
    fetchDataFromServer();
  }, []);

  const constantInputs = [
    { name: "maxFatoUAM", label: "Fato의 최대 UAM 수", className: "constant-input" },
    { name: "maxPathInUAM", label: "Path_In의 최대 UAM 수", className: "constant-input" },
    { name: "maxPathOutUAM", label: "Path_Out의 최대 UAM 수", className: "constant-input" },
    { name: "maxGateUAM", label: "Gate의 최대 UAM 수", className: "constant-input" },
    { name: "maxGatePassengers", label: "대합실의 최대 승객 수", className: "constant-input" }
  ];

  const currentSituationInputs = [
    { name: "currentFatoInUAM", label: "Fato_In에 있는 UAM 수", className: "current-situation-input" },
    { name: "currentPathInUAM", label: "Path_In에 있는 UAM 수", className: "current-situation-input" },
    { name: "currentGateUAM", label: "Gate에 있는 UAM 수", className: "current-situation-input" },
    { name: "currentFatoOutUAM", label: "Fato_Out에 있는 UAM 수", className: "current-situation-input" },
    { name: "currentGatePassengers", label: "대합실의 승객 수", className: "current-situation-input" },
    { name: "currentPathOutUAM", label: "Path_Out에 있는 UAM 수", className: "current-situation-input" },
    { name: "currentBoardedPassengers", label: "UAM에 탑승한 승객 수", className: "current-situation-input" }
  ];

  const handleWeightChange = (e) => {
    setWeight(parseFloat(e.target.value));
  };

  const handleGraphSelect = (graphType) => {
    setSelectedGraph(graphType);
    const dropdownButton = document.getElementById('dropdown-right');
    if (dropdownButton) {
      dropdownButton.innerText = graphType === 'pie' ? '점유상황' : '혼잡도 및 이용률';
    }
  };

  const handleVertiportSelect = (selectedVertiport) => {
    console.log('선택된 버티포트:', selectedVertiport);
    setSelectedVertiport(selectedVertiport);
    if (selectedVertiport) {
      setMaxFatoUAM(selectedVertiport.fato.toString());
      setMaxPathInUAM(selectedVertiport.path_in.toString());
      setMaxPathOutUAM(selectedVertiport.path_out.toString());
      setMaxGateUAM(selectedVertiport.gate.toString());
      setMaxGatePassengers(selectedVertiport.waiting_room.toString());
      document.getElementById('dropdown-left').innerText = selectedVertiport.name;
    } else {
      setMaxFatoUAM('');
      setMaxPathInUAM('');
      setMaxPathOutUAM('');
      setMaxGateUAM('');
      setMaxGatePassengers('');
      document.getElementById('dropdown-left').innerText = '버티포트';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'currentFatoInUAM':
        setcurrentFatoInUAM(value);
        break;
      case 'currentPathInUAM':
        setCurrentPathInUAM(value);
        break;
      case 'currentGateUAM':
        setCurrentGateUAM(value);
        break;
      case 'currentFatoOutUAM':
        setCurrentFatoOutUAM(value);
        break;
      case 'currentGatePassengers':
        setCurrentGatePassengers(value);
        break;
      case 'currentPathOutUAM':
        setcurrentPathOutUAM(value);
        break;
      case 'currentBoardedPassengers':
        setCurrentBoardedPassengers(value);
        break;
      default:
        break;
    }
  };

  //최적화 전 점유상황
  const calculate_Occupancy = () => {
    const fatoInUAM = currentFatoInUAM ;
    const fatoOutUAM = currentFatoOutUAM ;
    const gateUAM = currentGateUAM ;
    const gateUAMPassengers = currentBoardedPassengers;
    const pathInUAM = currentPathInUAM;
    const pathOutUAM = currentPathOutUAM;
    const waitingRoomPassengers = currentGatePassengers;

    

    return {
      fato_in_UAM: fatoInUAM,
      fato_out_UAM: fatoOutUAM,
      gate_UAM: gateUAM,
      gate_UAM_psg: gateUAMPassengers,
      path_in_UAM: pathInUAM,
      path_out_UAM: pathOutUAM,
      waiting_room_psg: waitingRoomPassengers
    };
  };

  // 최적화 전 혼잡도 및 이용률 계산
const calculate_Congettion_Utilization = () => {
  // 가중치 정의
  const weights = {
      w1: 0.04,
      w2: 0.02,
      w3: 0.38,
      w4: 0.31,
      w5: 0.1,
      w6: 0.15,
      w7: 0.31,
      w8: 0.2,
      w9: 0.2,
      w10: 0.29
  };

  // 혼잡도 계산
  const congestion = (
      weights.w1 * (currentFatoInUAM / maxFatoUAM) +
      weights.w2 * (currentPathInUAM / maxPathInUAM) +
      weights.w3 * (currentGateUAM / maxGateUAM) +
      weights.w4 * (currentGatePassengers / maxGatePassengers) +
      weights.w5 * (currentPathOutUAM / maxPathOutUAM) +
      weights.w6 * (currentFatoOutUAM / maxFatoUAM)
  );

  // 이용률 계산
  const utilization = (
      weights.w7 * (currentGateUAM / maxGateUAM) +
      weights.w8 * (currentBoardedPassengers / (maxGateUAM * 4)) +
      weights.w9 * (currentPathOutUAM / maxPathOutUAM) +
      weights.w10 * (currentFatoOutUAM / maxFatoUAM)
  );

  return {
      congestion: congestion,
      utilization: utilization
  };
};


  const handleCalculation = async () => {

    const occupancyData = calculate_Occupancy();
    const congetion_utilization_Data = calculate_Congettion_Utilization();
    setOccupancyData(occupancyData);
    Setcongetion_utilization_Data(congetion_utilization_Data);

    const inputs = [
      maxFatoUAM, maxPathInUAM, maxPathOutUAM, maxGateUAM, maxGatePassengers,
      currentFatoInUAM, currentPathInUAM, currentGateUAM, currentFatoOutUAM,
      currentGatePassengers, currentPathOutUAM, currentBoardedPassengers
    ];

    // 입력값을 숫자로 변환
    const numericInputs = inputs.map(value => Number(value));

    const isValid = numericInputs.every(value => !isNaN(value) && value !== '');
    if (!isValid) {
      alert('모든 텍스트 박스를 채우고, 숫자 값만 입력하세요.');
      handleReset();
      return;
    }

    const dataToSend = {
      weight,
      name: selectedVertiport ? selectedVertiport.name : '',
      state: {
        fato_in_UAM: numericInputs[5],
        path_in_UAM: numericInputs[6],
        gate_UAM: numericInputs[7],
        path_out_UAM: numericInputs[10],
        fato_out_UAM: numericInputs[8],
        gate_UAM_psg: numericInputs[11],
        waiting_room_psg: numericInputs[9]
      }
    };

    console.log('서버에 보내는 데이터:', dataToSend);

    try {
      const responseData = await postData('/optimizations', dataToSend);
      console.log('서버로부터 받은 데이터:', responseData);
      if (responseData && responseData.result === 'success' && responseData.data) {
        const { solution } = responseData.data;
        setSolution(solution); // solution 상태 업데이트
        setShowChart(true);
        setSelectedGraph('donut');
        handleGraphSelect('donut');
      }
    } catch (error) {
      console.error('서버 요청 실패:', error);
    }
  };



  const handleReset = () => {
    setcurrentFatoInUAM('');
    setCurrentPathInUAM('');
    setCurrentGateUAM('');
    setcurrentPathOutUAM('');
    setCurrentFatoOutUAM('');
    setCurrentGatePassengers('');
    setCurrentBoardedPassengers('');
  };

  return (
    <div className="bigcontainer">
      <header className="header">사용자 페이지</header>
      <div className="content">
        <div className="aside">
          <div className="aside-content">
            <div className="constant-settings">
              <h5>상수 설정</h5>
              {constantInputs.map(input => (
                <div className="constant-input-container" key={input.name}> {/* 수정 */}
                  <label>{input.label}</label>
                  <input
                    type="text"
                    name={input.name}
                    value={input.name.includes('max') ? eval(input.name) : ''}
                    className={input.className}
                    disabled
                  />
                </div>
              ))}
            </div>
            <div className="current-situation-settings">
              <h5>현재 상황 설정</h5>
              {currentSituationInputs.map(input => (
                <div className="current-situation-input-container" key={input.name}> {/* 수정 */}
                  <label>{input.label}</label>
                  <input
                    type="text"
                    name={input.name}
                    value={input.name.includes('current') ? eval(input.name) : ''}
                    className={input.className}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
            <div className="current-situation-settings">
              <h5>가중치 설정</h5>
              <div className="slidecontainer">
                {/* Range slider for weight */}
                <input
                  type="range"
                  name="weight"
                  value={weight}
                  min="0"
                  max="1"
                  step="0.1" // Add step attribute
                  className="slider"
                  onChange={handleWeightChange}
                />
                {/* Display the selected weight value */}
                <div>{weight}</div>
              </div>
            </div>
          </div>
          <div className="aside-buttons">
            <button className="button calculation-btn" onClick={handleCalculation}>계산</button>
            <button className="button reset-btn" onClick={handleReset}>초기화</button>
          </div>

        </div>
        <div className="main">
          <div className="tablist">
            <div className="dropdown-container">
              <DropdownButton id="dropdown-left" title="버티포트">
                {vertiports.map((vertiport, index) => (
                  <Dropdown.Item key={index} onClick={() => handleVertiportSelect(vertiport)}>
                    {vertiport.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <DropdownButton id="dropdown-right" title="그래프">
                <Dropdown.Item onClick={() => handleGraphSelect('donut')}>혼잡도 및 이용률</Dropdown.Item>
                <Dropdown.Item onClick={() => handleGraphSelect('pie')}>점유상황</Dropdown.Item>
              </DropdownButton>
              <DropdownButton id="dropdown-right" title="식별번호">
                <Dropdown.Item href="#">Option 1</Dropdown.Item>
                <Dropdown.Item href="#">Option 2</Dropdown.Item>
                <Dropdown.Item href="#">Option 3</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <div className="chart_area">
            {selectedGraph === null && (
              <div className="chart-container">
                {!showChart && (
                  <div className="calculation-overlay">
                    <div className="overlay-content">
                      <h2>계산을 누르세요</h2>
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedGraph === 'donut' && (
              <div className="chart-container">
                <Donutchart solution={solution} congetion_utilization_Data = {congetion_utilization_Data} />
              </div>
            )}
            {selectedGraph === 'pie' && (
              <div className="chart-container">
                <Piechart solution={solution} occupancyData = {occupancyData}/>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Start;
