import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const data = {
    labels: ["Electronics", "Grocery", "Clothing", "Home"],
    datasets: [
      {
        label: "Category Share",
        data: [35, 25, 20, 20],
        backgroundColor: [
          "oklch(76.5% 0.177 163.223)",
          "oklch(72% 0.16 50)",
          "oklch(70% 0.18 300)",
          "oklch(80% 0.12 20)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-64">
      <Pie options={options} data={data} />
    </div>
  );
};

export default PieChart;