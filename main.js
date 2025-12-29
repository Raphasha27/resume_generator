import './style.css'

const state = {
  personal: {
    name: 'Raphasha',
    role: 'Full Stack Engineer',
    email: 'raphasha@example.com',
    phone: '+1 555 123 4567',
    location: 'San Francisco, CA',
    summary: 'Highly capable Full Stack Engineer specialized in building high-performance web applications and AI-driven solutions.',
    skills: 'JavaScript, React, Node.js, Python, TypeScript, CSS3, HTML5, Git',
    linkedin: 'linkedin.com/in/raphasha',
    github: 'github.com/Raphasha27',
    photo: null
  },
  experience: [
    {
      id: 1,
      title: 'Senior Developer',
      company: 'Fire4s Tech',
      date: '2022 - Present',
      description: 'Built a top-tier resume generator and managed client-side architectures.'
    }
  ],
  education: [
    {
      id: 1,
      school: 'Global Tech University',
      degree: 'Computer Science',
      date: '2018 - 2022'
    }
  ],
  projects: [
    {
      id: 1,
      title: 'AI Task Manager',
      link: 'github.com/Raphasha27/task_manager',
      description: 'A glassmorphism-themed task manager with AI-driven suggestions and real-time persistence.'
    }
  ]
};

const inputs = {
  name: document.getElementById('inputName'),
  role: document.getElementById('inputRole'),
  email: document.getElementById('inputEmail'),
  phone: document.getElementById('inputPhone'),
  location: document.getElementById('inputLocation'),
  summary: document.getElementById('inputSummary'),
  skills: document.getElementById('inputSkills'),
  linkedin: document.getElementById('inputLinkedIn'),
  github: document.getElementById('inputGitHub'),
  photo: document.getElementById('inputPhoto')
};

const previews = {
  name: document.getElementById('prevName'),
  role: document.getElementById('prevRole'),
  email: document.getElementById('prevEmail'),
  phone: document.getElementById('prevPhone'),
  location: document.getElementById('prevLocation'),
  summary: document.getElementById('prevSummary'),
  expList: document.getElementById('prevExperienceList'),
  eduList: document.getElementById('prevEducationList'),
  skillsList: document.getElementById('prevSkillsList'),
  linkedin: document.getElementById('prevLinkedIn'),
  github: document.getElementById('prevGitHub'),
  photo: document.getElementById('prevPhoto'),
  photoPlaceholder: document.getElementById('photoPlaceholder'),
  projectsList: document.getElementById('prevProjectsList')
};

const init = () => {
  inputs.name.value = state.personal.name;
  inputs.role.value = state.personal.role;
  inputs.email.value = state.personal.email;
  inputs.phone.value = state.personal.phone;
  inputs.location.value = state.personal.location;
  inputs.summary.value = state.personal.summary;
  inputs.skills.value = state.personal.skills;
  inputs.linkedin.value = state.personal.linkedin;
  inputs.github.value = state.personal.github;
  
  renderExperienceForms();
  renderEducationForms();
  renderProjectsForms();
  updatePreview();
};

const updatePreview = () => {
  previews.name.innerText = inputs.name.value || 'Raphasha';
  previews.role.innerText = inputs.role.value || 'Role';
  previews.email.innerText = inputs.email.value || 'Email';
  previews.phone.innerText = inputs.phone.value || 'Phone';
  previews.location.innerText = inputs.location.value || 'Location';
  previews.summary.innerText = inputs.summary.value || 'Summary here...';
  previews.linkedin.innerText = inputs.linkedin.value ? `IN: ${inputs.linkedin.value}` : '';
  previews.github.innerText = inputs.github.value ? `GH: ${inputs.github.value}` : '';

  const skillsArr = inputs.skills.value.split(',').map(s => s.trim()).filter(s => s !== '');
  previews.skillsList.innerHTML = skillsArr.map(s => `<span class="res-skill-pill">${s}</span>`).join('');

  previews.expList.innerHTML = state.experience.map(e => `
    <div class="res-item">
      <div class="res-item-header"><span>${e.title}</span><span>${e.date}</span></div>
      <div class="res-item-sub">${e.company}</div>
      <div class="res-desc">${e.description}</div>
    </div>
  `).join('');

  previews.eduList.innerHTML = state.education.map(e => `
    <div class="res-item">
      <div class="res-item-header"><span>${e.degree}</span><span>${e.date}</span></div>
      <div class="res-item-sub">${e.school}</div>
    </div>
  `).join('');

  previews.projectsList.innerHTML = state.projects.map(p => `
    <div class="res-item">
      <div class="res-item-header"><span>${p.title}</span><span>${p.link}</span></div>
      <div class="res-desc">${p.description}</div>
    </div>
  `).join('');
};

