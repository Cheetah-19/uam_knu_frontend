import React, { useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import '../../styles/PieChart.css';
import { getPieChartData } from '../../utils/ChartData.js';

const PieChart = () => {
    const [data, setData] = useState(getPieChartData());

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
                emptyColor="#f0f0f0"
                emptyTitle="No data available"
                emptyDescription="Please check the data source and try again."
                />
        </div>
    );
};

export default PieChart;
