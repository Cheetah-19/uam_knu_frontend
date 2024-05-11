// import logo from './logo.svg';
import './styles/App.css';

import { Dropdown, DropdownButton } from 'react-bootstrap';
import Barchart from "./components/chart/BarChart";
import Piechart from "./components/chart/PieChart";
import RadialBarchart from "./components/chart/RadialBarChart";
import React, { Component } from "react";


class App extends Component {
  render() {
    return (
      <div class="bigcontainer">
        <header className="header">사용자 페이지</header>

        <div class="content">
          <div class="aside">
            <div className="aside-content">
              <div className="constant-settings">
                <h5>상수 설정</h5>
                <div className="constant-input-container">
                  <label>Fato의 최대 UAM 수</label>
                  <input type="text" className="constant-input" />
                </div>
                <div className="constant-input-container">
                  <label>Path_In의 최대 UAM 수</label>
                  <input type="text" className="constant-input" />
                </div>
                <div className="constant-input-container">
                  <label>Path_Out의 최대 UAM 수</label>
                  <input type="text" className="constant-input" />
                </div>
                <div className="constant-input-container">
                  <label>Gate의 최대 UAM 수</label>
                  <input type="text" className="constant-input" />
                </div>
                <div className="constant-input-container">
                  <label>Gate의 최대 승객 수</label>
                  <input type="text" className="constant-input" />
                </div>
              </div>
              <div className="current-situation-settings">
                <h5>현재 상황 설정</h5>
                <div className="current-situation-input-container">
                  <label>Fato에 있는 UAM 수</label>
                  <input type="text" className="current-situation-input" />
                </div>
                <div className="current-situation-input-container">
                  <label>Path_In에 있는 UAM 수</label>
                  <input type="text" className="current-situation-input" />
                </div>
                <div className="current-situation-input-container">
                  <label>Gate에 있는 UAM 수</label>
                  <input type="text" className="current-situation-input" />
                </div>
                <div className="current-situation-input-container">
                  <label>Fato_Out에 있는 UAM 수</label>
                  <input type="text" className="current-situation-input" />
                </div>
                <div className="current-situation-input-container">
                  <label>Gate의 승객 수</label>
                  <input type="text" className="current-situation-input" />
                </div>
                <div className="current-situation-input-container">
                  <label>UAM에 탑승한 승객 수</label>
                  <input type="text" className="current-situation-input" />
                </div>
              </div>
            </div>
            <div className="aside-buttons">
              <button className="button">계산</button>
              <button className="button">초기화</button>
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