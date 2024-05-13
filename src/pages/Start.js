import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Donutchart from "../components/chart/DonutChart";
import Piechart from "../components/chart/PieChart";
import RadialBarchart from "../components/chart/RadialBarChart";
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

const Start = () => {
  const [vertiports, setVertiports] = useState([]);
  const [selectedVertiport, setSelectedVertiport] = useState(null);
  const [maxFatoUAM, setMaxFatoUAM] = useState('');
  const [maxPathInUAM, setMaxPathInUAM] = useState('');
  const [maxPathOutUAM, setMaxPathOutUAM] = useState('');
  const [maxGateUAM, setMaxGateUAM] = useState('');
  const [maxGatePassengers, setMaxGatePassengers] = useState('');
  const [currentFatoUAM, setCurrentFatoUAM] = useState('');
  const [currentPathInUAM, setCurrentPathInUAM] = useState('');
  const [currentGateUAM, setCurrentGateUAM] = useState('');
  const [currentPathOUTUAM, setCurrentPathOUTUAM] = useState('');
  const [currentFatoOutUAM, setCurrentFatoOutUAM] = useState('');
  const [currentGatePassengers, setCurrentGatePassengers] = useState('');
  const [currentBoardedPassengers, setCurrentBoardedPassengers] = useState('');
  const [selectedGraph, setSelectedGraph] = useState('donut');

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
    { name: "maxGatePassengers", label: "Gate의 최대 승객 수", className: "constant-input" }
  ];

  const currentSituationInputs = [
    { name: "currentFatoUAM", label: "Fato에 있는 UAM 수", className: "current-situation-input" },
    { name: "currentPathInUAM", label: "Path_In에 있는 UAM 수", className: "current-situation-input" },
    { name: "currentGateUAM", label: "Gate에 있는 UAM 수", className: "current-situation-input" },
    { name: "currentFatoOutUAM", label: "Fato_Out에 있는 UAM 수", className: "current-situation-input" },
    { name: "currentGatePassengers", label: "Gate의 승객 수", className: "current-situation-input" },
    { name: "currentPathOUTUAM", label: "Path_Out에 있는 UAM 수", className: "current-situation-input" },
    { name: "currentBoardedPassengers", label: "UAM에 탑승한 승객 수", className: "current-situation-input" }
  ];

  const handleGraphSelect = (graphType) => {
    setSelectedGraph(graphType);
    const dropdownButton = document.getElementById('dropdown-right');
    if (dropdownButton) {
      dropdownButton.innerText = graphType === 'pie' ? '원형' : '도넛';
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
      case 'currentFatoUAM':
        setCurrentFatoUAM(value);
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
      case 'currentPathOUTUAM':
        setCurrentPathOUTUAM(value);
        break;
      case 'currentBoardedPassengers':
        setCurrentBoardedPassengers(value);
        break;
      default:
        break;
    }
  };

  const handleCalculation = () => {
    const inputs = [
      maxFatoUAM, maxPathInUAM, maxPathOutUAM, maxGateUAM, maxGatePassengers,
      currentFatoUAM, currentPathInUAM, currentGateUAM, currentFatoOutUAM,
      currentGatePassengers, currentPathOUTUAM, currentBoardedPassengers
    ];
    const isValid = inputs.every(value => value !== '' && !isNaN(Number(value)));
    if (!isValid) {
      alert('모든 텍스트 박스를 채우고, 숫자 값만 입력하세요.');
      handleReset();
      return;
    }
    console.log('계산 버튼 클릭');
    console.log('상태:', {
      maxFatoUAM, maxPathInUAM, maxPathOutUAM, maxGateUAM, maxGatePassengers,
      currentFatoUAM, currentPathInUAM, currentGateUAM, currentFatoOutUAM,
      currentGatePassengers, currentPathOUTUAM, currentBoardedPassengers
    });
  };

  const handleReset = () => {
    setMaxFatoUAM('');
    setMaxPathInUAM('');
    setMaxPathOutUAM('');
    setMaxGateUAM('');
    setMaxGatePassengers('');
    setCurrentFatoUAM('');
    setCurrentPathInUAM('');
    setCurrentGateUAM('');
    setCurrentPathOUTUAM('');
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
                <div className="input-container" key={input.name}>
                  <label>{input.label}</label>
                  <input
                    type="text"
                    name={input.name}
                    value={input.name.includes('max') ? eval(input.name) : ''}
                    className={input.className}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              ))}
            </div>
            <div className="current-situation-settings">
              <h5>현재 상황 설정</h5>
              {currentSituationInputs.map(input => (
                <div className="input-container" key={input.name}>
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
          </div>
          <div className="aside-buttons">
            <button className="button" onClick={handleCalculation}>계산</button>
            <button className="button" onClick={handleReset}>초기화</button>
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
                <Dropdown.Item onClick={() => handleGraphSelect('pie')}>원형</Dropdown.Item>
                <Dropdown.Item onClick={() => handleGraphSelect('donut')}>도넛</Dropdown.Item>
              </DropdownButton>
              <DropdownButton id="dropdown-right" title="식별번호">
                <Dropdown.Item href="#">Option 1</Dropdown.Item>
                <Dropdown.Item href="#">Option 2</Dropdown.Item>
                <Dropdown.Item href="#">Option 3</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <div className="chart_area">
            <div className="chart">
              {selectedGraph === 'donut' && <Donutchart />}
              {selectedGraph === 'pie' && <Piechart />}
            </div>
            <div className="chart">
              {selectedGraph === 'donut' && <Donutchart />}
              {selectedGraph === 'pie' && <Piechart />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
