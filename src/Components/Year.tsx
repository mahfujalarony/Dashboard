import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Year: React.FC = () => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const profitData = [50, 60, 45, 70, 55, 80, 65, 75, 60, 85, 70, 90];
  const lossData = [20, 25, 30, 15, 25, 20, 30, 25, 35, 20, 25, 15];
  const salesData = [100, 120, 90, 130, 110, 140, 125, 135, 115, 150, 130, 160];
  const categoryData = [200, 150, 100, 50];
  const categoryLabels = ['Electronics', 'Clothing', 'Food', 'Others'];

  const lineChartData = {
    labels: months,
    datasets: [
      {
        label: 'Profit ($)',
        data: profitData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Loss ($)',
        data: lossData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: months,
    datasets: [
      {
        label: 'Sales ($)',
        data: salesData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: categoryLabels,
    datasets: [
      {
        label: 'Profit by Category ($)',
        data: categoryData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: '' },
    },
    scales: {
      x: { title: { display: true, text: 'Month' } },
      y: { title: { display: true, text: 'Amount ($)' } },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Profit by Category' },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Yearly Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Profit vs Loss</h3>
          <Line
            data={lineChartData}
            options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Profit vs Loss' } } }}
          />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Sales by Month</h3>
          <Bar
            data={barChartData}
            options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Sales by Month' } } }}
          />
        </div>
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium mb-2">Profit by Category</h3>
          <div className="max-w-md mx-auto">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Year;