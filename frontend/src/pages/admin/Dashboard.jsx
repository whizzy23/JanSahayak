import { useEffect, useState } from 'react';
import { fetchIssueStats } from '../../services/issueService'
import { useNavigate } from 'react-router-dom';
import PageLoader from '../../components/Loader';
import PieChart from '../../components/PieChart';
import BarChart from '../../components/BarChart';
import { ClipboardList, UserCheck, Clock, CheckCircle, XCircle, Archive } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [hoveredStat, setHoveredStat] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const navigate = useNavigate();

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

  // urgencyData for BarChart
  const urgencyData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Number of Issues',
      data: [
        stats?.byUrgency?.high || 0,
        stats?.byUrgency?.medium || 0,
        stats?.byUrgency?.low || 0
      ],
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

  const handleStatClick = (type) => {
    let filterParams = {};
    
    switch(type) {
      case 'total':
        // No filters for total
        break;
      case 'assigned':
        filterParams = { status: 'Assigned' };
        break;
      case 'pending':
        filterParams = { status: 'Pending' };
        break;
      case 'resolved':
        filterParams = { resolution: 'Resolved' };
        break;
      case 'unresolved':
        filterParams = { resolution: 'Unresolved' };
        break;
      case 'closed':
        filterParams = { status: 'Closed' };
        break;
      default:
        break;
    }

    // Navigate to issues page with filters
    navigate('/admin/issues', { state: { filters: filterParams } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-extrabold text-blue-900">
            Admin Dashboard
          </h2>
        </div>

        {/* Statistics Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Issues"
            value={stats?.total || 0}
            icon={<ClipboardList className="w-6 h-6" />}
            className="bg-gradient-to-br from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onHover={() => setHoveredStat('total')}
            isHovered={hoveredStat === 'total'}
            onClick={() => handleStatClick('total')}
          />
          <StatCard
            title="Assigned Issues"
            value={stats?.assigned || 0}
            icon={<UserCheck className="w-6 h-6" />}
            className="bg-gradient-to-br from-cyan-50 to-white hover:from-cyan-100 hover:to-cyan-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onHover={() => setHoveredStat('assigned')}
            isHovered={hoveredStat === 'assigned'}
            onClick={() => handleStatClick('assigned')}
          />
          <StatCard
            title="Pending Issues"
            value={stats?.pending || 0}
            icon={<Clock className="w-6 h-6" />}
            className="bg-gradient-to-br from-yellow-50 to-white hover:from-yellow-100 hover:to-yellow-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onHover={() => setHoveredStat('pending')}
            isHovered={hoveredStat === 'pending'}
            onClick={() => handleStatClick('pending')}
          />
          <StatCard
            title="Resolved Issues"
            value={stats?.resolved || 0}
            icon={<CheckCircle className="w-6 h-6" />}
            className="bg-gradient-to-br from-green-50 to-white hover:from-green-100 hover:to-green-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onHover={() => setHoveredStat('resolved')}
            isHovered={hoveredStat === 'resolved'}
            onClick={() => handleStatClick('resolved')}
          />
          <StatCard
            title="Unresolved Issues"
            value={stats?.unresolved || 0}
            icon={<XCircle className="w-6 h-6" />}
            className="bg-gradient-to-br from-red-50 to-white hover:from-red-100 hover:to-red-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onHover={() => setHoveredStat('unresolved')}
            isHovered={hoveredStat === 'unresolved'}
            onClick={() => handleStatClick('unresolved')}
          />
          <StatCard
            title="Closed Issues"
            value={stats?.closed || 0}
            icon={<Archive className="w-6 h-6" />}
            className="bg-gradient-to-br from-purple-50 to-white hover:from-purple-100 hover:to-purple-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onHover={() => setHoveredStat('closed')}
            isHovered={hoveredStat === 'closed'}
            onClick={() => handleStatClick('closed')}
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
function StatCard({ title, value, icon, className, onHover, isHovered, onClick }) {
  return (
    <div 
      className={`bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer ${className}`}
      onMouseEnter={onHover}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
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
