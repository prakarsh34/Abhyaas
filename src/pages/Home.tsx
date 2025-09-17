import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiCode,
  FiMessageSquare,
  FiTrendingUp,
  FiChevronDown,
  FiBookOpen,
  FiUserCheck,
  FiBriefcase,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi";

// --- Navigation ---
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/resources", label: "Resources" },
  { to: "/progress", label: "Progress" },
  { to: "/mocktest", label: "Mock Tests" },  // Changed here
  { to: "/tips", label: "Tips & Tricks" },
];

// --- Company Logos ---
const companyLogos = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Netflix",
  "Salesforce",
  "Oracle",
];

// --- Features ---
const features = [
  {
    icon: <FiCode className="h-8 w-8 text-blue-600" />,
    title: "1. Select Your Target",
    description: "Choose top companies and roles to practice for real scenarios.",
  },
  {
    icon: <FiMessageSquare className="h-8 w-8 text-blue-600" />,
    title: "2. Engage with AI",
    description: "AI-driven mock interviews tailored to your chosen company.",
  },
  {
    icon: <FiTrendingUp className="h-8 w-8 text-blue-600" />,
    title: "3. Receive Feedback",
    description: "Actionable, data-backed feedback for measurable improvement.",
  },
];

// --- Resources ---
const resources = [
  {
    icon: <FiBookOpen className="h-10 w-10 text-emerald-600" />,
    title: "Resume Writing Guide",
    desc: "Tips and templates to build a strong resume.",
  },
  {
    icon: <FiUserCheck className="h-10 w-10 text-emerald-600" />,
    title: "Behavioral Questions",
    desc: "Master the STAR method for HR and manager rounds.",
  },
  {
    icon: <FiBriefcase className="h-10 w-10 text-emerald-600" />,
    title: "Case Interview Prep",
    desc: "Structured practice for consulting and strategy roles.",
  },
  {
    icon: <FiBookOpen className="h-10 w-10 text-emerald-600" />,
    title: "Technical Interview Roadmap",
    desc: "Step-by-step coding interview roadmap for engineers.",
  },
];

// --- Case Studies ---
const caseStudies = [
  {
    title: "How Priya Cracked Google with Abhyaas",
    excerpt:
      "From repeated rejections to landing a software role at Google. Priya shares her journey.",
  },
  {
    title: "Arjun’s Path to Product Management at Microsoft",
    excerpt:
      "Transitioning from engineering to PM — Arjun’s success story through focused prep.",
  },
  {
    title: "University Case Study: 120 Students, 87% Placements",
    excerpt:
      "How Abhyaas partnered with a university career cell to drive record placements.",
  },
];

// --- Testimonials ---
const testimonials = [
  {
    quote: "The AI feedback was incredibly precise. Helped me land at Google!",
    author: "Riya S.",
    company: "Software Engineer, Google",
  },
  {
    quote: "I felt much more confident after just a few sessions.",
    author: "Arjun M.",
    company: "Product Manager, Microsoft",
  },
  {
    quote: "Best way to practice without the pressure of a real panel.",
    author: "Priya K.",
    company: "Data Scientist, Amazon",
  },
];

// --- FAQ ---
const faqData = [
  { question: "Is Abhyaas for beginners?", answer: "Yes, from basics to advanced roles." },
  { question: "How is feedback generated?", answer: "AI evaluates clarity, delivery, confidence, STAR." },
  { question: "Does it support non-tech roles?", answer: "Yes, Product, Marketing, Consulting, etc." },
  { question: "Do recruiters value this?", answer: "Many recognize Abhyaas-trained candidates." },
  { question: "Is there a free plan?", answer: "Yes, 1 full mock interview free." },
  { question: "Any team/university packages?", answer: "Yes, with admin dashboards and analytics." },
];

// --- Pricing ---
const pricingPlans = [
  {
    name: "Basic",
    price: "$0",
    period: "Forever",
    features: ["1 Full Mock Interview", "Basic Feedback", "Community Access"],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/ month",
    features: [
      "Unlimited Mock Interviews",
      "Advanced AI Feedback",
      "Progress Analytics",
      "Priority Support",
    ],
    buttonText: "Go Pro",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Team / University Plans",
      "Dedicated Success Manager",
      "Advanced Analytics",
    ],
    buttonText: "Contact Sales",
  },
];

// --- FAQ Item Typing ---
interface FAQItemProps {
  item: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}

// --- FAQ Item ---
const FAQItem: React.FC<FAQItemProps> = ({ item, isOpen, onClick }) => (
  <div className="border-b border-slate-200 py-4" data-aos="fade-up">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left text-lg font-medium text-slate-800"
    >
      <span>{item.question}</span>
      <FiChevronDown
        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    {isOpen && <p className="mt-3 text-slate-600">{item.answer}</p>}
  </div>
);

