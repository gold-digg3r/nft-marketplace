"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RarityDistribution } from "@/types/nft"

interface RarityDistributionChartProps {
  data: RarityDistribution[]
  themeColor: string
}

export function RarityDistributionChart({ data, themeColor }: RarityDistributionChartProps) {
  // Define colors for different rarity levels
  const RARITY_COLORS = {
    Common: "#9CA3AF", // Gray
    Uncommon: "#10B981", // Green
    Rare: "#3B82F6", // Blue
    Epic: "#8B5CF6", // Purple
    Legendary: "#F59E0B", // Amber
    Mythic: "#EF4444", // Red
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-black/90 border border-gray-700 p-3 rounded-md">
          <p className="text-white font-medium">{data.rarity}</p>
          <p className="text-gold">
            {data.count} items ({data.percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-black/40 border-gold/20">
      <CardHeader>
        <CardTitle className="text-white text-lg">Rarity Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill={themeColor}
                dataKey="percentage"
                nameKey="rarity"
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.rarity}
                    fill={RARITY_COLORS[entry.rarity as keyof typeof RARITY_COLORS] || themeColor}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value) => <span className="text-gray-300">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
