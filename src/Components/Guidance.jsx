import React from 'react';

const Guidance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900">
        <div className="absolute inset-0 "></div>
      <div className="bg-gradient-to-r from-green-100 via-emerald-50 to-teal-100 shadow-inner flex flex-col justify-center items-center p-6 border border-emerald-100">
          <h1 className="text-3xl font-bold text-green-900">
            Personal Guidance
          </h1>
          <p className="text-sm sm:text-base text-green-700 font-medium text-center mt-1">
            Thoughtful wisdom and gentle reminders for your journey
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 space-y-12">
        
        {/* Quranic Wisdom */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6">
                <span className="text-2xl text-white">🌙</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
                Divine Wisdom
              </h2>
            </div>
            <blockquote className="text-xl md:text-2xl text-slate-700 font-light italic text-center leading-relaxed border-l-4 border-indigo-200 pl-6">
              "And whoever puts their trust in Allah – then He alone is sufficient for them."
              <footer className="text-lg text-slate-500 mt-4 not-italic">— Quran 65:3</footer>
            </blockquote>
          </div>
        </div>

        {/* Understanding Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8 md:p-12">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-xl text-white">💌</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-light text-slate-800 mb-4">
                  You Are Not Alone
                </h2>
                <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                  Even the strongest among us feel overwhelmed at times. This doesn't signify weakness—it simply means you're human, navigating life's complexities with courage.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reflection */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8 md:p-12">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-xl text-white">🕊️</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-light text-slate-800 mb-4">
                  A Moment of Reflection
                </h2>
                <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                  You have successfully navigated through every difficult day in your life thus far. Your resilience is stronger than you realize.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Structure */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mb-6">
                <span className="text-2xl text-white">📅</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
                Gentle Daily Rhythm
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                <div className="text-3xl mb-4">🌤️</div>
                <h3 className="text-xl font-medium text-slate-700 mb-2">Morning</h3>
                <p className="text-slate-600 font-light">Gentle stretching, hydration, and a moment of gratitude</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="text-3xl mb-4">☕</div>
                <h3 className="text-xl font-medium text-slate-700 mb-2">Midday</h3>
                <p className="text-slate-600 font-light">Mindful pause, deep breathing, and present-moment awareness</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                <div className="text-3xl mb-4">🌙</div>
                <h3 className="text-xl font-medium text-slate-700 mb-2">Evening</h3>
                <p className="text-slate-600 font-light">Reflection, gratitude journaling, and peaceful closure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Action */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-violet-100 via-purple-50 to-indigo-100 rounded-2xl shadow-xl border border-violet-200/50 p-8 md:p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full mb-6">
                <span className="text-2xl text-white">✨</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-6">
                Today's Gentle Practice
              </h2>
              <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed max-w-2xl mx-auto">
                Step outside for ten minutes without digital distractions. Observe the sky, feel the air, and allow your mind to find its natural rhythm.
              </p>
            </div>
          </div>
        </div>

        {/* Resource */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8 md:p-12">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xl text-white">📖</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-light text-slate-800 mb-4">
                  Recommended Resource
                </h2>
                <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                  Consider watching "Don't Despair from Allah's Mercy" by Mufti Menk. A brief yet profound reflection on hope and divine compassion.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prophetic Wisdom */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6">
                <span className="text-2xl text-white">🧕</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
                Prophetic Guidance
              </h2>
            </div>
            <blockquote className="text-xl md:text-2xl text-slate-700 font-light italic text-center leading-relaxed border-l-4 border-green-200 pl-6">
              "Know that victory comes with patience, relief with affliction, and ease with hardship."
              <footer className="text-lg text-slate-500 mt-4 not-italic">— Prophet Muhammad ﷺ</footer>
            </blockquote>
          </div>
        </div>

        {/* Final Reminder */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 rounded-2xl shadow-xl border border-rose-200/50 p-8 md:p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full mb-6">
                <span className="text-2xl text-white">🌼</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-6">
                Gentle Reminder
              </h2>
              <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed max-w-2xl mx-auto">
                Healing follows its own timeline, not a linear path. Practice self-compassion today—every small step forward is meaningful progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidance;