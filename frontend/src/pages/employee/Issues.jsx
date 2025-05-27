import { useState } from 'react';

export default function EmployeeIssues() {
  const [issues] = useState([
    {
      id: 1,
      title: 'Water Supply Issue',
      description: 'No water for 2 days',
      status: 'Assigned',
      dept: 'Water',
      location: { city: 'City A', streetDetails: '123 Main St', landmark: 'Near Park', pincode: '123456' },
      imageUrl: null,
      ticketId: 'XXX-RO-001',
      timestamp: '2025-05-20T14:42:19.267+00:00',
    },
  ]);

  const [selectedIssue, setSelectedIssue] = useState(null);

  const openModal = (issue) => setSelectedIssue(issue);
  const closeModal = () => setSelectedIssue(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">My Reported Issues</h2>
        <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-blue-100">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{issue.id}</td>
                  <td className="px-4 py-3 font-medium">{issue.title}</td>
                  <td className="px-4 py-3">{issue.description}</td>
                  <td className="px-4 py-3">
                    <select className="p-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                      <option>{issue.status}</option>
                      <option>Resolved</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 space-y-2">
                    <input type="file" className="block w-full text-sm mb-2" />
                    <button className="w-full bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition">
                      Upload Resolution
                    </button>
                    <button 
                      onClick={() => openModal(issue)} 
                      className="w-full bg-purple-600 text-white px-3 py-1.5 rounded-md hover:bg-purple-700 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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