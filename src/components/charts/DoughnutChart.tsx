import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
  } as any;

  const data = {
    labels: ["In-stock", "Low", "Out"],
    datasets: [
      {
        label: "Inventory Status",
        data: [120, 30, 10],
        backgroundColor: [
          "oklch(70% 0.14 150)",
          "oklch(85% 0.1 80)",
          "oklch(65% 0.18 30)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-64">
      <Doughnut options={options} data={data} />
    </div>
  );
};

export default DoughnutChart;