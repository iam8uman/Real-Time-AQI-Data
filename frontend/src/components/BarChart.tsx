"use client"

import { format } from "date-fns"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function BarChartPage({ sensorData }: any) {
  const keiMap: { [key: number]: string } = {
    0: "Humidity",
    1: "PM 2.5",
    2: "Temperature",
  }

  const chartData = sensorData.map((sensor: any) => ({
    userId: sensor.userId,
    month: keiMap[sensor.kei], // Fix: Access keiMap using square brackets
    value: sensor.valueofKei,
    calibrateValue: sensor.device?.calibrateValue,
  }))

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  // const chartData = [
  //   { month: "January", desktop: pdata.JE, mobile: 80 },
  //   { month: "February", desktop: 305, mobile: 200 },
  //   { month: "March", desktop: 237, mobile: 120 },
  //   { month: "April", desktop: 73, mobile: 190 },
  //   { month: "May", desktop: 209, mobile: 130 },
  //   { month: "June", desktop: 214, mobile: 140 },
  // ]

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>
          Bar Chart - Sensor Data{" "}
          <span
            className="h-10 w-10 rounded-full border border-indigo-500 p-1.5 text-center text-xl text-indigo-500 hover:cursor-vertical-text"
            title="Selected Sensor Data"
          >
            {sensorData.length}
          </span>{" "}
        </CardTitle>
        <CardDescription>
          {format(new Date(), "do MMM, yyyy h:mm a")}
        </CardDescription>{" "}
      </CardHeader>
      <CardContent className="h-full w-full">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="userId" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="value" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
