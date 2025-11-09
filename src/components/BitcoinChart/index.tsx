"use client";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { RiBtcFill } from "react-icons/ri";
import ChartDataType from "@/src/types/ChartDataType";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function BitcoinChart({
  chartData,
}: {
  chartData: ChartDataType[];
}) {
  const lowPrice = Math.min(...chartData.map((data) => data.price));
  const highPrice = Math.max(...chartData.map((data) => data.price));

  const percentChange =
    ((chartData[chartData.length - 1].price -
      chartData[chartData.length - 2].price) /
      chartData[chartData.length - 2].price) *
    100;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full justify-between items-center mb-2">
        <div className="flex gap-2 items-center">
          <RiBtcFill fill="lab(71 33.37 71.55)" className="w-8 h-8" />
          <div className="flex flex-col">
            <span className="font-semibold text-md">Bitcoin</span>
            <span className="text-gray-500 text-sm">BTC</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-semibold text-lg">{`$${chartData[
            chartData.length - 1
          ].price.toLocaleString("en-US")}`}</span>
          <span className={`text-sm ${percentChange > 0 ? "text-green-500" : "text-red-500"}`}>{`${percentChange > 0 ? "+" : ""}${percentChange.toFixed(
            2
          )}%`}</span>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <span className="text-sm text-gray-500">{`Low: $${lowPrice.toLocaleString("en-US")}`}</span>
        <span className="text-sm text-gray-500">{`High: $${highPrice.toLocaleString("en-US")}`}</span>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatDate} fontSize={12} />
          <YAxis
            dataKey="price"
            tickFormatter={(value) => `$${value.toLocaleString("en-US")}`}
            fontSize={12}
          />
          <Tooltip
            formatter={(value: number) => `$${value.toLocaleString("en-US")}`}
            labelFormatter={(label: string) => `Date: ${formatDate(label)}`}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="price"
            name="Price"
            stroke="lab(71 33.37 71.55)"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
