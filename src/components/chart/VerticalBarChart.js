import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '../../styles/DonutChart.module.css';

const BarChart = ({ solution, occupancyData }) => {
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartRef.current) {
            const newChartInstance = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: ["Fato_In", "Fato_Out", "Gate", "UAM 탑승인원", "Path_In", "Path_Out", "Waiting_Room 대기인원"],
                    datasets: [
                        {
                            label: 'Before Optimization',
                            data: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
                            backgroundColor: "#FF1493",
                            borderColor: "#FF1493",
                            borderWidth: 1
                        },
                        {
                            label: 'After Optimization',
                            data: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
                            backgroundColor: "#00BFFF",
                            borderColor: "#00BFFF",
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    animation: {
                        duration: 1000, // 애니메이션 시간
                        easing: 'easeOutQuad', // 애니메이션 효과
                        onProgress: (animation) => {
                            animation.chart.data.datasets.forEach((dataset) => {
                                if (!dataset.fromZero) {
                                    dataset.data = dataset.data.map((value) => {
                                        const frame = animation.currentStep / animation.numSteps;
                                        return value * frame;
                                    });
                                    dataset.fromZero = true; // 데이터셋이 0부터 시작하도록 플래그 설정
                                }
                            });
                        },
                        onComplete: (animation) => {
                            animation.chart.data.datasets.forEach((dataset) => {
                                dataset.fromZero = false; // 애니메이션 완료 후 플래그 초기화
                            });
                        },
                    }
                }
            });

            setChartInstance(newChartInstance);
        }
    }, []);

    useEffect(() => {
        if (chartInstance) {
            if (occupancyData) {
                chartInstance.data.datasets[0].data = [
                    occupancyData.fato_in_UAM,
                    occupancyData.fato_out_UAM,
                    occupancyData.gate_UAM,
                    occupancyData.gate_UAM_psg,
                    occupancyData.path_in_UAM,
                    occupancyData.path_out_UAM,
                    occupancyData.waiting_room_psg
                ];
            }

            if (solution) {
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
    }, [solution, occupancyData, chartInstance]);

    return (
        <div className={styles.DonutChart}>
            <h2>최적화 전/후 점유상황 비교</h2>
            <canvas ref={chartRef} />
        </div>
    );
};

export default BarChart;
