const PROJECT_DETAILS = {
  medical: {
    category: "AI / Healthcare • Java",
    title: "Clinical Context Integration Using Medical Imaging",
    summary:
      "An AI-powered clinical decision-support system that fuses medical imaging analysis with patient clinical history to produce explainable insights and actionable reports.",
    features: [
      "Integrates diagnostic medical images with structured patient clinical information for holistic analysis.",
      "Generates explainable AI findings alongside specialist recommendations to support clinical interpretation.",
      "Produces structured diagnostic reports and voice-based explanations for improved accessibility.",
      "Persists patient records and generated reports locally using SQLite / MySQL databases."
    ],
    tools: ["Java", "AI / ML", "Medical Image Processing", "SQLite / MySQL"],
    repo: "https://github.com/haranishree-g/Medical_Scan"
  },
  library: {
    category: "Intelligent Web App • Python",
    title: "Online Library Management System",
    summary:
      "A full-featured intelligent web application built to modernize library operations with secure authentication, smart search, AI recommendations, and automated record keeping.",
    features: [
      "OTP-based secure login flow and role-aware user management.",
      "Smart fuzzy-matching search and real-time book availability tracking.",
      "AI-assisted book recommendations and flexible issue/return workflows with automatic fine calculation.",
      "Data visualization dashboards, UPI-based payment integration, and synced database + Excel record management."
    ],
    tools: ["HTML", "CSS", "Python (Flask / Django)", "SQLite / MySQL", "Fuzzy Search", "Excel Integration"],
    repo: "https://github.com/haranishree-g/Online-Library-Management-System-"
  },
  analyzer: {
    category: "NLP & Career Intelligence • Java Web",
    title: "AI-Based Resume & Skill Gap Analyzer",
    summary:
      "An NLP-powered career readiness platform that parses candidate resumes, evaluates job compatibility, surfaces missing competencies, and builds personalized learning roadmaps.",
    features: [
      "Extracts candidate skills using NLP and string parsing techniques.",
      "Evaluates job compatibility scores and pinpoints targeted skill gaps.",
      "Generates personalized learning roadmaps tailored to target job descriptions.",
      "Includes user authentication, dynamic candidate dashboards, and efficient JDBC / MySQL database connectivity."
    ],
    tools: ["Java", "Servlets", "JSP", "HTML", "CSS", "JDBC", "MySQL", "NLP / String Parsing"],
    repo: "https://github.com/haranishree-g/AI-Based-Resume-Skill-Gap-Analyzer-project"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Set current year
  const yearEl = document.getElementById("yearNow");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme Toggle
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("hsg-theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    root.setAttribute("data-theme", savedTheme);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }

  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("hsg-theme", next);
  });

  // Mobile Nav
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  mobileMenuBtn?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      mobileMenuBtn?.setAttribute("aria-expanded", "false");
    });
  });

  // Toast helper
  const toastEl = document.getElementById("toast");
  let toastTimer;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.hidden = true;
    }, 2600);
  }

  // Copy to clipboard buttons
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy");
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        showToast(`Copied "${value}" to clipboard`);
      } catch {
        showToast(`Contact: ${value}`);
      }
    });
  });

  // Project Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      projectCards.forEach((card) => {
        const categories = (card.getAttribute("data-category") || "").split(" ");
        const show = filter === "all" || categories.includes(filter);
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  // Project Details Modal
  const projectModal = document.getElementById("projectModal");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalSummary = document.getElementById("modalSummary");
  const modalFeatures = document.getElementById("modalFeatures");
  const modalTools = document.getElementById("modalTools");
  const modalRepoLink = document.getElementById("modalRepoLink");
  const closeProjectModal = document.getElementById("closeProjectModal");

  function openProjectModal(key) {
    const data = PROJECT_DETAILS[key];
    if (!data || !projectModal) return;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalSummary.textContent = data.summary;
    modalFeatures.innerHTML = data.features.map((item) => `<li>${item}</li>`).join("");
    modalTools.innerHTML = data.tools.map((tool) => `<span class="tag">${tool}</span>`).join("");
    if (modalRepoLink) modalRepoLink.href = data.repo || "#";
    projectModal.hidden = false;
  }

  document.querySelectorAll(".project-detail-btn").forEach((btn) => {
    btn.addEventListener("click", () => openProjectModal(btn.getAttribute("data-project")));
  });

  closeProjectModal?.addEventListener("click", () => {
    projectModal.hidden = true;
  });

  projectModal?.addEventListener("click", (e) => {
    if (e.target === projectModal) projectModal.hidden = true;
  });

  // Resume Modal
  const resumeModal = document.getElementById("resumeModal");
  const openResumeBtns = [document.getElementById("openResumeBtn"), document.getElementById("heroResumeBtn")];
  const closeResumeModal = document.getElementById("closeResumeModal");
  const toggleResumeMode = document.getElementById("toggleResumeMode");
  const structuredResumeView = document.getElementById("structuredResumeView");
  const wordResumeView = document.getElementById("wordResumeView");
  const printResumeBtn = document.getElementById("printResumeBtn");

  openResumeBtns.forEach((btn) => {
    btn?.addEventListener("click", () => {
      if (resumeModal) resumeModal.hidden = false;
    });
  });

  closeResumeModal?.addEventListener("click", () => {
    if (resumeModal) resumeModal.hidden = true;
  });

  resumeModal?.addEventListener("click", (e) => {
    if (e.target === resumeModal) resumeModal.hidden = true;
  });

  toggleResumeMode?.addEventListener("click", () => {
    const showingStructured = !structuredResumeView.hidden;
    structuredResumeView.hidden = showingStructured;
    wordResumeView.hidden = !showingStructured;
    toggleResumeMode.textContent = showingStructured ? "View Digital Resume" : "View Word Format";
  });

  printResumeBtn?.addEventListener("click", () => {
    window.print();
  });

  // Escape closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (projectModal && !projectModal.hidden) projectModal.hidden = true;
      if (resumeModal && !resumeModal.hidden) resumeModal.hidden = true;
    }
  });

  // Contact form Gmail + mailto launcher
  const contactForm = document.getElementById("contactForm");
  const mailtoFallbackBtn = document.getElementById("mailtoFallbackBtn");

  function getContactFields() {
    const name = document.getElementById("senderName").value.trim();
    const subject = document.getElementById("senderSubject").value.trim();
    const message = document.getElementById("senderMessage").value.trim();
    return { name, subject, message };
  }

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, subject, message } = getContactFields();
    if (!name || !subject || !message) return;

    const bodyText = `Hi Harini,\n\n${message}\n\nBest regards,\n${name}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=haranishreeg@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    showToast("Opening Gmail compose...");
  });

  mailtoFallbackBtn?.addEventListener("click", () => {
    if (!contactForm?.reportValidity()) return;
    const { name, subject, message } = getContactFields();
    const bodyText = `Hi Harini,\n\n${message}\n\nBest regards,\n${name}`;
    window.location.href = `mailto:haranishreeg@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    showToast("Opening your email app...");
  });

  // Scroll Reveal & Active Nav Link
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));

  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchors.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );
  sections.forEach((sec) => sectionObserver.observe(sec));
});
