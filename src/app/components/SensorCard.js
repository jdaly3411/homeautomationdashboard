export default function SensorCard({ temperature, humidity, timestamp }) {
  return (
    <div>
      <h3>Reading at {new Date(timestamp).toLocaleString()}</h3>
      <p>Temperature: {temperature}°C</p>
      <p>Humidity: {humidity}%</p>
    </div>
  );
}
