import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { BarChart3, PieChart, Users, Trophy } from 'lucide-react';
import anime from 'animejs';
import { candidates as initialCandidates } from '../data/candidates';
import BackgroundAnimation from '../components/BackgroundAnimation';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Results: React.FC = () => {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [viewType, setViewType] = useState<'pie' | 'bar'>('pie');

  useEffect(() => {
    // Load updated candidate data
    const storedCandidates = localStorage.getItem('candidates');
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }

    // Animate elements
    anime({
      targets: '.results-card',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(200),
      easing: 'easeOutExpo'
    });
  }, []);

  const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
  const winner = candidates.reduce((prev, current) => 
    current.votes > prev.votes ? current : prev
  );

  const pieData = {
    labels: candidates.map(c => c.name),
    datasets: [
      {
        data: candidates.map(c => c.votes),
        backgroundColor: candidates.map(c => c.color),
        borderColor: candidates.map(c => c.color),
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: candidates.map(c => c.name),
    datasets: [
      {
        label: 'Votes',
        data: candidates.map(c => c.votes),
        backgroundColor: candidates.map(c => c.color + '80'),
        borderColor: candidates.map(c => c.color),
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const percentage = totalVotes > 0 ? ((context.raw / totalVotes) * 100).toFixed(1) : '0.0';
            return `${context.label}: ${context.raw} votes (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <BackgroundAnimation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Election Results</h1>
          <p className="text-xl text-gray-600">Real-time voting statistics and results</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="results-card bg-white p-6 rounded-xl shadow-lg opacity-0">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{totalVotes}</h3>
            <p className="text-gray-600">Total Votes</p>
          </div>

          <div className="results-card bg-white p-6 rounded-xl shadow-lg opacity-0">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{winner.name}</h3>
            <p className="text-gray-600">Leading Candidate</p>
          </div>

          <div className="results-card bg-white p-6 rounded-xl shadow-lg opacity-0">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{winner.votes}</h3>
            <p className="text-gray-600">Leading Votes</p>
          </div>

          <div className="results-card bg-white p-6 rounded-xl shadow-lg opacity-0">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <PieChart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {totalVotes > 0 ? ((winner.votes / totalVotes) * 100).toFixed(1) : '0.0'}%
            </h3>
            <p className="text-gray-600">Leading Percentage</p>
          </div>
        </div>

        {/* Chart View Toggle */}
        <div className="results-card flex justify-center mb-8 opacity-0">
          <div className="bg-white p-2 rounded-lg shadow-lg">
            <button
              onClick={() => setViewType('pie')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                viewType === 'pie'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Pie Chart
            </button>
            <button
              onClick={() => setViewType('bar')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                viewType === 'bar'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Bar Chart
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chart */}
          <div className="results-card bg-white p-6 rounded-xl shadow-lg opacity-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Vote Distribution
            </h2>
            <div className="h-80 flex items-center justify-center">
              {viewType === 'pie' ? (
                <Pie data={pieData} options={chartOptions} />
              ) : (
                <Bar data={barData} options={chartOptions} />
              )}
            </div>
          </div>

          {/* Detailed Results */}
          <div className="results-card bg-white p-6 rounded-xl shadow-lg opacity-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Candidate Results</h2>
            <div className="space-y-4">
              {candidates
                .sort((a, b) => b.votes - a.votes)
                .map((candidate, index) => {
                  const percentage = totalVotes > 0 ? ((candidate.votes / totalVotes) * 100) : 0;
                  return (
                    <div key={candidate.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{candidate.symbol}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                            <p className="text-sm text-gray-600">{candidate.party}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900">{candidate.votes}</div>
                          <div className="text-sm text-gray-600">{percentage.toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: candidate.color,
                          }}
                        />
                      </div>
                      {index === 0 && candidate.votes > 0 && (
                        <div className="mt-2 flex items-center text-green-600">
                          <Trophy className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Leading</span>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {totalVotes === 0 && (
          <div className="results-card text-center py-12 bg-white rounded-xl shadow-lg mt-8 opacity-0">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Votes Yet</h3>
            <p className="text-gray-600">
              Results will appear here as votes are cast. Be the first to vote!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;