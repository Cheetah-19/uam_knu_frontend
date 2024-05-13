// import logo from './logo.svg';
import './styles/App.css';

import { Dropdown, DropdownButton } from 'react-bootstrap';
import Donutchart from "./components/chart/DonutChart";
import Piechart from "./components/chart/PieChart";
import RadialBarchart from "./components/chart/RadialBarChart";
import React, { Component } from "react";

async function fetchData(url) {
  try {
    const response = await fetch(url); // 서버로 GET 요청을 보냅니다.
    if (!response.ok) { // 응답이 성공적이지 않으면 에러를 발생시킵니다.
      throw new Error('서버 응답이 실패했습니다.');
    }
    const data = await response.json(); // JSON 형식으로 응답 데이터를 파싱합니다.
    return data; // 파싱된 데이터를 반환합니다.
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
    return null; // 에러가 발생하면 null을 반환합니다.
  }
}


class App extends Component {

  async componentDidMount() {
    try {
      const vertiports = await fetchData('http://54.180.164.236:8000/vertiports');
      if (vertiports && vertiports.data) {
        console.log('버티포트 정보:', vertiports.data); // 버티포트 정보를 콘솔에 출력
        this.setState({ vertiports: vertiports.data });
      }
    } catch (error) {
      console.error('버티포트 정보를 가져오는 중 오류 발생:', error);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      vertiports: [], // 버티포트 정보를 저장할 상태
      selectedVertiport: null, // 선택된 버티포트 정보를 저장할 상태 추가
      maxFatoUAM: '',
      maxPathInUAM: '',
      maxPathOutUAM: '',
      maxGateUAM: '',
      maxGatePassengers: '',
      currentFatoUAM: '',
      currentPathInUAM: '',
      currentGateUAM: '',
      currentPathOUTUAM: '',
      currentFatoOutUAM: '',
      currentGatePassengers: '',
      currentBoardedPassengers: '',
      selectedGraph: 'donut' // 기본 그래프 유형 설정
    };
  }

  handleGraphSelect = (graphType) => {
    this.setState({ selectedGraph: graphType });
    const dropdownButton = document.getElementById('dropdown-right');
    if (dropdownButton) {
      dropdownButton.innerText = graphType === 'pie' ? '원형' : '도넛';
    }
  };

  handleVertiportSelect = (selectedVertiport) => {
    console.log('선택된 버티포트:', selectedVertiport); // 선택된 버티포트 정보를 콘솔에 출력
    this.setState({ selectedVertiport });
    // 선택된 버티포트 정보를 텍스트 박스에 표시
    if (selectedVertiport) {
      this.setState({
        maxFatoUAM: selectedVertiport.fato.toString(),
        maxPathInUAM: selectedVertiport.path_in.toString(),
        maxPathOutUAM: selectedVertiport.path_out.toString(),
        maxGateUAM: selectedVertiport.gate.toString(),
        maxGatePassengers: selectedVertiport.waiting_room.toString()
      });

      // 선택된 버티포트 정보를 드롭다운 버튼의 제목으로 설정
      document.getElementById('dropdown-left').innerText = selectedVertiport.name;
    } else {
      // 선택이 해제된 경우 초기화
      this.setState({
        maxFatoUAM: '',
        maxPathInUAM: '',
        maxPathOutUAM: '',
        maxGateUAM: '',
        maxGatePassengers: ''
      });

      // 선택이 해제되었으므로 드롭다운 버튼의 제목을 초기 상태로 설정
      document.getElementById('dropdown-left').innerText = '버티포트';
    }
  }

  //값 업데이트
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // 계산 핸들러
  handleCalculation = () => {
    /* 텍스트 박스 중 하나라도 비어 있거나 숫자가 아닌 값이 있으면 팝업을 띄우고 초기화 */
    const inputs = Object.values(this.state);
    const isValid = inputs.every(value => value !== '' && !isNaN(Number(value))); // 모든 입력값이 숫자인지 확인

    if (!isValid) {
      alert('모든 텍스트 박스를 채우고, 숫자 값만 입력하세요.');
      this.handleReset(); // 리셋 함수 호출
      return;
    }

    console.log('계산 버튼 클릭');
    console.log('상태:', this.state);
  }

  // 초기화 핸들러
  handleReset = () => {
    /* 모든 상태를 초기화 */
    this.setState({
      maxFatoUAM: '',
      maxPathInUAM: '',
      maxPathOutUAM: '',
      maxGateUAM: '',
      maxGatePassengers: '',
      currentFatoUAM: '',
      currentPathInUAM: '',
      currentGateUAM: '',
      currentPathOUTUAM: '',
      currentFatoOutUAM: '',
      currentGatePassengers: '',
      currentBoardedPassengers: ''
    });
  }

  renderInputs = (inputs, disabled = false) => {
    return inputs.map(input => (
      <div className="input-container" key={input.name}>
        <label>{input.label}</label>
        <input
          type="text"
          name={input.name}
          value={this.state[input.name]}
          className={input.className}
          onChange={!disabled ? this.handleInputChange : null}
          disabled={disabled}
        />
      </div>
    ));
  };

  render() {
    const { vertiports, selectedGraph } = this.state;

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

    return (
      <div className="bigcontainer">
        <header className="header">사용자 페이지</header>

        <div className="content">
          <div className="aside">
            <div className="aside-content">
              <div className="constant-settings">
                <h5>상수 설정</h5>
                {this.renderInputs(constantInputs, true)} {/* readOnly로 렌더링 */}
              </div>
              <div className="current-situation-settings">
                <h5>현재 상황 설정</h5>
                {this.renderInputs(currentSituationInputs)} {/* 사용자 입력 허용 */}
              </div>
            </div>
            <div className="aside-buttons">
              <button className="button" onClick={this.handleCalculation}>계산</button>
              <button className="button" onClick={this.handleReset}>초기화</button>
            </div>
          </div>

          <div className="main">
            <div className="tablist">
              <div className="dropdown-container">
                <DropdownButton id="dropdown-left" title="버티포트">
                  {vertiports.map((vertiport, index) => (
                    <Dropdown.Item key={index} onClick={() => this.handleVertiportSelect(vertiport)}>
                      {vertiport.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                <DropdownButton id="dropdown-right" title="그래프">
                  <Dropdown.Item onClick={() => this.handleGraphSelect('pie')}>원형</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.handleGraphSelect('donut')}>도넛</Dropdown.Item>
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
                {/*<Donutchart />*/}
                {selectedGraph === 'donut' && <Donutchart />}
                {selectedGraph === 'pie' && <Piechart />}
              </div>
              <div className="chart">
                {/*<Piechart />*/}
                {selectedGraph === 'donut' && <Donutchart />}
                {selectedGraph === 'pie' && <Piechart />}

              </div>
            </div>
            {/* <button class="random_button">
              dice!
            </button> */}

          </div>
        </div>
      </div>
    );
  }

}

export default App;