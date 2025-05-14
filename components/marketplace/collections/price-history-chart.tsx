"use client"

import { useState } from "react"
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Bar, BarChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PriceHistoryPoint } from "@/types/nft"

interface PriceHistoryChartProps {
  data: PriceHistoryPoint[]
  themeColor: string
}

export function PriceHistoryChart({ data, themeColor }: PriceHistoryChartProps) {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "all">("30d")
  const [chartType, setChartType] = useState<"price" | "volume">("price")

  // Filter data based on selected time range
  const filteredData = (() => {
    if (timeRange === "7d") {
      return data.slice(-7)
    } else if (timeRange === "30d") {
      return data.slice(-30)
    }
    return data
  })()

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-gray-700 p-3 rounded-md">
          <p className="text-white font-medium">{formatDate(label)}</p>
          {chartType === "price" ? (
            <p className="text-gold">{payload[0].value.toFixed(2)} SOL</p>
          ) : (
            <p className="text-gold">{payload[0].value} trades</p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-black/40 border-gold/20">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white text-lg">Price History</CardTitle>
          <div className="flex gap-2">
            <Tabs defaultValue="price" onValueChange={(value) => setChartType(value as "price" | "volume")}>
              <TabsList className="bg-black/60 border border-gray-800">
                <TabsTrigger value="price" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
                  Price
                </TabsTrigger>
                <TabsTrigger value="volume" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
                  Volume
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs defaultValue="30d" onValueChange={(value) => setTimeRange(value as "7d" | "30d" | "all")}>
              <TabsList className="bg-black/60 border border-gray-800">
                <TabsTrigger value="7d" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
                  7D
                </TabsTrigger>
                <TabsTrigger value="30d" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
                  30D
                </TabsTrigger>
                <TabsTrigger value="all" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
                  All
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "price" ? (
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" tickFormatter={formatDate} stroke="#666" tick={{ fill: "#999" }} />
                <YAxis
                  stroke="#666"
                  tick={{ fill: "#999" }}
                  domain={["auto", "auto"]}
                  tickFormatter={(value) => `${value.toFixed(1)}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={themeColor}
                  strokeWidth={2}
                  dot={{ fill: themeColor, r: 4 }}
                  activeDot={{ r: 6, fill: themeColor }}
                />
              </LineChart>
            ) : (
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" tickFormatter={formatDate} stroke="#666" tick={{ fill: "#999" }} />
                <YAxis stroke="#666" tick={{ fill: "#999" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="volume" fill={themeColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
