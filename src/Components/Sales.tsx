import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type PipelineStatus = {
  leads: number;
  opportunities: number;
  closedDeals: number;
};

type SalesMetrics = {
  totalRevenue: number;
  closedDeals: number;
  averageDealSize: number;
  conversionRate: number;
  pipeline: PipelineStatus;
  monthlySales: number[];
  dealCategories: { category: string; value: number }[];
};

const Sales: React.FC = () => {
  const [metrics, setMetrics] = useState<SalesMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPipeline, setEditingPipeline] = useState<boolean>(false);
  const [pipelineForm, setPipelineForm] = useState<PipelineStatus>({ leads: 0, opportunities: 0, closedDeals: 0 });

  useEffect(() => {
    setIsLoading(true);

    const demoData: SalesMetrics = {
      totalRevenue: 1500000, 
      closedDeals: 25,
      averageDealSize: 60000,
      conversionRate: 20, 
      pipeline: {
        leads: 100,
        opportunities: 50,
        closedDeals: 25,
      },
      monthlySales: [120000, 150000, 180000, 200000, 170000, 190000, 220000, 210000, 230000, 250000, 240000, 260000], // 12 months data
      dealCategories: [
        { category: 'Product', value: 600000 },
        { category: 'Service', value: 400000 },
        { category: 'Consulting', value: 300000 },
        { category: 'Others', value: 200000 },
      ],
    };

    // Simulate API call
    setTimeout(() => {
      setMetrics(demoData);
      setPipelineForm(demoData.pipeline);
      setIsLoading(false);
    }, 1000);

    // For real API usage:
    /*
    axios
      .get('https://your-api.com/sales-metrics')
      .then((res) => {
        setMetrics(res.data);
        setPipelineForm(res.data.pipeline);
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Failed to load sales data. Please try again.');
        setIsLoading(false);
      });
    */
  }, []);

  const handleEditPipeline = () => {
    setEditingPipeline(true);
  };

  const handlePipelineInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPipelineForm({ ...pipelineForm, [e.target.name]: Number(e.target.value) });
  };

  const handleSavePipeline = () => {
    if (metrics) {
      setMetrics({ ...metrics, pipeline: pipelineForm });
      setEditingPipeline(false);
    }
  };

  const handleCancelPipeline = () => {
    if (metrics) {
      setPipelineForm(metrics.pipeline);
      setEditingPipeline(false);
    }
  };

  const monthlySalesChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Monthly Sales ($)',
        data: metrics?.monthlySales || [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const dealCategoriesChartData = {
    labels: metrics?.dealCategories.map((cat) => cat.category) || [],
    datasets: [
      {
        label: 'Deal Categories',
        data: metrics?.dealCategories.map((cat) => cat.value) || [],
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
      y: { title: { display: true, text: 'Sales ($)' } },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Sales Dashboard</h1>

      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : isLoading ? (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-24 bg-gray-300 rounded animate-pulse"></div>
            ))}
          </div>
      
          <div className="h-40 bg-gray-300 rounded animate-pulse"></div>
       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-64 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-64 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      ) : metrics ? (
        <div className="space-y-8">
        
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-100 rounded-lg shadow transform transition duration-300 hover:scale-105">
              <h3 className="text-lg font-semibold">Total Sales Revenue</h3>
              <p className="text-2xl font-bold">${metrics.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow transform transition duration-300 hover:scale-105">
              <h3 className="text-lg font-semibold">Closed Deals</h3>
              <p className="text-2xl font-bold">{metrics.closedDeals}</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg shadow transform transition duration-300 hover:scale-105">
              <h3 className="text-lg font-semibold">Average Deal Size</h3>
              <p className="text-2xl font-bold">${metrics.averageDealSize.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-lg shadow transform transition duration-300 hover:scale-105">
              <h3 className="text-lg font-semibold">Lead Conversion Rate</h3>
              <p className="text-2xl font-bold">{metrics.conversionRate}%</p>
            </div>
          </div>

        
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Sales Pipeline Status</h2>
              <button
                onClick={handleEditPipeline}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Pipeline
              </button>
            </div>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-3 text-left">Stage</th>
                  <th className="border border-gray-300 p-3 text-left">Count</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">Leads</td>
                  <td className="border border-gray-300 p-3">{metrics.pipeline.leads}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">Opportunities</td>
                  <td className="border border-gray-300 p-3">{metrics.pipeline.opportunities}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">Closed Deals</td>
                  <td className="border border-gray-300 p-3">{metrics.pipeline.closedDeals}</td>
                </tr>
              </tbody>
            </table>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Monthly Sales Trend</h2>
              <div className="bg-white p-4 rounded-lg shadow">
                <Line
                  data={monthlySalesChartData}
                  options={{
                    ...chartOptions,
                    plugins: { ...chartOptions.plugins, title: { display: true, text: 'Monthly Sales Trend' } },
                  }}
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Deal Categories</h2>
              <div className="bg-white p-4 rounded-lg shadow max-w-md mx-auto">
                <Pie
                  data={dealCategoriesChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' as const },
                      title: { display: true, text: 'Deal Categories' },
                    },
                  }}
                />
              </div>
            </div>
          </div>

         
          {editingPipeline && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-medium mb-4">Edit Pipeline Status</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Leads</label>
                    <input
                      type="number"
                      name="leads"
                      value={pipelineForm.leads}
                      onChange={handlePipelineInputChange}
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Opportunities</label>
                    <input
                      type="number"
                      name="opportunities"
                      value={pipelineForm.opportunities}
                      onChange={handlePipelineInputChange}
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Closed Deals</label>
                    <input
                      type="number"
                      name="closedDeals"
                      value={pipelineForm.closedDeals}
                      onChange={handlePipelineInputChange}
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                </div>
                <div className="mt-4 flex space-x-2 justify-end">
                  <button
                    onClick={handleSavePipeline}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelPipeline}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Sales;