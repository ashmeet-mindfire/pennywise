import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useContext, useEffect, useState } from "react";
import { IChartData, IUserContext } from "@/lib/types";
import { getChartData } from "@/api/transactions";
import { ITEMS_MONTHS, ITEMS_YEARS, MONTH } from "@/constants/constants";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { UserContext } from "@/context/userContext";
import TimePeriodDropdown from "./TimePeriodDropdown";
import ValueDropdown from "./ValueDropdown";

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
  const [timePeriod, setTimePeriod] = useState("");
  const [value, setValue] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const { user } = useContext(UserContext) as IUserContext;

  useEffect(() => {
    setTimePeriod("year");
    setValue(new Date().getFullYear().toString());
  }, []);

  useEffect(() => {
    getChartData(timePeriod, value, user?.id as string).then((data) => {
      const newChartData: IChartData[] = [];
      if (timePeriod === "year") {
        data.data.result.map((obj: any) => {
          newChartData.push({ expense: obj.expense, income: obj.income, xAxisValue: MONTH[obj.month as keyof typeof MONTH] });
        });
      }

      if (timePeriod === "month") {
        data.data.result.map((obj: any) => {
          newChartData.push({ expense: obj.expense, income: obj.income, xAxisValue: obj.date.toString() });
        });
      }
      setChartData(newChartData);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (timePeriod === "year") {
      setItems(ITEMS_YEARS);
      setValue(new Date().getFullYear().toString());
    }
    if (timePeriod === "month") {
      setItems(ITEMS_MONTHS);
      setValue("jan");
    }
  }, [timePeriod]);

  return (
    <div className="w-full">
      <p className="text-4xl font-semibold mb-8">History</p>
      <div className="w-full flex justify-end gap-4 mb-4">
        <div className="w-fit">
          <TimePeriodDropdown setTimePeriod={setTimePeriod} timePeriod={timePeriod} />
        </div>
        {timePeriod !== "" && (
          <div className="w-fit">
            <ValueDropdown items={items} setValue={setValue} value={value} />
          </div>
        )}
      </div>
      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <XAxis
            dataKey="xAxisValue"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis axisLine={false} />
          <Bar dataKey="expense" fill="var(--color-expense)" radius={2} />
          <Bar dataKey="income" fill="var(--color-income)" radius={2} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
