import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue",
        data: [320, 410, 380, 520, 610, 700, 640],
        borderColor: "oklch(63% 0.204 264.05)",
        backgroundColor: "oklch(63% 0.204 264.05 / 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full h-64">
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;