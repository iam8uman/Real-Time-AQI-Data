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
  const keiMap: { [key: string]: string } = {
    "0": "PM 2.5",
    "1": "Temperature",
    "2": "Humidity",
  }

  const pdata = sensorData.map((sensor: any) => ({
    name: "user: " + sensor.userId,
    KEY: keiMap[sensor.kei], // Fix: Access keiMap using square brackets
    VALUE: sensor.value,
  }))

  return (
    <div className="w-full p-10">
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={pdata}>
          <CartesianGrid />
          <XAxis dataKey="name" interval={"preserveStartEnd"} />
          <YAxis />
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