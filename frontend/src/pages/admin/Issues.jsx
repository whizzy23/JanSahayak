import { useState } from 'react';

export default function Issues() {
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: 'Water Supply Issue',
      dept: 'Water',
      date: '2025-05-20',
      status: 'Pending',
      Urgency: 'High',
      aiSummary: 'Urgent water shortage',
      location: { city: 'City A', streetDetails: '123 Main St', landmark: 'Near Park', pincode: '123456' },
      description: 'No water for 2 days',
      imageUrl: null,
      ticketId: 'XXX-RO-001',
      timestamp: '2025-05-20T14:42:19.267+00:00'
    },
    {
      id: 2,
      title: 'Road Repair Needed',
      dept: 'Road',
      date: '2025-05-21',
      status: 'Assigned',
      Urgency: 'Medium',
      aiSummary: 'Pothole on main road',
      location: { city: 'City B', streetDetails: '456 High St', landmark: 'Near School', pincode: '654321' },
      description: 'Pothole causing accidents',
      imageUrl: null,
      ticketId: 'XXX-RO-002',
      timestamp: '2025-05-21T09:15:30.123+00:00'
    },
    {
      id: 3,
      title: 'Street Light Not Working',
      dept: 'Electricity',
      date: '2025-05-22',
      status: 'Resolved',
      Urgency: 'Low',
      aiSummary: 'Street light failure reported at night',
      location: { city: 'City C', streetDetails: '789 Oak Lane', landmark: 'Next to Grocery Store', pincode: '112233' },
      description: 'Street light flickering and now completely off',
      imageUrl: null,
      ticketId: 'XXX-EL-003',
      timestamp: '2025-05-22T18:05:10.567+00:00'
    },
    {
      id: 4,
      title: 'Overflowing Garbage Bin',
      dept: 'Sanitation',
      date: '2025-05-23',
      status: 'Pending',
      Urgency: 'Medium',
      aiSummary: 'Uncollected garbage causing foul smell',
      location: { city: 'City D', streetDetails: '22 Green Street', landmark: 'Opposite Hospital', pincode: '445566' },
      description: 'Garbage has not been picked up for 3 days',
      imageUrl: null,
      ticketId: 'XXX-SN-004',
      timestamp: '2025-05-23T07:30:45.890+00:00'
    },
    {
      id: 5,
      title: 'Sewage Water Leakage',
      dept: 'Water',
      date: '2025-05-24',
      status: 'Assigned',
      Urgency: 'High',
      aiSummary: 'Sewage pipe burst on main road',
      location: { city: 'City A', streetDetails: '99 Sunset Blvd', landmark: 'Near Petrol Station', pincode: '778899' },
      description: 'Sewage overflowing into street, smells awful',
      imageUrl: null,
      ticketId: 'XXX-WT-005',
      timestamp: '2025-05-24T11:12:03.210+00:00'
    },
    {
      id: 6,
      title: 'Blocked Drainage',
      dept: 'Sanitation',
      date: '2025-05-25',
      status: 'Pending',
      Urgency: 'Medium',
      aiSummary: 'Drainage blocked after heavy rain',
      location: { city: 'City B', streetDetails: '7 Lake View Road', landmark: 'Behind School', pincode: '334455' },
      description: 'Drain water backing up onto the road',
      imageUrl: null,
      ticketId: 'XXX-SN-006',
      timestamp: '2025-05-25T10:45:20.349+00:00'
    },
  ]);

  const [filters, setFilters] = useState({
    dept: '',
    status: '',
    date: ''
  });

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');

  const openModal = (issue) => {
    setSelectedIssue(issue);
    setIsEditing(false);
    setEditField('');
    setEditValue('');
  };

  const closeModal = () => setSelectedIssue(null);

  const handleChangeField = () => {
    if (!editField || !editValue) return;

    const updatedIssues = issues.map(issue =>
      issue.id === selectedIssue.id
        ? { ...issue, [editField]: editValue }
        : issue
    );
    setIssues(updatedIssues);
    setSelectedIssue({ ...selectedIssue, [editField]: editValue });
    setIsEditing(false);
    setEditField('');
    setEditValue('');
  };

  const filteredIssues = issues.filter(issue => {
    const matchesDept = !filters.dept || issue.dept === filters.dept;
    const matchesStatus = !filters.status || issue.status === filters.status;
    const matchesDate = !filters.date || issue.date === filters.date;
    return matchesDept && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">All Issues</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-start">
        <select className="p-2 border rounded-md" value={filters.dept} onChange={(e) => setFilters({ ...filters, dept: e.target.value })}>
          <option value="">Filter by Dept</option>
          <option value="Water">Water</option>
          <option value="Road">Road</option>
          <option value="Electricity">Electricity</option>
          <option value="Sanitation">Sanitation</option>
        </select>

        <input type="date" className="p-2 border rounded-md" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} />

        <select className="p-2 border rounded-md" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Assigned">Assigned</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-blue-100 text-gray-700 text-center">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Department</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Urgency</th>
              <th className="p-3">View</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredIssues.map(issue => (
              <tr key={issue.id} className="border-t align-middle">
                <td className="p-3">{issue.id}</td>
                <td className="p-3">{issue.title}</td>
                <td className="p-3">{issue.dept}</td>
                <td className="p-3">{issue.date}</td>
                <td className="p-3">{issue.status}</td>
                <td className="p-3">{issue.Urgency}</td>
                <td className="p-3">
                  <button
                    onClick={() => openModal(issue)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedIssue && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Issue Details</h3>
      <div className="space-y-2">
        <p><strong>ID:</strong> {selectedIssue.id}</p>
        <p><strong>Title:</strong> {selectedIssue.title}</p>
        <p><strong>Department:</strong> {selectedIssue.dept}</p>
        <p><strong>Location:</strong></p>
        <ul className="ml-4 list-disc">
          <li><strong>City:</strong> {selectedIssue.location.city}</li>
          <li><strong>Street:</strong> {selectedIssue.location.streetDetails}</li>
          <li><strong>Landmark:</strong> {selectedIssue.location.landmark}</li>
          <li><strong>Pincode:</strong> {selectedIssue.location.pincode}</li>
        </ul>
        <p><strong>Description:</strong> {selectedIssue.description}</p>
        <p><strong>Image URL:</strong> {selectedIssue.imageUrl || 'N/A'}</p>
        <p><strong>Ticket ID:</strong> {selectedIssue.ticketId}</p>
        <p><strong>Status:</strong> {selectedIssue.status}</p>
        <p><strong>Timestamp:</strong> {selectedIssue.timestamp}</p>
        <p><strong>Urgency:</strong> {selectedIssue.Urgency}</p>
      </div>

      <div className="mt-6 space-y-3">
        <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Assign Employee</button>

        <button
          className="w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Change'}
        </button>

        {isEditing && (
          <div className="bg-gray-100 p-4 rounded-md space-y-3">
            <select
              className="w-full p-2 border rounded-md"
              value={editField}
              onChange={(e) => setEditField(e.target.value)}
            >
              <option value="">Select Field</option>
              <option value="title">Title</option>
              <option value="dept">Department</option>
              <option value="Urgency">Urgency</option>
              {selectedIssue.status === 'Resolved' && <option value="status">Status</option>}
            </select>

            {editField === 'dept' && (
              <select className="w-full p-2 border rounded-md" value={editValue} onChange={(e) => setEditValue(e.target.value)}>
                <option value="">Select Department</option>
                <option value="Water">Water</option>
                <option value="Road">Road</option>
                <option value="Electricity">Electricity</option>
                <option value="Sanitation">Sanitation</option>
              </select>
            )}

            {editField === 'Urgency' && (
              <select className="w-full p-2 border rounded-md" value={editValue} onChange={(e) => setEditValue(e.target.value)}>
                <option value="">Select Urgency</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            )}

            {editField === 'status' && selectedIssue.status === 'Resolved' && (
              <select className="w-full p-2 border rounded-md" value={editValue} onChange={(e) => setEditValue(e.target.value)}>
                <option value="">Select Status</option>
                <option value="Closed">Mark as Closed</option>
              </select>
            )}

            {editField === 'title' && (
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="New value"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            )}

            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={handleChangeField}
            >
              Save Change
            </button>
          </div>
        )}
      </div>

      <button
        onClick={closeModal}
        className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}