"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SensorCard from "./components/SensorCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiFillWarning,
  AiOutlineReload,
  AiFillPlusCircle,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineGithub,
} from "react-icons/ai";

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] 
        bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 
        animate-[spin_40s_linear_infinite]"
      ></div>
      <div
        className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] 
        bg-gradient-to-l from-green-400/20 via-teal-500/20 to-blue-600/20 
        animate-[spinReverse_50s_linear_infinite]"
      ></div>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-40"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-bold text-2xl">
            HomeSync
          </div>
        </div>
        <nav className="flex items-center space-x-6">
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            <AiOutlineHome className="mr-2" /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            <AiOutlineSetting className="mr-2" /> Settings
          </a>
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            <AiOutlineUser className="mr-2" /> Profile
          </a>
        </nav>
      </div>
    </motion.header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-md shadow-md fixed bottom-0 left-0 right-0 z-40"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-gray-500 text-sm">
          © 2024 HomeSync. All rights reserved.
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/jdaly3411/Home-Automation-Dashboard"
            className="text-gray-700 hover:text-blue-600 transition"
            title="GitHub Repository"
          >
            <AiOutlineGithub className="text-2xl" />
          </a>
          <div className="text-gray-400">|</div>
          <div className="text-sm text-gray-500">Version 1.0.0</div>
        </div>
      </div>
    </motion.footer>
  );
};

export default function Dashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

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

  if (error) {
    return (
      <>
        <AnimatedBackground />
        <Header />
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white/80 backdrop-blur-md shadow-2xl rounded-xl p-8 max-w-md w-full"
          >
            <AiFillWarning className="mx-auto mb-4 text-red-500 text-5xl" />
            <h1 className="text-2xl text-red-600 font-bold mb-2">{error}</h1>
            <p className="text-gray-600">
              Please check your backend connection
            </p>
            <button
              onClick={fetchData}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center mx-auto"
            >
              <AiOutlineReload className="mr-2" /> Retry Connection
            </button>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AnimatedBackground />
      <Header />
      <div className="min-h-screen pt-20 pb-20 relative z-10 bg-transparent">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-center mb-10 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Home Automation Dashboard
          </motion.h1>

          {/* Last Updated Indicator */}
          {lastUpdated && (
            <div className="text-center text-gray-500 mb-4 flex justify-center items-center">
              <AiOutlineReload className="mr-2 text-blue-500" />
              <span>Last updated: {lastUpdated.toLocaleString()}</span>
            </div>
          )}

          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="animate-pulse text-gray-600">
                Loading sensor data...
              </div>
            </motion.div>
          ) : (
            <>
              {sensorData.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center bg-white/80 backdrop-blur-md shadow-md rounded-xl p-8"
                >
                  <AiFillPlusCircle className="mx-auto mb-4 text-blue-500 text-5xl" />
                  <p className="text-gray-500">No sensor data available</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Connect your sensors or check your backend configuration
                  </p>
                </motion.div>
              ) : (
                <AnimatePresence>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sensorData.map((data, index) => (
                      <motion.div
                        key={data.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <SensorCard
                          temperature={data.temperature}
                          humidity={data.humidity}
                          timestamp={data.timestamp}
                        />
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </>
          )}

          {/* Future Expansion Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 text-center"
          >
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6 max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Coming Soon: Advanced Controls
              </h2>
              <p className="text-gray-600 mb-4">
                Get ready for new features including servo motor controls,
                advanced sensor management, and real-time device interactions.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Explore Roadmap
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                  Contact Support
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
