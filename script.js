// Data Structures
let jobsData = [];
let prepData = {};
let companyData = [];
let dsaTopics = [];

// --- DOMContentLoaded Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
  initNavigation();
  
  // Fetch from Node.js backend
  try {
    const [jobsRes, prepRes, companiesRes, dsaRes] = await Promise.all([
      fetch('/api/jobs'),
      fetch('/api/prep'),
      fetch('/api/companies'),
      fetch('/api/dsa')
    ]);
    jobsData = await jobsRes.json();
    prepData = await prepRes.json();
    companyData = await companiesRes.json();
    dsaTopics = await dsaRes.json();
  } catch (error) {
    console.error("Failed to fetch data from backend:", error);
  }

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
  if (!topic) return;

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

window.toggleProblem = async function(topicId, problemId) {
  const topic = dsaTopics.find(t => t.id === topicId);
  const prob = topic.problems.find(p => p.id === problemId);
  if (!topic || !prob) return;
  
  try {
    // Send request to backend to toggle state
    const res = await fetch('/api/dsa/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId, problemId })
    });
    
    if (res.ok) {
      const data = await res.json();
      prob.done = data.problem.done; // update local state safely based on backend response
      
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
    } else {
      console.error("Backend refused to toggle problem state");
    }
  } catch (error) {
    console.error("Error connecting to backend toggle endpoint:", error);
  }
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
