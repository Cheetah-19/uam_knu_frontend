import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '../../styles/DonutChart.module.css';

const DonutChart = ({ solution, congetion_utilization_Data }) => {
  const arr = solution;
  solution = arr[0];
  const Options = {};

  // 최적화 전 파이차트 데이터 설정
  const labelsBefore = ["congestion", "using"];
  const datasetsBefore = [{
    data: [50, 50],
    backgroundColor: ["#ffeb9b", "#b5f2ff"],
    borderColor: ["#ffeb9b", "#b5f2ff"],
  }];

  const [weight, setWeight] = useState(solution.weight); 
  const handleWeightChange = (e) => {
    const value = parseFloat(e.target.value);
    let closest = null;
    
    arr.forEach((item) => {
      const val = item.weight
      if (closest === null || Math.abs(val - value) < Math.abs(closest - value)) {
        closest = val;
      }
    })

    e.target.value = closest;
    setWeight(e.target.value);
  };

  const [donutChartDataBefore, setDonutChartDataBefore] = useState({ labels: labelsBefore, datasets: datasetsBefore });
  const [donutChartDataAfter, setDonutChartDataAfter] = useState({ labels: labelsBefore, datasets: datasetsBefore }); // 초기화 후 데이터를 초기화 전과 동일하게 설정

  const chartRefBefore = useRef(null); // 최적화 전 차트 인스턴스 변수
  const chartRefAfter = useRef(null); // 최적화 후 차트 인스턴스 변수

  useEffect(() => {
    // 최적화 후 파이차트 데이터 설정
    solution = arr.find(item => item.weight == weight);

    const labelsAfter = ["congestion", "using"];
    const datasetsAfter = [{
      data: [solution.congestion / (solution.congestion + solution.utilization) * 100, solution.utilization / (solution.congestion + solution.utilization) * 100],
      backgroundColor: ["#fbe145", "#61e684"],
      borderColor: ["#fbe145", "#61e684"],
    }];
    setDonutChartDataAfter({ labels: labelsAfter, datasets: datasetsAfter });
  }, [solution, weight]);

  useEffect(() => {
    if (congetion_utilization_Data) {
      // 최적화 전 파이차트 데이터 설정
      const datasetsBefore = [{
        data: [
          congetion_utilization_Data.congestion / (congetion_utilization_Data.utilization + congetion_utilization_Data.congestion) * 100,
          congetion_utilization_Data.utilization / (congetion_utilization_Data.utilization + congetion_utilization_Data.congestion) * 100
        ],
        backgroundColor: ["#fbe145", "#61e684"],
        borderColor: ["#fbe145", "#61e684"],
      }];
      setDonutChartDataBefore({ labels: labelsBefore, datasets: datasetsBefore });
    }
  }, [congetion_utilization_Data]);

  useEffect(() => {
    if (chartRefBefore.current) {
      // 최적화 전 Chart.js 인스턴스 생성
      const newChartInstanceBefore = new Chart(chartRefBefore.current, {
        type: 'doughnut', // 도넛차트를 파이차트로 변경
        data: donutChartDataBefore,
        options: Options
      });

      // 컴포넌트가 unmount 될 때 Chart.js 인스턴스 파괴
      return () => {
        newChartInstanceBefore.destroy();
      };
    }
  }, [donutChartDataBefore]);

  useEffect(() => {
    if (chartRefAfter.current) {
      // 최적화 후 Chart.js 인스턴스 생성
      const newChartInstanceAfter = new Chart(chartRefAfter.current, {
        type: 'doughnut', // 도넛차트를 파이차트로 변경
        data: donutChartDataAfter,
        options: Options
      });

      // 컴포넌트가 unmount 될 때 Chart.js 인스턴스 파괴
      return () => {
        newChartInstanceAfter.destroy();
      };
    }
  }, [donutChartDataAfter]);

  useEffect(() => {
    console.log('congetion_utilization_Data:', congetion_utilization_Data);
  }, [congetion_utilization_Data]);

  return (
  <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "90%"}}>
      <div className="slidecontainer" id='vert-chart'>
          <input
            type="range"
            name="weight"
            value={weight}
            min="0"
            max="1"
            step="0.1"
            className="slider"
            onChange={handleWeightChange}
          />
          <div>{weight}</div>
      </div>
      <div className={styles.DonutChart}>
        {/* 최적화 전 파이차트 */}
        <div className={`${styles.dunut}`}>
          <div className={styles.chartText}> 최적화 전 </div>
          <canvas ref={chartRefBefore} /> {/* 차트 크기 키우기 */}
        </div>
        {/* 최적화 후 파이차트 */}
        <div className={`${styles.dunut}`}>
          <div className={styles.chartText}> 최적화 후 </div>
          <canvas ref={chartRefAfter} />
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
