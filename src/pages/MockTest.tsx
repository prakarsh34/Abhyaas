import React, { useState, useEffect, useRef, useMemo } from "react";
import { generateTestPapers, TestPaper } from "./data";
import { CheckCircle2, XCircle, Flag, Timer, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

const TOTAL_TESTS = 30;
const TIMER_DURATION_SEC = 90 * 60; // 90 mins

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

// --- Main Component ---
const MockTestSeries: React.FC = () => {
  const testPapers = useMemo(() => generateTestPapers(TOTAL_TESTS), []);
  const [activeView, setActiveView] = useState<"dashboard" | "test" | "results">("dashboard");
  const [currentTest, setCurrentTest] = useState<TestPaper | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>([]);
  const [markedForReview, setMarkedForReview] = useState<boolean[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION_SEC);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = (test: TestPaper) => {
    setCurrentTest(test);
    setSelectedOptions(Array(test.questions.length).fill(null));
    setMarkedForReview(Array(test.questions.length).fill(false));
    setTimeLeft(TIMER_DURATION_SEC);
    setActiveView("test");
  };
  
  const submitTest = () => {
     if (window.confirm("Are you sure you want to submit the test?")) {
        setActiveView("results");
     }
  }

  useEffect(() => {
    if (activeView !== "test") {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setActiveView("results");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeView]);
  
  if (activeView === "dashboard") {
    return <TestDashboard testPapers={testPapers} onStartTest={startTest} />;
  }
  
  if (activeView === "results" && currentTest) {
    return <ResultsPage test={currentTest} selectedOptions={selectedOptions} onRetake={() => startTest(currentTest)} onDashboard={() => setActiveView("dashboard")} />;
  }

  if (activeView === "test" && currentTest) {
    return (
      <TestInterface
        test={currentTest}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        markedForReview={markedForReview}
        setMarkedForReview={setMarkedForReview}
        timeLeft={timeLeft}
        onSubmit={submitTest}
      />
    );
  }

  return null; // Fallback
};

// --- Sub-Component: TestDashboard ---
const TestDashboard: React.FC<{ testPapers: TestPaper[]; onStartTest: (test: TestPaper) => void; }> = ({ testPapers, onStartTest }) => (
  <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
    <header className="text-center mb-10">
      <h1 className="text-4xl font-bold text-indigo-700">Abhyaas 1.0 - Test Series</h1>
      <p className="text-slate-600 mt-2">Select a test to begin your practice session.</p>
    </header>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {testPapers.map((test) => (
        <div key={test.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between transition-transform hover:scale-105">
          <div>
            <FileText className="w-10 h-10 text-indigo-500 mb-3" />
            <h2 className="text-xl font-semibold text-slate-800">{test.name}</h2>
            <div className="text-sm text-slate-500 mt-2 space-y-1">
                <p>{test.questions.length} Questions</p>
                <p>{TIMER_DURATION_SEC / 60} Minutes</p>
            </div>
          </div>
          <button
            onClick={() => onStartTest(test)}
            className="mt-6 w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Test
          </button>
        </div>
      ))}
    </div>
  </div>
);

// --- Sub-Component: TestInterface ---
const TestInterface: React.FC<{
    test: TestPaper;
    selectedOptions: (number | null)[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<(number | null)[]>>;
    markedForReview: boolean[];
    setMarkedForReview: React.Dispatch<React.SetStateAction<boolean[]>>;
    timeLeft: number;
    onSubmit: () => void;
}> = (props) => {
    const { test, selectedOptions, setSelectedOptions, markedForReview, setMarkedForReview, timeLeft, onSubmit } = props;
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        questionRefs.current[activeQuestionIndex]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }, [activeQuestionIndex]);

    const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
        const newSelections = [...selectedOptions];
        newSelections[questionIndex] = optionIndex;
        setSelectedOptions(newSelections);
    };

    const handleMarkForReview = (questionIndex: number) => {
        const newMarks = [...markedForReview];
        newMarks[questionIndex] = !newMarks[questionIndex];
        setMarkedForReview(newMarks);
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col p-4">
            <header className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm">
                <h1 className="text-xl font-bold text-indigo-700">{test.name}</h1>
                <div className="flex items-center gap-2 font-semibold text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
                    <Timer size={20} />
                    <span>{formatTime(timeLeft)}</span>
                </div>
            </header>
            
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Main Scrollable Question Panel */}
                <div className="lg:col-span-3 bg-white rounded-lg shadow p-6 overflow-y-auto">
                    <div className="space-y-8">
                    {test.questions.map((question, index) => (
                        <div key={question.id} ref={(el) => { questionRefs.current[index] = el; }}>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-medium text-slate-500">
                                    Question {index + 1} ({question.category})
                                </p>
                                <button onClick={() => handleMarkForReview(index)} className={`px-3 py-1 text-xs rounded-full font-semibold flex items-center gap-2 ${markedForReview[index] ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                                    <Flag size={14} /> Mark for Review
                                </button>
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 mb-4">{question.question}</h2>
                            <ul className="space-y-3">
                                {question.options.map((option, optIdx) => (
                                    <li key={optIdx}>
                                        <label className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${selectedOptions[index] === optIdx ? 'bg-indigo-100 border-indigo-500' : 'border-slate-200 hover:border-indigo-300'}`}>
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                checked={selectedOptions[index] === optIdx}
                                                onChange={() => handleOptionSelect(index, optIdx)}
                                                className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-slate-700">{option}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Sticky Sidebar */}
                <div className="relative">
                    <div className="sticky top-4 bg-white rounded-lg shadow p-4 flex flex-col h-[calc(100vh-3.5rem)]">
                        <h3 className="text-lg font-semibold mb-4 text-slate-700">Question Palette</h3>
                        <div className="grid grid-cols-5 gap-2 flex-grow overflow-y-auto pr-2">
                            {test.questions.map((_, idx) => {
                                const isAnswered = selectedOptions[idx] !== null;
                                const isMarked = markedForReview[idx];
                                
                                let colorClasses = "bg-slate-200 text-slate-700 hover:bg-slate-300";
                                if (isMarked) colorClasses = "bg-amber-500 text-white hover:bg-amber-600";
                                else if (isAnswered) colorClasses = "bg-emerald-500 text-white hover:bg-emerald-600";
                                
                                return (
                                    <button key={idx} onClick={() => setActiveQuestionIndex(idx)} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${colorClasses}`}>
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>
                        <button onClick={onSubmit} className="w-full mt-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors">
                            Submit Test
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Sub-Component: ResultsPage ---
const ResultsPage: React.FC<{
    test: TestPaper;
    selectedOptions: (number | null)[];
    onRetake: () => void;
    onDashboard: () => void;
}> = ({ test, selectedOptions, onRetake, onDashboard }) => {
    
    const score = useMemo(() => {
        return selectedOptions.reduce((acc: number, selected, idx) => {
            return selected === test.questions[idx].correctIndex ? acc + 1 : acc;
        }, 0);
    }, [test, selectedOptions]);
    
    const correctAnswers = score;
    const incorrectAnswers = selectedOptions.filter((opt, idx) => opt !== null && opt !== test.questions[idx].correctIndex).length;
    const unanswered = selectedOptions.filter(opt => opt === null).length;

    return (
        <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-indigo-700">Test Results</h1>
                <p className="text-slate-600 mt-2">{test.name}</p>
            </header>

            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-8 text-center">
                 <h2 className="text-2xl font-semibold text-slate-800 mb-4">Your Score</h2>
                 <p className="text-6xl font-bold text-indigo-600 mb-2">{score}<span className="text-3xl text-slate-500">/{test.questions.length}</span></p>
                 <div className="flex justify-center gap-8 mt-6 text-lg">
                    <div className="text-emerald-600 font-semibold">
                        <CheckCircle2 className="mx-auto mb-1" /> {correctAnswers} Correct
                    </div>
                    <div className="text-rose-600 font-semibold">
                        <XCircle className="mx-auto mb-1" /> {incorrectAnswers} Incorrect
                    </div>
                    <div className="text-slate-500 font-semibold">
                        <Flag className="mx-auto mb-1" /> {unanswered} Unanswered
                    </div>
                 </div>
            </div>
            
            <div className="max-w-4xl mx-auto mb-8 flex justify-center gap-4">
                 <button onClick={onRetake} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">Retake Test</button>
                 <button onClick={onDashboard} className="px-6 py-3 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">Back to Dashboard</button>
            </div>

            <div className="max-w-4xl mx-auto">
                 <h3 className="text-2xl font-semibold text-slate-800 mb-6">Review Your Answers</h3>
                 <ul className="space-y-4">
                    {test.questions.map((q, idx) => {
                        const userChoice = selectedOptions[idx];
                        const isCorrect = userChoice === q.correctIndex;
                        const isIncorrect = userChoice !== null && !isCorrect;

                        return (
                            <li key={q.id} className="bg-white rounded-lg shadow p-6">
                                <p className="font-semibold text-slate-800 mb-2">{idx + 1}. {q.question}</p>
                                <ul className="space-y-2 mt-4">
                                    {q.options.map((option, optIdx) => {
                                        let classes = "border-slate-300";
                                        if (optIdx === q.correctIndex) classes = "bg-emerald-100 border-emerald-500 text-emerald-800";
                                        if (optIdx === userChoice && isIncorrect) classes = "bg-rose-100 border-rose-500 text-rose-800";

                                        return (
                                            <li key={optIdx} className={`p-3 rounded border-2 ${classes}`}>
                                               {option}
                                                {optIdx === q.correctIndex && <span className="font-bold ml-2">(Correct Answer)</span>}
                                                {optIdx === userChoice && userChoice !== q.correctIndex && <span className="font-bold ml-2">(Your Answer)</span>}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })}
                 </ul>
            </div>
        </div>
    );
};


export default MockTestSeries;