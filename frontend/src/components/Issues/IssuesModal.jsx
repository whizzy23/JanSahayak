import { useState, useEffect } from "react";
import { updateIssue } from "../../services/issueService";
import { AiOutlineClose } from "react-icons/ai";
import ImageViewer from "./ImageViewer";

const fieldOptionsMap = {
  status: ["Pending", "Assigned", "Closed"],
  urgency: ["High", "Medium", "Low"],
  department: [
    "Water",
    "Electricity",
    "Roads",
    "Sanitation",
    "Garbage Collection",
    "Street Lights",
    "Drainage",
    "Public Toilets",
    "Other",
  ],
  resolution: ["Resolved", "Unresolved"],
  assignedTo: ["John Doe"],
};

const capitalize = (str = "") => str.charAt(0).toUpperCase() + str.slice(1);

const IssueModal = ({ issue, onClose, setIssues }) => {
  const [currentIssue, setCurrentIssue] = useState(issue);

  // simplified editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");

  const handleChangeField = async () => {
    if (!editField || !editValue.trim()) return;

    try {
      const updateData = { [editField]: editValue.trim() };
      const updated = await updateIssue(issue.ticketId, updateData);

      // backend returns full updated issue
      setCurrentIssue(updated);
      setIssues((prev) =>
        prev.map((i) => (i.ticketId === updated.ticketId ? updated : i))
      );

      // reset editing
      setIsEditing(false);
      setEditField("");
      setEditValue("");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update issue. Please try again.");
    }
  };

  const getFullAddress = (loc) => {
    if (!loc) return "N/A";
    const { streetDetails, landmark, city, pincode } = loc;
    return `${streetDetails || ""}, ${landmark || ""}, ${city || ""} – ${
      pincode || ""
    }`;
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  useEffect(() => {
    setCurrentIssue(issue);
  }, [issue]);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 z-20 cursor-pointer"
          aria-label="Close Modal"
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="overflow-y-auto px-6 pt-6 pb-8 max-h-[calc(90vh-3rem)] hide-scrollbar">
          <h2 className="text-3xl font-semibold mb-6 text-blue-700 border-b pb-3">
            Issue Details
          </h2>

          <div className="space-y-4 text-gray-800 text-sm">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <div><strong>Ticket ID:</strong> {currentIssue.ticketId}</div>
              <div><strong>Status:</strong> {currentIssue.status}</div>
              <div><strong>Department:</strong> {currentIssue.department}</div>
              <div><strong>Urgency:</strong> {currentIssue.urgency}</div>
              <div><strong>Phone:</strong> {currentIssue.phone?.slice(11) || "N/A"}</div>
              <div><strong>Assigned To:</strong> {currentIssue.assignedTo || "Not assigned"}</div>
              <div><strong>Resolution:</strong> {currentIssue.resolution || "Pending"}</div>
              <div><strong>Resolution Date:</strong> {new Date(currentIssue.resolutionDate).toLocaleString() || "N/A"}</div>
              <div>
                <strong>Image:</strong>{" "}
                {currentIssue.imageUrl ? (
                  <ImageViewer imageUrl={currentIssue.imageUrl} />
                ) : "N/A"}
              </div>
              <div>
                <strong>Date Reported:</strong>{" "}
                {new Date(currentIssue.timestamp).toLocaleString()}
              </div>
              <div className="col-span-2">
                <strong>Location:</strong> {getFullAddress(currentIssue.location)}
              </div>
            </div>

            <div>
              <strong>Description:</strong>
              <p className="mt-1">{currentIssue.description || "N/A"}</p>
            </div>

            <div>
              <strong>Comments:</strong>
              <p className="mt-1">{currentIssue.comments || "None"}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {isEditing && (
              <div className="bg-gray-100 p-4 rounded-md space-y-4">
                <label htmlFor="field" className="block text-sm font-medium text-gray-700">
                  Select Field
                </label>
                <select
                  id="field"
                  className="w-full p-2 border rounded-md cursor-pointer"
                  value={editField}
                  onChange={(e) => {
                    const sel = e.target.value;
                    let init = "";
                    if (sel) {
                      const existing = currentIssue[sel];
                      init = sel === "resolutionDate"
                        ? existing?.split("T")[0] || ""
                        : existing || "";
                    }
                    setEditField(sel);
                    setEditValue(init);
                  }}
                >
                  <option value="">Select Field to Edit</option>
                  {[
                    "status",
                    "urgency",
                    "department",
                    "comments",
                    "assignedTo",
                    "resolution",
                    "resolutionDate",
                  ].map((f) => (
                    <option key={f} value={f}>
                      {capitalize(f)}
                    </option>
                  ))}
                </select>

                {editField &&
                  (fieldOptionsMap[editField] ? (
                    <select
                      className="w-full p-2 border rounded-md cursor-pointer"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    >
                      <option value="">{`Select ${capitalize(editField)}`}</option>
                      {fieldOptionsMap[editField].map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : editField === "resolutionDate" ? (
                    <input
                      type="date"
                      className="w-full p-2 border rounded-md"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  ) : (
                    <textarea
                      className="w-full p-2 border rounded-md"
                      rows={3}
                      placeholder={`Enter ${editField}`}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  ))}
              </div>
            )}

            <button
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-semibold cursor-pointer"
              onClick={() => {
                if (isEditing) {
                  setIsEditing(false);
                  setEditField("");
                  setEditValue("");
                } else {
                  setIsEditing(true);
                }
              }}
            >
              {isEditing ? "Cancel Editing" : "Edit Field"}
            </button>

            {isEditing && (
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold disabled:opacity-50 cursor-pointer"
                disabled={!editValue.trim()}
                onClick={handleChangeField}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueModal;
