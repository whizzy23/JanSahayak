const UserTable = ({ title, users, columns, actions }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
      {title} ({users.length})
    </h3>
    <div className="overflow-x-auto bg-gray-50 rounded-lg">
      <table className="min-w-full table-fixed">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(col => (
              <th key={col.label} className={`px-4 py-3 text-left text-sm font-medium text-gray-600 ${col.className}`}>
                {col.label}
              </th>
            ))}
            {actions && <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-1/6">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user._id} className="hover:bg-gray-50">
              {columns.map(col => (
                <td key={col.key} className={`px-4 py-3 text-sm text-gray-700 ${col.className || ''}`}>
                  {col.render ? col.render(user) : user[col.key] || 'N/A'}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-2">{actions(user)}</div>
                </td>
              )}
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-3 text-center text-sm text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default UserTable;
