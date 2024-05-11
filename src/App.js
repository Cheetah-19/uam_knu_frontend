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

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCalculation = () => {
    // 텍스트 박스 중 하나라도 비어 있거나 숫자가 아닌 값이 있으면 팝업을 띄우고 초기화
    const inputs = Object.values(this.state);
    const isValid = inputs.every(value => value !== '' && !isNaN(Number(value)));
    
    if (!isValid) {
      alert('모든 텍스트 박스를 채우고, 숫자 값만 입력하세요.');
      this.handleReset(); // 리셋 함수 호출
    return;
    }
    // 계산 로직 추가
    console.log('계산 버튼 클릭');
    console.log('maxFatoUAM:', this.state.maxFatoUAM);
    console.log('maxPathInUAM:', this.state.maxPathInUAM);
    console.log('maxPathOutUAM:', this.state.maxPathOutUAM);
    console.log('maxGateUAM:', this.state.maxGateUAM);
    console.log('maxGatePassengers:', this.state.maxGatePassengers);
    console.log('currentFatoUAM:', this.state.currentFatoUAM);
    console.log('currentPathInUAM:', this.state.currentPathInUAM);
    console.log('currentGateUAM:', this.state.currentGateUAM);
    console.log('currentFatoOutUAM:', this.state.currentFatoOutUAM);
    console.log('currentGatePassengers:', this.state.currentGatePassengers);
    console.log('currentBoardedPassengers:', this.state.currentBoardedPassengers);
  }

  handleReset = () => {
    // 모든 상태를 초기화합니다.
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

  render() {
    return (
      <div class="bigcontainer">
        <header className="header">사용자 페이지</header>

        <div class="content">
          <div className="aside">
            <div className="aside-content">
              <div className="constant-settings">
                <h5>상수 설정</h5>
                <div className="constant-input-container">
                  <label>Fato의 최대 UAM 수</label>
                  <input
                    type="text"
                    name="maxFatoUAM"
                    value={this.state.maxFatoUAM}
                    className="constant-input"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="constant-input-container">
                  <label>Path_In의 최대 UAM 수</label>
                  <input
                    type="text"
                    name="maxPathInUAM"
                    value={this.state.maxPathInUAM}
                    className="constant-input"
                    onChange={this.handleInputChange}
                  />
                </div>
                {/* 이하 동일한 방식으로 각 입력 필드 추가 */}
                <div className="constant-input-container">
                  <label>Path_Out의 최대 UAM 수</label>
                  <input
                    type="text"
                    name="maxPathOutUAM"
                    value={this.state.maxPathOutUAM}
                    className="constant-input"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="constant-input-container">
                  <label>Gate의 최대 UAM 수</label>
                  <input
                    type="text"
                    name="maxGateUAM"
                    value={this.state.maxGateUAM}
                    className="constant-input"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="constant-input-container">
                  <label>Gate의 최대 승객 수</label>
                  <input
                    type="text"
                    name="maxGatePassengers"
                    value={this.state.maxGatePassengers}
                    className="constant-input"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="current-situation-settings">
                <h5>현재 상황 설정</h5>
                <div className="current-situation-input-container">
                  <label>Fato에 있는 UAM 수</label>
                  <input
                    type="text"
                    name="currentFatoUAM"
                    value={this.state.currentFatoUAM}
                    className="current-situation-input"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="current-situation-input-container">
                  <label>Path_In에 있는 UAM 수</label>
                  <input
                    type="text"
                    name="currentPathInUAM"
                    value={this.state.currentPathInUAM}
                    className="current-situation-input"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="current-situation-input-container">
                  <label>Gate에 있는 UAM 수</label>
                  <input
                    type="text"
                    name="currentGateUAM"
                    value={this.state.currentGateUAM}
                    className="current-situation-input"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="current-situation-input-container">
                  <label>Fato_Out에 있는 UAM 수</label>
                  <input
                    type="text"
                    name="currentFatoOutUAM"
                    value={this.state.currentFatoOutUAM}
                    className="current-situation-input"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="current-situation-input-container">
                  <label>Gate의 승객 수</label>
                  <input
                    type="text"
                    name="currentGatePassengers"
                    value={this.state.currentGatePassengers}
                    className="current-situation-input"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="current-situation-input-container">
                  <label>UAM에 탑승한 승객 수</label>
                  <input
                    type="text"
                    name="currentBoardedPassengers"
                    value={this.state.currentBoardedPassengers}
                    className="current-situation-input"
                    onChange={this.handleInputChange}
                  />
                </div>
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