const renderExperienceForms = () => {
  const container = document.getElementById('experienceFormContainer');
  const addBtn = document.getElementById('addExpBtn');
  container.innerHTML = state.experience.map(e => `
    <div class="dynamic-item-editor">
      <button class="remove-btn" onclick="window.removeExp(${e.id})">✕</button>
      <input type="text" value="${e.title}" placeholder="Title" oninput="window.updateExp(${e.id}, 'title', this.value)">
      <input type="text" value="${e.company}" placeholder="Company" oninput="window.updateExp(${e.id}, 'company', this.value)">
      <input type="text" value="${e.date}" placeholder="Date (e.g. 2022 - Present)" oninput="window.updateExp(${e.id}, 'date', this.value)">
      <textarea placeholder="Description" oninput="window.updateExp(${e.id}, 'description', this.value)">${e.description}</textarea>
    </div>
  `).join('') + addBtn.outerHTML;
  document.getElementById('addExpBtn').onclick = () => {
    state.experience.push({ id: Date.now(), title: '', company: '', date: '', description: '' });
    renderExperienceForms();
    updatePreview();
  };
};

const renderEducationForms = () => {
  const container = document.getElementById('educationFormContainer');
  const addBtn = document.getElementById('addEduBtn');
  container.innerHTML = state.education.map(e => `
    <div class="dynamic-item-editor">
      <button class="remove-btn" onclick="window.removeEdu(${e.id})">✕</button>
      <input type="text" value="${e.school}" placeholder="School" oninput="window.updateEdu(${e.id}, 'school', this.value)">
      <input type="text" value="${e.degree}" placeholder="Degree" oninput="window.updateEdu(${e.id}, 'degree', this.value)">
      <input type="text" value="${e.date}" placeholder="Date (e.g. 2018 - 2022)" oninput="window.updateEdu(${e.id}, 'date', this.value)">
    </div>
  `).join('') + addBtn.outerHTML;
  document.getElementById('addEduBtn').onclick = () => {
    state.education.push({ id: Date.now(), school: '', degree: '', date: '' });
    renderEducationForms();
    updatePreview();
  };
};

const renderProjectsForms = () => {
  const container = document.getElementById('projectsFormContainer');
  const addBtn = document.getElementById('addProjBtn');
  container.innerHTML = state.projects.map(p => `
    <div class="dynamic-item-editor">
      <button class="remove-btn" onclick="window.removeProj(${p.id})">✕</button>
      <input type="text" value="${p.title}" placeholder="Project Title" oninput="window.updateProj(${p.id}, 'title', this.value)">
      <input type="text" value="${p.link}" placeholder="Project Link (e.g. github.com/...)" oninput="window.updateProj(${p.id}, 'link', this.value)">
      <textarea placeholder="Description" oninput="window.updateProj(${p.id}, 'description', this.value)">${p.description}</textarea>
    </div>
  `).join('') + addBtn.outerHTML;
  document.getElementById('addProjBtn').onclick = () => {
    state.projects.push({ id: Date.now(), title: '', link: '', description: '' });
    renderProjectsForms();
    updatePreview();
  };
};

