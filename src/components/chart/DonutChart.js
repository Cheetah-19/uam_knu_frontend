import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '../../styles/DonutChart.module.css';

const DonutChart = ({ solution, congetion_utilization_Data }) => {
  const Options = {};

  // 최적화 전 도넛 차트 데이터 설정
  const labelsBefore = ["congestion", "using"];
  const datasetsBefore = [{
    data: [50, 50],
    backgroundColor: ["#ffeb9b", "#b5f2ff"],
    borderColor: ["#ffeb9b", "#b5f2ff"],
  }];

  const [donutChartDataBefore, setDonutChartDataBefore] = useState({ labels: labelsBefore, datasets: datasetsBefore });
  const [donutChartDataAfter, setDonutChartDataAfter] = useState({ labels: labelsBefore, datasets: datasetsBefore }); // 초기화 후 데이터를 초기화 전과 동일하게 설정

  const chartRefBefore = useRef(null); // 최적화 전 차트 인스턴스 변수
  const chartRefAfter = useRef(null); // 최적화 후 차트 인스턴스 변수

  


  useEffect(() => {
    if (solution) {
      // 최적화 후 도넛 차트 데이터 설정
      const labelsAfter = ["congestion", "using"];
      const datasetsAfter = [{
        data: [solution.congestion * 100, solution.utilization * 100],
        backgroundColor: ["#ffeb9b", "#b5f2ff"],
        borderColor: ["#ffeb9b", "#b5f2ff"],
      }];
      setDonutChartDataAfter({ labels: labelsAfter, datasets: datasetsAfter });
    }
  }, [solution]);

  useEffect(() => {
    if (congetion_utilization_Data) {
      // 최적화 전 도넛 차트 데이터 설정
      const datasetsBefore = [{
        data: [
          congetion_utilization_Data.congestion * 100,
          congetion_utilization_Data.utilization * 100
        ],
        backgroundColor: ["#ffeb9b", "#b5f2ff"],
        borderColor: ["#ffeb9b", "#b5f2ff"],
      }];
      setDonutChartDataBefore({ labels: labelsBefore, datasets: datasetsBefore });
    }
  }, [congetion_utilization_Data]);

  useEffect(() => {
    if (chartRefBefore.current) {
      // 최적화 전 Chart.js 인스턴스 생성
      const newChartInstanceBefore = new Chart(chartRefBefore.current, {
        type: 'doughnut',
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
        type: 'doughnut',
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
    <div className={styles.DonutChart}>
      {/* 최적화 전 도넛 차트 */}
      <div>
        <h3>Before Optimization</h3>
        <canvas ref={chartRefBefore} />
      </div>
      {/* 최적화 후 도넛 차트 */}
      <div>
        <h3>After Optimization</h3>
        <canvas ref={chartRefAfter} />
      </div>
    </div>
  );
};

export default DonutChart;
