import { WiThermometer, WiHumidity } from "react-icons/wi";
import { AiOutlineClockCircle, AiOutlineFlag } from "react-icons/ai";
import { formatDistance } from "date-fns";

export default function SensorCard({ temperature, humidity, timestamp }) {
  const timeSinceReading = formatDistance(new Date(timestamp), new Date(), {
    addSuffix: true,
  });

  // Color and severity determination for temperature
  const getTemperatureColor = (temp) => {
    if (temp < 10) return "text-blue-500";
    if (temp < 20) return "text-green-500";
    if (temp < 30) return "text-yellow-500";
    return "text-red-500";
  };

  // Color and severity determination for humidity
  const getHumidityColor = (humid) => {
    if (humid < 30) return "text-orange-500";
    if (humid < 60) return "text-green-500";
    return "text-blue-500";
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2 text-gray-500">
          <AiOutlineClockCircle className="text-gray-400" />
          <span className="text-sm">Reading {timeSinceReading}</span>
        </div>
        <AiOutlineFlag className="text-yellow-500" />
      </div>

      <div className="flex items-center space-x-4">
        <div className="bg-blue-50 rounded-full p-3">
          <WiThermometer
            className={`text-4xl ${getTemperatureColor(temperature)}`}
          />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <WiThermometer
              className={`text-2xl ${getTemperatureColor(temperature)}`}
            />
            <p className="text-gray-800 font-semibold">
              Temperature:
              <span className={`ml-2 ${getTemperatureColor(temperature)}`}>
                {temperature}°C
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <WiHumidity className={`text-2xl ${getHumidityColor(humidity)}`} />
            <p className="text-gray-800 font-semibold">
              Humidity:
              <span className={`ml-2 ${getHumidityColor(humidity)}`}>
                {humidity}%
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Sensor Status Indicators */}
      <div className="mt-4 text-xs text-gray-500 flex justify-between">
        <span>
          Status:
          <span className="ml-2 font-bold text-green-500">Active</span>
        </span>
        <span>
          Signal Strength:
          <span className="ml-2 font-bold text-blue-500">Strong</span>
        </span>
      </div>
    </div>
  );
}
