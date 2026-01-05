import { useState } from "react";
import api from "../libs/api";
import { useQuery } from "@tanstack/react-query";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ReChart1() {
  const [period, setPeriod] = useState("30");
  const [interval, setInterval] = useState("day");

  const { data: teamGrowthData, isLoading } = useQuery({
    queryKey: ['teamGrowth', period, interval],
    queryFn: async () => {
      const response = await api.get(`/api/referral/referrals-chart?period=${period}&interval=${interval}`);
      return response.data;
    },
  });

  // Transform data to cumulative counts
  const chartData = (teamGrowthData?.chartData || []).reduce((acc, item, index) => {
    const prevCount = index > 0 ? acc[index - 1].count : 0;
    acc.push({
      date: item.date,
      count: prevCount + item.count
    });
    return acc;
  }, []);

  return (
    <div className="growth_summary">
      <div className="d-flex team_tp">
        <h4>Team growth</h4>
        <span>Interval
          <select value={interval} onChange={(e) => setInterval(e.target.value)}>
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
          </select>
        </span>

        <span>Last
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="7">7D</option>
            <option value="30">30D</option>
            <option value="90">90D</option>
            <option value="all">ATH</option>
          </select>
        </span>

      </div>
      <div className="summary_data">
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading chart...</div>
        ) : chartData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>No data available</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}