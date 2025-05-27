import { useState, useEffect } from 'react';
import { fetchIssues } from '../../services/issueService';
import Filters from  '../../components/Issues/Filters';
import IssuesTable from '../../components/Issues/IssuesTable';
import IssueModal from  '../../components/Issues/IssuesModal';

export default function Issues() {
  const [issues, setIssues] = useState([]);
  const [filters, setFilters] = useState({ dept: '', status: '', date: '' });
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [editState, setEditState] = useState({ isEditing: false, field: '', value: '' });

  useEffect(() => {
    const getIssues = async () => {
      try {
        const response = await fetchIssues();
        setIssues(response);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };
    getIssues();
  }, []);

  const filteredIssues = issues.filter(issue => {
    const matchesDept = !filters.dept || issue.dept === filters.dept;
    const matchesStatus = !filters.status || issue.status === filters.status;
    const matchesDate = !filters.date || issue.date === filters.date;
    return matchesDept && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">All Issues</h2>
      <Filters filters={filters} setFilters={setFilters} />
      <IssuesTable issues={filteredIssues} openModal={setSelectedIssue} />
      {selectedIssue && (
        <IssueModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          editState={editState}
          setEditState={setEditState}
          setIssues={setIssues}
          issues={issues}
        />
      )}
    </div>
  );
}
