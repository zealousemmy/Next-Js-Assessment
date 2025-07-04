import SentimentChart from "@/components/dashboardComponents/SentimentChart";
import { prisma } from "@/lib/prisma";
// import SentimentChart from '@/components/SentimentChart';
type TrendPoint = {
  date: string;
  [teamName: string]: string | number;
};

function sentimentToScore(s: "HAPPY" | "NEUTRAL" | "SAD"): number {
  return s === "HAPPY" ? 2 : s === "NEUTRAL" ? 1 : 0;
}

// Simulate sentiment trend with small daily noise
function simulateTrend(base: number): number[] {
  return Array.from({ length: 7 }, () => {
    const noise = Math.random() * 0.6 - 0.3; // range [-0.3, +0.3]
    return Math.max(0, Math.min(2, parseFloat((base + noise).toFixed(2))));
  });
}

export default async function TrendsPage() {
  const teams = await prisma.team.findMany({
    include: { members: true },
  });

  const trendData: TrendPoint[] = Array.from({ length: 7 }, (_, i) => ({
    date: `Day ${i + 1}`,
  }));

  for (const team of teams) {
    const sentiments = team.members.map((m) => sentimentToScore(m.sentiment));
    const avg = sentiments.length
      ? sentiments.reduce((a, b) => a + b, 0) / sentiments.length
      : 1;

    const simulated = simulateTrend(avg);

    simulated.forEach((val, idx) => {
      trendData[idx][team.name] = val;
    });
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Sentiment Trends (Past 7 Days)
      </h1>
      <SentimentChart data={trendData} />
    </div>
  );
}
