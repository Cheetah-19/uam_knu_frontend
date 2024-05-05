// import logo from './logo.svg';
import './styles/App.css';

import Barchart from "./components/chart/BarChart"; 
import Piechart from "./components/chart/PieChart"; 
import RadialBarchart from "./components/chart/RadialBarChart";
import React, { Component } from "react";


class App extends Component {
  render() {
    return (
      <div id="bigcontainer" class="bigcontainer">
        <header class="header"></header>
        <div class="tablist"></div>
        <div class="content">
          <div class="aside"></div>
          <div class="main">
            <Barchart/>
            <Piechart/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;