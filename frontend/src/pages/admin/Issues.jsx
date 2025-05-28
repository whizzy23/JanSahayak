import { useState, useEffect } from "react";
import { fetchIssues } from "../../services/issueService";
import Filters from "../../components/Issues/Filters";
import IssuesTable from "../../components/Issues/IssuesTable";
import IssueModal from "../../components/Issues/IssuesModal";

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [filters, setFilters] = useState({ dept: "", status: "", date: "" });
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    const getIssues = async () => {
      try {
        const response = await fetchIssues();
        setIssues(response);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };
    getIssues();
  }, []);

  const filteredIssues = issues.filter((issue) => {
    const matchesDept = !filters.dept || issue.department === filters.dept;
    const matchesStatus = !filters.status || issue.status === filters.status;

    const formatDate = (dateString) =>
      new Date(dateString).toISOString().split("T")[0];
    const matchesDate =
      !filters.date || formatDate(issue.timestamp) === filters.date;

    return matchesDept && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">
        All Issues
      </h2>
      <Filters filters={filters} setFilters={setFilters} />
      <IssuesTable issues={filteredIssues} openModal={setSelectedIssue} />
      {selectedIssue && (
        <IssueModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          setIssues={setIssues}
          issues={issues}
        />
      )}
    </div>
  );
};

export default Issues;
