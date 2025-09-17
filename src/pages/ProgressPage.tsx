import React, { useState, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Award, Briefcase, Target, Plus, Star, TrendingUp, BookOpen, ListChecks } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface InterviewRecord {
  id: number;
  company: string;
  date: string;
  type: 'Technical' | 'HR' | 'System Design' | 'Behavioral';
  score: number; // percentage
  notes?: string; // Optional field for detailed feedback
}

interface TargetCompany {
  id: number;
  name: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
}

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: React.ElementType;
  earned: boolean;
}

// --- INITIAL MOCK DATA ---
const initialInterviewRecords: InterviewRecord[] = [
  { id: 1, company: "TechCorp", date: "2025-09-10", type: 'Technical', score: 80, notes: "Struggled with the DP question." },
  { id: 2, company: "Innovate LLC", date: "2025-09-05", type: 'Behavioral', score: 95, notes: "STAR method worked well." },
  { id: 3, company: "DataSys", date: "2025-08-28", type: 'System Design', score: 78, notes: "Need to study caching strategies more." },
  { id: 4, company: "WebWeavers", date: "2025-09-15", type: 'Technical', score: 92, notes: "Data structures questions were easy." },
];

const initialTargetCompanies: TargetCompany[] = [
    { id: 1, name: "Google", status: 'Applied' },
    { id: 2, name: "Amazon", status: 'Interviewing' },
    { id: 3, name: "Netflix", status: 'Offer' },
    { id: 4, name: "Microsoft", status: 'Rejected' },
];

const QUESTIONS_PER_INTERVIEW = 75;

