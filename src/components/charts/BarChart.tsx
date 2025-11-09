import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false
    }
    const data = {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
            { label: 'Sales', data: [120, 150, 180], backgroundColor: 'oklch(76.5% 0.177 163.223)' }
        ]
    }
    return (
        <div className="w-full">
            <Bar options={options} data={data} />
        </div>
    )
}

export default BarChart