window.updateExp = (id, field, value) => { const item = state.experience.find(x => x.id === id); if(item) item[field] = value; updatePreview(); };
window.updateEdu = (id, field, value) => { const item = state.education.find(x => x.id === id); if(item) item[field] = value; updatePreview(); };
window.updateProj = (id, field, value) => { const item = state.projects.find(x => x.id === id); if(item) item[field] = value; updatePreview(); };
window.removeExp = (id) => { state.experience = state.experience.filter(e => e.id !== id); renderExperienceForms(); updatePreview(); };
window.removeEdu = (id) => { state.education = state.education.filter(e => e.id !== id); renderEducationForms(); updatePreview(); };
window.removeProj = (id) => { state.projects = state.projects.filter(p => p.id !== id); renderProjectsForms(); updatePreview(); };

Object.entries(inputs).forEach(([k, i]) => {
  if (k === 'photo') {
    i.onchange = (e) => {
      const f = e.target.files[0];
      if (f) {
        const r = new FileReader();
        r.onload = (v) => { previews.photo.src = v.target.result; previews.photo.style.display='block'; previews.photoPlaceholder.style.display='none'; };
        r.readAsDataURL(f);
      }
    };
  } else {
    i.oninput = updatePreview;
  }
});

document.getElementById('downloadBtn').onclick = () => {
  html2pdf().set({ margin: 10, filename: 'Raphasha_Resume.pdf' }).from(document.getElementById('resumePreview')).save();
};

/* AI Assistant Logic */
const aiModal = document.getElementById('aiModal');
const aiBtn = document.getElementById('aiBtn');
const closeAiBtn = document.getElementById('closeAiBtn');
const aiAckBtn = document.getElementById('aiAckBtn');
const aiFeedback = document.getElementById('aiFeedback');
const aiScore = document.getElementById('aiScore');

const toggleAiModal = (show) => {
  if (show) {
    aiModal.classList.remove('hidden');
    runAiAnalysis();
  } else {
    aiModal.classList.add('hidden');
  }
};

aiBtn.onclick = () => toggleAiModal(true);
closeAiBtn.onclick = () => toggleAiModal(false);
aiAckBtn.onclick = () => toggleAiModal(false);

const runAiAnalysis = () => {
  let score = 0;
  let feedback = [];

  // Content Analysis Rules
  if (inputs.name.value.length > 2) score += 10;
  else feedback.push({ type: 'warning', msg: 'Name is too short.' });

  if (inputs.role.value.length > 2) score += 10;
  
  if (inputs.summary.value.length > 50) score += 20;
  else feedback.push({ type: 'warning', msg: 'Professional summary is too brief. Aim for at least 3 sentences to describe your unique value.' });

  if (state.experience.length >= 2) score += 20;
  else if (state.experience.length === 1) score += 10;
  else feedback.push({ type: 'warning', msg: 'Adding more experience (internships, freelance) can boost your credibility.' });

  if (state.education.length >= 1) score += 10;

  if (state.projects.length >= 1) score += 15;
  else feedback.push({ type: 'warning', msg: 'Projects are crucial for technical roles. Add at least one key project.' });

  if (inputs.skills.value.split(',').length >= 5) score += 15;
  else feedback.push({ type: 'warning', msg: 'List at least 5 core skills to pass ATS filters.' });

  // Job Specific Suggestions (Simulated)
  const roleLower = inputs.role.value.toLowerCase();
  if (roleLower.includes('developer') || roleLower.includes('engineer')) {
     if (!inputs.skills.value.toLowerCase().includes('git')) {
       feedback.push({ type: 'suggestion', msg: '🤖 Suggested Skill: "Git" is standard for this role.' });
     }
  }

  // Cap Score
  score = Math.min(100, score);
  
  // Render
  animateScore(score);
  aiFeedback.innerHTML = feedback.length > 0 
    ? feedback.map(f => `<div class="ai-item ${f.type}">${f.msg}</div>`).join('')
    : '<div class="ai-item success">🎉 Perfect! Your resume is looking strong.</div>';
};

const animateScore = (target) => {
  let current = 0;
  const timer = setInterval(() => {
    current += 1;
    aiScore.innerText = current;
    if (current >= target) clearInterval(timer);
  }, 15);
};

init();
