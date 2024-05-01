// import logo from './logo.svg';
import './styles/App.css';

import Barchart from "./components/chart/BarChart"; 
import Piechart from "./components/chart/PieChart"; 
import React, { Component } from "react";


class App extends Component {
  render() {
    return (
      <div>
        <Barchart/>
        <Piechart/>
      </div>
    );
  }

}

export default App;