const Home: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <div className="font-sans bg-white text-slate-800">
      {/* Header */}
      <header
        className="bg-white/90 shadow-sm py-4 px-8 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md"
        data-aos="fade-down"
      >
        <h1 className="text-3xl font-bold text-blue-600">Abhyaas</h1>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-slate-600 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700">
          Sign In
        </Link>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-50 to-emerald-50 text-center py-28" data-aos="fade-up">
        <h2 className="text-5xl font-extrabold mb-6">
          Ace Interviews with <span className="text-blue-600">AI</span>-Powered Practice
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Realistic mock interviews, actionable feedback, measurable growth.
        </p>
        <Link to="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700">
          Start Your Journey 🚀
        </Link>
      </section>

      {/* Brand Marquee */}
      <section className="bg-slate-50 py-6 overflow-hidden" data-aos="fade-up">
        <div className="relative flex">
          <div className="flex space-x-32 animate-marquee text-slate-500 text-xl font-semibold">
            {companyLogos.map((logo, i) => (
              <span key={i}>{logo}</span>
            ))}
            <span className="w-32" aria-hidden="true" />
          </div>
          <div className="absolute top-0 flex space-x-32 animate-marquee2 text-slate-500 text-xl font-semibold">
            {companyLogos.map((logo, i) => (
              <span key={`dup-${i}`}>{logo}</span>
            ))}
            <span className="w-32" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 text-center container mx-auto" data-aos="fade-up">
        <h3 className="text-4xl font-bold mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:-translate-y-1 transition"
              data-aos="zoom-in"
              data-aos-delay={i * 200}
            >
              {f.icon}
              <h4 className="mt-4 font-semibold text-lg">{f.title}</h4>
              <p className="text-slate-600 mt-2">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="bg-emerald-50 py-20" data-aos="fade-up">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold mb-12">Job Prep Resources</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {resources.map((r, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
                data-aos="fade-up"
                data-aos-delay={i * 200}
              >
                <div className="flex justify-center mb-4">{r.icon}</div>
                <h4 className="font-semibold text-lg">{r.title}</h4>
                <p className="text-slate-600 mt-2">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="py-20 container mx-auto" data-aos="fade-up">
        <h3 className="text-4xl font-bold mb-12 text-center">Case Studies & Blogs</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((c, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay={i * 200}
            >
              <h4 className="font-semibold text-xl mb-2">{c.title}</h4>
              <p className="text-slate-600">{c.excerpt}</p>
              <button className="mt-4 text-blue-600 font-semibold hover:underline">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="bg-blue-600 text-white py-20 text-center" data-aos="zoom-in">
        <div className="grid md:grid-cols-4 gap-12">
          <div><p className="text-5xl font-bold">87%</p><p>Success Rate</p></div>
          <div><p className="text-5xl font-bold">50k+</p><p>Active Users</p></div>
          <div><p className="text-5xl font-bold">120+</p><p>Companies</p></div>
          <div><p className="text-5xl font-bold">4.9/5</p><p>User Rating</p></div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-emerald-50 py-20 text-center" data-aos="fade-up">
        <h3 className="text-4xl font-bold mb-12">Loved by Professionals</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow"
              data-aos="zoom-in"
              data-aos-delay={i * 200}
            >
              <p className="text-slate-600 mb-4">"{t.quote}"</p>
              <p className="font-bold">{t.author}</p>
              <p className="text-sm text-blue-600">{t.company}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 container mx-auto text-center" data-aos="fade-up">
        <h3 className="text-4xl font-bold mb-12">Choose Your Plan</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((p, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl border ${p.isPopular ? "border-blue-500 shadow-2xl" : "border-slate-200"}`}
              data-aos="fade-up"
              data-aos-delay={i * 200}
            >
              {p.isPopular && <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">Most Popular</span>}
              <h4 className="mt-4 text-2xl font-bold">{p.name}</h4>
              <p className="text-3xl font-extrabold mt-2">{p.price} <span className="text-slate-500 text-base">{p.period}</span></p>
              <ul className="mt-4 space-y-2 text-slate-600">{p.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
              <Link to="/signup" className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg flex justify-center">
                {p.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-50 py-20" data-aos="fade-up">
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-4xl font-bold mb-12 text-center">FAQ</h3>
          {faqData.map((faq, i) => (
            <FAQItem
              key={i}
              item={faq}
              isOpen={openFaqIndex === i}
              onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 text-center" data-aos="fade-up">
        <h3 className="text-3xl font-bold mb-4">Ready to Land Your Dream Job?</h3>
        <Link to="/signup" className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 mb-8 inline-block">
          Get Started
        </Link>
        <div className="flex justify-center gap-8 mb-6 text-2xl">
          <FiTwitter /><FiLinkedin /><FiInstagram />
        </div>
        <p className="text-slate-400">&copy; {new Date().getFullYear()} Abhyaas. All rights reserved.</p>
      </footer>

      {/* Marquee Animations */}
      <style>
        {`
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
          @keyframes marquee2 { from { transform: translateX(100%); } to { transform: translateX(0); } }
          .animate-marquee { animation: marquee 30s linear infinite; }
          .animate-marquee2 { animation: marquee2 30s linear infinite; }
        `}
      </style>
    </div>
  );
};

export default Home;
