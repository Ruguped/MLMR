import { useState, useMemo } from "react";
import api from "../libs/api";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ReChart2() {
  const [period, setPeriod] = useState("30");

  // Auto-set interval: 7D = daily, others = weekly
  const interval = period === "7" ? "day" : "week";

  const { data: commissionData, isLoading } = useQuery({
    queryKey: ['commissionChart', period, interval],
    queryFn: async () => {
      const response = await api.get(`/api/referral/commission-chart?period=${period}&interval=${interval}`);
      return response.data;
    },
  });

  const chartData = commissionData?.chartData || [];
  const totalCommission = chartData.reduce((sum, item) => sum + item.commission, 0);

  // Dynamic bar width - narrower bars when there's less data
  const barMaxWidth = useMemo(() => {
    const count = chartData.length;
    if (count <= 4) return 40;
    if (count <= 7) return 60;
    return undefined; // Let Recharts auto-size
  }, [chartData.length]);

  return (
    <div className="growth_summary">
      <div className="d-flex team_tp">
        <h4>Commission Earned</h4>
        <span>Last
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="7">7D</option>
            <option value="30">30D</option>
            <option value="90">90D</option>
            <option value="all">ATH</option>
          </select>
        </span>
      </div>
      <div className="summary_data" style={{ position: 'relative' }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading chart...</div>
        ) : chartData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>No data available</div>
        ) : (
          <>
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '30px',
              background: 'rgba(0,0,0,0.6)',
              padding: '8px 16px',
              borderRadius: '8px',
              color: '#4ade80',
              fontWeight: 'bold',
              fontSize: '14px',
              zIndex: 10
            }}>
              Total: ${totalCommission.toLocaleString()}
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Commission']}
                  contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#111827' }}
                  labelStyle={{ color: '#374151' }}
                />
                <Bar dataKey="commission" fill="url(#colorCommission)" radius={[4, 4, 0, 0]} maxBarSize={barMaxWidth} />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </div>
  )
}