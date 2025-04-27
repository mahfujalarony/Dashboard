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

const Month: React.FC = () => {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const days = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
  const categories = ['Electronics', 'Clothing', 'Accessories', 'Home'];

  const profitData = [200, 250, 180, 220];
  const expenseData = [100, 120, 150, 110];
  const salesData = [
    50, 60, 45, 70, 55, 80, 65, 75, 60, 85,
    70, 90, 55, 60, 75, 80, 65, 70, 85, 90,
    60, 55, 70, 65, 80, 75, 60, 85, 70, 90,
  ];
  const categorySalesData = [300, 200, 150, 100];

  const lineChartData = {
    labels: weeks,
    datasets: [
      {
        label: 'Profit ($)',
        data: profitData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Expenses ($)',
        data: expenseData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: days,
    datasets: [
      {
        label: 'Daily Sales ($)',
        data: salesData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: categories,
    datasets: [
      {
        label: 'Sales by Category ($)',
        data: categorySalesData,
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
      x: { title: { display: true, text: '' } },
      y: { title: { display: true, text: 'Amount ($)' } },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Sales by Category' },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Profit vs Expenses</h3>
          <Line
            data={lineChartData}
            options={{
              ...chartOptions,
              plugins: { ...chartOptions.plugins, title: { display: true, text: 'Profit vs Expenses' } },
              scales: { ...chartOptions.scales, x: { title: { display: true, text: 'Week' } } },
            }}
          />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Daily Sales</h3>
          <Bar
            data={barChartData}
            options={{
              ...chartOptions,
              plugins: { ...chartOptions.plugins, title: { display: true, text: 'Daily Sales' } },
              scales: { ...chartOptions.scales, x: { title: { display: true, text: 'Day' } } },
            }}
          />
        </div>
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium mb-2">Sales by Category</h3>
          <div className="max-w-md mx-auto">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Month;