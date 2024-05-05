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
                      "id": "Supermarket",
                      "data": [
                        {
                          "x": "Vegetables",
                          "y": 245
                        },
                        {
                          "x": "Fruits",
                          "y": 68
                        },
                        {
                          "x": "Meat",
                          "y": 174
                        }
                      ]
                    },
                    {
                      "id": "Combini",
                      "data": [
                        {
                          "x": "Vegetables",
                          "y": 225
                        },
                        {
                          "x": "Fruits",
                          "y": 26
                        },
                        {
                          "x": "Meat",
                          "y": 154
                        }
                      ]
                    },
                    {
                      "id": "Online",
                      "data": [
                        {
                          "x": "Vegetables",
                          "y": 52
                        },
                        {
                          "x": "Fruits",
                          "y": 15
                        },
                        {
                          "x": "Meat",
                          "y": 85
                        }
                      ]
                    },
                    {
                      "id": "Marché",
                      "data": [
                        {
                          "x": "Vegetables",
                          "y": 22
                        },
                        {
                          "x": "Fruits",
                          "y": 209
                        },
                        {
                          "x": "Meat",
                          "y": 183
                        }
                      ]
                    }
                  ]}
                  valueFormat=">-.2f"
                  padding={0.4}
                  cornerRadius={2}
                  margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
                  borderWidth={2}
                  borderColor="#383333"
                  enableTracks={false}
                  radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                  circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
                  labelsTextColor={{ theme: 'labels.text.fill' }}
                  legends={[
                      {
                          anchor: 'right',
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
                                  }
                              }
                          ]
                      }
                    ]}
            />
        </div>
    );
};
export default RadialBarchart;
