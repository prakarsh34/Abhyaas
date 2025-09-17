import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// --- INTERFACES ---
interface Question {
  question: string;
  answer: string;
}

interface SubTopic {
  name: string;
  questions: Question[];
}

interface Topic {
  name: string;
  importance: string;
  subtopics: SubTopic[];
}

// --- MASSIVELY EXPANDED DATA ARRAY ---
const topics: Topic[] = [
  {
    name: "Behavioral Questions",
    importance: "Crucial for assessing your soft skills, cultural fit, and how you handle real-world challenges. Strong answers demonstrate professionalism and experience.",
    subtopics: [
      {
        name: "General",
        questions: [
          { question: "Tell me about yourself.", answer: "Craft a 2-minute pitch that connects your experience, skills, and passion to the job role. Start with your recent experience, highlight key achievements, and explain why you are interested in this specific company and position." },
          { question: "Why do you want to work for this company?", answer: "Research the company's mission, products, and culture. Connect your personal values and career goals to what the company offers, showing genuine interest beyond just the job description." },
          { question: "What are your greatest strengths and weaknesses?", answer: "For strengths, pick job-relevant skills with specific examples. For weaknesses, be honest about a real area of improvement and show what steps you are taking to address it." },
          { question: "Where do you see yourself in 5 years?", answer: "Show ambition and a desire for growth that aligns with the company's potential career paths. Talk about learning new skills, taking on more responsibility, or becoming a subject matter expert." },
        ],
      },
      {
        name: "Teamwork & Problem Solving",
        questions: [
          { question: "Tell me about a time you had to deal with a difficult coworker.", answer: "Use the STAR method (Situation, Task, Action, Result). Focus on your professional approach, empathy, and communication skills to achieve a positive, collaborative outcome." },
          { question: "Describe a time you failed. What did you learn?", answer: "Be honest about a real failure. Emphasize accountability and what you learned. Show how you applied that lesson to achieve a better outcome in a subsequent project." },
          { question: "How do you handle working under pressure?", answer: "Provide a specific example of a high-pressure situation. Detail your process for prioritizing tasks, managing time effectively, and communicating transparently with stakeholders to meet the deadline." },
          { question: "Give an example of a time you disagreed with a manager.", answer: "Focus on a professional, data-driven approach. Explain how you presented your perspective with supporting evidence, listened to their viewpoint, and worked towards a compromise that benefited the project." },
        ],
      },
    ],
  },
  {
    name: "JavaScript Concepts",
    importance: "Tests your fundamental grasp of the web's core language. Essential for any frontend role and increasingly important for backend (Node.js) positions.",
    subtopics: [
        {
            name: "Core Concepts",
            questions: [
                { question: "Explain what a closure is.", answer: "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). It gives you access to an outer function's scope from an inner function, even after the outer function has finished executing." },
                { question: "What is the 'this' keyword and how does it work?", answer: "The `this` keyword refers to the object it belongs to. Its value is determined by how a function is called (the call-site). Arrow functions are the exception; they lexically bind `this` from their surrounding code." },
                { question: "Explain the Event Loop.", answer: "The Event Loop is a process that allows Node.js and browsers to perform non-blocking I/O operations. It offloads operations to the system kernel whenever possible and continuously checks the message queue for callback functions to execute once their corresponding operations are complete." },
                { question: "What are Promises and how do they work with async/await?", answer: "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. `async/await` is syntactic sugar built on top of Promises that allows you to write asynchronous code that looks and behaves more like synchronous code, making it easier to read and debug." },
            ]
        },
        {
            name: "ES6+ & Advanced",
            questions: [
                { question: "What is the difference between `let`, `const`, and `var`?", answer: "`var` is function-scoped and hoisted. `let` and `const` are block-scoped. `let` allows for reassignment, while `const` declares a read-only reference to a value." },
                { question: "Explain the difference between `==` and `===`.", answer: "`===` (strict equality) compares two values for equality without performing type coercion. `==` (loose equality) will attempt to convert values of different types to a common type before comparing them." },
                { question: "What is object and array destructuring?", answer: "Destructuring is an ES6 feature that makes it possible to unpack values from arrays, or properties from objects, into distinct variables. It provides a more concise and readable way to extract data." },
            ]
        }
    ]
  },
  {
    name: "Coding & Data Structures",
    importance: "The foundation of efficient software. These questions test your problem-solving skills and ability to write optimized, scalable code.",
    subtopics: [
      {
        name: "Arrays & Strings",
        questions: [
          { question: "How do you find a duplicate element in an array?", answer: "Use a Hash Set for O(n) time complexity by storing elements as you iterate. If an element is already in the set, it's a duplicate. Alternatively, sort the array (O(n log n)) and check for adjacent duplicates." },
          { question: "Explain the Two-Sum problem and an efficient solution.", answer: "Given an array and a target, find two numbers that sum to the target. An O(n) solution uses a hash map to store each number and its index, checking if `target - current_number` exists in the map as you iterate." },
          { question: "How do you check if two strings are anagrams?", answer: "Create a frequency map (or a 26-element array for lowercase English letters) for the first string. Then, iterate through the second string, decrementing the character counts. If any count goes below zero or the map isn't all zeros at the end, they are not anagrams." },
        ],
      },
      {
        name: "Linked Lists, Stacks & Queues",
        questions: [
          { question: "How do you reverse a linked list?", answer: "Iteratively, use three pointers: `previous`, `current`, and `next`. As you traverse, change the `next` pointer of the `current` node to point to `previous`." },
          { question: "How do you find the middle element of a linked list in a single pass?", answer: "Use two pointers, a 'slow' pointer (moves one node) and a 'fast' pointer (moves two nodes). When the fast pointer reaches the end, the slow pointer will be at the middle." },
          { question: "How can you implement a queue using two stacks?", answer: "Use one stack (`s1`) for enqueuing. To dequeue, if the second stack (`s2`) is empty, pop all elements from `s1` and push them to `s2`. Then, pop from `s2`. This amortizes the cost of reversal." },
        ],
      },
      {
        name: "Trees & Graphs",
        questions: [
          { question: "What are the differences between BFS and DFS?", answer: "BFS (Breadth-First Search) explores level by level using a queue, finding the shortest path in an unweighted graph. DFS (Depth-First Search) explores as far as possible along each branch before backtracking, using a stack (or recursion)." },
          { question: "Write code to perform an in-order traversal of a Binary Search Tree.", answer: "In-order traversal visits nodes in ascending order. The recursive solution is: `traverse(node.left)`, then `visit(node)`, then `traverse(node.right)`." },
          { question: "What is a trie (prefix tree) and what is it used for?", answer: "A trie is a tree-like data structure that stores a dynamic set of strings. It's highly efficient for operations like autocomplete and spell checking, as nodes represent common prefixes." },
        ],
      },
    ],
  },
  {
    name: "System Design",
    importance: "Evaluates your ability to think at a high level about architecture, scalability, and trade-offs. Crucial for senior and mid-level roles.",
    subtopics: [
        {
            name: "Core Concepts",
            questions: [
                { question: "How would you design a URL shortening service like TinyURL?", answer: "Discuss components like a hashing function (e.g., Base62 encoding on a unique ID), a scalable key-value store (e.g., Redis, Cassandra) mapping short keys to long URLs, a load balancer, and APIs for creation and redirection." },
                { question: "Explain the difference between monolithic and microservices architecture.", answer: "A monolith is a single, large, tightly coupled application. Microservices architecture breaks an application into small, independent services. Discuss trade-offs like development simplicity (monolith) vs. scalability and fault isolation (microservices)." },
                { question: "How would you design a rate limiter?", answer: "Discuss algorithms like Token Bucket or Leaky Bucket. It would track request counts per user/IP in a fast data store like Redis and sit at the API gateway level, returning a 429 error if the limit is exceeded." },
            ]
        },
        {
            name: "System Design Patterns",
            questions: [
                { question: "What is a Content Delivery Network (CDN) and why is it used?", answer: "A CDN is a distributed network of servers that caches content closer to users. It reduces latency for static assets (images, JS, CSS) and decreases load on the origin server." },
                { question: "Explain the purpose of a message queue (e.g., RabbitMQ, Kafka).", answer: "Message queues enable asynchronous communication between services. They decouple services, improve fault tolerance (by holding messages if a consumer is down), and can help manage load spikes." },
                { question: "What is consistent hashing?", answer: "Consistent hashing is a technique used in distributed systems to map data to nodes. It minimizes the number of keys that need to be remapped when a node is added or removed, which is crucial for systems like distributed caches or databases." },
            ]
        }
    ]
  },
  {
    name: "Operating Systems",
    importance: "Understanding how software interacts with hardware is key for writing performant and reliable applications. Assesses your core computer science knowledge.",
    subtopics: [
        {
            name: "Core Concepts",
            questions: [
                { question: "What is the difference between a process and a thread?", answer: "A process is an instance of a program with its own memory space. A thread is the smallest unit of execution within a process. Threads share the process's memory space, making communication faster but also requiring careful synchronization." },
                { question: "Explain what context switching is.", answer: "Context switching is the process of storing the state of a process or thread so that it can be restored and resume execution later. This allows a single CPU to handle multiple processes or threads, but it has performance overhead." },
                { question: "What is a deadlock and what are the four necessary conditions?", answer: "A deadlock is a situation where two or more processes are blocked forever, each waiting for a resource held by another. The four conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait." },
            ]
        },
        {
            name: "Memory Management",
            questions: [
                { question: "What is virtual memory?", answer: "Virtual memory is a memory management technique that provides an 'idealized' abstraction of the storage resources. It creates the illusion for each process that it has a contiguous block of memory, and abstracts away the physical storage (RAM and disk)." },
                { question: "Explain the difference between paging and segmentation.", answer: "Paging divides memory into fixed-size blocks called pages. Segmentation divides memory into variable-sized blocks called segments, which are based on logical parts of a program (e.g., code, data, stack)." },
                { question: "What is a page fault?", answer: "A page fault is a type of exception raised by the hardware when a running program accesses a memory page that is not currently mapped into the physical memory (RAM). The OS must handle the fault by loading the required page from disk." },
            ]
        }
    ]
  },
  {
    name: "Computer Networks",
    importance: "Nearly all modern applications are networked. This topic tests your understanding of how data moves and how systems communicate reliably.",
    subtopics: [
        {
            name: "OSI & TCP/IP Models",
            questions: [
                { question: "What are the 7 layers of the OSI model?", answer: "Physical, Data Link, Network, Transport, Session, Presentation, Application. (Mnemonic: Please Do Not Throw Sausage Pizza Away)." },
                { question: "Explain the TCP 3-way handshake.", answer: "It's a process used to establish a reliable connection: 1) Client sends SYN (Synchronize). 2) Server replies with SYN-ACK (Synchronize-Acknowledge). 3) Client sends ACK (Acknowledge). The connection is now established." },
                { question: "What is the difference between TCP and UDP?", answer: "TCP is a connection-oriented, reliable protocol that guarantees delivery and order (e.g., web browsing, file transfer). UDP is a connectionless, unreliable protocol that is faster and has less overhead (e.g., video streaming, online gaming)." },
            ]
        },
        {
            name: "Web Protocols",
            questions: [
                { question: "What happens when you type a URL into a browser and press Enter?", answer: "A multi-step process: DNS resolution (to find the IP address), TCP connection is established (3-way handshake), TLS handshake for HTTPS, HTTP request is sent, server processes the request and sends an HTTP response, browser renders the HTML content." },
                { question: "Explain HTTPS and how SSL/TLS works.", answer: "HTTPS is the secure version of HTTP. SSL/TLS is the protocol that provides the security through encryption. It uses a handshake process with public-key cryptography to establish a secure session key, which is then used for symmetric encryption of the data." },
                { question: "What is DNS and how does it work?", answer: "DNS (Domain Name System) translates human-readable domain names (e.g., google.com) into machine-readable IP addresses (e.g., 172.217.167.78). It's a hierarchical, distributed database system that performs this lookup." },
            ]
        }
    ]
  },
  {
    name: "Databases (In-Depth)",
    importance: "Data is at the heart of most applications. Deep knowledge of databases is crucial for scalability, performance, and data integrity.",
    subtopics: [
        {
            name: "Relational Databases (SQL)",
            questions: [
                { question: "What are database indexes and why are they important?", answer: "An index is a data structure (typically a B-Tree) that improves the speed of data retrieval operations on a database table. Instead of scanning the entire table, the database can use the index to find the location of the desired rows quickly." },
                { question: "Explain the different types of SQL JOINs.", answer: "INNER JOIN: returns records with matching values in both tables. LEFT JOIN: returns all records from the left table, and the matched records from the right. RIGHT JOIN: returns all records from the right table. FULL OUTER JOIN: returns all records when there is a match in either table." },
                { question: "What does ACID compliance mean?", answer: "ACID is a set of properties for database transactions: Atomicity (all or nothing), Consistency (brings database from one valid state to another), Isolation (concurrent transactions don't affect each other), Durability (once a transaction is committed, it remains so)." },
                { question: "What is database normalization?", answer: "Normalization is the process of organizing columns and tables in a relational database to minimize data redundancy. It involves dividing larger tables into smaller, well-structured tables and defining relationships between them (e.g., 1NF, 2NF, 3NF)." },
            ]
        },
        {
            name: "NoSQL & Distributed Systems",
            questions: [
                { question: "What is the CAP Theorem?", answer: "The CAP theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees: Consistency (every read receives the most recent write), Availability (every request receives a response), and Partition Tolerance (the system continues to operate despite network partitions)." },
                { question: "Explain different types of NoSQL databases.", answer: "Key-Value (e.g., Redis), Document (e.g., MongoDB), Column-Family (e.g., Cassandra), and Graph (e.g., Neo4j). Each is optimized for a different data model and access pattern." },
                { question: "When would you choose a NoSQL database over a SQL database?", answer: "Choose NoSQL for large volumes of unstructured or semi-structured data, when you need high scalability and availability, and when a flexible schema is beneficial. Choose SQL for applications requiring complex queries and ACID-compliant transactions." },
            ]
        }
    ]
  }
];


