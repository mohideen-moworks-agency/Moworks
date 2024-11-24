import React from 'react';
import { useAnalysis } from '../contexts/AnalysisContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

function ResultsDisplay() {
  const { results, loading } = useAnalysis();
  const [expandedTables, setExpandedTables] = React.useState<string[]>([]);

  const toggleTable = (tableId: string) => {
    setExpandedTables(prev =>
      prev.includes(tableId)
        ? prev.filter(id => id !== tableId)
        : [...prev, tableId]
    );
  };

  if (!results && !loading) return null;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!results) return null;

  const tables = [
    {
      id: 'problems',
      title: 'Common Problems',
      headers: ['Problem', 'Est. Annual Cost', 'Impact Description', 'Root Causes'],
      data: results.problems || []
    },
    {
      id: 'tools',
      title: 'Current Tools & Limitations',
      headers: ['Problem', 'Common Tools', 'Limitations', 'Inefficiencies'],
      data: results.tools || []
    },
    {
      id: 'solutions',
      title: 'Recommended Solutions',
      headers: ['Problem', 'Solutions', 'Complexity', 'Timeline'],
      data: results.solutions || []
    },
    {
      id: 'benefits',
      title: 'Benefits & ROI',
      headers: ['Problem', 'Benefits', 'Cost Savings', 'Value Generated', 'ROI Timeline'],
      data: results.benefits || []
    }
  ];

  return (
    <div className="space-y-6">
      {tables.map(table => (
        <div key={table.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <button
            onClick={() => toggleTable(table.id)}
            className="w-full px-8 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">{table.title}</h3>
            {expandedTables.includes(table.id) 
              ? <ChevronUp className="w-5 h-5 text-gray-500" />
              : <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </button>
          
          {expandedTables.includes(table.id) && (
            <div className="p-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    {table.headers.map(header => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {table.data.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      {Object.values(row).map((cell, j) => (
                        <td key={j} className="px-6 py-4 text-sm text-gray-900">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
      
      {results.summary && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Summary</h3>
          <div className="space-y-4">
            <SummaryItem
              title="Total Potential Cost Impact"
              value={results.summary.costImpact}
            />
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Quick Wins</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {results.summary.quickWins.map((win, i) => (
                  <li key={i}>{win}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Strategic Recommendations</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {results.summary.strategicRecommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryItem({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <span className="text-gray-600">{title}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

export default ResultsDisplay;