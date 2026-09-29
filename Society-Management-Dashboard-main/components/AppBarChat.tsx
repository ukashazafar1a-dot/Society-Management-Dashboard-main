'use client'
import React from 'react'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

type IncidentChartPoint = {
    month: string;
    open: number;
    resolved: number;
};

const chartConfig = {
    open: {
        label: "Open",
        color: "#2563eb",
    },
    resolved: {
        label: "Resolved",
        color: "#60a5fa",
    },
} satisfies ChartConfig

const fallbackData = [
    { month: "Jan", open: 12, resolved: 8 },
    { month: "Feb", open: 8, resolved: 10 },
    { month: "Mar", open: 5, resolved: 6 },
]

const AppBarChat = ({ data }: { data?: IncidentChartPoint[] }) => {
    const chartData = data && data.length > 0 ? data : fallbackData;

    return (
        <div>
            <h1>Complaint Trends</h1>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} horizontal={true} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    />

                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="open" fill="var(--color-open)" radius={4} />
                    <Bar dataKey="resolved" fill="var(--color-resolved)" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}

export default AppBarChat
