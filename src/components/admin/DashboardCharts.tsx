'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export function ContentBreakdownChart({ data }: { data: { name: string; total: number }[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e4573" vertical={false} />
          <XAxis dataKey="name" stroke="#7099c2" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#7099c2" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: 'rgba(91,154,160,0.1)' }}
            contentStyle={{ background: '#15335e', border: '1px solid #1e4573', borderRadius: 12, fontSize: 13 }}
            labelStyle={{ color: '#ffffff' }}
          />
          <Bar dataKey="total" fill="#5b9aa0" radius={[6, 6, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
