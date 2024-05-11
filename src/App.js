// import logo from './logo.svg';
import './styles/App.css';

import { Dropdown, DropdownButton } from 'react-bootstrap';
import Barchart from "./components/chart/BarChart";
import Piechart from "./components/chart/PieChart";
import RadialBarchart from "./components/chart/RadialBarChart";
import React, { Component } from "react";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxFatoUAM: '',
      maxPathInUAM: '',
      maxPathOutUAM: '',
      maxGateUAM: '',
      maxGatePassengers: '',
      currentFatoUAM: '',
      currentPathInUAM: '',
      currentGateUAM: '',
      currentFatoOutUAM: '',
      currentGatePassengers: '',
      currentBoardedPassengers: ''
    };
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
      currentFatoOutUAM: '',
      currentGatePassengers: '',
      currentBoardedPassengers: ''
    });
  }

  renderInputs = (inputs) => {
    return inputs.map(input => (
      <div className="current-situation-input-container" key={input.name}>
        <label>{input.label}</label>
        <input
          type="text"
          name={input.name}
          value={this.state[input.name]}
          className={input.className}
          onChange={this.handleInputChange}
        />
      </div>
    ));
  };

  render() {
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
      { name: "currentBoardedPassengers", label: "UAM에 탑승한 승객 수", className: "current-situation-input" }
    ];

    return (
      <div class="bigcontainer">
        <header className="header">사용자 페이지</header>

        <div class="content">
          <div className="aside">
            <div className="aside-content">
              <div className="constant-settings">
                <h5>상수 설정</h5>
                {this.renderInputs(constantInputs)}
              </div>
              <div className="current-situation-settings">
                <h5>현재 상황 설정</h5>
                {this.renderInputs(currentSituationInputs)}
              </div>
            </div>
            <div className="aside-buttons">
              <button className="button" onClick={this.handleCalculation}>계산</button>
              <button className="button" onClick={this.handleReset}>초기화</button>
            </div>
          </div>

          <div class="main">
            <div class="tablist">
              <div className="dropdown-container">
                <DropdownButton id="dropdown-left" title="버티포트">
                  <Dropdown.Item href="#">Option 1</Dropdown.Item>
                  <Dropdown.Item href="#">Option 2</Dropdown.Item>
                  <Dropdown.Item href="#">Option 3</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-right" title="식별번호">
                  <Dropdown.Item href="#">Option 1</Dropdown.Item>
                  <Dropdown.Item href="#">Option 2</Dropdown.Item>
                  <Dropdown.Item href="#">Option 3</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
            <div class="chart_area">
              <div class="chart">
                <Barchart />
              </div>
              <div class="chart">
                <Piechart />
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