import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useContext, useEffect, useState } from "react";
import { ITransactionContext } from "@/lib/types";
import { ITEMS_MONTHS, ITEMS_YEARS } from "@/constants/constants";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import TimePeriodDropdown from "./TimePeriodDropdown";
import ValueDropdown from "./ValueDropdown";
import { TransactionContext } from "@/context/TransactionContext";

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
  const [timePeriod, setTimePeriod] = useState("");
  const [value, setValue] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const { chartData, handleGetChartData } = useContext(TransactionContext) as ITransactionContext;

  useEffect(() => {
    setTimePeriod("year");
    setValue(new Date().getFullYear().toString());
  }, []);

  useEffect(() => {
    handleGetChartData(timePeriod, value);
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
      <div className=" mb-8 border-b pb-4 flex justify-between items-center">
        <p className="text-2xl md:text-4xl font-semibold">History</p>
        <div className="w-full flex justify-end gap-4">
          <div className="w-fit">
            <TimePeriodDropdown setTimePeriod={setTimePeriod} timePeriod={timePeriod} />
          </div>
          {timePeriod !== "" && (
            <div className="w-fit">
              <ValueDropdown items={items} setValue={setValue} value={value} />
            </div>
          )}
        </div>
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
