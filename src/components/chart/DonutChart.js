import {styled} from "styled-components";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import styles from '../../styles/DonutChart.module.css';
import { getDonutChartData } from '../../utils/ChartData';

ChartJS.register(ArcElement, Tooltip, Legend);

const Main = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
`;

export default function DonutChart() {
  const Options = {};
  const { labels, datasets } = getDonutChartData();

  return (
    <div className={styles.DonutChart}>
      <Doughnut data={{ labels, datasets }} options={Options}></Doughnut>
    </div>
  );
}