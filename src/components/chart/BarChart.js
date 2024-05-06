import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import '../../styles/BarChart.css';

const Barchart = () => {
    // 초기 데이터 상태 설정
    const [data, setData] = useState([
        { weight: '0%', congestion: 22, using: 18 },
        { weight: '20%', congestion: 23, using: 30 },
        { weight: '40%', congestion: 32, using: 55 },
        { weight: '60%', congestion: 41, using: 70 },
        { weight: '80%', congestion: 51, using: 85 },
    ]);

    // 랜덤 데이터 생성 함수
    const generateRandomData = () => {
        return data.map(item => ({
            ...item,
            congestion: Math.floor(Math.random() * 100),
            using: Math.floor(Math.random() * 100),
        }));
    };

    // 버튼 클릭 핸들러
    const handleButtonClick = () => {
        const newData = generateRandomData();
        setData(newData); // 새로운 데이터로 상태 업데이트
    };

    return (
        <div className="Barchart">
            <ResponsiveBar
                data={data}
                keys={['congestion', 'using']}
                indexBy="weight"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.2}
                innerPadding={2}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                groupMode="grouped"
                colors={{ scheme: 'nivo' }}
                colorBy="id"
                theme={{
                    labels: {
                        text: {
                            fontSize: 14,
                            fill: '#000000',
                        },
                    },
                    legends: {
                        text: {
                            fontSize: 12,
                            fill: '#000000',
                        },
                    },
                    axis: {
                        legend: {
                            text: {
                                fontSize: 20,
                                fill: '#000000',
                            },
                        },
                        ticks: {
                            text: {
                                fontSize: 16,
                                fill: '#000000',
                            },
                        },
                    },
                }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'weight',
                    legendPosition: 'middle',
                    legendOffset: 37,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'percentage',
                    legendPosition: 'middle',
                    legendOffset: -50,
                }}
                labelSkipWidth={36}
                labelSkipHeight={12}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
            <button className = "hi" onClick={handleButtonClick}>데이터 변경</button>
        </div>
    );
};

export default Barchart;