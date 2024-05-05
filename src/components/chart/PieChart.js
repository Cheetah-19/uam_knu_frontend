import React, { useState } from 'react'; // React와 useState를 임포트합니다.
import { ResponsivePie } from '@nivo/pie';
import '../../styles/PieChart.css';

const PieChart = () => {
    // 차트 데이터 상태 관리
    const [data, setData] = useState([
        { id: 'fato', value: 0.1 },
        { id: 'path_in', value: 0.2 },
        { id: 'gate', value: 0.4 },
        { id: 'path_out', value: 0.3 },
        { id: 'dahapsil', value: 0.3 },
    ]);

    // 차트 데이터를 랜덤으로 업데이트하되 모든 수의 합이 1이 되도록 하는 함수
    const updateData = () => {
        // 임시 배열과 총합 변수를 생성
        let tempData = [];
        let total = 0;

        // 랜덤한 수를 생성하고 총합을 계산
        data.forEach(item => {
            const randomValue = Math.random();
            tempData.push({
                ...item,
                value: randomValue,
            });
            total += randomValue;
        });

        // 생성된 랜덤 수들의 합으로 각 값을 나누어 정규화
        const normalizedData = tempData.map(item => ({
            ...item,
            value: item.value / total,
        }));

        // 상태를 업데이트
        setData(normalizedData);
    };

    // 클릭 이벤트 핸들러
    const handle = {
        padClick: (data) => {
            console.log(data);
        },
        legendClick: (data) => {
            console.log(data);
        },
    };

    return (
        <div className="Piechart">
            <ResponsivePie
                data={data} 
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                valueFormat=" >-~%"
                innerRadius={0.5}
                padAngle={1.8}
                cornerRadius={8}
                colors={{ scheme: 'nivo' }}
                borderWidth={2}
                arcLinkLabelsSkipAngle={0}
                arcLinkLabelsTextColor="#000000"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
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
                }}
                onClick={handle.padClick}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: 'olive',
                                },
                            },
                        ],
                        onClick: handle.legendClick,
                    },
                ]}
            />
            <button onClick={updateData}>데이터 변경</button>
        </div>
    );
};

export default PieChart;
