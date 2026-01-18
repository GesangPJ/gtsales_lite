// Chart untuk Top Kategori

"use client"

import {Bar,BarChart, XAxis, YAxis, Cell, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

interface TopKategoriItem {
  kategori: string
  nilai: number
}

interface LaporanSummary {
  topKategori: Array<[string, number]>
}

export default function ChartTopKategori({ laporan }: { laporan: LaporanSummary }) {

    const barColors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#f97316', '#ec4899', '#14b8a6'
    ]

  const chartData: TopKategoriItem[] = laporan.topKategori.map(
    ([kategori, nilai]: [string, number], index: number) => ({
      kategori,
      nilai
    })
  )

  // Dynamic chartConfig dari data
  const chartConfig: ChartConfig = chartData.reduce(
    (acc: Record<string, any>, { kategori }: { kategori: string }, index: number) => {
      const colorIndex = (index % 9) + 1  // Cycle --chart-1 to --chart-9
      return {
        ...acc,
        [kategori.toLowerCase()]: {
          label: kategori,
        //   color: `hsl(var(--chart-${colorIndex}))`
        // color: hexColors[index % hexColors.length]
        }
      }
    },
    {}
  )

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Kategori Terjual (Rp)</CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center text-muted-foreground">
          Belum ada data
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-3">
      <CardHeader>
        <CardTitle className="warp-break-words text-center text-xl font-bold">Top 5 Kategori Terjual (Rp)</CardTitle>
      </CardHeader>
      <CardContent className="pl-2 space-y-4">
        <ChartContainer 
          config={chartConfig} 
          className={cn("h-62.5 w-full aspect-square lg:aspect-3/2")}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="kategori"
              tickLine={false}
              tickMargin={10}
              axisLine={{ strokeWidth: 1 }}
              tickFormatter={(value: string) => value.slice(0, 12)}
              className="text-xs"
            />
            <YAxis 
              tickLine={false} 
              axisLine={{ strokeWidth: 1 }}
              className="text-xs"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="nilai" radius={[4, 4, 0, 0]} maxBarSize={62}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={barColors[index % barColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
        
        {/* Tambah keterangan / nama kategori */}
        <div className="flex flex-wrap gap-2 justify-center text-xs">
          {chartData.slice(0, 3).map(({ kategori }) => (
            <span key={kategori} className="font-medium capitalize">
              {kategori}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}




