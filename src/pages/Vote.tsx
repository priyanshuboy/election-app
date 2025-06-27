import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { CheckCircle, User, Award } from 'lucide-react';
import anime from 'animejs';
import { useAuth } from '../context/AuthContext';
import { candidates } from '../data/candidates';
import { Candidate, Vote as VoteType } from '../types';
import BackgroundAnimation from '../components/BackgroundAnimation';

const Vote: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    anime({
      targets: '.vote-card',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(100),
      easing: 'easeOutExpo'
    });
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.hasVoted) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleVoteSubmit = () => {
    if (!selectedCandidate) return;

    // Update candidate votes
    const updatedCandidates = candidates.map(candidate => 
      candidate.id === selectedCandidate 
        ? { ...candidate, votes: candidate.votes + 1 }
        : candidate
    );
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));

    // Create vote record
    const vote: VoteType = {
      id: Date.now().toString(),
      userId: user!.id,
      candidateId: selectedCandidate,
      timestamp: new Date()
    };
    
    const votes = JSON.parse(localStorage.getItem('votes') || '[]');
    votes.push(vote);
    localStorage.setItem('votes', JSON.stringify(votes));

    // Update user status
    const updatedUser = { ...user!, hasVoted: true, voteId: vote.id };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.id === user!.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setVoteSubmitted(true);
    
    // Animate success
    anime({
      targets: '.success-animation',
      scale: [0, 1],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutBack'
    });
  };

  if (voteSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <BackgroundAnimation />
        <div className="success-animation max-w-md w-full bg-white p-8 rounded-xl shadow-2xl text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vote Submitted Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for participating in the democratic process. Your vote has been recorded securely.
          </p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const selectedCandidateData = candidates.find(c => c.id === selectedCandidate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <BackgroundAnimation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cast Your Vote</h1>
          <p className="text-xl text-gray-600">Select your preferred candidate</p>
        </div>

        {!showConfirmation ? (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`vote-card cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 opacity-0 ${
                    selectedCandidate === candidate.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedCandidate(candidate.id)}
                >
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{candidate.symbol}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                      <p className="text-gray-600">{candidate.party}</p>
                    </div>
                    {selectedCandidate === candidate.id && (
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{candidate.votes} votes</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      <span>Party: {candidate.party}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowConfirmation(true)}
                disabled={!selectedCandidate}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Confirm Vote
              </button>
            </div>
          </>
        ) : (
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Confirm Your Vote
            </h2>
            
            {selectedCandidateData && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{selectedCandidateData.symbol}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedCandidateData.name}
                    </h3>
                    <p className="text-gray-600">{selectedCandidateData.party}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-200">
              <p className="text-yellow-800 text-sm">
                <strong>Important:</strong> Once submitted, your vote cannot be changed. 
                Please confirm your selection carefully.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={handleVoteSubmit}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Submit Vote
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vote;