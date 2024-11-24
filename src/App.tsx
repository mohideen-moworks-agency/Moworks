import React from 'react';
import { BarChart3, Building2, Globe2, Users2 } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import { AnalysisProvider } from './contexts/AnalysisContext';
import Navbar from './components/Navbar';
import AnalysisForm from './components/AnalysisForm';
import ResultsDisplay from './components/ResultsDisplay';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <AuthProvider>
      <AnalysisProvider>
        <div className="min-h-screen bg-cream pattern-bg">
          <Navbar />
          <main className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section className="isometric-card bg-white rounded-2xl overflow-hidden">
                  <div className="forest-gradient p-4">
                    <h2 className="text-2xl font-bold text-white font-outfit flex items-center gap-2">
                      Business Intelligence AI
                    </h2>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <StatsCard
                        icon={<Globe2 className="w-6 h-6 text-forest-500" />}
                        title="Global Reach"
                        value="200+ Regions"
                      />
                      <StatsCard
                        icon={<Building2 className="w-6 h-6 text-coral-500" />}
                        title="Industries"
                        value="50+ Sectors"
                      />
                      <StatsCard
                        icon={<Users2 className="w-6 h-6 text-yellow" />}
                        title="Company Sizes"
                        value="All Ranges"
                      />
                      <StatsCard
                        icon={<BarChart3 className="w-6 h-6 text-sage-500" />}
                        title="Departments"
                        value="15+ Types"
                      />
                    </div>
                    <AnalysisForm />
                  </div>
                </section>
                <ResultsDisplay />
              </div>
              <div className="lg:col-span-1">
                <UserDashboard />
              </div>
            </div>
          </main>
        </div>
      </AnalysisProvider>
    </AuthProvider>
  );
}

function StatsCard({ 
  icon, 
  title, 
  value 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string;
}) {
  return (
    <div className="isometric-card bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <h3 className="text-sm font-medium text-gray-600 font-outfit">{title}</h3>
          <p className="text-lg font-semibold text-gray-900 font-outfit">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default App;