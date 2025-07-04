"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: any[];
};

export default function SentimentChart({ data }: Props) {
  const keys = Object.keys(data[0]).filter((k) => k !== "date");

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 2]} ticks={[0, 1, 2]} />
          <Tooltip />
          <Legend />
          {keys.map((team, i) => (
            <Line
              key={team}
              type="monotone"
              dataKey={team}
              stroke={["#8884d8", "#82ca9d", "#ff7300", "#FF00FF"][i % 4]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
