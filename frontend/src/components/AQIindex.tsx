import React, { useEffect, useState } from "react"
import { Cell, Pie, PieChart } from "recharts"

const RADIAN = Math.PI / 180
const data = [
  { name: "A", value: 60, color: "green" },
  { name: "B", value: 60, color: "blue" },
  { name: "C", value: 60, color: "#ff0000" },
]
const cx = 300
const cy = 200
const iR = 60
const oR = 200
const initialValue = 50

const needle = (
  value: number,
  data: { name: string; value: number; color: string }[],
  cx: number,
  cy: number,
  iR: number,
  oR: number,
  color: string
) => {
  let total = 0
  data.forEach((v) => {
    total += v.value
  })
  const ang = 180.0 * (1 - value / total)
  const length = (iR + 2 * oR) / 3
  const sin = Math.sin(-RADIAN * ang)
  const cos = Math.cos(-RADIAN * ang)
  const r = 5
  const x0 = cx + 5
  const y0 = cy + 5
  const xba = x0 + r * sin
  const yba = y0 - r * cos
  const xbb = x0 - r * sin
  const ybb = y0 + r * cos
  const xp = x0 + length * cos
  const yp = y0 + length * sin

  return (
    <>
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="none"
        fill={color}
      />
    </>
  )
}

interface Props {
  count: string
}

const AQIindex = ({ count }: Props) => {
  const [clientRendered, setClientRendered] = useState(false)

  useEffect(() => {
    setClientRendered(true)
  }, [])

  if (!clientRendered) {
    return null
  }

  return (
    <PieChart width={600} height={220}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill="#8884d8"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {needle(Number(count), data, cx, cy, iR, oR, "black")}
    </PieChart>
  )
}

export default AQIindex
