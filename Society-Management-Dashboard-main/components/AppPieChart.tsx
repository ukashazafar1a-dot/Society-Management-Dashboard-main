'use client'
import React from 'react'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { Label, Pie, PieChart } from 'recharts'

type DashboardStats = {
  residents?: number;
  communities?: number;
  complaints?: number;
  formSubmissions?: number;
};

const chartConfig = {
  residents: {
    label: "Residents",
    color: "var(--chart-1)",
  },
  communities: {
    label: "Communities",
    color: "var(--chart-2)",
  },
  complaints: {
    label: "Complaints",
    color: "var(--chart-3)",
  },
  forms: {
    label: "Forms",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const AppPieChart = ({ stats }: { stats?: DashboardStats }) => {
  const chartData = [
    { browser: "residents", visitors: stats?.residents || 0, fill: "var(--color-residents)" },
    { browser: "communities", visitors: stats?.communities || 0, fill: "var(--color-communities)" },
    { browser: "complaints", visitors: stats?.complaints || 0, fill: "var(--color-complaints)" },
    { browser: "forms", visitors: stats?.formSubmissions || 0, fill: "var(--color-forms)" },
  ];

  const totalVisitors = chartData.reduce((acc, curr) => acc + curr.visitors, 0)

  return (
    <div>
      <h1>Community Overview</h1>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="browser"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Total Items
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  )
}

export default AppPieChart