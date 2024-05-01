// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/radial-bar
import { ResponsiveRadialBar } from '@nivo/radial-bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const RadialBarchart = () => {
    const handle = {
        padClick: (data) => {
            console.log(data);
        },

        legendClick: (data) => {
            console.log(data);
        },
    };
    
    return (
        <div style={{ width: '800px', height: '500px', margin: '0 auto' }}>
            <ResponsiveRadialBar
                data={[
                    {
                    "id": "gate",
                    "data": [
                        {
                        "x": "congestion",
                        "y": 80
                        },
                        {
                        "x": "using",
                        "y": 70
                        }
                    ]
                    }
                ]}
                valueFormat=" >-.2f"
                endAngle={287}
                padding={0.4}
                cornerRadius={2}
                margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
                radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
                onClick={handle.padClick}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 80,
                        translateY: 0,
                        itemsSpacing: 6,
                        itemDirection: 'left-to-right',
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        symbolSize: 18,
                        symbolShape: 'square',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                },
                            },
                        ],
                        onClick: handle.legendClick, // legend 클릭 이벤트
                    },
                ]}
            />
        </div>
    );
};
export default RadialBarchart;
