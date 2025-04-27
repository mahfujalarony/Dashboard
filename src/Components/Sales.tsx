import React, { useEffect, useState } from 'react';
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
  const [editingPipeline, setEditingPipeline] = useState<boolean>(false);
  const [pipelineForm, setPipelineForm] = useState<PipelineStatus>({ 
    leads: 0, 
    opportunities: 0, 
    closedDeals: 0 
  });

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
      monthlySales: [120000, 150000, 180000, 200000, 170000, 190000, 220000, 210000, 230000, 250000, 240000, 260000],
      dealCategories: [
        { category: 'Product', value: 600000 },
        { category: 'Service', value: 400000 },
        { category: 'Consulting', value: 300000 },
        { category: 'Others', value: 200000 },
      ],
    };

    setTimeout(() => {
      setMetrics(demoData);
      setPipelineForm(demoData.pipeline);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleEditPipeline = () => {
    setEditingPipeline(true);
  };

  const handlePipelineInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPipelineForm({ 
      ...pipelineForm, 
      [e.target.name]: Number(e.target.value) 
    });
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
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-24 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ) : metrics ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-800">Total Revenue</h3>
              <p className="text-2xl font-bold text-blue-600">${metrics.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h3 className="text-lg font-semibold text-green-800">Closed Deals</h3>
              <p className="text-2xl font-bold text-green-600">{metrics.closedDeals}</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h3 className="text-lg font-semibold text-amber-800">Avg Deal Size</h3>
              <p className="text-2xl font-bold text-amber-600">${metrics.averageDealSize.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h3 className="text-lg font-semibold text-purple-800">Conversion Rate</h3>
              <p className="text-2xl font-bold text-purple-600">{metrics.conversionRate}%</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Sales Pipeline</h2>
              <button
                onClick={handleEditPipeline}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Edit Pipeline
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded border border-gray-200">
                <h3 className="text-gray-500 font-medium">Leads</h3>
                <p className="text-2xl font-bold">{metrics.pipeline.leads}</p>
              </div>
              <div className="bg-white p-4 rounded border border-gray-200">
                <h3 className="text-gray-500 font-medium">Opportunities</h3>
                <p className="text-2xl font-bold">{metrics.pipeline.opportunities}</p>
              </div>
              <div className="bg-white p-4 rounded border border-gray-200">
                <h3 className="text-gray-500 font-medium">Closed Deals</h3>
                <p className="text-2xl font-bold">{metrics.pipeline.closedDeals}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
              <Line data={monthlySalesChartData} options={chartOptions} />
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Revenue by Category</h2>
              <Pie data={dealCategoriesChartData} />
            </div>
          </div>

          {editingPipeline && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-medium mb-4">Edit Pipeline</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Leads</label>
                    <input
                      type="number"
                      name="leads"
                      value={pipelineForm.leads}
                      onChange={handlePipelineInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Opportunities</label>
                    <input
                      type="number"
                      name="opportunities"
                      value={pipelineForm.opportunities}
                      onChange={handlePipelineInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Closed Deals</label>
                    <input
                      type="number"
                      name="closedDeals"
                      value={pipelineForm.closedDeals}
                      onChange={handlePipelineInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={handleCancelPipeline}
                    className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePipeline}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
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