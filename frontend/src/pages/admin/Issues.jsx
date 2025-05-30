import { useState, useEffect } from "react";
import { fetchIssues } from "../../services/issueService";
import { authService } from "../../services/authService";
import { useLocation } from "react-router-dom";
import Filters from "../../components/Issues/Filters";
import IssuesTable from "../../components/Issues/IssuesTable";
import IssueModal from "../../components/Issues/IssuesModal";
import PageLoader from "../../components/Loader";
import { ClipboardList, UserCheck, Clock, CheckCircle, XCircle, Archive } from 'lucide-react';

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [filters, setFilters] = useState({ dept: "", status: "", resolution: "", date: "" });
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const userRole = authService.getRole();

  useEffect(() => {
    // Check if we have filters from navigation
    if (location.state?.filters) {
      const { status, resolution } = location.state.filters;
      setFilters(prev => ({
        ...prev,
        status: status || "",
        resolution: resolution || ""
      }));
    }
  }, [location]);

  useEffect(() => {
    const getIssues = async () => {
      try {
        const response = await fetchIssues();
        setIssues(response);
        setError("");
      } catch (error) {
        console.error("Error fetching issues:", error);
        setError("⚠️ Failed to load issues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getIssues();
  }, []);

  const filteredIssues = issues
    .filter((issue) => {
      const matchesDept = !filters.dept || issue.department === filters.dept;
      const matchesStatus = !filters.status || issue.status === filters.status;
      const matchesResolution =
        !filters.resolution || issue.resolution?.toLowerCase() === filters.resolution.toLowerCase();

      const formatDate = (dateString) =>
        new Date(dateString).toISOString().split("T")[0];
      const matchesDate =
        !filters.date || formatDate(issue.timestamp) === filters.date;

      return matchesDept && matchesStatus && matchesResolution && matchesDate;
    })
    .sort((a, b) => {
      const statusPriority = { Pending: 0, Assigned: 1, Closed: 2 };
      const urgencyPriority = { High: 0, Medium: 1, Low: 2 };

      const statusDiff = (statusPriority[a.status] ?? 99) - (statusPriority[b.status] ?? 99);
      if (statusDiff !== 0) return statusDiff;

      return (urgencyPriority[a.urgency] ?? 99) - (urgencyPriority[b.urgency] ?? 99);
    });

  // Calculate statistics
  const stats = {
    total: issues.length,
    assigned: issues.filter(i => i.status === 'Assigned').length,
    pending: issues.filter(i => i.status === 'Pending').length,
    resolved: issues.filter(i => i.resolution === 'Resolved').length,
    unresolved: issues.filter(i => i.resolution === 'Unresolved').length,
    closed: issues.filter(i => i.status === 'Closed').length
  };

  if (loading) return <PageLoader />;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-4 sm:p-6 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900">
            All Issues
          </h2>
        </div>

        {/* Statistics Overview */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <StatCard
            title="Total Issues"
            value={stats.total}
            icon={<ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />}
            className="bg-gradient-to-br from-slate-50 to-white hover:from-slate-100 hover:to-slate-50"
          />
          <StatCard
            title="Assigned Issues"
            value={stats.assigned}
            icon={<UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />}
            className="bg-gradient-to-br from-cyan-50 to-white hover:from-cyan-100 hover:to-cyan-50"
          />
          <StatCard
            title="Pending Issues"
            value={stats.pending}
            icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6" />}
            className="bg-gradient-to-br from-yellow-50 to-white hover:from-yellow-100 hover:to-yellow-50"
          />
          <StatCard
            title="Resolved Issues"
            value={stats.resolved}
            icon={<CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
            className="bg-gradient-to-br from-green-50 to-white hover:from-green-100 hover:to-green-50"
          />
          <StatCard
            title="Unresolved Issues"
            value={stats.unresolved}
            icon={<XCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
            className="bg-gradient-to-br from-red-50 to-white hover:from-red-100 hover:to-red-50"
          />
          <StatCard
            title="Closed Issues"
            value={stats.closed}
            icon={<Archive className="w-5 h-5 sm:w-6 sm:h-6" />}
            className="bg-gradient-to-br from-purple-50 to-white hover:from-purple-100 hover:to-purple-50"
          />
        </section>

        <Filters filters={filters} setFilters={setFilters} />

        {filteredIssues.length === 0 ? (
          <div className="text-center text-gray-600 mt-4 sm:mt-16 text-sm sm:text-lg italic">
            No issues match the selected filters.
          </div>
        ) : (
          <IssuesTable issues={filteredIssues} openModal={setSelectedIssue} />
        )}

        {selectedIssue && (
          <IssueModal
            issue={selectedIssue}
            onClose={() => setSelectedIssue(null)}
            setIssues={setIssues}
            userRole={userRole}
          />
        )}
      </div>
    </div>
  );
};

// StatCard component
function StatCard({ title, value, icon, className }) {
  return (
    <div className={`${className} p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="p-3 bg-white/50 rounded-xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Issues;
