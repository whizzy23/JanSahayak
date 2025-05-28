import UserManagement from '../../components/Admin/UserManagement';

export default function Employees() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">User Management</h2>
      <UserManagement />
    </div>
  );
}
