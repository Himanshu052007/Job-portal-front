const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Simulated Database (In-Memory for now)
let jobsData = [
  { id: 1, role: 'Frontend Developer', company: 'Google', location: 'Remote', type: 'Full-time', salary: '$120K - $150K', tags: ['React', 'JavaScript', 'CSS'] },
  { id: 2, role: 'Backend Engineer', company: 'Microsoft', location: 'Seattle, WA', type: 'Hybrid', salary: '$130K - $160K', tags: ['Node.js', 'System Design', 'Azure'] },
  { id: 3, role: 'Software Development Engineer II', company: 'Amazon', location: 'Bangalore, India', type: 'On-site', salary: '₹25L - ₹40L', tags: ['Java', 'AWS', 'DSA'] },
  { id: 4, role: 'Data Scientist', company: 'Meta', location: 'Remote', type: 'Full-time', salary: '$140K - $180K', tags: ['Python', 'Machine Learning', 'SQL'] },
  { id: 5, role: 'Product Designer', company: 'Apple', location: 'Cupertino, CA', type: 'On-site', salary: '$110K - $150K', tags: ['Figma', 'UI/UX', 'Prototyping'] },
  { id: 6, role: 'DevOps Engineer', company: 'Netflix', location: 'Los Gatos, CA', type: 'Hybrid', salary: '$150K - $190K', tags: ['Kubernetes', 'CI/CD', 'AWS'] },
];

let prepData = {
  aptitude: `
    <h3>Aptitude Preparation</h3>
    <p>Aptitude tests are often the first round in campus placements and off-campus drives.</p>
    <div style="margin-top: 1rem;">
      <h4>Key Topics:</h4>
      <ul>
        <li><strong>Quantitative:</strong> Time & Work, Speed Distance, Percentages, Probability.</li>
        <li><strong>Logical Reasoning:</strong> Puzzles, Seating Arrangement, Syllogism, Blood Relations.</li>
        <li><strong>Verbal Ability:</strong> Reading Comprehension, Sentence Correction, Synonyms/Antonyms.</li>
      </ul>
      <div style="margin-top: 1.5rem;">
        <h4>Practice Problem:</h4>
        <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
          <p><strong>Q:</strong> A train 150m long is running at a speed of 68 kmph. In what time will it pass a man who is running at 8 kmph in the same direction in which the train is going?</p>
          <button class="btn btn-outline" style="margin-top:1rem;" onclick="alert('Relative speed = (68 - 8) kmph = 60 kmph = (60 * 5/18) m/sec = 50/3 m/sec. Time taken = (150 * 3) / 50 = 9 seconds.')">View Solution</button>
        </div>
      </div>
    </div>
  `,
  dsa: `
    <h3>DSA Preparation</h3>
    <p>Data Structures and Algorithms are the core of technical interviews at top MNCs.</p>
    <div style="margin-top: 1rem;">
      <p>Head over to our <strong>Dedicated DSA Sheet</strong> section to track your progress systematically.</p>
      <br>
      <h4>Must Know Paradigms:</h4>
      <ul>
        <li>Two Pointers & Sliding Window</li>
        <li>Divide & Conquer</li>
        <li>Dynamic Programming</li>
        <li>Graph Traversal (BFS / DFS)</li>
      </ul>
    </div>
  `,
  technical: `
    <h3>Core Technical Subjects</h3>
    <p>For SE roles, a strong grasp on CS fundamentals is strictly tested.</p>
    <div style="margin-top: 1rem;">
      <h4>OS (Operating Systems)</h4>
      <ul><li>Processes vs Threads, Deadlocks, Paging, Virtual Memory, Mutex & Semaphores.</li></ul>
      <h4>DBMS (Database Management)</h4>
      <ul><li>ACID Properties, Normalization (1NF to BCNF), Indexing, Joins, Transactions.</li></ul>
      <h4>Computer Networks</h4>
      <ul><li>OSI Model, TCP vs UDP, DNS, HTTP/HTTPS, Routing Algorithms.</li></ul>
      <h4>System Design</h4>
      <ul><li>Load balancing, Caching, Sharding, CAP Theorem, Microservices.</li></ul>
    </div>
  `,
  hr: `
    <h3>HR & Behavioral Interviews</h3>
    <p>Showcase your cultural fit, leadership, and problem-solving mindset.</p>
    <div style="margin-top: 1rem;">
      <h4>The STAR Method</h4>
      <p>Answer behavioral questions using <strong>S</strong>ituation, <strong>T</strong>ask, <strong>A</strong>ction, <strong>R</strong>esult.</p>
      <br>
      <h4>Common Questions:</h4>
      <ul>
        <li>Tell me about yourself.</li>
        <li>Why do you want to work here?</li>
        <li>Describe a time you overcame a challenging bug.</li>
        <li>Where do you see yourself in 5 years?</li>
      </ul>
    </div>
  `
};

