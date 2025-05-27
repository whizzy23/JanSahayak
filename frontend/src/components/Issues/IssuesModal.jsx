import { useState } from 'react';
import { updateIssue } from '../../services/issueService';

export default function IssueModal({ issue, onClose, editState, setEditState, setIssues, issues }) {
  const { isEditing, field, value } = editState;

  const handleChangeField = async () => {
    if (!field || !value) return;

    try {
      const updated = await updateIssue(issue.ticketId, { [field]: value });

      const updatedIssues = issues.map(i =>
        i.ticketId === issue.ticketId ? { ...i, ...updated } : i
      );
      setIssues(updatedIssues);
      setEditState({ isEditing: false, field: '', value: '' });
    } catch (error) {
      console.error('Failed to update issue:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Issue Details</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Ticket ID:</strong> {issue.ticketId}</p>
          <p><strong>Department:</strong> {issue.department}</p>
          <p><strong>Status:</strong> {issue.status}</p>
          <p><strong>Urgency:</strong> {issue.urgency}</p>
          <p><strong>Phone:</strong> {issue.phone.trim().substring(11)}</p>
          <p><strong>Description:</strong> {issue.description}</p>
          <p><strong>Image URL:</strong> {issue.imageUrl || 'N/A'}</p>

          <div>
            <strong>Location:</strong>
            <ul className="ml-4 list-disc">
              <li><strong>City:</strong> {issue.location?.city}</li>
              <li><strong>Street:</strong> {issue.location?.streetDetails}</li>
              <li><strong>Landmark:</strong> {issue.location?.landmark}</li>
              <li><strong>Pincode:</strong> {issue.location?.pincode}</li>
            </ul>
          </div>

          <p><strong>Assigned To:</strong> {issue.assignedTo || 'Not assigned'}</p>
          <p><strong>Resolution:</strong> {issue.resolution || 'Pending'}</p>
          <p><strong>Resolution Date:</strong> {issue.resolutionDate || 'N/A'}</p>
          <p><strong>Comments:</strong> {issue.comments || 'None'}</p>
          <p><strong>Date:</strong> {new Date(issue.timestamp).toLocaleString()}</p>
        </div>

        {/* Controls */}
        <div className="mt-6 space-y-3">
          <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Assign Employee</button>

          <button
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            onClick={() => setEditState({ ...editState, isEditing: !isEditing })}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>

          {isEditing && (
            <div className="bg-gray-100 p-4 rounded-md space-y-3">
              {/* Field Selector */}
              <select
                className="w-full p-2 border rounded-md"
                value={field}
                onChange={(e) => setEditState({ ...editState, field: e.target.value, value: '' })}
              >
                <option value="">Select Field</option>
                <option value="title">Title</option>
                <option value="department">Department</option>
                <option value="urgency">Urgency</option>
                {issue.status === 'Resolved' && <option value="status">Status</option>}
              </select>

              {/* Field Value Input */}
              {field === 'department' && (
                <select
                  className="w-full p-2 border rounded-md"
                  value={value}
                  onChange={(e) => setEditState({ ...editState, value: e.target.value })}
                >
                  <option value="">Select Department</option>
                  <option value="Water">Water</option>
                  <option value="Road">Road</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Sanitation">Sanitation</option>
                </select>
              )}

              {field === 'urgency' && (
                <select
                  className="w-full p-2 border rounded-md"
                  value={value}
                  onChange={(e) => setEditState({ ...editState, value: e.target.value })}
                >
                  <option value="">Select Urgency</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              )}

              {field === 'status' && (
                <select
                  className="w-full p-2 border rounded-md"
                  value={value}
                  onChange={(e) => setEditState({ ...editState, value: e.target.value })}
                >
                  <option value="">Select Status</option>
                  <option value="Closed">Closed</option>
                </select>
              )}

              {field === 'title' && (
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="New Title"
                  value={value}
                  onChange={(e) => setEditState({ ...editState, value: e.target.value })}
                />
              )}

              {/* Save Button */}
              <button
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleChangeField}
              >
                Save Change
              </button>
            </div>
          )}
        </div>

        {/* Close Modal */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
