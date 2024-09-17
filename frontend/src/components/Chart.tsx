import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { IChartData } from "@/lib/types";
import { getChartData } from "@/api/transactions";
import { MONTH } from "@/constants/constants";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartConfig = {
  expense: {
    label: "Expense",
    color: "#ef4444",
  },
  income: {
    label: "Income",
    color: "#22c55e",
  },
} satisfies ChartConfig;

export function Chart() {
  const [chartData, setChartData] = useState<IChartData[]>([]);

  useEffect(() => {
    getChartData("year", "2024").then((data) => {
      const newChartData: IChartData[] = [];
      data.data.result.map((obj: any) => {
        newChartData.push({ expense: obj.expense, income: obj.income, month: MONTH[obj.month as keyof typeof MONTH] });
      });
      setChartData(newChartData);
    });
  }, []);

  return (
    <div className="px-20 py-10 border w-full">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
          <YAxis axisLine={false} />
          <Bar dataKey="expense" fill="var(--color-expense)" radius={2} />
          <Bar dataKey="income" fill="var(--color-income)" radius={2} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
