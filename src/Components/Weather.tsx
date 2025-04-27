import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    weather_code: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}


const LOCATIONS: Location[] = [
  { name: 'Dhaka', latitude: 23.8103, longitude: 90.4125, timezone: 'Asia/Dhaka' },
  { name: 'London', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London' },
  { name: 'New York', latitude: 40.7128, longitude: -74.0060, timezone: 'America/New_York' },
  { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo' },
];

const WEATHER_DESCRIPTIONS: Record<number, string> = {
  0: 'Clear sky',
  1: 'Partly cloudy',
  2: 'Partly cloudy',
  3: 'Partly cloudy',
  45: 'Fog',
  48: 'Fog',
  61: 'Light rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  80: 'Light showers',
  81: 'Moderate showers',
  82: 'Heavy showers',
};

const WeatherDashboard: React.FC = () => {

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>(LOCATIONS[0]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation.latitude}&longitude=${selectedLocation.longitude}&current=temperature_2m,weather_code&hourly=temperature_2m&timezone=${selectedLocation.timezone}`
        );
        
        if (!response.ok) {
          throw new Error('Weather data unavailable');
        }
        
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedLocation]);


  const getWeatherDescription = (code: number): string => {
    return WEATHER_DESCRIPTIONS[code] || 'Unknown weather condition';
  };

  const getWeatherIcon = (code: number): string => {
  
    if (code === 0) return '☀️';
    if (code >= 1 && code <= 3) return '⛅';
    if (code >= 45 && code <= 48) return '🌫️';
    if (code >= 61 && code <= 65) return '🌧️';
    if (code >= 71 && code <= 75) return '❄️';
    if (code >= 80 && code <= 82) return '🌦️';
    return '🌈';
  };


  const chartData = {
    labels: weather?.hourly.time.slice(0, 24).map(time => 
      new Date(time).toLocaleTimeString([], { hour: '2-digit' })
    ),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weather?.hourly.temperature_2m.slice(0, 24),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkipPadding: 20,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col space-y-6">
     
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Weather Dashboard</h1>
          
     
          <div className="relative">
            <select
              value={selectedLocation.name}
              onChange={(e) => {
                const newLocation = LOCATIONS.find(loc => loc.name === e.target.value);
                if (newLocation) setSelectedLocation(newLocation);
              }}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>


        {weather && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{selectedLocation.name}</h2>
                <p className="text-gray-600">
                  {new Date(weather.current.time).toLocaleDateString([], {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="text-right">
                <span className="text-5xl font-bold text-gray-800">
                  {Math.round(weather.current.temperature_2m)}°C
                </span>
                <div className="flex items-center justify-end mt-1">
                  <span className="text-3xl mr-2">{getWeatherIcon(weather.current.weather_code)}</span>
                  <span className="text-gray-600">
                    {getWeatherDescription(weather.current.weather_code)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}


        {weather && (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">24-Hour Temperature Forecast</h3>
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        )}

   
        <div className="text-center text-sm text-gray-500">
          <p>Data provided by Open-Meteo Weather API</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;