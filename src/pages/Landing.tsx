import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Vote, Shield, BarChart3, Users, ChevronRight } from 'lucide-react';
import anime from 'animejs';
import BackgroundAnimation from '../components/BackgroundAnimation';

const Landing: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero content
    anime.timeline()
      .add({
        targets: '.hero-title',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
      })
      .add({
        targets: '.hero-subtitle',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
      }, '-=500')
      .add({
        targets: '.hero-cta',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutBack'
      }, '-=400');

    // Animate feature cards
    anime({
      targets: '.feature-card',
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(200),
      easing: 'easeOutExpo'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <BackgroundAnimation />
      
      {/* Hero Section*/}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="hero-title text-5xl md:text-7xl font-bold text-gray-900 mb-6 opacity-0">
              Secure Digital
              <span className="block text-blue-600">Voting Platform</span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto opacity-0">
              Experience democracy in the digital age with Aadhaar-based authentication, 
              transparent voting, and real-time results.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center group"
              >
                Start Voting
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/results"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                View Results
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Election?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge technology to ensure your vote is secure, private, and counts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-card bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 opacity-0">
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Aadhaar Secured</h3>
              <p className="text-gray-600">
                Authenticate using your Aadhaar card for maximum security and fraud prevention.
              </p>
            </div>

            <div className="feature-card bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 opacity-0">
              <div className="bg-green-100 p-3 rounded-full w-fit mb-6">
                <Vote className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Voting</h3>
              <p className="text-gray-600">
                Simple, intuitive interface makes voting accessible to everyone, anywhere.
              </p>
            </div>

            <div className="feature-card bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 opacity-0">
              <div className="bg-yellow-100 p-3 rounded-full w-fit mb-6">
                <BarChart3 className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Results</h3>
              <p className="text-gray-600">
                Watch live vote counts and detailed analytics as results come in.
              </p>
            </div>

            <div className="feature-card bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 opacity-0">
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparent</h3>
              <p className="text-gray-600">
                Complete transparency with verifiable voting records and public audit trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of citizens who trust VoteSecure for secure, convenient digital voting.
          </p>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-300 inline-flex items-center group"
          >
            Get Started Now
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
      <div className="text-center text-xs text-gray-500 py-6">
  © {new Date().getFullYear()} All rights reserved | Built by Priyanshu Kushwah, Sahil Rajput & Anna Bhagwat
</div>
    </div>
  );
};

export default Landing;