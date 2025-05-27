import { useState } from 'react';

export default function Issues() {
  const [issues] = useState([
    { 
      id: 1, 
      title: 'Water Supply Issue', 
      dept: 'Water', 
      date: '2025-05-20', 
      status: 'Pending', 
      aiUrgency: 'High', 
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
      aiUrgency: 'Medium', 
      aiSummary: 'Pothole on main road',
      location: { city: 'City B', streetDetails: '456 High St', landmark: 'Near School', pincode: '654321' },
      description: 'Pothole causing accidents',
      imageUrl: null,
      ticketId: 'XXX-RO-002',
      timestamp: '2025-05-21T09:15:30.123+00:00'
    },
  ]);

  const [selectedIssue, setSelectedIssue] = useState(null);

  const openModal = (issue) => setSelectedIssue(issue);
  const closeModal = () => setSelectedIssue(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">All Issues</h2>

      <div className="flex flex-wrap gap-4 mb-6 justify-start">
        <select className="p-2 border rounded-md">
          <option>Filter by Dept</option>
          <option>Water</option>
          <option>Road</option>
        </select>
        <input type="date" className="p-2 border rounded-md" />
        <select className="p-2 border rounded-md">
          <option>Filter by Status</option>
          <option>Pending</option>
          <option>Assigned</option>
          <option>Resolved</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Department</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">AI Urgency</th>
              <th className="p-3">AI Summary</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map(issue => (
              <tr key={issue.id} className="border-t">
                <td className="p-3">{issue.id}</td>
                <td className="p-3">{issue.title}</td>
                <td className="p-3">{issue.dept}</td>
                <td className="p-3">{issue.date}</td>
                <td className="p-3">{issue.status}</td>
                <td className="p-3">{issue.aiUrgency}</td>
                <td className="p-3">{issue.aiSummary}</td>
                <td className="p-3 flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md">Assign</button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md">View Image</button>
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

      {/* Modal for Issue Details */}
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
                <li><strong>Street Details:</strong> {selectedIssue.location.streetDetails}</li>
                <li><strong>Landmark:</strong> {selectedIssue.location.landmark}</li>
                <li><strong>Pincode:</strong> {selectedIssue.location.pincode}</li>
              </ul>
              <p><strong>Description:</strong> {selectedIssue.description}</p>
              <p><strong>Image URL:</strong> {selectedIssue.imageUrl || 'N/A'}</p>
              <p><strong>Ticket ID:</strong> {selectedIssue.ticketId}</p>
              <p><strong>Status:</strong> {selectedIssue.status}</p>
              <p><strong>Timestamp:</strong> {selectedIssue.timestamp}</p>
              <p><strong>AI Urgency:</strong> {selectedIssue.aiUrgency}</p>
              <p><strong>AI Summary:</strong> {selectedIssue.aiSummary}</p>
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