// Data Structures
const jobsData = [
  { id: 1, role: 'Frontend Developer', company: 'Google', location: 'Remote', type: 'Full-time', salary: '$120K - $150K', tags: ['React', 'JavaScript', 'CSS'] },
  { id: 2, role: 'Backend Engineer', company: 'Microsoft', location: 'Seattle, WA', type: 'Hybrid', salary: '$130K - $160K', tags: ['Node.js', 'System Design', 'Azure'] },
  { id: 3, role: 'Software Development Engineer II', company: 'Amazon', location: 'Bangalore, India', type: 'On-site', salary: '₹25L - ₹40L', tags: ['Java', 'AWS', 'DSA'] },
  { id: 4, role: 'Data Scientist', company: 'Meta', location: 'Remote', type: 'Full-time', salary: '$140K - $180K', tags: ['Python', 'Machine Learning', 'SQL'] },
  { id: 5, role: 'Product Designer', company: 'Apple', location: 'Cupertino, CA', type: 'On-site', salary: '$110K - $150K', tags: ['Figma', 'UI/UX', 'Prototyping'] },
  { id: 6, role: 'DevOps Engineer', company: 'Netflix', location: 'Los Gatos, CA', type: 'Hybrid', salary: '$150K - $190K', tags: ['Kubernetes', 'CI/CD', 'AWS'] },
];

const prepData = {
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

const companyData = [
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

const dsaTopics = [
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


// --- DOMContentLoaded Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderJobs();
  initPrepSection();
  renderCompanies();
  initDSASheet();
});

// --- Navigation Logic ---
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const viewSections = document.querySelectorAll('.view-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active nav link
      navItems.forEach(nav => nav.classList.remove('active'));
      e.target.classList.add('active');

      // Update active section
      const targetId = e.target.getAttribute('data-target');
      viewSections.forEach(sec => sec.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');
    });
  });
}

// --- Jobs Render ---
function renderJobs() {
  const container = document.getElementById('jobs-container');
  container.innerHTML = jobsData.map(job => `
    <div class="card">
      <div class="card-header">
        <div class="company-logo">${job.company.charAt(0)}</div>
        <div class="card-title">
          <h3>${job.role}</h3>
          <span>${job.company} &bull; ${job.location}</span>
        </div>
      </div>
      <div style="margin-top: 0.5rem; color: var(--text-main); font-weight: 600;">
        ${job.salary} &bull; ${job.type}
      </div>
      <div class="tags">
        ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <button class="btn btn-primary" style="margin-top: 1rem;">Apply Now</button>
    </div>
  `).join('');
}

// --- Prep Section Logic ---
function initPrepSection() {
  const categoryCards = document.querySelectorAll('.category-card');
  const prepContentArea = document.getElementById('prep-content-area');

  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      categoryCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const cat = card.getAttribute('data-category');
      
      prepContentArea.style.opacity = '0';
      setTimeout(() => {
        prepContentArea.innerHTML = `<div class="modal-body">${prepData[cat]}</div>`;
        prepContentArea.style.opacity = '1';
        prepContentArea.style.transition = 'opacity 0.3s ease';
      }, 150);
    });
  });
}

// --- Company Process Logic ---
function renderCompanies() {
  const container = document.getElementById('company-container');
  container.innerHTML = companyData.map(company => `
    <div class="card" onclick="openCompanyModal('${company.id}')" style="cursor:pointer;">
      <div class="card-header">
        <div class="company-logo" style="color:var(--primary); font-size: 1.5rem;">${company.logo}</div>
        <div class="card-title">
          <h3>${company.name}</h3>
          <span>${company.sections.length} Hiring Stages</span>
        </div>
      </div>
      <p style="color: var(--text-muted); font-size: 0.9rem;">${company.description}</p>
      <button class="btn btn-outline" style="margin-top: 1rem;">View Process</button>
    </div>
  `).join('');

  // Auto close modal
  document.querySelector('.close-modal').addEventListener('click', closeCompanyModal);
  window.addEventListener('click', (e) => {
    if (e.target.id === 'company-modal') closeCompanyModal();
  });
}

