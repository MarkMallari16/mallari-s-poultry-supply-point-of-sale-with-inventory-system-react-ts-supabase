import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    font: {
                        size: 11
                    },
                    color: '#94a3b8'
                },
                border: {
                    display: false
                }
            },
            y: {
                display: false,
                grid: {
                    display: false
                },
                border: {
                    display: false
                }
            }
        }
    }

    const data = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                label: 'Subscribers',
                data: [15, 25, 45, 80, 30, 40, 50],
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    // Check if chart is ready
                    if (!ctx) return '#e2e8f0';
                    // Simple logic to highlight the highest bar or specific bar as per design
                    return context.dataIndex === 3 ? '#6366f1' : '#f1f5f9';
                },
                hoverBackgroundColor: '#6366f1',
                borderRadius: 8,
                barThickness: 24,
                borderSkipped: false
            }
        ]
    }

    return (
        <div className="w-full h-full">
            <Bar options={options} data={data} />
        </div>
    )
}

export default BarChart