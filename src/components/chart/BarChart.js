import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import '../../styles/BarChart.css';
import { getBarChartData } from '../../utils/ChartData';

const chartOptions = {
    margin: { top: 50, right: 130, bottom: 50, left: 60 },
    padding: 0.2,
    innerPadding: 2,
    valueScale: { type: 'linear' },
    indexScale: { type: 'band', round: true },
    groupMode: 'grouped',
    colors: { scheme: 'nivo' },
    colorBy: 'id',
    theme: {
        labels: { text: { fontSize: 14, fill: '#000000' } },
        legends: { text: { fontSize: 12, fill: '#000000' } },
        axis: {
            legend: { text: { fontSize: 20, fill: '#000000' } },
            ticks: { text: { fontSize: 16, fill: '#000000' } },
        },
    },
    axisBottom: {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'weight',
        legendPosition: 'middle',
        legendOffset: 37,
    },
    axisLeft: {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'percentage',
        legendPosition: 'middle',
        legendOffset: -50,
    },
    labelSkipWidth: 36,
    labelSkipHeight: 12,
    legends: [
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
            effects: [{ on: 'hover', style: { itemOpacity: 1 } }],
        },
    ],
};

const BarChart = () => {
    const [data, setData] = useState(getBarChartData());

    return (
        <div className="Barchart">
            <ResponsiveBar data={data} keys={['congestion', 'using']} indexBy="weight" {...chartOptions} />
        </div>
    );
};

export default BarChart;
