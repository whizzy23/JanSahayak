import { useEffect, useState } from 'react';
import { fetchIssueStats } from '../../services/issueService'
import axios from 'axios';
import PageLoader from '../../components/Loader';
import PieChart from '../../components/PieChart';
import BarChart from '../../components/BarChart';
import { FaChartBar, FaThumbtack, FaHourglassHalf, FaCheckCircle, FaExclamationTriangle, FaLock } from 'react-icons/fa';
import { ClipboardList, UserCheck, Clock, CheckCircle, XCircle, Archive, AlertTriangle, BarChart2, MapPin } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [hoveredStat, setHoveredStat] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchIssueStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError('Something went wrong while fetching stats.');
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  if (loading) return <PageLoader />;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  // Sample data for the trend graph - replace with actual data from your API
  const trendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Issues',
        data: [12, 19, 15, 25, 22, 30, 28],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Resolved Issues',
        data: [8, 15, 12, 18, 20, 25, 22],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Sample data for centers across states - replace with actual data from your API
  const centersData = {
    "Andhra Pradesh": { value: 2, color: "#4F46E5" },
    "Arunachal Pradesh": { value: 1, color: "#4F46E5" },
    "Assam": { value: 2, color: "#4F46E5" },
    "Bihar": { value: 3, color: "#4F46E5" },
    "Chhattisgarh": { value: 2, color: "#4F46E5" },
    "Delhi": { value: 2, color: "#4F46E5" },
    "Goa": { value: 1, color: "#4F46E5" },
    "Gujarat": { value: 3, color: "#4F46E5" },
    "Haryana": { value: 2, color: "#4F46E5" },
    "Himachal Pradesh": { value: 1, color: "#4F46E5" },
    "Jharkhand": { value: 2, color: "#4F46E5" },
    "Karnataka": { value: 3, color: "#4F46E5" },
    "Kerala": { value: 2, color: "#4F46E5" },
    "Madhya Pradesh": { value: 2, color: "#4F46E5" },
    "Maharashtra": { value: 5, color: "#4F46E5" },
    "Manipur": { value: 1, color: "#4F46E5" },
    "Meghalaya": { value: 1, color: "#4F46E5" },
    "Mizoram": { value: 1, color: "#4F46E5" },
    "Nagaland": { value: 1, color: "#4F46E5" },
    "Odisha": { value: 2, color: "#4F46E5" },
    "Punjab": { value: 2, color: "#4F46E5" },
    "Rajasthan": { value: 2, color: "#4F46E5" },
    "Sikkim": { value: 1, color: "#4F46E5" },
    "Tamil Nadu": { value: 3, color: "#4F46E5" },
    "Telangana": { value: 2, color: "#4F46E5" },
    "Tripura": { value: 1, color: "#4F46E5" },
    "Uttar Pradesh": { value: 4, color: "#4F46E5" },
    "Uttarakhand": { value: 1, color: "#4F46E5" },
    "West Bengal": { value: 2, color: "#4F46E5" }
  };

  // Custom positions for states
  const statePositions = {
    "Andhra Pradesh": { x: 550, y: 450 },
    "Arunachal Pradesh": { x: 650, y: 200 },
    "Assam": { x: 600, y: 250 },
    "Bihar": { x: 550, y: 300 },
    "Chhattisgarh": { x: 500, y: 400 },
    "Delhi": { x: 450, y: 300 },
    "Goa": { x: 400, y: 450 },
    "Gujarat": { x: 350, y: 350 },
    "Haryana": { x: 450, y: 280 },
    "Himachal Pradesh": { x: 450, y: 200 },
    "Jharkhand": { x: 550, y: 350 },
    "Karnataka": { x: 450, y: 450 },
    "Kerala": { x: 400, y: 500 },
    "Madhya Pradesh": { x: 450, y: 350 },
    "Maharashtra": { x: 400, y: 400 },
    "Manipur": { x: 650, y: 300 },
    "Meghalaya": { x: 600, y: 280 },
    "Mizoram": { x: 650, y: 350 },
    "Nagaland": { x: 650, y: 250 },
    "Odisha": { x: 550, y: 380 },
    "Punjab": { x: 450, y: 250 },
    "Rajasthan": { x: 400, y: 300 },
    "Sikkim": { x: 600, y: 220 },
    "Tamil Nadu": { x: 450, y: 500 },
    "Telangana": { x: 500, y: 400 },
    "Tripura": { x: 650, y: 320 },
    "Uttar Pradesh": { x: 500, y: 300 },
    "Uttarakhand": { x: 500, y: 250 },
    "West Bengal": { x: 600, y: 320 }
  };

  // Sample data for urgency levels - replace with actual data from your API
  const urgencyData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Number of Issues',
      data: [15, 25, 10],
      backgroundColor: [
        'rgba(0, 41, 82, 0.85)',     // Midnight Blue (darkest) for high
        'rgba(0, 98, 204, 0.85)',    // Darker Blue (medium) for medium
        'rgba(204, 229, 255, 0.85)', // Ice Blue (lightest) for low
      ],
      borderColor: [
        'rgb(0, 41, 82)',
        'rgb(0, 98, 204)',
        'rgb(204, 229, 255)',
      ],
      borderWidth: 1,
      borderRadius: 8,
      hoverBackgroundColor: [
        'rgba(0, 41, 82, 1)',
        'rgba(0, 98, 204, 1)',
        'rgba(204, 229, 255, 1)',
      ],
    }]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-extrabold text-blue-900">
            Admin Dashboard
          </h2>
          <div className="flex space-x-2">
            {['week', 'month', 'year'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedTimeframe === timeframe
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/80 text-blue-600 hover:bg-blue-50'
                }`}
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Issues"
            value={stats.totalIssues}
            icon={<ClipboardList className="w-6 h-6" />}
            className="bg-gradient-to-br from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onHover={() => setHoveredStat('total')}
            isHovered={hoveredStat === 'total'}
          />
          <StatCard
            title="Assigned Issues"
            value={stats.assignedIssues}
            icon={<UserCheck className="w-6 h-6" />}
            className="bg-gradient-to-br from-cyan-50 to-white hover:from-cyan-100 hover:to-cyan-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onHover={() => setHoveredStat('assigned')}
            isHovered={hoveredStat === 'assigned'}
          />
          <StatCard
            title="Pending Issues"
            value={stats.pendingIssues}
            icon={<Clock className="w-6 h-6" />}
            className="bg-gradient-to-br from-yellow-50 to-white hover:from-yellow-100 hover:to-yellow-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onHover={() => setHoveredStat('pending')}
            isHovered={hoveredStat === 'pending'}
          />
          <StatCard
            title="Resolved Issues"
            value={stats.resolvedIssues}
            icon={<CheckCircle className="w-6 h-6" />}
            className="bg-gradient-to-br from-green-50 to-white hover:from-green-100 hover:to-green-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onHover={() => setHoveredStat('resolved')}
            isHovered={hoveredStat === 'resolved'}
          />
          <StatCard
            title="Unresolved Issues"
            value={stats.unresolvedIssues}
            icon={<XCircle className="w-6 h-6" />}
            className="bg-gradient-to-br from-red-50 to-white hover:from-red-100 hover:to-red-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onHover={() => setHoveredStat('unresolved')}
            isHovered={hoveredStat === 'unresolved'}
          />
          <StatCard
            title="Closed Issues"
            value={stats.closedIssues}
            icon={<Archive className="w-6 h-6" />}
            className="bg-gradient-to-br from-purple-50 to-white hover:from-purple-100 hover:to-purple-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onHover={() => setHoveredStat('closed')}
            isHovered={hoveredStat === 'closed'}
          />
        </section>

        {/* Charts and Analytics */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-blue-100">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6 border-b border-blue-100 pb-3">
              Issues by Department
            </h3>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white/30 rounded-xl" />
              <div className="p-4 min-h-[280px]">
                <PieChart
                  data={Object.entries(stats.byDepartment).map(([name, value]) => ({ name, value }))}
                />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-blue-100">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6 border-b border-blue-100 pb-3">
              Issues by Urgency
            </h3>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white/30 rounded-xl" />
              <div className="p-4 min-h-[280px]">
                <BarChart data={urgencyData} />
              </div>
            </div>
          </div>
        </section>

        {/* Municipal Corporations Section */}
        <section className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-blue-100">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6 border-b border-blue-100 pb-3">
              Municipal Corporations in Madhya Pradesh
            </h3>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white/30 rounded-xl" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Map Section */}
                <div className="h-[500px] bg-blue-50 rounded-lg p-4 relative group overflow-hidden">
                  <img 
                    src="/assets/mp.avif" 
                    alt="Madhya Pradesh Map" 
                    className="w-full h-full object-cover rounded-lg transition-all duration-300 transform scale-110 group-hover:scale-125 group-hover:shadow-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/20 transition-all duration-300 rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                      <p className="text-blue-900 font-medium">Madhya Pradesh Municipal Corporations</p>
                    </div>
                  </div>
                </div>

                {/* Corporations List */}
                <div className="h-[500px] grid grid-rows-4 grid-cols-3 gap-4 overflow-y-auto p-2">
                  {[
                    "Bhopal Municipal Corporation",
                    "Chhindwara Municipal Corporation",
                    "Dewas Municipal Corporation",
                    "Gwalior Municipal Corporation",
                    "Indore Municipal Corporation",
                    "Jabalpur Municipal Corporation",
                    "Katni Municipal Corporation",
                    "Khandwa Municipal Corporation",
                    "Murwara Municipal Corporation",
                    "Rewa Municipal Corporation",
                    "Sagar Municipal Corporation",
                    "Ujjain Municipal Corporation"
                  ].map((corporation) => (
                    <div
                      key={corporation}
                      className="bg-white/50 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300 border border-blue-100 flex flex-col justify-center group cursor-pointer transform hover:scale-105 hover:shadow-lg hover:border-blue-300"
                    >
                      <div className="relative">
                        <h4 className="text-sm font-semibold text-blue-900 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">{corporation}</h4>
                        <p className="text-xs text-blue-600 mt-1 group-hover:text-blue-500 transition-colors duration-300">Active</p>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10 transition-all duration-300 rounded-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Enhanced Stat Card component
function StatCard({ title, value, icon, className, onHover, isHovered }) {
  return (
    <div 
      className={`bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-200 ${className}`}
      onMouseEnter={onHover}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-md font-semibold text-gray-600">{title}</h4>
        <span className={`text-xl transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
          {icon}
        </span>
      </div>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
      {isHovered && (
        <div className="mt-2 text-sm text-gray-500">
          Click to view details
        </div>
      )}
    </div>
  );
}