let companyData = [
  {
    id: 'google', name: 'Google', logo: 'G',
    description: 'SWE Engineering roles standard process.',
    sections: [
      { title: '📝 Exam Pattern', content: 'Online Assessment (90 mins): 2 DSA questions.' },
      { title: '💻 Technical Interviews', content: '3-4 Rounds of pure DSA and System Design (for experienced). Focus on graphs, DP, trees.' },
      { title: '🤝 Googliness (HR)', content: 'Behavioral round checking cultural fit and leadership principles.' }
    ]
  },
  {
    id: 'amazon', name: 'Amazon', logo: 'A',
    description: 'SDE roles hiring process.',
    sections: [
      { title: '📝 Exam Pattern', content: 'Online Assessment: 2 Coding Qs + 15 min Leadership Principles Questionnaire.' },
      { title: '💻 Technical Interviews', content: '3-4 Rounds. Very heavy focus on Leadership Principles (LP) alongside DSA/System Design.' },
      { title: '🎓 Eligibility', content: 'B.Tech/M.Tech in CS or related field. No active backlogs.' }
    ]
  },
  {
    id: 'microsoft', name: 'Microsoft', logo: 'M',
    description: 'Software Engineer process.',
    sections: [
      { title: '📝 Exam Pattern', content: 'Online Assessment: 2-3 Coding questions on Codility (90 mins).' },
      { title: '💻 Technical Interviews', content: '2-3 Tech Rounds including System Design, followed by an "As Appropriate" (AA) round with a senior leader.' },
      { title: '🔎 Focus Areas', content: 'Strong CS fundamentals, OOPs, string manipulation, linked lists.' }
    ]
  },
  {
    id: 'tcs', name: 'TCS Digital', logo: 'T',
    description: 'Campus Placement drive details.',
    sections: [
      { title: '📝 Exam Pattern', content: 'Aptitude + Verbal + Advanced Coding (2 Qs in 60 mins).' },
      { title: '💻 Interviews', content: 'Technical (DSA + Core Subjects) + Managerial + HR.' },
      { title: '🎓 Eligibility', content: '60% throughout 10th, 12th, and UG. Max 1 active backlog.' }
    ]
  }
];

let dsaTopics = [
  { 
    id: 'arrays', name: 'Arrays', problems: [
      { id: 'a1', title: 'Two Sum', diff: 'diff-easy', diffText: 'Easy', done: true },
      { id: 'a2', title: 'Best Time to Buy and Sell Stock', diff: 'diff-easy', diffText: 'Easy', done: false },
      { id: 'a3', title: 'Maximum Subarray (Kadane)', diff: 'diff-medium', diffText: 'Medium', done: false },
    ]
  },
  { 
    id: 'strings', name: 'Strings', problems: [
      { id: 's1', title: 'Valid Palindrome', diff: 'diff-easy', diffText: 'Easy', done: false },
      { id: 's2', title: 'Longest Substring Without Repeating Characters', diff: 'diff-medium', diffText: 'Medium', done: false },
      { id: 's3', title: 'Minimum Window Substring', diff: 'diff-hard', diffText: 'Hard', done: false },
    ]
  },
  { 
    id: 'linkedlist', name: 'Linked List', problems: [
      { id: 'll1', title: 'Reverse Linked List', diff: 'diff-easy', diffText: 'Easy', done: false },
      { id: 'll2', title: 'Detect Cycle', diff: 'diff-easy', diffText: 'Easy', done: false },
      { id: 'll3', title: 'Merge K Sorted Lists', diff: 'diff-hard', diffText: 'Hard', done: false },
    ]
  },
];


// --- API Routes ---

// Get all jobs
app.get('/api/jobs', (req, res) => {
  res.json(jobsData);
});

// Get preparation materials
app.get('/api/prep', (req, res) => {
  res.json(prepData);
});

// Get company hiring processes
app.get('/api/companies', (req, res) => {
  res.json(companyData);
});

// Get ALL DSA topics and problems
app.get('/api/dsa', (req, res) => {
  res.json(dsaTopics);
});

// Toggle problem completion status
app.post('/api/dsa/toggle', (req, res) => {
  const { topicId, problemId } = req.body;
  
  const topic = dsaTopics.find(t => t.id === topicId);
  if (topic) {
    const prob = topic.problems.find(p => p.id === problemId);
    if (prob) {
      prob.done = !prob.done; // Toggle state
      return res.json({ success: true, problem: prob });
    }
  }
  
  res.status(404).json({ success: false, message: 'Problem or Topic not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend Server API is running on http://localhost:${PORT}`);
});
