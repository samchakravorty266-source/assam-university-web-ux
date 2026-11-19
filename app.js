/**
 * Assam University, Silchar - Unified Portal & Web Experience
 * Core Interactive Application Script (Aligned to the New Layout)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* ------------------------------------------------------------------------
   * 1. Accessibility: Font Size Adjuster (A-, A, A+)
   * ------------------------------------------------------------------------ */
  const fontBtns = document.querySelectorAll('.font-btn');
  const storedFontSize = localStorage.getItem('aus_font_size') || '16px';
  document.documentElement.style.setProperty('--base-font-size', storedFontSize);

  fontBtns.forEach(btn => {
    if (btn.dataset.size + 'px' === storedFontSize) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', () => {
      fontBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const size = btn.dataset.size + 'px';
      document.documentElement.style.setProperty('--base-font-size', size);
      localStorage.setItem('aus_font_size', size);
    });
  });

  /* ------------------------------------------------------------------------
   * 2. Multilingual UI Switcher (English, Hindi, Assamese)
   * ------------------------------------------------------------------------ */
  const langBtns = document.querySelectorAll('.lang-btn');
  const i18nData = {
    en: {
      heroTag: 'A CENTRAL UNIVERSITY ESTABLISHED BY AN ACT OF PARLIAMENT 1989',
      line1: 'Conviction.',
      line2: 'Confidence.',
      line3: 'Creativity.',
      btnAdmissions: 'Explore Admissions',
      btnServices: 'Online Services',
      announcementsTitle: 'Latest Announcements',
      discoverTitle: 'Discover Assam University',
      programsTitle: 'Explore Academic Programs',
      schoolsTitle: 'Schools & Departments',
      portalsTitle: 'University Portals',
      lifeTitle: 'Life at Assam University'
    },
    hi: {
      heroTag: 'संसद के एक अधिनियम 1989 द्वारा स्थापित एक केंद्रीय विश्वविद्यालय',
      line1: 'दृढ़ विश्वास।',
      line2: 'आत्मविश्वास।',
      line3: 'सृजनशीलता।',
      btnAdmissions: 'प्रवेश प्रक्रिया देखें',
      btnServices: 'ऑनलाइन सेवाएं',
      announcementsTitle: 'नवीनतम घोषणाएं',
      discoverTitle: 'असम विश्वविद्यालय का परिचय',
      programsTitle: 'शैक्षणिक पाठ्यक्रम',
      schoolsTitle: 'संकाय एवं विभाग',
      portalsTitle: 'विश्वविद्यालय पोर्टल',
      lifeTitle: 'परिसर जीवन एवं संस्कृति'
    },
    as: {
      heroTag: 'সংসদৰ এক আইন ১৯৮৯ দ্বাৰা স্থাপিত এক কেন্দ্ৰীয় বিশ্ববিদ্যালয়',
      line1: 'দৃঢ় বিশ্বাস।',
      line2: 'আত্মবিশ্বাস।',
      line3: 'সৃজনশীলতা।',
      btnAdmissions: 'ভৰ্তি প্ৰক্ৰিয়া চাওক',
      btnServices: 'অনলাইন সেৱাসমূহ',
      announcementsTitle: 'শেহতীয়া জাননীসমূহ',
      discoverTitle: 'অসম বিশ্ববিদ্যালয়ৰ পৰিচিতি',
      programsTitle: 'শৈক্ষিক পাঠ্যক্ৰম',
      schoolsTitle: 'অনুষদ আৰু বিভাগসমূহ',
      portalsTitle: 'বিশ্ববিদ্যালয় পৰ্টেল',
      lifeTitle: 'চৌহদৰ জীৱন আৰু সংস্কৃতি'
    }
  };

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.dataset.lang;
      applyLanguage(lang);
    });
  });

  function applyLanguage(lang) {
    const dict = i18nData[lang] || i18nData.en;
    const heroTag = document.querySelector('.hero-pill-badge');
    if (heroTag) heroTag.textContent = dict.heroTag;

    const heroLines = document.querySelectorAll('.hero-stacked-title span');
    if (heroLines.length >= 3) {
      heroLines[0].textContent = dict.line1;
      heroLines[1].textContent = dict.line2;
      heroLines[2].textContent = dict.line3;
    }

    const btnAdm = document.querySelector('.hero-action-buttons .btn-white');
    if (btnAdm) btnAdm.textContent = dict.btnAdmissions;

    const btnServ = document.querySelector('.hero-action-buttons .btn-outline-white');
    if (btnServ) btnServ.textContent = dict.btnServices;
  }

  /* ------------------------------------------------------------------------
   * 3. Global Instant Search Bar & Active Content Filtering
   * ------------------------------------------------------------------------ */
  const globalSearchInput = document.getElementById('globalSearchInput');
  const searchCategorySelect = document.getElementById('searchCategorySelect');
  const searchLiveResults = document.getElementById('searchLiveResults');

  const searchableIndex = [
    { title: 'Re-Evaluation for UG/PG CBCS Even Semester 2026', category: 'Examinations', snippet: 'Online scrutiny application link and fee structure.', link: '#announcements', target: 'notice-1' },
    { title: '23rd Convocation Highlights & Degree Certificate Dispatch', category: 'Examinations', snippet: 'Notification regarding degree certificates in-person or speed post dispatch.', link: '#announcements', target: 'notice-1' },
    { title: 'Undergraduate B.Tech Admissions 2026', category: 'Admissions', snippet: 'Triguna Sen School of Technology JEE & University RET counseling.', link: '#programs', target: 'adm-eng' },
    { title: 'Online Result Checker Portal', category: 'Examinations', snippet: 'Direct verification for UG/PG CBCS and NEP semester marksheets.', link: '#portals', target: 'exam-results' },
    { title: 'Academic Calendar for Autumn Semester 2026', category: 'Notices', snippet: 'Approved dates for admissions, classes, examinations, and vacations.', link: '#announcements', target: 'notice-2' },
    { title: 'Course on Indian Knowledge Systems (IKS)', category: 'Admissions', snippet: 'Open credit course on Indian mathematical & astronomical traditions.', link: '#announcements', target: 'notice-3' },
    { title: 'Bioinformatics Centre (BTISnet)', category: 'Centres & Cells', snippet: 'Distributed information sub-centre sponsored by DBT, Govt. of India.', link: '#nav-centres', target: 'centre-bioinfo' },
    { title: 'Department of Business Administration (MBA)', category: 'Academics', snippet: 'Jawaharlal Nehru School of Management Studies 2-year AICTE approved MBA.', link: '#schools', target: 'adm-mgmt' },
    { title: 'Rabindra Central Library & Web OPAC', category: 'Academics', snippet: 'Access 2,00,000+ volumes, DELCON, Shodhganga, and 10,000+ e-journals.', link: '#portals', target: 'library' },
    { title: 'Son Beel Utsav 2.0 Eco-Cultural Symposium', category: 'Notices', snippet: 'Symposium on wetland biodiversity and indigenous livelihoods.', link: '#announcements', target: 'notice-4' },
    { title: 'Career Counselling & Placement Cell (CCPC)', category: 'Centres & Cells', snippet: 'Campus placement drives, corporate internships, and soft skill training.', link: '#nav-centres', target: 'centre-placement' },
    { title: 'SC/ST Welfare Cell & Equal Opportunity Cell', category: 'Centres & Cells', snippet: 'Statutory compliance and social welfare initiatives for scholars.', link: '#nav-centres', target: 'centre-scst' }
  ];

  if (globalSearchInput && searchLiveResults) {
    globalSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      const selectedCategory = searchCategorySelect ? searchCategorySelect.value : 'All';

      if (query.length < 2) {
        searchLiveResults.classList.remove('open');
        searchLiveResults.innerHTML = '';
        return;
      }

      const filtered = searchableIndex.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesText = item.title.toLowerCase().includes(query) || item.snippet.toLowerCase().includes(query);
        return matchesCategory && matchesText;
      });

      if (filtered.length === 0) {
        searchLiveResults.innerHTML = `
          <div style="padding: 14px; font-size: 0.8125rem; color: #64748B; text-align: center;">
            No results found for "<strong>${escapeHtml(query)}</strong>" in <em>${escapeHtml(selectedCategory)}</em>.
          </div>
        `;
      } else {
        searchLiveResults.innerHTML = filtered.map(item => `
          <a href="${item.link}" class="search-result-item" data-target="${item.target}">
            <span class="search-result-badge">${item.category}</span>
            <div>
              <div class="search-result-title">${escapeHtml(item.title)}</div>
              <div class="search-result-snippet">${escapeHtml(item.snippet)}</div>
            </div>
          </a>
        `).join('');

        searchLiveResults.querySelectorAll('.search-result-item').forEach(el => {
          el.addEventListener('click', () => {
            searchLiveResults.classList.remove('open');
            globalSearchInput.value = '';
            const target = el.dataset.target;
            if (target && target.startsWith('notice-')) {
              openNoticeModal(target);
            } else if (target === 'exam-results') {
              showResultModal('2024-AUS-10492', 'Semester IV', 'Even Semester 2026');
            }
          });
        });
      }

      searchLiveResults.classList.add('open');
    });

    document.addEventListener('click', (e) => {
      if (!globalSearchInput.contains(e.target) && !searchLiveResults.contains(e.target)) {
        searchLiveResults.classList.remove('open');
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 4. Mega Menu: Live Search Filter for Centres & Cells (21 items)
   * ------------------------------------------------------------------------ */
  const megaSearchInput = document.getElementById('megaCentresSearch');
  const megaCentresList = document.querySelectorAll('.mega-centre-item');
  const megaCountBadge = document.getElementById('megaCentresCount');

  if (megaSearchInput && megaCentresList.length > 0) {
    megaSearchInput.addEventListener('input', (e) => {
      const filter = e.target.value.trim().toLowerCase();
      let visibleCount = 0;

      megaCentresList.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(filter)) {
          item.style.display = 'flex';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      if (megaCountBadge) {
        megaCountBadge.textContent = `${visibleCount} of ${megaCentresList.length} Centres Active`;
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 5. Latest Announcements Tab Filtering & Notice Modal Trigger
   * ------------------------------------------------------------------------ */
  const noticeTabBtns = document.querySelectorAll('#announcements .tab-btn');
  const noticeRows = document.querySelectorAll('.notice-row-item');

  noticeTabBtns.forEach(tab => {
    tab.addEventListener('click', () => {
      noticeTabBtns.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.category;

      noticeRows.forEach(row => {
        if (cat === 'all' || row.dataset.category === cat) {
          row.style.display = 'flex';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  noticeRows.forEach(row => {
    row.addEventListener('click', () => {
      const noticeId = row.dataset.noticeId || 'notice-1';
      openNoticeModal(noticeId);
    });
  });

  const heroConvocationLink = document.getElementById('heroQuickConvocation');
  if (heroConvocationLink) {
    heroConvocationLink.addEventListener('click', (e) => {
      e.preventDefault();
      openNoticeModal('notice-1');
    });
  }

  /* ------------------------------------------------------------------------
   * 6. Quick Access Cards / Result Checker Direct Launch
   * ------------------------------------------------------------------------ */
  const quickLinkCheckResult = document.getElementById('quickLinkCheckResult');
  const btnTriggerResultChecker = document.getElementById('btnTriggerResultChecker');

  if (quickLinkCheckResult) {
    quickLinkCheckResult.addEventListener('click', (e) => {
      e.preventDefault();
      showResultCheckerPrompt();
    });
  }

  if (btnTriggerResultChecker) {
    btnTriggerResultChecker.addEventListener('click', (e) => {
      e.preventDefault();
      showResultCheckerPrompt();
    });
  }

  function showResultCheckerPrompt() {
    const promptHtml = `
      <div style="font-size: 0.875rem;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #E2E8F0;">
          <div style="width: 40px; height: 40px; border-radius: 6px; background: #F0F4F8; color: #0A2342; display: flex; align-items: center; justify-content: center;">
            <svg class="icon icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <div>
            <h4 style="color: #0A2342; margin: 0; font-size: 1rem;">Online Examination Result Checker</h4>
            <p style="font-size: 0.75rem; color: #64748B; margin: 0;">Choice Based Credit System (CBCS) &amp; NEP 2020</p>
          </div>
        </div>

        <form id="checkerModalForm" onsubmit="event.preventDefault(); const roll = document.getElementById('modalRollInput').value; const sem = document.getElementById('modalSemSelect').value; const session = document.getElementById('modalSessionSelect').value; showResultModal(roll, sem, session);">
          <div style="margin-bottom: 14px;">
            <label style="display: block; font-weight: 600; margin-bottom: 4px; color: #0A2342;">Student Roll Number / Enrollment</label>
            <input type="text" id="modalRollInput" class="result-field" value="2024-AUS-10492" placeholder="e.g. 2024-AUS-10492" required>
          </div>
          <div style="margin-bottom: 14px;">
            <label style="display: block; font-weight: 600; margin-bottom: 4px; color: #0A2342;">Semester / Examination</label>
            <select id="modalSemSelect" class="result-field">
              <option value="Semester IV">Semester IV (Regular / Arrear)</option>
              <option value="Semester VI">Semester VI (Final Year)</option>
              <option value="Semester II">Semester II</option>
              <option value="Semester VIII">Semester VIII (B.Tech)</option>
            </select>
          </div>
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-weight: 600; margin-bottom: 4px; color: #0A2342;">Examination Session</label>
            <select id="modalSessionSelect" class="result-field">
              <option value="Even Semester 2026">Even Semester Examinations 2026</option>
              <option value="Odd Semester 2025">Odd Semester Examinations 2025</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">
            Fetch Instant Marksheet &rarr;
          </button>
        </form>
      </div>
    `;
    openModal(promptHtml, 'Online Result Checker');
  }

  /* ------------------------------------------------------------------------
   * 7. Role-Based Login SSO Switcher Modal
   * ------------------------------------------------------------------------ */
  window.openRoleLogin = function(role = 'student') {
    const roleMeta = {
      student: { title: 'Student & Applicant Portal', idLabel: 'Enrolment / Application No.', demoId: 'AUS/2024/09124', demoPass: 'student@2026' },
      department: { title: 'Department & Faculty Portal', idLabel: 'Department Code / Faculty ID', demoId: 'CSE-HOD-01', demoPass: 'dept@aus2026' },
      college: { title: 'Affiliated College Administration', idLabel: 'College Code / Principal Key', demoId: 'CLG-GC-042', demoPass: 'college@aus2026' },
      center: { title: 'Centres & Cells Administration', idLabel: 'Centre Coordinator ID', demoId: 'CELL-IKS-2026', demoPass: 'center@aus2026' },
      admin: { title: 'Registrar & Examination SSO', idLabel: 'Administrative Officer ID', demoId: 'ADMIN-REG-01', demoPass: 'admin@sec2026' }
    };

    const current = roleMeta[role] || roleMeta.student;

    const loginHtml = `
      <div style="font-size: 0.875rem;">
        <div style="display: flex; gap: 6px; overflow-x: auto; margin-bottom: 18px; padding-bottom: 6px; border-bottom: 1px solid #E2E8F0;">
          <button type="button" class="btn btn-sm ${role === 'student' ? 'btn-primary' : 'btn-secondary'}" onclick="openRoleLogin('student')">Student</button>
          <button type="button" class="btn btn-sm ${role === 'department' ? 'btn-primary' : 'btn-secondary'}" onclick="openRoleLogin('department')">Department</button>
          <button type="button" class="btn btn-sm ${role === 'college' ? 'btn-primary' : 'btn-secondary'}" onclick="openRoleLogin('college')">College</button>
          <button type="button" class="btn btn-sm ${role === 'center' ? 'btn-primary' : 'btn-secondary'}" onclick="openRoleLogin('center')">Centres</button>
          <button type="button" class="btn btn-sm ${role === 'admin' ? 'btn-primary' : 'btn-secondary'}" onclick="openRoleLogin('admin')">Admin SSO</button>
        </div>

        <h4 style="color: #0A2342; margin-bottom: 4px; font-size: 1.1rem;">${current.title}</h4>
        <p style="font-size: 0.8125rem; color: #475569; margin-bottom: 16px;">Assam University Unified Authentication &bull; Secured with TLS 1.3</p>

        <form onsubmit="event.preventDefault(); alert('[AUTHENTICATED]\\nWelcome to ${current.title}\\nSigned in as: ' + document.getElementById('roleIdInput').value); closeModal();">
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-weight: 600; margin-bottom: 4px; color: #0A2342;">${current.idLabel}</label>
            <input type="text" id="roleIdInput" class="result-field" value="${current.demoId}" required>
          </div>
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-weight: 600; margin-bottom: 4px; color: #0A2342;">Password / Security PIN</label>
            <input type="password" id="rolePassInput" class="result-field" value="${current.demoPass}" required>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 0.8125rem;">
            <button type="button" style="color: #133C73; text-decoration: underline; font-weight: 600;" onclick="document.getElementById('roleIdInput').value='${current.demoId}'; document.getElementById('rolePassInput').value='${current.demoPass}';">
              Fill Demo Credentials
            </button>
            <span style="color: #64748B;">Forgot Password?</span>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">
            Sign In to Portal &rarr;
          </button>
        </form>
      </div>
    `;

    openModal(loginHtml, 'Assam University Unified SSO');
  };

  /* ------------------------------------------------------------------------
   * 8. Modals (Notice PDF Simulation, Results Marksheet, VC Address, Lightbox)
   * ------------------------------------------------------------------------ */
  const modalOverlay = document.getElementById('genericModalOverlay');
  const modalContainer = document.getElementById('genericModalContent');
  const modalCloseBtn = document.getElementById('genericModalClose');

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  function openModal(contentHtml, title = 'Notice Details') {
    const modalTitleEl = document.getElementById('genericModalTitle');
    if (modalTitleEl) modalTitleEl.textContent = title;
    if (modalContainer) modalContainer.innerHTML = contentHtml;
    if (modalOverlay) {
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Notice Data Dictionary
  const noticeData = {
    'notice-1': {
      title: '23rd Convocation Highlights & Degree Certificate Dispatch Notice',
      content: `
        <div class="pdf-viewer-simulation">
          <div class="pdf-header-letterhead">
            <h3 style="font-size: 1.15rem; font-weight: bold; color: #0A2342; margin-bottom: 2px;">ASSAM UNIVERSITY, SILCHAR</h3>
            <p style="font-size: 0.8125rem; color: #475569; margin: 0;">(A Central University Established by an Act of Parliament 1989)</p>
            <p style="font-size: 0.75rem; color: #64748B;">P.O. Dargakona, Silchar - 788011, Cachar, Assam, India</p>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; font-weight: 600; margin-bottom: 16px;">
            <span>Ref No: AUS/CONV-23/NOTIF/2026/048</span>
            <span>Date: 24th February 2026</span>
          </div>
          <h4 style="text-align: center; text-decoration: underline; margin-bottom: 16px; font-size: 1rem; color: #0A2342;">NOTIFICATION: 23RD ANNUAL CONVOCATION</h4>
          <p style="margin-bottom: 12px;">This is for the information of all eligible candidates who have qualified for their Post-Graduate, Under-Graduate, M.Phil., and Ph.D. degrees in the Academic Sessions 2024-2025 and 2025-2026 that the 23rd Annual Convocation of Assam University will be solemnized at Netaji Subhash Mancha, Silchar Campus.</p>
          <p style="margin-bottom: 12px;">1. Online application for receiving the degree in-person or in-absentia is activated via the unified examination portal.</p>
          <p style="margin-bottom: 12px;">2. Speed Post dispatch for in-absentia certificates will begin directly from the Examination Branch within 14 working days of formal conferment.</p>
          <div style="display: flex; justify-content: flex-end; text-align: right; margin-top: 24px;">
            <div>
              <p style="font-weight: bold; margin: 0;">(Dr. P. K. Nath)</p>
              <p style="font-size: 0.8125rem; color: #475569; margin: 0;">Registrar (i/c), Assam University</p>
            </div>
          </div>
          <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid #CBD5E1; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.75rem; color: #64748B;">Digitally verified &bull; Examination Branch</span>
            <button class="btn btn-primary btn-sm" onclick="window.print()">
              Download Official PDF
            </button>
          </div>
        </div>
      `
    },
    'notice-2': {
      title: 'Academic Calendar for Autumn Semester 2026',
      content: `
        <div class="pdf-viewer-simulation">
          <div class="pdf-header-letterhead">
            <h3 style="font-size: 1.15rem; font-weight: bold; color: #0A2342;">ACADEMIC COUNCIL &bull; ASSAM UNIVERSITY</h3>
            <p style="font-size: 0.8125rem; color: #475569;">P.O. Dargakona, Silchar - 788011, Assam</p>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; font-weight: 600; margin-bottom: 16px;">
            <span>Ref No: AUS/ACAD/CAL-AUT/2026/02</span>
            <span>Date: 12th February 2026</span>
          </div>
          <h4 style="text-align: center; text-decoration: underline; margin-bottom: 16px; font-size: 1rem; color: #0A2342;">ACADEMIC SCHEDULE (SESSION 2026-27)</h4>
          <ul style="margin: 0 0 16px 20px; font-size: 0.875rem; line-height: 1.7;">
            <li>Commencement of Autumn Classes: August 01, 2026</li>
            <li>First Sessional Examination: September 21 - September 25, 2026</li>
            <li>Puja Vacation: October 18 - October 28, 2026</li>
            <li>Odd Semester End Examinations: December 01 - December 20, 2026</li>
          </ul>
        </div>
      `
    },
    'notice-3': {
      title: 'Course on Indian Knowledge Systems (IKS): Registration Open',
      content: `
        <div class="pdf-viewer-simulation">
          <div class="pdf-header-letterhead">
            <h3 style="font-size: 1.15rem; font-weight: bold; color: #0A2342;">CENTRE FOR INDIAN KNOWLEDGE SYSTEMS (IKS)</h3>
            <p style="font-size: 0.8125rem; color: #475569;">Assam University, Silchar</p>
          </div>
          <p>Registration is open for the Value-Added Multidisciplinary Open Course on <strong>"Foundations of Indian Mathematical & Astronomical Traditions"</strong> for all PG and UG students across departments.</p>
          <ul style="margin: 16px 0 16px 20px; font-size: 0.875rem;">
            <li>Credits: 3 Credits (Transferable via ABC)</li>
            <li>Mode: Hybrid (Interactive Campus Seminars + Moodle LMS)</li>
            <li>Last Date of Enrolment: March 15, 2026</li>
          </ul>
        </div>
      `
    },
    'notice-4': {
      title: 'Son Beel Utsav 2.0 Eco-Cultural National Symposium & Exhibition',
      content: `
        <div class="pdf-viewer-simulation">
          <div class="pdf-header-letterhead">
            <h3 style="font-size: 1.15rem; font-weight: bold; color: #0A2342;">CENTRE FOR STUDIES IN HUMAN DEVELOPMENT</h3>
            <p style="font-size: 0.8125rem; color: #475569;">Jointly with Department of Ecology &amp; Environmental Science</p>
          </div>
          <h4 style="text-align: center; margin: 16px 0; color: #0A2342;">SON BEEL UTSAV 2.0</h4>
          <p>Assam University is pleased to host Son Beel Utsav 2.0, an interdisciplinary symposium on wetland biodiversity, climate resilience, and indigenous livelihoods of the Barak Valley. National researchers and cultural troupes will convene at the Dargakona campus.</p>
          <p style="margin-top: 14px;"><strong>Dates:</strong> 28th - 29th March 2026 | <strong>Venue:</strong> Bipin Chandra Pal Auditorium</p>
        </div>
      `
    }
  };

  function openNoticeModal(noticeId) {
    const item = noticeData[noticeId] || noticeData['notice-1'];
    openModal(item.content, item.title);
  }

  // Interactive Online Result Marksheet Modal
  window.showResultModal = function(roll, sem, session) {
    const marksheetHtml = `
      <div class="marksheet-simulation">
        <div style="text-align: center; border-bottom: 2px solid #0A2342; padding-bottom: 12px; margin-bottom: 16px;">
          <h3 style="font-family: var(--font-heading); color: #0A2342; font-size: 1.25rem; margin-bottom: 2px;">ASSAM UNIVERSITY, SILCHAR</h3>
          <p style="font-size: 0.8125rem; font-weight: 600; color: #475569; margin: 0;">GRADE CARD &amp; PROVISIONAL TABULATION SHEET</p>
          <p style="font-size: 0.75rem; color: #64748B;">${session} &bull; Choice Based Credit System (CBCS)</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.8125rem; background: #F8FAFC; padding: 12px; border-radius: 4px; border: 1px solid #E2E8F0; margin-bottom: 16px;">
          <div><strong>Candidate Name:</strong> RAHUL CHOUDHURY</div>
          <div><strong>Roll / No:</strong> ${escapeHtml(roll)}</div>
          <div><strong>Registration No:</strong> 20240019284 of 2024-25</div>
          <div><strong>Semester / Year:</strong> ${escapeHtml(sem)}</div>
          <div><strong>Degree Program:</strong> B.Tech (Computer Science &amp; Engineering)</div>
          <div><strong>School / Dept:</strong> Triguna Sen School of Technology</div>
        </div>

        <table class="marksheet-table">
          <thead>
            <tr>
              <th>Paper Code</th>
              <th>Paper Title</th>
              <th>Credits</th>
              <th>Grade</th>
              <th>Grade Point</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CSE-401</td>
              <td>Design &amp; Analysis of Algorithms</td>
              <td>4</td>
              <td><strong>A+</strong></td>
              <td>9.0</td>
              <td><span style="color: #15803D; font-weight: 600;">PASS</span></td>
            </tr>
            <tr>
              <td>CSE-402</td>
              <td>Operating Systems &amp; Architecture</td>
              <td>4</td>
              <td><strong>A</strong></td>
              <td>8.0</td>
              <td><span style="color: #15803D; font-weight: 600;">PASS</span></td>
            </tr>
            <tr>
              <td>CSE-403</td>
              <td>Database Management Systems</td>
              <td>4</td>
              <td><strong>O</strong></td>
              <td>10.0</td>
              <td><span style="color: #15803D; font-weight: 600;">PASS</span></td>
            </tr>
            <tr>
              <td>CSE-404</td>
              <td>Software Engineering &amp; Agile</td>
              <td>3</td>
              <td><strong>A+</strong></td>
              <td>9.0</td>
              <td><span style="color: #15803D; font-weight: 600;">PASS</span></td>
            </tr>
            <tr>
              <td>IKS-201</td>
              <td>Indian Knowledge Systems: Science</td>
              <td>2</td>
              <td><strong>A</strong></td>
              <td>8.0</td>
              <td><span style="color: #15803D; font-weight: 600;">PASS</span></td>
            </tr>
          </tbody>
        </table>

        <div style="display: flex; justify-content: space-between; align-items: center; background: #0A2342; color: #FFFFFF; padding: 12px 16px; border-radius: 4px; font-weight: bold; font-size: 0.875rem;">
          <span>Semester SGPA: <span style="color: #FACC15;">8.95 / 10.00</span></span>
          <span>Cumulative CGPA: <span style="color: #FACC15;">8.82 / 10.00</span></span>
          <span style="background: #15803D; padding: 2px 8px; border-radius: 3px; font-size: 0.75rem;">FIRST CLASS</span>
        </div>

        <div style="margin-top: 18px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.75rem; color: #64748B;">Security Hash: AUS-HEX-78A902BC8912 &bull; Digitally Signed</span>
          <button class="btn btn-secondary btn-sm" onclick="window.print()">Print / Save PDF</button>
        </div>
      </div>
    `;
    openModal(marksheetHtml, `Examination Result: ${roll}`);
  };

  // Vice Chancellor Full Message Modal
  const btnReadVcMessage = document.getElementById('btnReadVcMessage');
  if (btnReadVcMessage) {
    btnReadVcMessage.addEventListener('click', () => {
      const vcHtml = `
        <div style="font-family: var(--font-body); color: var(--color-slate-ink); line-height: 1.7; font-size: 0.9375rem;">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid #E2E8F0;">
            <div style="width: 64px; height: 64px; border-radius: 50%; overflow: hidden; border: 2px solid #0A2342; flex-shrink: 0;">
              <img src="assets/logo.webp" alt="Assam University Emblem" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div>
              <h4 style="font-size: 1.15rem; color: #0A2342; margin: 0;">Prof. Rajive Mohan Pant</h4>
              <p style="font-size: 0.8125rem; color: #475569; margin: 0;">Vice Chancellor, Assam University, Silchar</p>
              <p style="font-size: 0.75rem; color: #64748B; margin: 0;">A Central University Established by an Act of Parliament 1989</p>
            </div>
          </div>
          <p style="margin-bottom: 12px;"><strong>Dear Students, Scholars, Faculty Members, and Friends,</strong></p>
          <p style="margin-bottom: 12px;">Welcome to Assam University, Silchar—a premier temple of higher learning nestled amidst the undulating emerald hillocks of Southern Assam, with our vibrant second campus at Diphu in the Karbi Anglong hills.</p>
          <p style="margin-bottom: 12px;">Established by an Act of Parliament in 1994, our institution was envisioned to cater to the intellectual, educational, and developmental aspirations of the multicultural tapestry of Northeast India. Over the last three decades, Assam University has expanded into sixteen vibrant schools comprising forty-two postgraduate departments, delivering high-impact education that synthesizes timeless Indian wisdom with contemporary cutting-edge science.</p>
          <p style="margin-bottom: 14px;">In line with the transformative mandate of the National Education Policy (NEP 2020), we have completely re-engineered our academic curricula to be interdisciplinary, research-driven, and skill-aligned.</p>
          <div style="text-align: right; margin-top: 20px; border-top: 1px solid #E2E8F0; padding-top: 12px;">
            <p style="font-weight: bold; color: #0A2342; margin: 0;">Prof. Rajive Mohan Pant</p>
            <p style="font-size: 0.8125rem; color: #64748B; margin: 0;">Vice Chancellor</p>
          </div>
        </div>
      `;
      openModal(vcHtml, "Vice Chancellor's Message & History");
    });
  }

  // University Photo Collection
  const universityPhotos = [
    { src: 'assets/hero-monument.jpg', title: 'Language Martyrs Memorial (Shahid Minar) & Assembly', subtitle: 'Pristine marble plaza at Dargakona Campus' },
    { src: 'assets/president-vc.jpg', title: 'Hon\'ble President of India Droupadi Murmu & VC Prof. Rajive Mohan Pant', subtitle: 'Rashtrapati Bhavan Presentation' },
    { src: 'assets/campus-gate.jpg', title: 'Assam University Main Entrance Gate & Graduating Scholars', subtitle: 'Academic convocation procession' },
    { src: 'assets/convocation-stage.jpg', title: '23rd Annual Convocation Cultural Celebration', subtitle: 'Netaji Subhash Mancha traditional performance' },
    { src: 'assets/foundation-day.jpg', title: '33rd Foundation Day Celebration Address', subtitle: 'Celebrating 33 glorious years of excellence' }
  ];

  window.openImageLightbox = function(src, caption) {
    const galleryHtml = `
      <div style="text-align: center;">
        <div style="background: #0F172A; border-radius: 8px; overflow: hidden; max-height: 520px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px;">
          <img src="${src}" alt="${escapeHtml(caption)}" style="max-height: 500px; max-width: 100%; object-fit: contain;">
        </div>
        <p style="font-size: 1rem; font-weight: 700; color: #0A2342; margin-bottom: 4px;">${escapeHtml(caption)}</p>
        <p style="font-size: 0.75rem; color: #64748B;">Assam University Silchar Archive &bull; High-Resolution Institutional Collection</p>
      </div>
    `;
    openModal(galleryHtml, "Photographic Showcase");
  };

  // Lightbox for Photo Gallery Cards
  const galleryItems = document.querySelectorAll('.gallery-card');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const caption = item.dataset.caption || 'Campus Architecture';
      const imgSrc = item.dataset.img || 'assets/logo.webp';
      openImageLightbox(imgSrc, caption);
    });
  });

  // Full Gallery Modal with all pictures
  const btnOpenFullGallery = document.getElementById('btnOpenFullGallery');
  if (btnOpenFullGallery) {
    btnOpenFullGallery.addEventListener('click', () => {
      const fullGridHtml = `
        <div style="font-size: 0.875rem;">
          <p style="color: #475569; margin-bottom: 14px;">Click any photograph to view in high-resolution institutional format:</p>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
            ${universityPhotos.map(p => `
              <div style="border: 1px solid #E2E8F0; border-radius: 6px; overflow: hidden; background: #FFF; cursor: pointer; transition: transform 200ms;" onclick="openImageLightbox('${p.src}', '${escapeHtml(p.title)}')">
                <div style="height: 130px; overflow: hidden; background: #0A2342;">
                  <img src="${p.src}" alt="${escapeHtml(p.title)}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div style="padding: 10px 12px;">
                  <div style="font-size: 0.8125rem; font-weight: 700; color: #0A2342; margin-bottom: 2px;">${escapeHtml(p.title)}</div>
                  <div style="font-size: 0.75rem; color: #64748B;">${escapeHtml(p.subtitle)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      openModal(fullGridHtml, "Assam University Photo Archive (120+ Moments)");
    });
  }

  // HTTPS Trust Badge Security Modal
  const trustBadge = document.getElementById('httpsTrustBadge');
  if (trustBadge) {
    trustBadge.addEventListener('click', () => {
      const secHtml = `
        <div style="font-size: 0.875rem;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #F0FDF4; color: #15803D; display: flex; align-items: center; justify-content: center;">
              <svg class="icon icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div>
              <h4 style="color: #0A2342; margin: 0;">Verified 256-Bit TLS/SSL Secure Portal</h4>
              <p style="font-size: 0.75rem; color: #475569; margin: 0;">Assam University, Silchar &bull; Government of India Domain</p>
            </div>
          </div>
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 6px; font-size: 0.8125rem; line-height: 1.6; margin-bottom: 16px;">
            <p><strong>Certificate Authority:</strong> National Informatics Centre (NIC) / DigiCert</p>
            <p><strong>Protocol:</strong> TLS 1.3 with AES-256-GCM cipher encryption</p>
            <p><strong>Compliance:</strong> Indian IT Act 2000 &amp; CERT-In Government Guidelines</p>
          </div>
          <div style="text-align: right;">
            <button class="btn btn-primary btn-sm" onclick="closeModal()">Close Certificate</button>
          </div>
        </div>
      `;
      openModal(secHtml, "Security & Trust Certification");
    });
  }

  /* ------------------------------------------------------------------------
   * 9. Mobile Drawer Navigation
   * ------------------------------------------------------------------------ */
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });
  }

  if (mobileDrawerClose && mobileDrawer) {
    mobileDrawerClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
  }
});
