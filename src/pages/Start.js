import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Donutchart from "../components/chart/DonutChart";
import VerticalBarChart from "../components/chart/VerticalBarChart";
import "../styles/App.css";
import { privateApi, fetchData, postData } from "../components/Functions";
import Modal from "../components/modal/Modal";
import Header from "../components/Header"
import ButtonGroup from '../components/ButtonGroup';
import { alertToast } from "../components/Notification";

const Start = (props) => {
  const [Modalstate, setModalstate] = useState(false);
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
  const [stateId, setStateId] = useState(null); // 식별 번호 state 추가
  const [states, setStates] = useState([]); // State to hold the fetched states
  const [sequences, setSequences] = useState([]); // State to hold sequences for dropdown
  const [previousData, setPreviousData] = useState(null); // 최적화 전 데이터 상태 추가
  const [previous_congetion_utilization_Data, SetPreviousCongettionUtilizationData] = useState(null);
  const [newsolution, setNewsolution] = useState(null); // 최적화 후 데이터 상태
  let isCalculated = false;
  
  const handleFileData = (data) => {
    //console.log("스타트데이터 : ",data);
    setcurrentFatoInUAM(data['Fato_In에 있는 UAM 수'] || '');
    setCurrentPathInUAM(data['Path_In에 있는 UAM 수'] || '');
    setCurrentGateUAM(data['Gate에 있는 UAM 수'] || '');
    setcurrentPathOutUAM(data['Path_Out에 있는 UAM 수'] || '');
    setCurrentFatoOutUAM(data['Fato_Out에 있는 UAM 수'] || '');
    setCurrentBoardedPassengers(data['UAM에 탑승한 승객 수'] || '');
    setCurrentGatePassengers(data['대합실의 승객 수'] || '');
  };

  useEffect(() => {
    const fetchNewAccessToken = async () => {
      try {
        const responseData = await fetchData('/api/token/refresh');
      } catch (error) {
        console.log(error.response.data.message);
        props.setUser(0);
      }
    };

    fetchNewAccessToken();

    const fetchDataFromServer = async () => {
      try {
        const vertiportsData = await fetchData('/vertiports'); //다음과 같이 endpoint에 /vertiports만 지정해줘도 BASE_URL/vertiports로 요청이 들어간다.
        if (vertiportsData && vertiportsData.data) {
          //console.log('버티포트 정보:', vertiportsData.data);
          setVertiports(vertiportsData.data);
        }
      } catch (error) {
        console.error('버티포트 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchDataFromServer();
  }, []);


  // 데이터 형식 변환 함수 작성
  const transformNewSolution = (newsolution) => {
    if (Array.isArray(newsolution) && newsolution.length > 0) {
      const results = [];
      for (const sols of newsolution){
        console.log("sols:",sols);
        results.push({
          congestion: parseFloat(sols.congestion),
          fato_in_UAM: parseInt(sols.fato_in_UAM, 10),
          fato_out_UAM: parseInt(sols.fato_out_UAM, 10),
          gate_UAM: parseInt(sols.gate_UAM, 10),
          gate_UAM_psg: parseInt(sols.gate_UAM_psg, 10),
          path_in_UAM: parseInt(sols.path_in_UAM, 10),
          path_out_UAM: parseInt(sols.path_out_UAM, 10),
          utilization: parseFloat(sols.utilization),
          waiting_room_psg: parseInt(sols.waiting_room_psg, 10),
          weight: parseFloat(sols.weight)
        })
      }
      return results;
    }
    return null;
  };

  const fetchStatesByVertiport = async () => {
    if (!selectedVertiport) return;

    try { 
      //console.log("선택 버티포트 = ", selectedVertiport.name)

      const responseData = await fetchData(`/users/history?vertiport=${selectedVertiport.name}`);
      if (responseData && responseData.result === 'success' && responseData.data) {
        setStates(responseData.data.states);
        console.log(responseData.data.states);

        // Extract sequences from the fetched data
        const fetchedSequences = responseData.data.states.map(state => state.sequence);
        // console.log(fetchedSequences);
        setSequences(fetchedSequences); // sequences 상태 업데이트
      }
    } catch (error) {
      console.error('식별 번호를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchStatesByVertiport();
  }, [selectedVertiport]);

  const fetchOptimizations = async () => {
    try {
      const selectedState = states.find(state => state.sequence === stateId);
      if (selectedState) {
        setPreviousData(selectedState);
        //console.log("선택 데이터 = ", selectedState);

        // Calculate congestion and utilization using selectedState
        const previous_congetion_utilization_Data = calculate_Congettion_Utilization(selectedState);
        SetPreviousCongettionUtilizationData(previous_congetion_utilization_Data); // New state setter for previous data

        // 최적화 후 데이터 가져오기
        const responseOptimization = await privateApi.get(`/users/history?vertiport=${selectedVertiport.name}&sequence=${stateId}`);
        if (responseOptimization && responseOptimization.data && responseOptimization.data.result === 'success' && responseOptimization.data.data) {
          const optimizationData = responseOptimization.data.data.optimizations;
          if (optimizationData) {
            const transformedSolution = transformNewSolution(optimizationData);
            setNewsolution(transformedSolution);
            //console.log("최적화 데이터 = ", transformedSolution);
          }
        }
      }
    } catch (error) {
      console.error('최적화 전 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  // 시퀀스를 선택할 때 stateId를 업데이트하는 함수
  const handleSequenceSelect = (state) => {
    setStateId(state.sequence);

    document.getElementById('dropdown-sequence').innerText = state.datetime.substr(0, 10) + " " + state.datetime.substr(11, 8);
  };

  // sequence를 선택할 때 데이터를 가져오는 useEffect
  useEffect(() => {
    if (stateId && selectedVertiport) {
      fetchOptimizations();
    }
  }, [stateId, selectedVertiport]);

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
    { name: "currentPathOutUAM", label: "Path_Out에 있는 UAM 수", className: "current-situation-input" },
    { name: "currentFatoOutUAM", label: "Fato_Out에 있는 UAM 수", className: "current-situation-input" },
    { name: "currentBoardedPassengers", label: "UAM에 탑승한 승객 수", className: "current-situation-input" },
    { name: "currentGatePassengers", label: "대합실의 승객 수", className: "current-situation-input" }
  ];

  const handleWeightChange = (e) => {
    setWeight(parseFloat(e.target.value));
  };

  const handleGraphSelect = (graphType) => {
    if((isCalculated || showChart) || (selectedVertiport && stateId)){
      setSelectedGraph(graphType);
      document.getElementById('dropdown-right').innerText = graphType === 'bar' ? '점유상황' : '혼잡도 및 이용률';
    }
  };

  const handleVertiportSelect = (selectedVertiport) => {
    //console.log('선택된 버티포트:', selectedVertiport);
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
    const fatoInUAM = currentFatoInUAM;
    const fatoOutUAM = currentFatoOutUAM;
    const gateUAM = currentGateUAM;
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
  //모달창 닫기
  const closeModal = (closeModal) => {
    setModalstate(false);
  };

  const openModal = () => {
    setModalstate(true);
    console.log(Modalstate)
  }

  // 최적화 전 혼잡도 및 이용률 계산
  const calculate_Congettion_Utilization = (data = {}) => {
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
      weights.w1 * ((data.fato_in_UAM ?? currentFatoInUAM) / maxFatoUAM) +
      weights.w2 * ((data.path_in_UAM ?? currentPathInUAM) / maxPathInUAM) +
      weights.w3 * ((data.gate_UAM ?? currentGateUAM) / maxGateUAM) +
      weights.w4 * ((data.gate_UAM_psg ?? currentGatePassengers) / maxGatePassengers) +
      weights.w5 * ((data.path_out_UAM ?? currentPathOutUAM) / maxPathOutUAM) +
      weights.w6 * ((data.fato_out_UAM ?? currentFatoOutUAM) / maxFatoUAM)
    );

    // 이용률 계산
    const utilization = (
      weights.w7 * ((data.gate_UAM ?? currentGateUAM) / maxGateUAM) +
      weights.w8 * ((data.gate_UAM_psg ?? currentBoardedPassengers) / (maxGateUAM * 4)) +
      weights.w9 * ((data.path_out_UAM ?? currentPathOutUAM) / maxPathOutUAM) +
      weights.w10 * ((data.fato_out_UAM ?? currentFatoOutUAM) / maxFatoUAM)
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
    isCalculated = true;

    const inputs = [
      maxFatoUAM, maxPathInUAM, maxPathOutUAM, maxGateUAM, maxGatePassengers,
      currentFatoInUAM, currentPathInUAM, currentGateUAM, currentFatoOutUAM,
      currentGatePassengers, currentPathOutUAM, currentBoardedPassengers
    ];

    // 입력값을 숫자로 변환
    const numericInputs = inputs.map(value => Number(value));

    const isValid = numericInputs.every(value => !isNaN(value) && value !== '');
    if (!isValid) {
      alertToast({ msg: '모든 텍스트 박스를 채우고, 숫자 값만 입력하세요.', type: 'warning', pos: 'top-center' });
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
      console.log('서버로부터 최적화 받은 데이터:', responseData.data);
      if (responseData && responseData.result === 'success' && responseData.data) {
        const { solution } = responseData.data;
        setStateId(null);
        setSolution(transformNewSolution([solution])); // solution 상태 업데이트
        setShowChart(true);
        handleGraphSelect('bar');
        // 식별 번호 목록 업데이트
        await fetchStatesByVertiport();
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
    setSelectedVertiport(null);
    handleVertiportSelect();
    setShowChart(false);
    setSelectedGraph(null);
    setStateId(null);
    isCalculated = false;
    document.getElementById('dropdown-right').innerText = "그래프";
    document.getElementById('dropdown-sequence').innerText = "시퀀스";
  };

  return (
    <div className="bigcontainer">
      <Header user={props.user} />
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
              <ButtonGroup onFileData={handleFileData} /> {/* 파일 업로드한 데이터 가져오기 */}

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
              <div style={{display:"flex", width:"50%", justifyContent:"center"}}>
                <DropdownButton id="dropdown-left" title="버티포트">
                  {vertiports.map((vertiport, index) => (
                    <Dropdown.Item key={index} onClick={() => handleVertiportSelect(vertiport)}>
                      {vertiport.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                {props.user !== 0 && (
                  <React.Fragment>
                    <button onClick={setModalstate} className="button-style">버티포트 관리</button>
                  </React.Fragment>
                )}
              </div>
              <DropdownButton id="dropdown-right" title="그래프">
                <Dropdown.Item onClick={() => handleGraphSelect('donut')}>혼잡도 및 이용률</Dropdown.Item>
                <Dropdown.Item onClick={() => handleGraphSelect('bar')}>점유상황</Dropdown.Item>
              </DropdownButton>
              <DropdownButton
                id="dropdown-sequence"  // 기존 코드: id="dropdown-right"
                title="시퀀스"
              >
                {states.map((state, index) => (
                  <Dropdown.Item key={index} onClick={() => handleSequenceSelect(state)}>
                    {state.datetime.substr(0, 10) + " " + state.datetime.substr(11, 8)}
                  </Dropdown.Item>
                ))}
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
            {
              Modalstate &&
              <Modal modaltype="addVertiport" constants={constantInputs} vertiports={vertiports} setVertiports={setVertiports} closeModal={closeModal} user={props.user}></Modal>
            }
            {selectedGraph === 'donut' && (
              <div className="chart-container">
                {stateId && previous_congetion_utilization_Data && newsolution ? (
                  <Donutchart solution={newsolution} congetion_utilization_Data={previous_congetion_utilization_Data} />
                ) : (
                  <Donutchart solution={solution} congetion_utilization_Data={congetion_utilization_Data} />
                )}
              </div>
            )}
            {selectedGraph === 'bar' && (
              <div className="chart-container">
                {stateId && previousData && newsolution ? (
                  <VerticalBarChart solution={newsolution} occupancyData={previousData} /> //newsolution = array
                ) : (
                  <VerticalBarChart solution={solution} occupancyData={occupancyData} />
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Start;