window.openCompanyModal = function(companyId) {
  const company = companyData.find(c => c.id === companyId);
  if (!company) return;

  const modalBody = document.getElementById('company-modal-body');
  
  let html = `
    <div class="modal-body">
      <h3>${company.name} Hiring Process</h3>
  `;
  
  company.sections.forEach(sec => {
    html += `
      <div class="modal-section">
        <h4>${sec.title}</h4>
        <p>${sec.content}</p>
      </div>
    `;
  });
  html += `</div>`;
  
  modalBody.innerHTML = html;
  document.getElementById('company-modal').classList.add('active');
}

function closeCompanyModal() {
  document.getElementById('company-modal').classList.remove('active');
}

// --- DSA Sheet Logic ---
function initDSASheet() {
  renderDSATopics();
  // Select first topic by default
  selectDSATopic('arrays');
  updateOverallProgress();
}

function renderDSATopics() {
  const sidebar = document.getElementById('dsa-topics-list');
  sidebar.innerHTML = dsaTopics.map(topic => {
    const total = topic.problems.length;
    const done = topic.problems.filter(p => p.done).length;
    return `
      <div class="topic-item" id="topic-tab-${topic.id}" onclick="selectDSATopic('${topic.id}')">
        <span style="font-weight: 500;">${topic.name}</span>
        <span class="topic-progress" id="progress-text-${topic.id}">${done}/${total}</span>
      </div>
    `;
  }).join('');
}

window.selectDSATopic = function(topicId) {
  // Update UI active state
  document.querySelectorAll('.topic-item').forEach(item => item.classList.remove('active'));
  const activeTab = document.getElementById(`topic-tab-${topicId}`);
  if(activeTab) activeTab.classList.add('active');

  const topic = dsaTopics.find(t => t.id === topicId);
  const container = document.getElementById('dsa-problems-list');

  container.innerHTML = `
    <h3 style="margin-bottom: 1.5rem;">${topic.name} Problems</h3>
    <div class="problem-list">
      ${topic.problems.map(prob => `
        <div class="problem-row">
          <div class="problem-info">
            <div class="problem-status ${prob.done ? 'completed' : ''}" 
                 onclick="toggleProblem('${topicId}', '${prob.id}')"
                 id="status-${prob.id}"></div>
            <a href="#" class="problem-title">${prob.title}</a>
          </div>
          <span class="difficulty ${prob.diff}">${prob.diffText}</span>
        </div>
      `).join('')}
    </div>
  `;
}

window.toggleProblem = function(topicId, problemId) {
  const topic = dsaTopics.find(t => t.id === topicId);
  const prob = topic.problems.find(p => p.id === problemId);
  
  // Toggle state
  prob.done = !prob.done;
  
  // Update UI
  const statusElem = document.getElementById(`status-${prob.id}`);
  if (prob.done) {
    statusElem.classList.add('completed');
  } else {
    statusElem.classList.remove('completed');
  }

  // Update Topic Sidebar Progress
  const total = topic.problems.length;
  const done = topic.problems.filter(p => p.done).length;
  document.getElementById(`progress-text-${topicId}`).innerText = `${done}/${total}`;

  // Update Overall Progress
  updateOverallProgress();
}

function updateOverallProgress() {
  let totalProblems = 0;
  let completedProblems = 0;

  dsaTopics.forEach(topic => {
    totalProblems += topic.problems.length;
    completedProblems += topic.problems.filter(p => p.done).length;
  });

  const percentage = totalProblems === 0 ? 0 : Math.round((completedProblems / totalProblems) * 100);
  
  document.getElementById('overall-progress-text').innerText = `${percentage}%`;
  document.getElementById('overall-progress-fill').style.width = `${percentage}%`;
}