// --- SVG Icons ---
const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);


// --- THE COMPONENT ---
const ResourcesPage: React.FC = () => {
    const [selectedTopicIndex, setSelectedTopicIndex] = useState<number | null>(null);
    const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

    useEffect(() => {
        AOS.init({
            duration: 600,
            once: false,
            easing: 'ease-in-out',
        });
    }, []);

    const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const index = event.target.value ? parseInt(event.target.value, 10) : null;
        setSelectedTopicIndex(index);
        setOpenQuestionId(null);
    };
    
    const handleQuestionClick = (subIndex: number, qIndex: number) => {
        const questionId = `${subIndex}-${qIndex}`;
        setOpenQuestionId(openQuestionId === questionId ? null : questionId);
    };

    return (
        <main className="min-h-screen w-full py-20 px-4 sm:px-8 bg-gradient-to-br from-slate-50 to-blue-100">
            <div className="max-w-6xl mx-auto bg-white/60 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-lg border border-slate-200">
                <header className="text-center mb-10" data-aos="fade-down">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 tracking-tight">
                        Developer Interview Prep
                    </h1>
                    <p className="mt-3 text-lg text-slate-600">
                        Master the key topics to ace your next technical interview.
                    </p>
                </header>

                <section className="max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
                    <label htmlFor="topic-select" className="block text-sm font-medium text-slate-700 mb-2">
                        Choose a topic to begin:
                    </label>
                    <div className="relative">
                        <select
                            id="topic-select"
                            value={selectedTopicIndex ?? ""}
                            onChange={handleTopicChange}
                            className="w-full pl-4 pr-10 py-3 text-base bg-white border border-slate-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>--- Select a Topic ---</option>
                            {topics.map((topic, index) => (
                                <option key={topic.name} value={index}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                           <ChevronDownIcon className="w-5 h-5"/>
                        </div>
                    </div>
                </section>

                {selectedTopicIndex === null && (
                    <section data-aos="fade-up" data-aos-delay="200">
                         <h2 className="text-2xl font-bold text-center text-slate-700 mb-6">Why These Topics Matter</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {topics.map((topic) => (
                                <div key={topic.name} className="bg-white/80 p-6 rounded-lg border border-slate-200 shadow-md">
                                    <h3 className="font-bold text-lg text-blue-700 mb-2">{topic.name}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{topic.importance}</p>
                                </div>
                            ))}
                         </div>
                    </section>
                )}
                
                {selectedTopicIndex !== null && (
                    <section
                      key={`all-questions-${selectedTopicIndex}`}
                      className="space-y-10"
                    >
                        {topics[selectedTopicIndex].subtopics.map((subtopic, subIndex) => (
                            <div key={subIndex} data-aos="fade-up">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-700">
                                    {subtopic.name}
                                </h2>
                                <ul className="space-y-4">
                                    {subtopic.questions.map((q, qIndex) => {
                                        const questionId = `${subIndex}-${qIndex}`;
                                        const isOpen = openQuestionId === questionId;
                                        
                                        return (
                                            <li
                                                key={qIndex}
                                                className="bg-white/80 rounded-xl border border-slate-200 overflow-hidden"
                                                data-aos="fade-up"
                                            >
                                                <button
                                                    onClick={() => handleQuestionClick(subIndex, qIndex)}
                                                    className="w-full flex justify-between items-center text-left p-4 sm:p-5 font-semibold text-blue-800 hover:bg-slate-50 transition-colors"
                                                >
                                                    <span className="flex-1 pr-4">{qIndex + 1}. {q.question}</span>
                                                    <ChevronDownIcon className={`w-6 h-6 text-blue-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                                </button>
                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="overflow-hidden"
                                                        >
                                                            <p className="p-4 sm:p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-200">
                                                                {q.answer}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
};

export default ResourcesPage;