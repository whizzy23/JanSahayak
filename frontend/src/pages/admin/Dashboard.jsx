import PieChart from '../../components/PieChart';
import { FaChartBar, FaThumbtack, FaHourglassHalf, FaCheckCircle } from 'react-icons/fa';

export default function Dashboard() {
  const mockData = [
    { name: 'Water Supply', value: 25 },
    { name: 'Road Repair', value: 20 },
    { name: 'Electricity', value: 15 },
    { name: 'Sanitation', value: 10 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Admin Dashboard
      </h2>

      {/* Statistics Overview */}
      

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard
        title="Total Issues"
        value="150"
        color="blue"
        icon={<FaChartBar className="text-2xl text-blue-600" />}
      />
      <StatCard
        title="Assigned"
        value="50"
        color="yellow"
        icon={<FaThumbtack className="text-2xl text-yellow-500" />}
      />
      <StatCard
        title="Pending"
        value="30"
        color="red"
        icon={<FaHourglassHalf className="text-2xl text-red-500" />}
      />
      <StatCard
        title="Resolved"
        value="70"
        color="green"
        icon={<FaCheckCircle className="text-2xl text-green-600" />}
      />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
            Issues by Department
          </h3>
          <PieChart data={mockData} />
        </div>

      </section>
    </div>
  );
}

// Reusable Stat Card component
function StatCard({ title, value, color, icon }) {
  const colors = {
    blue: 'text-blue-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    green: 'text-green-600',
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-md font-semibold text-gray-600">{title}</h4>
        <span className="text-xl">{icon}</span>
      </div>
      <p className={`text-4xl font-bold ${colors[color]}`}>{value}</p>
    </div>
  );
}
