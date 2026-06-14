// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import { motion } from 'framer-motion';
// const Guidance = () => {
//   const { formValues } = useAppContext();
//   const [guidance, setGuidance] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     let isCancelled = false;

//     const fetchGuidance = async () => {
//       if (isCancelled) return;
//       try {
//         const res = await fetch('http://127.0.0.1:5000/api/guidance', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             cause: formValues?.primary_cause,
//             emotion: formValues?.emotion_detected,
//             risk: formValues?.final_score,
//           }),
//         });

//         const data = await res.json();

//         if (!isCancelled) {
//           setGuidance(data.data);
//         }
//       } catch (err) {
//         console.log('Error:', err);
//         if (!isCancelled) setError(true);
//       } finally {
//         if (!isCancelled) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchGuidance();

//     return () => {
//       isCancelled = true;
//     };
//   }, [formValues]);

//   // ─── Loading State ───
//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-green-50 to-emerald-50">
//         <div className="relative">
//           <div className="w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
//           <span className="absolute inset-0 flex items-center justify-center text-3xl">
//             🤲
//           </span>
//         </div>
//         <h2 className="text-2xl font-light text-slate-700 mt-6">
//           Crafting your personalized guidance...
//         </h2>
//       </div>
//     );
//   }

//   // ─── Error State ───
//   if (error || !guidance) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-green-50 to-emerald-50">
//         <div className="text-6xl mb-4">😔</div>
//         <h2 className="text-2xl font-semibold text-slate-700">
//           Something went wrong
//         </h2>
//       </div>
//     );
//   }

//   // ─── Card ───
//   const Card = ({ title, emoji, items, borderColor }) => (
//     <div className={`rounded-2xl shadow-lg border ${borderColor} p-6 bg-white`}>
//       <div className="flex items-center space-x-3 mb-4">
//         <span className="text-2xl">{emoji}</span>
//         <h3 className="font-semibold text-lg text-slate-700">{title}</h3>
//       </div>
//       <ul className="space-y-3">
//         {items?.map((item, i) => (
//           <li
//             key={i}
//             className="flex items-start space-x-2 text-sm text-slate-600"
//           >
//             <span className="text-green-500 mt-1">●</span>
//             <span>{item}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );

//   // ─── Main UI ───
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden relative">
//       <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200 opacity-20 blur-3xl rounded-full"></div>

// <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200 opacity-20 blur-3xl rounded-full"></div>
//       {/* Header */}
//       <div className="bg-gradient-to-r from-green-100 via-emerald-50 to-teal-100 p-8 text-center">
//         <h1 className="text-3xl font-bold text-green-900">
//           Your Personalized Guidance
//         </h1>
//       </div>

//       <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200 opacity-20 blur-3xl rounded-full"></div>

// <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200 opacity-20 blur-3xl rounded-full"></div>
//         {/* Islamic Quote */}
//         <div className="bg-emerald-50 p-8 rounded-2xl text-center">
//           <h2 className="text-2xl font-light mb-4">Divine Words of Comfort</h2>
//           <p className="italic text-lg text-emerald-800">
//             {guidance?.islamic_quote}
//           </p>
//         </div>

//         {/* Story */}
//         <div className="bg-orange-50 p-8 rounded-2xl">
//           <h2 className="text-2xl font-light mb-4 text-center">
//             A Story For Your Heart
//           </h2>
//           <p className="whitespace-pre-line text-slate-700">
//             {guidance?.supportive_story}
//           </p>
//         </div>

//         {/* Routines (ONLY MORNING + EVENING) */}
//         <div className="grid md:grid-cols-2 gap-6">
//           <Card
//             title="Morning Routine"
//             emoji="🌤️"
//             items={guidance?.morning_routine}
//             borderColor="border-amber-100"
//           />

//           <Card
//             title="Evening Routine"
//             emoji="🌙"
//             items={guidance?.evening_routine}
//             borderColor="border-purple-100"
//           />
//         </div>

//         {/* Habits & Avoid */}
//         <div className="grid md:grid-cols-2 gap-6">
//           <Card
//             title="Habits to Build"
//             emoji="🌱"
//             items={guidance?.habits_to_build}
//             borderColor="border-green-100"
//           />

//           <Card
//             title="Things to Avoid"
//             emoji="🚫"
//             items={guidance?.things_to_avoid}
//             borderColor="border-red-100"
//           />
//         </div>

//         {/* Weekly */}
//         <Card
//           title="Weekly Focus"
//           emoji="📅"
//           items={guidance?.weekly_focus}
//           borderColor="border-indigo-100"
//         />

//         {/* Islamic Guidance */}
//         <Card
//           title="Islamic Guidance"
//           emoji="🧕"
//           items={guidance?.islamic_guidance}
//           borderColor="border-teal-100"
//         />

//         {/* Motivation */}
//         <div className="bg-violet-100 p-8 rounded-2xl">
//           <h2 className="text-2xl text-center mb-4">Words of Encouragement</h2>
//           {guidance?.motivation?.map((item, i) => (
//             <p key={i} className="mb-2">
//               💛 {item}
//             </p>
//           ))}
//         </div>

//         {/* Final */}
//         <div className="text-center p-8 bg-rose-50 rounded-2xl">
//           <h2 className="text-2xl mb-4">A Gentle Reminder</h2>
//           <p>Healing follows its own timeline. Every step matters.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Guidance;
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Guidance = () => {
  const { formValues } = useAppContext();

  const [guidance, setGuidance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchGuidance = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/guidance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cause: formValues?.primary_cause,
            emotion: formValues?.emotion_detected,
            risk: formValues?.final_score,
          }),
        });

        const data = await res.json();

        if (!isCancelled) {
          setGuidance(data.data);
        }
      } catch (err) {
        console.log('Guidance Error:', err);

        if (!isCancelled) {
          setError(true);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchGuidance();

    return () => {
      isCancelled = true;
    };
  }, [formValues]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>

          <span className="absolute inset-0 flex items-center justify-center text-3xl">
            🤲
          </span>
        </div>

        <h2 className="text-2xl font-light text-slate-700 mt-6">
          Preparing your personalized guidance...
        </h2>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error || !guidance) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="text-6xl mb-4">😔</div>

        <h2 className="text-2xl font-semibold text-slate-700">
          Something went wrong
        </h2>

        <p className="text-slate-500 mt-2">Please try again later.</p>
      </div>
    );
  }

  // =========================
  // CARD
  // =========================
  const Card = ({ title, emoji, items, borderColor }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`
        rounded-3xl
        shadow-xl
        border
        ${borderColor}
        p-6
        bg-white/80
        backdrop-blur-md
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
      `}
    >
      <div className="flex items-center space-x-3 mb-5">
        <span className="text-3xl">{emoji}</span>

        <h3 className="font-semibold text-xl text-slate-700">{title}</h3>
      </div>

      <ul className="space-y-4">
        {items?.map((item, i) => (
          <li key={i} className="flex items-start space-x-3 text-slate-600">
            <span className="text-emerald-500 mt-1 text-sm">●</span>

            <span className="leading-7">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  // =========================
  // MAIN UI
  // =========================
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden relative">
      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200 opacity-20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200 opacity-20 blur-3xl rounded-full"></div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-green-100 via-emerald-50 to-teal-100 shadow-sm border-b border-emerald-100 p-8 text-center">
        <h1 className="text-4xl font-bold text-emerald-900 mb-3">
          Your Personalized Guidance
        </h1>

        <p className="text-slate-600 text-lg">
          Small steps toward healing still matter.
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 space-y-10">
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-emerald-50/80 backdrop-blur-md p-8 rounded-3xl text-center shadow-lg border border-emerald-100"
        >
          <h2 className="text-3xl font-semibold text-emerald-900 mb-6">
            Divine Words of Comfort
          </h2>

          <p className="italic text-lg md:text-xl text-emerald-800 leading-9">
            {guidance?.islamic_quote}
          </p>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="bg-orange-50/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-orange-100"
        >
          <h2 className="text-3xl font-semibold text-center text-orange-900 mb-6">
            A Story For Your Heart
          </h2>

          <p className="whitespace-pre-line leading-9 text-[17px] text-slate-700">
            {guidance?.supportive_story}
          </p>
        </motion.div>

        {/* Morning & Evening */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card
            title="Morning Routine"
            emoji="🌤️"
            items={guidance?.morning_routine}
            borderColor="border-amber-100"
          />

          <Card
            title="Evening Routine"
            emoji="🌙"
            items={guidance?.evening_routine}
            borderColor="border-purple-100"
          />
        </div>

        {/* Avoid */}
        <Card
          title="Things To Avoid"
          emoji="🚫"
          items={guidance?.things_to_avoid}
          borderColor="border-red-100"
        />

        {/* Final Reminder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center p-10 bg-rose-50/80 backdrop-blur-md rounded-3xl shadow-lg border border-rose-100"
        >
          <h2 className="text-3xl font-semibold text-rose-900 mb-5">
            A Gentle Reminder
          </h2>

          <p className="text-lg text-slate-700 leading-8 max-w-3xl mx-auto">
            Healing does not happen all at once. Some days will feel lighter,
            some heavier — and both are part of the journey. Be patient with
            yourself, keep turning back to Allah, and remember that even quiet
            progress is still progress.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Guidance;
