import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '../../styles/DonutChart.module.css';

const PieChart = ({ solution, occupancyData }) => {
    const Options = {};

    // 최적화 전 파이차트 데이터
    const labelsBefore = ["Fato In UAM", "Fato Out UAM", "Gate UAM", "Gate UAM Passengers", "Path In UAM", "Path Out UAM", "Waiting Room Passengers"];
    const datasetsBefore = [{
        data: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
        backgroundColor: ["#ffeb9b", "#b5f2ff", "#ffcd56", "#36a2eb", "#ff6384", "#e7e9ed", "#4bc0c0"],
        borderColor: ["#ffeb9b", "#b5f2ff", "#ffcd56", "#36a2eb", "#ff6384", "#e7e9ed", "#4bc0c0"],
    }];

    const [pieChartDataBefore, setPieChartDataBefore] = useState({ labels: labelsBefore, datasets: datasetsBefore });
    const [pieChartDataAfter, setPieChartDataAfter] = useState({ labels: labelsBefore, datasets: datasetsBefore }); // 초기화 후 데이터를 초기화 전과 동일하게 설정

    const chartRefBefore = useRef(null); // 최적화 전 차트 인스턴스 변수
    const chartRefAfter = useRef(null); // 최적화 후 차트 인스턴스 변수

    useEffect(() => {
        if (occupancyData) {
            // 최적화 전 파이차트 데이터 설정
            const datasetsBeforeUpdated = [{
                data: [
                    occupancyData.fato_in_UAM,
                    occupancyData.fato_out_UAM,
                    occupancyData.gate_UAM,
                    occupancyData.gate_UAM_psg,
                    occupancyData.path_in_UAM,
                    occupancyData.path_out_UAM,
                    occupancyData.waiting_room_psg
                ],
                backgroundColor: ["#ffeb9b", "#b5f2ff", "#ffcd56", "#36a2eb", "#ff6384", "#e7e9ed", "#4bc0c0"],
                borderColor: ["#ffeb9b", "#b5f2ff", "#ffcd56", "#36a2eb", "#ff6384", "#e7e9ed", "#4bc0c0"],
            }];
            setPieChartDataBefore({ labels: labelsBefore, datasets: datasetsBeforeUpdated });
        }
    }, [occupancyData]);

    useEffect(() => {
        if (solution) {
        //console.log("받은 sol = ",solution);

            // 최적화 후 도넛 차트 데이터 설정
            const labelsAfter = labelsBefore;
            const datasetsAfter = [{
                data: [solution.fato_in_UAM, solution.fato_out_UAM,solution.gate_UAM,solution.gate_UAM_psg,solution.path_in_UAM,solution.path_out_UAM,solution.waiting_room_psg],
                backgroundColor: ["#ffeb9b", "#b5f2ff", "#ffcd56", "#36a2eb", "#ff6384", "#e7e9ed", "#4bc0c0"],
                borderColor: ["#ffeb9b", "#b5f2ff", "#ffcd56", "#36a2eb", "#ff6384", "#e7e9ed", "#4bc0c0"],
            }];
            setPieChartDataAfter({ labels: labelsAfter, datasets: datasetsAfter });
          }
    }, [solution]);

    useEffect(() => {
        if (chartRefBefore.current) {
          // 최적화 전 Chart.js 인스턴스 생성
          const newChartInstanceBefore = new Chart(chartRefBefore.current, {
            type: 'pie',
            data: pieChartDataBefore,
            options: Options
          });
    
          // 컴포넌트가 unmount 될 때 Chart.js 인스턴스 파괴
          return () => {
            newChartInstanceBefore.destroy();
          };
        }
      }, [pieChartDataBefore]);

    useEffect(() => {
        if (chartRefAfter.current) {
          // 최적화 후 Chart.js 인스턴스 생성
          const newChartInstanceAfter = new Chart(chartRefAfter.current, {
            type: 'pie',
            data: pieChartDataAfter,
            options: Options
          });
    
          // 컴포넌트가 unmount 될 때 Chart.js 인스턴스 파괴
          return () => {
            newChartInstanceAfter.destroy();
          };
        }
      }, [pieChartDataAfter]);

      useEffect(() => {
        console.log('Occupancy Data:', occupancyData);
    }, [occupancyData]);

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

export default PieChart;
