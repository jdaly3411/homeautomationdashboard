"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { WiThermometer, WiHumidity } from "react-icons/wi";
import { formatDistance } from "date-fns";

const SensorCard = ({ temperature, humidity, timestamp }) => {
  const timeSinceReading = formatDistance(new Date(timestamp), new Date(), {
    addSuffix: true,
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center space-x-4">
      <div className="flex-shrink-0">
        <WiThermometer className="text-4xl text-red-500" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">
          Reading {timeSinceReading}
        </h3>
        <div className="flex items-center space-x-2">
          <WiThermometer className="text-2xl text-red-400" />
          <p className="text-gray-600">Temperature: {temperature}°C</p>
        </div>
        <div className="flex items-center space-x-2">
          <WiHumidity className="text-2xl text-blue-400" />
          <p className="text-gray-600">Humidity: {humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/api/sensor-data/");
        setSensorData(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch sensor data");
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl text-red-500">{error}</h1>
          <p>Please check your backend connection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Home Automation Dashboard
        </h1>

        {isLoading ? (
          <div className="text-center">
            <p className="animate-pulse">Loading sensor data...</p>
          </div>
        ) : (
          <>
            {sensorData.length === 0 ? (
              <div className="text-center text-gray-500">
                No sensor data available
              </div>
            ) : (
              <div>
                {sensorData.map((data, index) => (
                  <SensorCard key={data.id || index} {...data} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
