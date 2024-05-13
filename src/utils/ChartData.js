// 서버와 통신하기 전에 배열 초기화
export const getPieChartData = () => {
    return [
        { id: 'fato', value: 0 },
        { id: 'path_in', value: 0 },
        { id: 'gate', value: 0 },
        { id: 'path_out', value: 0 },
        { id: 'dahapsil', value: 0 },
    ];
};

export const donutChartData = {
    labels: ["congestion", "using"],
    datasets: [
      {
        data: [40, 20],
        backgroundColor: ["#ffeb9b", "#b5f2ff"],
        borderColor: ["#ffeb9b", "#b5f2ff"],
      },
    ],
  };
  
  export const getDonutChartData = () => {
    return donutChartData;
  };