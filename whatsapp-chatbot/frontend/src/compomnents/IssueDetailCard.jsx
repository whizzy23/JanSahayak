// components/IssueDetailCard.jsx
export default function IssueDetailCard({ issue, onClose }) {
  if (!issue) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl">✕</button>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Issue Details</h2>
        <div className="space-y-2">
          <p><strong>Phone:</strong> {issue.phone}</p>
          <p><strong>Department:</strong> {issue.department}</p>
          <p><strong>City:</strong> {issue.location.city}</p>
          <p><strong>Street:</strong> {issue.location.streetDetails}</p>
          <p><strong>Landmark:</strong> {issue.location.landmark}</p>
          <p><strong>Pincode:</strong> {issue.location.pincode}</p>
          <p><strong>Description:</strong> {issue.location.description}</p>
          <p><strong>Status:</strong> {issue.status}</p>
          <p><strong>Ticket ID:</strong> {issue.ticketID}</p>
          <p><strong>Timestamp:</strong> {new Date(issue.timestamp).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
