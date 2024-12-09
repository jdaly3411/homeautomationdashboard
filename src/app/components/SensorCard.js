import { motion } from "framer-motion";
import { WiThermometer, WiHumidity } from "react-icons/wi";
import { AiOutlineClockCircle, AiOutlineFlag } from "react-icons/ai";
import { formatDistance } from "date-fns";

export default function SensorCard({ temperature, humidity, timestamp }) {
  const timeSinceReading = formatDistance(new Date(timestamp), new Date(), {
    addSuffix: true,
  });

  // Color and severity determination for temperature
  const getTemperatureColor = (temp) => {
    if (temp < 10)
      return { bg: "from-blue-300 to-blue-500", text: "text-blue-700" };
    if (temp < 20)
      return { bg: "from-green-300 to-green-500", text: "text-green-700" };
    if (temp < 30)
      return { bg: "from-yellow-300 to-yellow-500", text: "text-yellow-700" };
    return { bg: "from-red-300 to-red-500", text: "text-red-700" };
  };

  // Color and severity determination for humidity
  const getHumidityColor = (humid) => {
    if (humid < 30)
      return { bg: "from-orange-300 to-orange-500", text: "text-orange-700" };
    if (humid < 60)
      return { bg: "from-green-300 to-green-500", text: "text-green-700" };
    return { bg: "from-blue-300 to-blue-500", text: "text-blue-700" };
  };

  const tempColors = getTemperatureColor(temperature);
  const humidColors = getHumidityColor(humidity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card hover-lift p-6 space-y-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-[var(--text-secondary)]">
          <AiOutlineClockCircle className="text-purple-500" />
          <span className="text-sm">Reading {timeSinceReading}</span>
        </div>
        <AiOutlineFlag className="text-purple-500" />
      </div>

      {/* Sensor Readings */}
      <div className="flex items-center space-x-4">
        {/* Temperature Section */}
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <motion.div
              className={`rounded-full p-3 bg-gradient-to-br ${tempColors.bg}`}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              <WiThermometer className="text-3xl text-white" />
            </motion.div>
            <div>
              <p className={`text-xl font-bold ${tempColors.text}`}>
                {temperature}°C
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                Temperature
              </p>
            </div>
          </div>
        </div>

        {/* Humidity Section */}
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <motion.div
              className={`rounded-full p-3 bg-gradient-to-br ${humidColors.bg}`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              <WiHumidity className="text-3xl text-white" />
            </motion.div>
            <div>
              <p className={`text-xl font-bold ${humidColors.text}`}>
                {humidity}%
              </p>
              <p className="text-sm text-[var(--text-secondary)]">Humidity</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="flex justify-between text-sm text-[var(--text-secondary)]">
        <div>
          Status: <span className="text-green-600 font-semibold">Active</span>
        </div>
        <div>
          Signal: <span className="text-purple-600 font-semibold">Strong</span>
        </div>
      </div>
    </motion.div>
  );
}
