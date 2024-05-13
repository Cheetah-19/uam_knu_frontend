import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from '../../styles/DonutChart.module.css';
import { getDonutChartDataBeforeOptimization, getDonutChartDataAfterOptimization } from '../../utils/ChartData';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function DonutChart() {
    const Options = {};
  
    // 최적화 전 데이터
    const { labels: labelsBeforeOptimization, datasets: datasetsBeforeOptimization } = getDonutChartDataBeforeOptimization();
  
    // 최적화 후 데이터
    const { labels: labelsAfterOptimization, datasets: datasetsAfterOptimization } = getDonutChartDataAfterOptimization();
  
    return (
      <div className={styles.DonutChart}>
        {/* 최적화 전 도넛 그래프 */}
        <Doughnut data={{ labels: labelsBeforeOptimization, datasets: datasetsBeforeOptimization }} options={Options}></Doughnut>
  
        {/* 최적화 후 도넛 그래프 */}
        <Doughnut data={{ labels: labelsAfterOptimization, datasets: datasetsAfterOptimization }} options={Options}></Doughnut>
      </div>
    );
  }