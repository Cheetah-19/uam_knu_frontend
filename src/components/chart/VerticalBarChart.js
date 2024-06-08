import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '../../styles/DonutChart.module.css';

const BarChart = ({ solution, occupancyData }) => {
    const arr = solution;
    solution = solution[0];
    // console.log("vertical:",solution);

    const chartRef = useRef(null);
    const chartRef2 = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [chartInstance2, setChartInstance2] = useState(null);

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
    
    useEffect(() => {
        if (chartRef.current) {
            const newChartInstance = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: ["Fato_In", "Path_In", "Gate", "Path_Out", "Fato_Out"],
                    datasets: [
                        {
                            label: 'Before',
                            data: [0.1, 0.1, 0.1, 0.1, 0.1],
                            backgroundColor: "#FF1493",
                            borderColor: "#FF1493",
                            borderWidth: 1,
                            maxBarThickness: 35
                        },
                        {
                            label: 'After',
                            data: [0.1, 0.1, 0.1, 0.1, 0.1],
                            backgroundColor: "#00BFFF",
                            borderColor: "#00BFFF",
                            borderWidth: 1,
                            maxBarThickness: 35
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuad',
                        onProgress: (animation) => {
                            animation.chart.data.datasets.forEach((dataset) => {
                                if (!dataset.fromZero) {
                                    dataset.data = dataset.data.map((value) => {
                                        const frame = animation.currentStep / animation.numSteps;
                                        return value * frame;
                                    });
                                    dataset.fromZero = true;
                                }
                            });
                        },
                        onComplete: (animation) => {
                            animation.chart.data.datasets.forEach((dataset) => {
                                dataset.fromZero = false;
                            });
                        },
                    }
                }
            });

            setChartInstance(newChartInstance);
        }

        if (chartRef2.current) {
            const newChartInstance2 = new Chart(chartRef2.current, {
                type: 'bar',
                data: {
                    labels: ["UAM 탑승 인원", "대합실 대기 인원"],
                    datasets: [
                        {  
                            label: 'Before',
                            data: [0.1, 0.1],
                            backgroundColor: "#FF1493",
                            borderColor: "#FF1493",
                            borderWidth: 1,
                            maxBarThickness: 35
                        },
                        {
                            label: 'After',
                            data: [0.1, 0.1],
                            backgroundColor: "#00BFFF",
                            borderColor: "#00BFFF",
                            borderWidth: 1,
                            maxBarThickness: 35
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuad',
                        onProgress: (animation) => {
                            animation.chart.data.datasets.forEach((dataset) => {
                                if (!dataset.fromZero) {
                                    dataset.data = dataset.data.map((value) => {
                                        const frame = animation.currentStep / animation.numSteps;
                                        return value * frame;
                                    });
                                    dataset.fromZero = true;
                                }
                            });
                        },
                        onComplete: (animation) => {
                            animation.chart.data.datasets.forEach((dataset) => {
                                dataset.fromZero = false;
                            });
                        },
                    }
                }
            });

            setChartInstance2(newChartInstance2);
        }
    }, []);

    useEffect(() => {
        if (chartInstance) {
            if (occupancyData) {
                chartInstance.data.datasets[0].data = [
                    occupancyData.fato_in_UAM,
                    occupancyData.path_in_UAM,
                    occupancyData.gate_UAM,
                    occupancyData.path_out_UAM,
                    occupancyData.fato_out_UAM
                ];
            }

            if (solution) {
                chartInstance.data.datasets[1].data = [
                    solution.fato_in_UAM,
                    solution.path_in_UAM,
                    solution.gate_UAM,
                    solution.path_out_UAM,
                    solution.fato_out_UAM
                ];
            }

            if(weight) {
                solution = arr.find(item => item.weight == weight);
                chartInstance.data.datasets[1].data = [
                    solution.fato_in_UAM,
                    solution.fato_out_UAM,
                    solution.gate_UAM,
                    solution.gate_UAM_psg,
                    solution.path_in_UAM,
                    solution.path_out_UAM,
                    solution.waiting_room_psg
                ];
            }

            chartInstance.update();
        }
        if (chartInstance2) {
            if (occupancyData) {
                chartInstance2.data.datasets[0].data = [
                    occupancyData.gate_UAM_psg,
                    occupancyData.waiting_room_psg
                ];
            }

            if (solution) {
                chartInstance2.data.datasets[1].data = [
                    solution.gate_UAM_psg,
                    solution.waiting_room_psg
                ];
            }

            if(weight){
                solution = arr.find(item => item.weight == weight);
                chartInstance2.data.datasets[1].data = [
                    solution.fato_in_UAM,
                    solution.fato_out_UAM,
                    solution.gate_UAM,
                    solution.gate_UAM_psg,
                    solution.path_in_UAM,
                    solution.path_out_UAM,
                    solution.waiting_room_psg
                ];
            }

            chartInstance2.update();
        }
    }, [solution, occupancyData, chartInstance, chartInstance2, weight]);

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "90%"}}>
            <div className="slidecontainer" id='vert-chart'>
                {/* Range slider for weight */}
                <input
                  type="range"
                  name="weight"
                  value={weight}
                  min="0"
                  max="1"
                  step="0.1" // Add step attribute
                  className="slider"
                  onChange={handleWeightChange}
                />
                {/* Display the selected weight value */}
                <div>{weight}</div>
            </div>
            <div className={styles.BarchartContainer}>
                <h2 className={styles.chartText}>최적화 전/후 구간별 점유 상황</h2>
                <div style={{display: "flex"}}>
                    <canvas className={`${styles.Bar_chart1}`} ref={chartRef} />
                    <canvas className={`${styles.Bar_chart2}`} ref={chartRef2} />
                </div>
            </div>
       </div>
    );
};

export default BarChart;
