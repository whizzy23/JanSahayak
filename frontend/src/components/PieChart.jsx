import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#0088FE', 
  '#00C49F', 
  '#FFBB28', 
  '#FF8042', 
  '#A28EFF', 
  '#FF5C8A', 
  '#4CAF50', 
  '#FFC107', 
  '#9C27B0', 
  '#03A9F4', 
  '#FF5722', 
  '#607D8B', 
  '#795548', 
  '#E91E63', 
  '#8BC34A', 
];


export default function PieChart({ data }) {
  const safeData = Array.isArray(data)
  ? data
  : data && typeof data === 'object'
  ? Object.entries(data).map(([name, value]) => ({ name, value }))
  : [];
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <RechartsPieChart>
          <Pie
            data={safeData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {safeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ fontSize: '14px' }} />
          <Legend verticalAlign="bottom" iconType="circle" />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
