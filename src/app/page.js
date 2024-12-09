"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiOutlineReload,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineGithub,
} from "react-icons/ai";
import { SunIcon, MoonIcon } from "lucide-react";
import AnimatedBackground from "./components/AnimatedBackgroud";

// Header Component
const Header = ({ toggleTheme, isDarkMode }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-gray-900/50 shadow-2xl"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold text-2xl">
            HomeSync
          </div>
          <nav className="flex items-center space-x-4 ml-6">
            <NavItem icon={<AiOutlineHome />} label="Dashboard" active />
            <NavItem icon={<AiOutlineSetting />} label="Settings" />
            <NavItem icon={<AiOutlineUser />} label="Profile" />
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            className="text-purple-300 hover:bg-purple-800/30 p-2 rounded-full transition-colors"
          >
            {isDarkMode ? (
              <SunIcon className="text-2xl" />
            ) : (
              <MoonIcon className="text-2xl" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-purple-300 hover:bg-purple-800/30 p-2 rounded-full transition-colors"
          >
            <AiOutlineReload className="text-2xl" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

// Navigation Item Component
const NavItem = ({ icon, label, active = false }) => (
  <a
    href="#"
    className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all ${
      active
        ? "bg-gradient-to-r from-purple-700/30 to-pink-700/30 text-purple-200"
        : "hover:bg-gray-800 text-gray-400"
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </a>
);

// Footer Component
const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-gray-900/50 shadow-2xl"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-gray-400 text-sm">
          © 2024 HomeSync. All rights reserved.
        </div>
        <div className="flex items-center space-x-4">
          <motion.a
            href="https://github.com/jdaly3411/Home-Automation-Dashboard"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="text-purple-300 hover:bg-purple-800/30 p-2 rounded-full transition-colors"
          >
            <AiOutlineGithub className="text-2xl" />
          </motion.a>
          <div className="text-gray-600">|</div>
          <div className="text-sm text-gray-400">Version 1.0.0</div>
        </div>
      </div>
    </motion.footer>
  );
};

// Sensor Card Component
const SensorCard = ({ temperature, humidity, timestamp, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.1,
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-700/50 hover:border-purple-500/50 transform transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Sensor Data
        </div>
        <span className="text-xs text-gray-400">
          {new Date(timestamp).toLocaleString()}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-400">
            {temperature.toFixed(1)}°
          </div>
          <div className="text-xs text-gray-400 mt-1">Temperature</div>
        </div>
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-green-400">
            {humidity.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400 mt-1">Humidity</div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Dashboard Component
export default function Dashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(newTheme);

    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(savedTheme);
    } else {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDarkMode);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(
        prefersDarkMode ? "dark" : "light"
      );
    }
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/api/sensor-data/");
      setSensorData(res.data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError("Failed to fetch sensor data");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Refresh every minute
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`min-h-screen`}>
      <AnimatedBackground />
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div className="min-h-screen pt-20 pb-20 relative z-10 bg-transparent">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Home Automation Dashboard
          </motion.h1>

          {lastUpdated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 mb-4 flex justify-center items-center"
            >
              <AiOutlineReload className="mr-2 text-blue-500 animate-spin" />
              <span>Last updated: {lastUpdated.toLocaleString()}</span>
            </motion.div>
          )}

          {isLoading ? (
            <div className="text-center text-gray-400 animate-pulse">
              Loading sensor data...
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <AnimatePresence>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sensorData.map((data, index) => (
                  <SensorCard
                    key={index}
                    temperature={data.temperature}
                    humidity={data.humidity}
                    timestamp={data.timestamp}
                    index={index}
                  />
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
