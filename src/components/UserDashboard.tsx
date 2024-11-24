import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Activity, Clock, AlertTriangle } from 'lucide-react';

function UserDashboard() {
  const { user } = useAuth();
  const [analysisCount, setAnalysisCount] = React.useState(0);
  const maxDaily = 3;

  if (!user) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
        <Activity className="w-5 h-5 text-blue-500" />
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Daily Analyses</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-blue-700">
                {analysisCount} / {maxDaily}
              </p>
              <p className="text-sm text-blue-600">
                Remaining today
              </p>
            </div>
            <div className="h-16 w-16">
              <svg viewBox="0 0 36 36" className="stroke-current text-blue-500">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                  strokeDasharray={`${(analysisCount / maxDaily) * 100}, 100`}
                  className="transform -rotate-90 origin-center"
                />
              </svg>
            </div>
          </div>
        </div>

        {analysisCount >= maxDaily && (
          <div className="bg-yellow-50 rounded-xl p-4 flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Daily Limit Reached
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                Your analysis limit will reset in {calculateTimeUntilReset()}
              </p>
            </div>
          </div>
        )}

        <div className="border-t border-gray-100 pt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{activity.action}</span>
                <span className="text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const recentActivity = [
  { action: 'Analysis Performed', time: '2 mins ago' },
  { action: 'Report Generated', time: '1 hour ago' },
  { action: 'Analysis Performed', time: '3 hours ago' }
];

function calculateTimeUntilReset() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
}

export default UserDashboard;