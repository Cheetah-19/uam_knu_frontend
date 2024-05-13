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

export const donutChartDataBeforeOptimization = {
  labels: ["congestion", "using"],
  datasets: [
    {
      data: [40, 20],
      backgroundColor: ["#ffeb9b", "#b5f2ff"],
      borderColor: ["#ffeb9b", "#b5f2ff"],
    },
  ],
};

export const donutChartDataAfterOptimization = {
  labels: ["congestion", "using"],
  datasets: [
    {
      data: [50, 50],
      backgroundColor: ["#ffeb9b", "#b5f2ff"],
      borderColor: ["#ffeb9b", "#b5f2ff"],
    },
  ],
};

export const getDonutChartDataBeforeOptimization = () => {
  return donutChartDataBeforeOptimization;
};

export const getDonutChartDataAfterOptimization = () => {
  return donutChartDataAfterOptimization;
};
