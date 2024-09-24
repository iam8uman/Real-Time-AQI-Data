import { AreaChart } from "lucide-react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

function LineChartComponent({ sensorData }: any) {
  const keiMap: { [key: number]: string } = {
    "0": "PM 2.5",
    "1": "Temperature",
    "2": "Humidity",
  }

  const pdata = sensorData.map((sensor: any) => ({
    name: "user: " + sensor.userId,
    KEY: keiMap[sensor.kei], // Fix: Access keiMap using square brackets
    VALUE: sensor.valueofKei,
  }))

  return (
    <div className="w-full p-10">
      <h2 className="m-6 flex items-center gap-4 text-3xl font-extrabold tracking-tight text-gray-900  dark:text-white sm:text-4xl">
        Sensor Data
        <AreaChart size={32} color="black" />
        <span
          className="h-10 w-10 rounded-full border border-indigo-500 p-1.5 text-center text-xl text-indigo-500 hover:cursor-vertical-text"
          title="Selected Sensor Data"
        >
          {sensorData.length}
        </span>
      </h2>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={pdata}>
          <CartesianGrid />
          <XAxis dataKey="name" interval={"preserveStartEnd"} />
          <YAxis></YAxis>
          <Legend />
          <Tooltip />
          <Line dataKey="KEY" stroke="red" activeDot={{ r: 10 }} />
          <Line dataKey="VALUE" stroke="green" activeDot={{ r: 16 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChartComponent
