import React from "react";

const TipsPage: React.FC = () => {
  const tips = [
    "Practice coding regularly and time yourself.",
    "Use the STAR method for answering behavioral questions.",
    "Mock interviews with peers or AI can boost confidence.",
    "Keep your resume concise and tailored to each role.",
    "Review company-specific interview patterns before the interview.",
    "Stay calm and think aloud during problem-solving questions.",
    "Take feedback seriously and iterate on your performance.",
  ];

  return (
    <main className="min-h-screen py-20 px-8 bg-emerald-50">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4">Tips & Tricks</h1>
        <p className="text-lg text-slate-700 max-w-xl mx-auto">
          These actionable tips will help you prepare better and boost your interview success.
        </p>
      </header>

      <ul className="max-w-3xl mx-auto space-y-6">
        {tips.map((tip, i) => (
          <li
            key={i}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
            aria-label={`Tip ${i + 1}`}
          >
            <span className="font-semibold text-lg mr-4 text-blue-600">{i + 1}.</span>
            <span className="text-slate-700">{tip}</span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TipsPage;
