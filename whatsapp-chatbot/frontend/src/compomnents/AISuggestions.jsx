export default function AISuggestions() {
  const mockSuggestions = {
    prioritizedIssues: ['Issue #102: Water Supply', 'Issue #98: Road Repair'],
    highRiskCases: ['Issue #102: Urgent', 'Issue #87: Safety Hazard'],
    topComplaints: ['Water Supply: 25%', 'Road Repair: 20%'],
  };

  const Section = ({ title, items }) => (
    <div className="mb-4">
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );

  return (
    <div className="bg-yellow-100 p-6 rounded-xl shadow-lg border border-yellow-300">
      <h3 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
        <span>🤖</span> AI Suggestions
      </h3>
      <Section title="📌 Prioritized Issues" items={mockSuggestions.prioritizedIssues} />
      <Section title="⚠️ High-Risk Cases" items={mockSuggestions.highRiskCases} />
      <Section title="📊 Top Complaints" items={mockSuggestions.topComplaints} />
    </div>
  );
}