// --- MAIN DASHBOARD COMPONENT ---
const ProgressPage: React.FC = () => {
  const [interviews, setInterviews] = useState<InterviewRecord[]>(initialInterviewRecords);
  const [targets, setTargets] = useState<TargetCompany[]>(initialTargetCompanies);
  const [isInterviewModalOpen, setInterviewModalOpen] = useState(false);
  const [isTargetModalOpen, setTargetModalOpen] = useState(false);
  const [historyFilter, setHistoryFilter] = useState<'All' | InterviewRecord['type']>('All');

  // --- CALCULATED STATS ---
  const totalInterviews = interviews.length;
  const totalQuestionsPracticed = totalInterviews * QUESTIONS_PER_INTERVIEW;

  const averageScore = useMemo(() => {
    if (interviews.length === 0) return 0;
    const total = interviews.reduce((sum, item) => sum + item.score, 0);
    return Math.round(total / interviews.length);
  }, [interviews]);
  
  const performanceByCategory = useMemo(() => {
    const categories: InterviewRecord['type'][] = ['Technical', 'Behavioral', 'System Design', 'HR'];
    const data = categories.map(category => {
        const categoryInterviews = interviews.filter(i => i.type === category);
        if (categoryInterviews.length === 0) return { name: category, score: 0 };
        const avg = categoryInterviews.reduce((sum, item) => sum + item.score, 0) / categoryInterviews.length;
        return { name: category, score: Math.round(avg) };
    });
    return data;
  }, [interviews]);

  const filteredInterviews = useMemo(() => {
    if (historyFilter === 'All') return interviews;
    return interviews.filter(i => i.type === historyFilter);
  }, [interviews, historyFilter]);

  const badges: Badge[] = useMemo(() => [
    { id: 1, name: "Getting Started", description: "Log your first interview.", icon: Star, earned: totalInterviews >= 1 },
    { id: 2, name: "Practice Pro", description: "Complete 5 interviews.", icon: BookOpen, earned: totalInterviews >= 5 },
    { id: 3, name: "High Achiever", description: "Achieve an average score of 85% or more.", icon: Award, earned: averageScore >= 85 },
    { id: 4, name: "On a Roll", description: "Score 80% or more in 3 consecutive interviews.", icon: TrendingUp, earned: interviews.slice(0, 3).every(i => i.score >= 80) && interviews.length >= 3 },
  ], [totalInterviews, averageScore, interviews]);
  
  // --- HANDLER FUNCTIONS ---
  const handleAddInterview = (record: Omit<InterviewRecord, 'id'>) => {
    setInterviews(prev => [{ ...record, id: Date.now() }, ...prev]);
  };
  
  const handleAddTarget = (target: Omit<TargetCompany, 'id'>) => {
    setTargets(prev => [...prev, { ...target, id: Date.now() }]);
  };
  
  const handleTargetStatusChange = (id: number, newStatus: TargetCompany['status']) => {
    setTargets(targets.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };


  // --- UI RENDER ---
  return (
    <>
      <div className="min-h-screen p-4 sm:p-8 bg-slate-100 text-slate-800">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">Your Progress Dashboard</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Track your journey, manage targets, and celebrate your achievements.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Briefcase} title="Interviews Logged" value={totalInterviews.toString()} />
          <StatCard icon={ListChecks} title="Questions Practiced" value={totalQuestionsPracticed.toString()} />
          <StatCard icon={Award} title="Average Score" value={`${averageScore}%`} />
          <StatCard icon={Target} title="Companies Targeted" value={targets.length.toString()} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PerformanceChart trendData={interviews} categoryData={performanceByCategory} />
            <InterviewHistoryTable interviews={filteredInterviews} filter={historyFilter} setFilter={setHistoryFilter} onLogInterview={() => setInterviewModalOpen(true)} />
          </div>
          
          <div className="space-y-8">
            <TargetCompaniesCard targets={targets} onStatusChange={handleTargetStatusChange} onAddTarget={() => setTargetModalOpen(true)} />
            <AchievementsCard badges={badges} />
          </div>
        </div>
      </div>
      
      <LogInterviewModal isOpen={isInterviewModalOpen} onClose={() => setInterviewModalOpen(false)} onSave={handleAddInterview} />
      <AddTargetModal isOpen={isTargetModalOpen} onClose={() => setTargetModalOpen(false)} onSave={handleAddTarget} />
    </>
  );
};

// --- Child Components ---

const StatCard: React.FC<{ icon: React.ElementType, title: string, value: string }> = ({ icon: Icon, title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6">
        <div className="bg-indigo-100 p-4 rounded-full">
            <Icon className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const PerformanceChart: React.FC<{ trendData: InterviewRecord[], categoryData: {name: string, score: number}[] }> = ({ trendData, categoryData }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Performance Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[300px]">
            <div>
                <h4 className="text-center text-sm font-medium text-slate-600 mb-2">Trend Over Time</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData.slice().reverse()} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="date" fontSize={12} tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                        <YAxis domain={[0, 100]} fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div>
                <h4 className="text-center text-sm font-medium text-slate-600 mb-2">Score by Category</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 20, left: 15, bottom: 5 }}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis type="number" domain={[0, 100]} fontSize={12} />
                        <YAxis type="category" dataKey="name" width={80} fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#6366f1" barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);

const InterviewHistoryTable: React.FC<{ interviews: InterviewRecord[], filter: string, setFilter: (filter: any) => void, onLogInterview: () => void }> = ({ interviews, filter, setFilter, onLogInterview }) => (
     <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Interview History</h3>
            <button onClick={onLogInterview} className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"><Plus size={16} /> Log Interview</button>
        </div>
        <div className="flex gap-2 mb-4 border-b border-slate-200">
             {(['All', 'Technical', 'Behavioral', 'System Design', 'HR'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 text-sm font-medium ${filter === f ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}>
                    {f}
                </button>
             ))}
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="text-sm text-slate-500 bg-slate-50">
                    <tr>
                        <th className="p-3">Date</th>
                        <th className="p-3">Company</th>
                        <th className="p-3">Type</th>
                        <th className="p-3 text-right">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {interviews.map(interview => (
                        <tr key={interview.id} className="border-b border-slate-100">
                            <td className="p-3">{new Date(interview.date).toLocaleDateString()}</td>
                            <td className="p-3 font-medium">{interview.company}</td>
                            <td className="p-3"><span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{interview.type}</span></td>
                            <td className="p-3 text-right font-bold text-indigo-600">{interview.score}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const TargetCompaniesCard: React.FC<{ targets: TargetCompany[], onStatusChange: (id: number, status: TargetCompany['status']) => void, onAddTarget: () => void }> = ({ targets, onStatusChange, onAddTarget }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Target Companies</h3>
            <button onClick={onAddTarget} className="text-indigo-600 hover:text-indigo-800"><Plus /></button>
        </div>
        <ul className="space-y-3">
            {targets.map(target => (
                <li key={target.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                    <span className="font-medium">{target.name}</span>
                    <select value={target.status} onChange={(e) => onStatusChange(target.id, e.target.value as TargetCompany['status'])} className="text-xs font-bold border-none rounded-full bg-transparent focus:ring-0">
                         <option>Applied</option>
                         <option>Interviewing</option>
                         <option>Offer</option>
                         <option>Rejected</option>
                    </select>
                </li>
            ))}
        </ul>
    </div>
);

const AchievementsCard: React.FC<{ badges: Badge[] }> = ({ badges }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Achievements</h3>
        <div className="grid grid-cols-2 gap-4">
            {badges.map(badge => (
                <div key={badge.id} title={badge.description} className={`p-4 rounded-lg text-center ${badge.earned ? 'bg-emerald-50 border border-emerald-200' : 'bg-slate-100 border border-slate-200 opacity-60'}`}>
                    <badge.icon className={`mx-auto w-10 h-10 ${badge.earned ? 'text-emerald-500' : 'text-slate-400'}`} />
                    <p className={`mt-2 text-sm font-semibold ${badge.earned ? 'text-emerald-800' : 'text-slate-600'}`}>{badge.name}</p>
                </div>
            ))}
        </div>
    </div>
);

const LogInterviewModal: React.FC<{ isOpen: boolean, onClose: () => void, onSave: (record: Omit<InterviewRecord, 'id'>) => void }> = ({ isOpen, onClose, onSave }) => {
    const [company, setCompany] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState<'Technical' | 'HR' | 'System Design' | 'Behavioral'>('Technical');
    const [score, setScore] = useState(80);
    const [notes, setNotes] = useState('');

    const handleSubmit = () => {
        if (!company || !date) return;
        onSave({ company, date, type, score, notes });
        onClose();
        // Reset form
        setCompany(''); setDate(''); setType('Technical'); setScore(80); setNotes('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Log New Interview</h2>
                <div className="space-y-4">
                    <input type="text" placeholder="Company Name" value={company} onChange={e => setCompany(e.target.value)} className="w-full p-2 border border-slate-300 rounded" />
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border border-slate-300 rounded" />
                    <select value={type} onChange={e => setType(e.target.value as any)} className="w-full p-2 border border-slate-300 rounded">
                        <option>Technical</option><option>Behavioral</option><option>System Design</option><option>HR</option>
                    </select>
                    <input type="number" placeholder="Score (%)" value={score} onChange={e => setScore(parseInt(e.target.value))} max="100" min="0" className="w-full p-2 border border-slate-300 rounded" />
                    <textarea placeholder="Notes (e.g., tricky questions, what to improve)" value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-2 border border-slate-300 rounded h-24" />
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <button onClick={onClose} className="px-4 py-2 bg-slate-200 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white rounded">Save Record</button>
                </div>
            </div>
        </div>
    );
};

const AddTargetModal: React.FC<{ isOpen: boolean, onClose: () => void, onSave: (target: Omit<TargetCompany, 'id'>) => void }> = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState<'Applied' | 'Interviewing' | 'Offer' | 'Rejected'>('Applied');

    const handleSubmit = () => {
        if (!name) return;
        onSave({ name, status });
        onClose();
        setName(''); setStatus('Applied');
    };
    
    if (!isOpen) return null;

     return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Add Target Company</h2>
                <div className="space-y-4">
                    <input type="text" placeholder="Company Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-slate-300 rounded" />
                    <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full p-2 border border-slate-300 rounded">
                        <option>Applied</option><option>Interviewing</option><option>Offer</option><option>Rejected</option>
                    </select>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <button onClick={onClose} className="px-4 py-2 bg-slate-200 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white rounded">Save Target</button>
                </div>
            </div>
        </div>
    );
};

export default ProgressPage;