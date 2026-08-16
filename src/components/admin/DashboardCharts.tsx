'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export function ContentBreakdownChart({ data }: { data: { name: string; total: number }[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2f50" vertical={false} />
          <XAxis dataKey="name" stroke="#8199c6" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#8199c6" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: 'rgba(55,192,150,0.08)' }}
            contentStyle={{ background: '#0b1526', border: '1px solid #1f2f50', borderRadius: 12, fontSize: 13 }}
            labelStyle={{ color: '#f7f5ef' }}
          />
          <Bar dataKey="total" fill="#37c096" radius={[6, 6, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
