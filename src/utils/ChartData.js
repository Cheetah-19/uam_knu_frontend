// 원형차트

// 서버와 통신하기 전에 배열 초기화
// 최적화 전 파이차트 데이터
export const pieChartDataBeforeOptimization = {
  labels: ["Fato In UAM", "Fato Out UAM", "Gate UAM", "Gate UAM Passengers", "Path In UAM", "Path Out UAM", "Waiting Room Passengers"],
  datasets: [{
    data: [0, 0, 0, 0, 0, 0, 0],
    backgroundColor: ["#ffeb9b", "#b5f2ff", "#ffcd56", "#36a2eb", "#ff6384", "#e7e9ed", "#4bc0c0"],
    borderColor: ["#ffeb9b", "#b5f2ff", "#ffcd56", "#36a2eb", "#ff6384", "#e7e9ed", "#4bc0c0"],
  }]
};

// 최적화 후 파이차트 데이터
export const pieChartDataAfterOptimization = {
  labels: ["Fato In UAM", "Fato Out UAM", "Gate UAM", "Gate UAM Passengers", "Path In UAM", "Path Out UAM", "Waiting Room Passengers"],
  datasets: [{
    data: [0, 0, 0, 0, 0, 0, 0],
    backgroundColor: ["#ffeb9b", "#b5f2ff", "#ffcd56", "#36a2eb", "#ff6384", "#e7e9ed", "#4bc0c0"],
    borderColor: ["#ffeb9b", "#b5f2ff", "#ffcd56", "#36a2eb", "#ff6384", "#e7e9ed", "#4bc0c0"],
  }]
};

// 최적화 후 데이터를 설정하는 함수
export const setPieChartDataAfterOptimization = (newData) => {
  pieChartDataAfterOptimization.datasets[0].data = newData.datasets[0].data;
};

// 최적화 전 데이터를 가져오는 함수
export const getPieChartDataBeforeOptimization = () => {
  return pieChartDataBeforeOptimization;
};

// 최적화 후 데이터를 가져오는 함수
export const getPieChartDataAfterOptimization = () => {
  return pieChartDataAfterOptimization;
};

// //============== 도넛차트 ==============

// export const donutChartDataBeforeOptimization = {
//   labels: ["congestion", "using"],
//   datasets: [
//     {
//       data: [40, 20],
//       backgroundColor: ["#ffeb9b", "#b5f2ff"],
//       borderColor: ["#ffeb9b", "#b5f2ff"],
//     },
//   ],
// };

// export const donutChartDataAfterOptimization = {
//   labels: ["congestion", "using"],
//   datasets: [
//     {
//       data: [50, 50],
//       backgroundColor: ["#ffeb9b", "#b5f2ff"],
//       borderColor: ["#ffeb9b", "#b5f2ff"],
//     },
//   ],
// };

// export const setDonutChartDataAfterOptimization = (newData) => {
//   donutChartDataAfterOptimization.labels = newData.labels;
//   donutChartDataAfterOptimization.datasets[0].data = newData.datasets[0].data;
// };

// export const getDonutChartDataBeforeOptimization = () => {
//   return donutChartDataBeforeOptimization;
// };

// export const getDonutChartDataAfterOptimization = () => {
//   return donutChartDataAfterOptimization;
// };
