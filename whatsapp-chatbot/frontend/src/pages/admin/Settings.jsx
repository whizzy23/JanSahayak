export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">Admin Settings</h2>
      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Webhook URL</label>
            <input
              type="text"
              placeholder="Enter Webhook URL"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">AI Model</label>
            <select className="w-full p-2 border rounded-md">
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="notify" className="accent-blue-600" />
            <label htmlFor="notify" className="text-gray-700 font-medium">Enable Email Notifications</label>
          </div>
          <button className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
