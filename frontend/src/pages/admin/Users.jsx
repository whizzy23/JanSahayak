import { useState, useEffect } from "react";
import { authService } from "../../services/authService";
import AddUserForm from "../../components/Users/AddUserForm";
import PageLoader from "../../components/Loader";
import UserTable from "../../components/Users/UserTable";
import ConfirmationModal from "../../components/Users/ConfirmationModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ open: false, userId: null });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await authService.getAllUsers();
      setUsers(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (userId) => {
    try {
      await authService.verifyUser(userId);
      fetchUsers();
    } catch (err) {
      setError(err.message || "Failed to verify user");
    }
  };

  const handleRemove = (userId) => {
    setConfirmModal({ open: true, userId });
  };

  const confirmRemove = async () => {
    try {
      await authService.removeUser(confirmModal.userId);
      fetchUsers();
    } catch (err) {
      setError(err.message || "Failed to remove user");
    } finally {
      setConfirmModal({ open: false, userId: null });
    }
  };

  const unverifiedUsers = users.filter((u) => !u.isVerified);
  const verifiedAdmins = users.filter((u) => u.isVerified && u.role === "admin");
  const verifiedEmployees = users.filter((u) => u.isVerified && u.role === "employee");

  if (loading) return <PageLoader />;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">User Management</h2>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-blue-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Add New User
          </button>
        </div>

        {showAddForm && (
          <div className="mb-6">
            <AddUserForm
              onSuccess={() => {
                fetchUsers();
                setShowAddForm(false);
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        <UserTable
          title="Pending Verifications"
          users={unverifiedUsers}
          columns={[
            { label: "Email", key: "email", className: "w-1/3 truncate" },
            { label: "Role", key: "role", className: "w-1/6 capitalize" },
            { label: "Department", key: "department", className: "w-1/6" },
            {
              label: "Signup Date",
              key: "createdAt",
              className: "w-1/6",
              render: (user) => new Date(user.createdAt).toLocaleDateString(),
            },
          ]}
          actions={(user) => (
            <>
              <button
                key="_verify"
                onClick={() => handleVerify(user._id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
              >
                Verify
              </button>
              <button
                key="_remove"
                onClick={() => handleRemove(user._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
              >
                Remove
              </button>
            </>
          )}
        />

        <UserTable
          title="Verified Administrators"
          users={verifiedAdmins}
          columns={[
            { label: "Email", key: "email", className: "w-2/3 truncate" },
            {
              label: "Signup Date",
              key: "createdAt",
              className: "w-1/6",
              render: (user) => new Date(user.createdAt).toLocaleDateString(),
            },
          ]}
          actions={(user) => (
            <button
              onClick={() => handleRemove(user._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
            >
              Remove
            </button>
          )}
        />

        <UserTable
          title="Verified Employees"
          users={verifiedEmployees}
          columns={[
            { label: "Email", key: "email", className: "w-1/3 truncate" },
            { label: "Department", key: "department", className: "w-1/3" },
            {
              label: "Signup Date",
              key: "createdAt",
              className: "w-1/6",
              render: (user) => new Date(user.createdAt).toLocaleDateString(),
            },
          ]}
          actions={(user) => (
            <button
              onClick={() => handleRemove(user._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
            >
              Remove
            </button>
          )}
        />

        <ConfirmationModal
          isOpen={confirmModal.open}
          title="Confirm Removal"
          message="Are you sure you want to remove this user? This action cannot be undone."
          onCancel={() => setConfirmModal({ open: false, userId: null })}
          onConfirm={confirmRemove}
        />
      </div>
    </div>
  );
}

export default Users;