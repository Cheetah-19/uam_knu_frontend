// import logo from './logo.svg';
import './styles/App.css';

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
          <div class="aside"></div>
          <div class="main">
          <div class="tablist"></div>
            <div class="chart_area">
              <div class="chart">
                <Barchart/>
              </div>
              <div class="chart">
                <Piechart/>
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