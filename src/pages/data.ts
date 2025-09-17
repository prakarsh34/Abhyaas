// data.ts

export interface Question {
  id: number;
  category: "Coding" | "Aptitude" | "English & Reasoning";
  question: string;
  options: string[];
  correctIndex: number;
}

export interface TestPaper {
  id: number;
  name: string;
  questions: Question[];
}

// --- MASTER QUESTION BANK (FULLY POPULATED) ---

const codingBank: Question[] = [
  { id: 1, category: "Coding", question: "What is the time complexity of a perfectly balanced Binary Search Tree search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correctIndex: 1 },
  { id: 2, category: "Coding", question: "Which of the following is NOT an OOPS concept?", options: ["Encapsulation", "Polymorphism", "Compilation", "Inheritance"], correctIndex: 2 },
  { id: 3, category: "Coding", question: "In SQL, which command is used to add data to a table?", options: ["ADD", "INSERT INTO", "UPDATE", "CREATE"], correctIndex: 1 },
  { id: 4, category: "Coding", question: "What does the 'this' keyword refer to in a JavaScript arrow function?", options: ["The global object", "The object that called it", "The lexical scope's 'this'", "It is undefined"], correctIndex: 2 },
  { id: 5, category: "Coding", question: "Which data structure uses LIFO (Last-In, First-Out)?", options: ["Queue", "Stack", "Linked List", "Tree"], correctIndex: 1 },
  { id: 6, category: "Coding", question: "What is the purpose of the `finally` block in a try-catch statement?", options: ["To catch errors", "To execute code regardless of an error", "To throw a new error", "To handle specific exceptions"], correctIndex: 1 },
  { id: 7, category: "Coding", question: "Which keyword is used to create a subclass in Java?", options: ["super", "this", "extends", "implements"], correctIndex: 2 },
  { id: 8, category: "Coding", question: "What is the default value of a boolean in Java?", options: ["true", "false", "0", "null"], correctIndex: 1 },
  { id: 9, category: "Coding", question: "Which of these is a primary key constraint?", options: ["It can be NULL", "It uniquely identifies each record", "It links two tables", "It is a foreign key"], correctIndex: 1 },
  { id: 10, category: "Coding", question: "In CSS, how do you select an element with id 'header'?", options: ["#header", ".header", "header", "*header"], correctIndex: 0 },
  { id: 11, category: "Coding", question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Programming Interface", "Application Protocol Interface", "Applied Programming Interface"], correctIndex: 0 },
  { id: 12, category: "Coding", question: "Which data structure uses FIFO (First-In, First-Out)?", options: ["Stack", "Array", "Queue", "Tree"], correctIndex: 2 },
  { id: 13, category: "Coding", question: "What is the term for a function calling itself?", options: ["Iteration", "Recursion", "Duplication", "Overloading"], correctIndex: 1 },
  { id: 14, category: "Coding", question: "In Python, which keyword is used to define a function?", options: ["function", "def", "func", "define"], correctIndex: 1 },
  { id: 15, category: "Coding", question: "What HTTP status code means 'Not Found'?", options: ["200", "500", "404", "301"], correctIndex: 2 },
  { id: 16, category: "Coding", question: "Which is a NoSQL database?", options: ["MySQL", "PostgreSQL", "Oracle", "MongoDB"], correctIndex: 3 },
  { id: 17, category: "Coding", question: "What is polymorphism?", options: ["Hiding implementation details", "One name, many forms", "Wrapping data and methods together", "Inheriting properties from a parent class"], correctIndex: 1 },
  { id: 18, category: "Coding", question: "What is the time complexity of Quicksort in the worst case?", options: ["O(log n)", "O(n)", "O(n log n)", "O(n^2)"], correctIndex: 3 },
  { id: 19, category: "Coding", question: "Which `git` command is used to stage files for a commit?", options: ["git commit", "git push", "git add", "git stage"], correctIndex: 2 },
  { id: 20, category: "Coding", question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], correctIndex: 0 },
  { id: 21, category: "Coding", question: "Which of the following is a compiled language?", options: ["JavaScript", "Python", "Ruby", "C++"], correctIndex: 3 },
  { id: 22, category: "Coding", question: "A pointer is a variable that stores...", options: ["A character value", "An integer value", "A float value", "The memory address of another variable"], correctIndex: 3 },
  { id: 23, category: "Coding", question: "What is the main purpose of an operating system?", options: ["To provide a user interface", "To manage hardware and software resources", "To run applications", "To connect to the internet"], correctIndex: 1 },
  { id: 24, category: "Coding", question: "Which SQL clause is used to filter results?", options: ["FILTER", "WHERE", "HAVING", "SORT"], correctIndex: 1 },
  { id: 25, category: "Coding", question: "What is JSON?", options: ["Java Standard Object Notation", "JavaScript Object Notation", "JavaScript Standard Object Naming", "Java Object Naming"], correctIndex: 1 },
  { id: 26, category: "Coding", question: "In networking, what does DNS stand for?", options: ["Domain Name System", "Dynamic Network Service", "Domain Naming Standard", "Data Network System"], correctIndex: 0 },
  { id: 27, category: "Coding", question: "What is the difference between `let` and `const` in JavaScript?", options: ["`let` is function-scoped, `const` is block-scoped", "`let` can be reassigned, `const` cannot", "`const` can be reassigned, `let` cannot", "There is no difference"], correctIndex: 1 },
  { id: 28, category: "Coding", question: "What is a constructor in object-oriented programming?", options: ["A function that destroys an object", "A special method for creating and initializing an object", "A method for copying an object", "A type of variable"], correctIndex: 1 },
  { id: 29, category: "Coding", question: "Which sorting algorithm is considered the fastest on average?", options: ["Bubble Sort", "Insertion Sort", "Quicksort", "Selection Sort"], correctIndex: 2 },
  { id: 30, category: "Coding", question: "What does 'null' typically represent in programming?", options: ["The number zero", "An empty string", "The intentional absence of any object value", "An uninitialized variable"], correctIndex: 2 },
];

const aptitudeBank: Question[] = [
  { id: 101, category: "Aptitude", question: "If a car travels 60 km in 1 hour, how far will it travel in 2.5 hours?", options: ["120 km", "150 km", "180 km", "200 km"], correctIndex: 1 },
  { id: 102, category: "Aptitude", question: "What is 25% of 200?", options: ["25", "40", "50", "75"], correctIndex: 2 },
  { id: 103, category: "Aptitude", question: "A train 100m long is running at a speed of 30 km/hr. Find the time taken by it to pass a man standing near the railway line.", options: ["10 seconds", "12 seconds", "15 seconds", "18 seconds"], correctIndex: 1 },
  { id: 104, category: "Aptitude", question: "The sum of two numbers is 40 and their difference is 4. What is the ratio of the two numbers?", options: ["11:9", "11:10", "10:9", "9:7"], correctIndex: 0 },
  { id: 105, category: "Aptitude", question: "If the cost price of 10 articles is equal to the selling price of 8 articles, what is the profit percent?", options: ["20%", "25%", "30%", "15%"], correctIndex: 1 },
  { id: 106, category: "Aptitude", question: "Find the average of the first 50 natural numbers.", options: ["25", "25.5", "26", "26.5"], correctIndex: 1 },
  { id: 107, category: "Aptitude", question: "What is the next number in the sequence: 2, 6, 12, 20, 30, ...?", options: ["40", "42", "44", "46"], correctIndex: 1 },
  { id: 108, category: "Aptitude", question: "A man buys a toy for Rs. 25 and sells it for Rs. 28.50. His gain percent is:", options: ["14%", "15%", "16%", "18%"], correctIndex: 0 },
  { id: 109, category: "Aptitude", question: "How many degrees are there in the angle between the hour and minute hands of a clock when the time is 3:30?", options: ["75°", "85°", "90°", "105°"], correctIndex: 0 },
  { id: 110, category: "Aptitude", question: "If 3 men can do a piece of work in 4 days, how many men are needed to do the same work in 2 days?", options: ["5", "6", "7", "8"], correctIndex: 1 },
  { id: 111, category: "Aptitude", question: "A boat travels 20 km upstream in 5 hours and 30 km downstream in 5 hours. What is the speed of the boat in still water?", options: ["4 km/hr", "5 km/hr", "6 km/hr", "10 km/hr"], correctIndex: 1 },
  { id: 112, category: "Aptitude", question: "The simple interest on Rs. 500 for 4 years at 5% per annum is:", options: ["Rs. 80", "Rs. 100", "Rs. 120", "Rs. 125"], correctIndex: 1 },
  { id: 113, category: "Aptitude", question: "The ratio of two numbers is 3:4 and their sum is 49. The numbers are:", options: ["20, 29", "21, 28", "22, 27", "23, 26"], correctIndex: 1 },
  { id: 114, category: "Aptitude", question: "If a pipe can fill a tank in 6 hours and another pipe can empty it in 12 hours, how long will it take to fill the tank if both are open?", options: ["8 hours", "10 hours", "12 hours", "14 hours"], correctIndex: 2 },
  { id: 115, category: "Aptitude", question: "What is the area of a circle with a radius of 7 cm?", options: ["144 sq.cm", "154 sq.cm", "164 sq.cm", "174 sq.cm"], correctIndex: 1 },
  { id: 116, category: "Aptitude", question: "If A:B = 2:3 and B:C = 4:5, then what is C:A?", options: ["15:8", "8:15", "12:15", "10:8"], correctIndex: 0 },
  { id: 117, category: "Aptitude", question: "A father is twice as old as his son. 20 years ago, he was twelve times as old as his son. What is the father's current age?", options: ["32 years", "44 years", "48 years", "52 years"], correctIndex: 1 },
  { id: 118, category: "Aptitude", question: "What is the value of 101 x 99?", options: ["9999", "9991", "10001", "9989"], correctIndex: 0 },
  { id: 119, category: "Aptitude", question: "The perimeter of a rectangle is 40m. If its length is 12m, what is its breadth?", options: ["8m", "10m", "14m", "16m"], correctIndex: 0 },
  { id: 120, category: "Aptitude", question: "A cube has a volume of 125 cubic cm. What is the length of its edge?", options: ["4 cm", "5 cm", "6 cm", "7 cm"], correctIndex: 1 },
  { id: 121, category: "Aptitude", question: "What is the least number that must be added to 1056 to get a number exactly divisible by 23?", options: ["2", "18", "21", "22"], correctIndex: 0 },
  { id: 122, category: "Aptitude", question: "Two-thirds of a number is 20. What is the number?", options: ["15", "30", "40", "60"], correctIndex: 1 },
  { id: 123, category: "Aptitude", question: "The L.C.M. of 24, 36 and 40 is:", options: ["120", "240", "360", "480"], correctIndex: 2 },
  { id: 124, category: "Aptitude", question: "If today is Monday, what will be the day after 61 days?", options: ["Wednesday", "Saturday", "Tuesday", "Thursday"], correctIndex: 1 },
  { id: 125, category: "Aptitude", question: "A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?", options: ["3", "4", "5", "Not possible"], correctIndex: 2 },
  { id: 126, category: "Aptitude", question: "The population of a town increases by 5% annually. If its present population is 4410, what was it 2 years ago?", options: ["4000", "3800", "4200", "3500"], correctIndex: 0 },
  { id: 127, category: "Aptitude", question: "A worker is paid Rs. 150 for 6 days of work. If he works for 23 days, how much will he get?", options: ["Rs. 575", "Rs. 600", "Rs. 625", "Rs. 550"], correctIndex: 0 },
  { id: 128, category: "Aptitude", question: "Find the missing number: 8, 27, 64, ?, 216.", options: ["100", "125", "150", "180"], correctIndex: 1 },
  { id: 129, category: "Aptitude", question: "In an election, a candidate who gets 84% of the votes is elected by a majority of 476 votes. What is the total number of votes polled?", options: ["672", "700", "749", "810"], correctIndex: 1 },
  { id: 130, category: "Aptitude", question: "A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is:", options: ["1/4", "1/10", "7/15", "8/15"], correctIndex: 3 },
];

const englishReasoningBank: Question[] = [
  { id: 201, category: "English & Reasoning", question: "Which word is the synonym of 'Ephemeral'?", options: ["Eternal", "Transient", "Permanent", "Beautiful"], correctIndex: 1 },
  { id: 202, category: "English & Reasoning", question: "Complete the series: 5, 10, 17, 26, ?", options: ["35", "37", "39", "41"], correctIndex: 1 },
  { id: 203, category: "English & Reasoning", question: "A is B's sister. C is B's mother. D is C's father. E is D's mother. Then, how is A related to D?", options: ["Grandfather", "Grandmother", "Daughter", "Granddaughter"], correctIndex: 3 },
  { id: 204, category: "English & Reasoning", question: "Select the correctly spelled word.", options: ["Embarass", "Embarrass", " embaras", "embaras"], correctIndex: 1 },
  { id: 205, category: "English & Reasoning", question: "Find the antonym of 'Malice'.", options: ["Goodwill", "Cruelty", "Spite", "Hatred"], correctIndex: 0 },
  { id: 206, category: "English & Reasoning", question: "Choose the word which best expresses the meaning of 'Candid'.", options: ["Biased", "Devious", "Frank", "Secretive"], correctIndex: 2 },
  { id: 207, category: "English & Reasoning", question: "In a certain code, 'ROAD' is written as 'URDG'. How is 'SWAN' written in that code?", options: ["VXDQ", "VZDQ", "VZCQ", "UXDQ"], correctIndex: 1 },
  { id: 208, category: "English & Reasoning", question: "I prefer tea ___ coffee.", options: ["than", "over", "from", "to"], correctIndex: 3 },
  { id: 209, category: "English & Reasoning", question: "Find the odd one out: Car, Bus, Scooter, Bicycle.", options: ["Car", "Bus", "Scooter", "Bicycle"], correctIndex: 3 },
  { id: 210, category: "English & Reasoning", question: "A man is facing North. He turns 180 degrees in the clockwise direction and then 45 degrees in the same direction. Which direction is he facing now?", options: ["South-West", "South-East", "West", "North-West"], correctIndex: 0 },
  { id: 211, category: "English & Reasoning", question: "The book was so interesting that I was completely ____.", options: ["engrossed", "exhausted", "enraged", "disturbed"], correctIndex: 0 },
  { id: 212, category: "English & Reasoning", question: "If 'pen' is 'table', 'table' is 'fan', 'fan' is 'chair' and 'chair' is 'roof', on which of the following will a person sit?", options: ["Fan", "Chair", "Roof", "Table"], correctIndex: 2 },
  { id: 213, category: "English & Reasoning", question: "Choose the alternative which best expresses the meaning of the idiom 'To bite the dust'.", options: ["To eat voraciously", "To have nothing to eat", "To fail", "To be successful"], correctIndex: 2 },
  { id: 214, category: "English & Reasoning", question: "Which of the following is a palindrome?", options: ["12321", "12345", "11223", "121212"], correctIndex: 0 },
  { id: 215, category: "English & Reasoning", question: "He is senior ___ me by two years.", options: ["than", "to", "from", "of"], correctIndex: 1 },
  { id: 216, category: "English & Reasoning", question: "Look! The bus ___.", options: ["is coming", "comes", "has come", "had come"], correctIndex: 0 },
  { id: 217, category: "English & Reasoning", question: "Which word means 'a person who can speak many languages'?", options: ["Linguist", "Polyglot", "Bilingual", "Monolingual"], correctIndex: 1 },
  { id: 218, category: "English & Reasoning", question: "Book is to Reading as Fork is to:", options: ["Drawing", "Writing", "Eating", "Stirring"], correctIndex: 2 },
  { id: 219, category: "English & Reasoning", question: "The detective found a ___ of evidence at the crime scene.", options: ["plethora", "scarcity", "lack", "shortage"], correctIndex: 0 },
  { id: 220, category: "English & Reasoning", question: "Complete the sentence: 'Neither the students nor the teacher ___ present.'", options: ["were", "was", "are", "have been"], correctIndex: 1 },
  { id: 221, category: "English & Reasoning", question: "What is the study of ancient societies called?", options: ["Anthropology", "Archaeology", "History", "Etymology"], correctIndex: 1 },
  { id: 222, category: "English & Reasoning", question: "If '+' means '÷', '÷' means '−', '−' means '×', and '×' means '+', what is the value of 12 + 6 ÷ 3 − 2 × 8?", options: ["-2", "2", "4", "8"], correctIndex: 2 },
  { id: 223, category: "English & Reasoning", question: "The antonym of 'Transparent' is:", options: ["Clear", "Opaque", "Cloudy", "Lucid"], correctIndex: 1 },
  { id: 224, category: "English & Reasoning", question: "I have not seen him since he ___ the city.", options: ["left", "has left", "had left", "was leaving"], correctIndex: 0 },
  { id: 225, category: "English & Reasoning", question: "Find the odd one out: Lion, Tiger, Leopard, Cow.", options: ["Lion", "Tiger", "Leopard", "Cow"], correctIndex: 3 },
  { id: 226, category: "English & Reasoning", question: "The practice of having more than one wife at a time is called:", options: ["Monogamy", "Polygamy", "Bigamy", "Polyandry"], correctIndex: 1 },
  { id: 227, category: "English & Reasoning", question: "Find the missing letters: a_c_a_c_a_c", options: ["b, a, b, a", "a, b, b, a", "a, c, a, c", "a, b, a, b"], correctIndex: 3 },
  { id: 228, category: "English & Reasoning", question: "The opposite of 'bravery' is:", options: ["Courage", "Fear", "Cowardice", "Heroism"], correctIndex: 2 },
  { id: 229, category: "English & Reasoning", question: "A person who is new to a profession is called a:", options: ["Veteran", "Novice", "Expert", "Professional"], correctIndex: 1 },
  { id: 230, category: "English & Reasoning", question: "A dog is to a kennel as a bee is to a:", options: ["Nest", "Hive", "Den", "Stable"], correctIndex: 1 },
];

// --- UTILITY TO GENERATE TESTS ---
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const generateTestPapers = (numTests: number): TestPaper[] => {
  const papers: TestPaper[] = [];
  for (let i = 1; i <= numTests; i++) {
    const codingQuestions = shuffleArray(codingBank).slice(0, 25);
    const aptitudeQuestions = shuffleArray(aptitudeBank).slice(0, 25);
    const englishReasoningQuestions = shuffleArray(englishReasoningBank).slice(0, 25);

    const testQuestions = [
      ...codingQuestions,
      ...aptitudeQuestions,
      ...englishReasoningQuestions,
    ];

    papers.push({
      id: i,
      name: `Abhyaas Mock Test ${i}`,
      questions: shuffleArray(testQuestions),
    });
  }
  return papers;
};