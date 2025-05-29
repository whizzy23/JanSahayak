import { useState, useEffect } from "react";
import { authService } from "../../services/authService";
import PageLoader from "../../components/Loader";
import { User, Mail, Building2, Calendar, Award, CheckCircle2, Lock } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resolvedIssues, setResolvedIssues] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const employeeId = localStorage.getItem("id");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetchEmployeeProfile(employeeId);
        // setProfile(response.profile);
        // setResolvedIssues(response.resolvedIssues);
        
        // Mock data for now
        setProfile({
          name: "John Doe",
          email: "john.doe@example.com",
          department: "Water Supply",
          joinDate: "2024-01-01",
          totalResolved: 45,
          currentIssues: 3
        });
        setResolvedIssues([
          { id: 1, title: 'Water Supply Issue', resolvedDate: '2024-03-15', category: 'Water Supply' },
          { id: 2, title: 'Road Maintenance', resolvedDate: '2024-03-10', category: 'Infrastructure' },
          { id: 3, title: 'Street Light Repair', resolvedDate: '2024-03-05', category: 'Electricity' }
        ]);
        setError("");
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("⚠️ Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [employeeId]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    try {
      // TODO: Replace with actual API call
      // await updatePassword({
      //   currentPassword: passwordData.currentPassword,
      //   newPassword: passwordData.newPassword
      // });
      
      // Mock success
      setPasswordSuccess("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setShowPasswordModal(false);
    } catch (error) {
      setPasswordError("Failed to update password. Please try again.");
    }
  };

  if (loading) return <PageLoader />;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6 pt-20 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Profile Header Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-blue-100 flex-1">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-blue-900">{profile?.name}</h2>
                <p className="text-blue-600">{profile?.department} Department</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 text-blue-900 mb-1">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Total Resolved</span>
                </div>
                <p className="text-2xl font-bold text-blue-700">{profile?.totalResolved}</p>
              </div>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 text-blue-900 mb-1">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Current Issues</span>
                </div>
                <p className="text-2xl font-bold text-blue-700">{profile?.currentIssues}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-blue-100 w-full md:w-96">
            <h3 className="text-xl font-semibold text-blue-900 mb-6 border-b border-blue-100 pb-3">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>{profile?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>{profile?.department}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Joined {profile?.joinDate}</span>
              </div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                <Lock className="w-5 h-5" />
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Resolved History */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-blue-100">
          <h3 className="text-2xl font-semibold text-blue-900 mb-6 border-b border-blue-100 pb-3">
            Resolved Issues History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-blue-50">
                <tr>
                  <th className="px-6 py-4 text-blue-900">ID</th>
                  <th className="px-6 py-4 text-blue-900">Title</th>
                  <th className="px-6 py-4 text-blue-900">Category</th>
                  <th className="px-6 py-4 text-blue-900">Resolved Date</th>
                </tr>
              </thead>
              <tbody>
                {resolvedIssues.map((issue) => (
                  <tr key={issue.id} className="border-b border-blue-100 hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="px-6 py-4 font-medium text-gray-900">#{issue.id}</td>
                    <td className="px-6 py-4 text-gray-700">{issue.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {issue.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{issue.resolvedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6">Change Password</h3>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
                {passwordError && (
                  <p className="text-red-600 text-sm">{passwordError}</p>
                )}
                {passwordSuccess && (
                  <p className="text-green-600 text-sm">{passwordSuccess}</p>
                )}
                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
                  >
                    Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                      });
                      setPasswordError("");
                      setPasswordSuccess("");
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
