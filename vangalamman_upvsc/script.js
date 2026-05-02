// ===============================
// NAVIGATION SCROLL EFFECT
// ===============================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (!navbar) return;

  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===============================
// MOBILE MENU TOGGLE
// ===============================
const mobileBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener("click", () => {
    mobileBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
}

// Close menu when clicking link
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    if (mobileBtn && navLinks) {
        mobileBtn.classList.remove("active");
        navLinks.classList.remove("active");
    }
  });
});


// ===============================
// STATS COUNTER ANIMATION
// ===============================
const statsContainer = document.querySelector(".stats-container");

if (statsContainer) {

  const animateCounter = (element, target) => {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + "+";
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + "+";
      }
    }, 16);
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-target"));
          animateCounter(stat, target);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsContainer);
}

// ===============================
// CONTACT FORM VALIDATION
// ===============================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelectorAll(".error-message").forEach((el) => {
      el.classList.remove("show");
      el.textContent = "";
    });

    let isValid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-+]+$/;

    if (!name.value.trim()) {
      showError("nameError", "Name is required");
      isValid = false;
    }

    if (!email.value.trim()) {
      showError("emailError", "Email is required");
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      showError("emailError", "Please enter a valid email");
      isValid = false;
    }

    if (!phone.value.trim()) {
      showError("phoneError", "Phone number is required");
      isValid = false;
    } else if (!phoneRegex.test(phone.value)) {
      showError("phoneError", "Please enter a valid phone number");
      isValid = false;
    }

    if (!message.value.trim()) {
      showError("messageError", "Message is required");
      isValid = false;
    }

    if (isValid) {
      alert("Thank you for your inquiry! We will get back to you soon.");
      contactForm.reset();
    }
  });
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (!errorElement) return;
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

// ===============================
// SMOOTH SCROLL (# only)
// ===============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===============================
// SERVICE SCROLL ANIMATION
// ===============================
const services = document.querySelectorAll(".service-block");

if (services.length > 0) {
  const serviceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.25 }
  );

  services.forEach(service => {
    serviceObserver.observe(service);
  });
}
 (function(){
 const trigger = document.getElementById('logoToggle');
  const overlay = document.getElementById('brand-panel-overlay');
  const closeBtn = document.getElementById('brand-panel-close');
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  if (!trigger || !overlay) return;

  function openPanel(){
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    trigger.classList.add("active");

    mobileBtn?.classList.remove("active");
    navLinks?.classList.remove("active");
  }

  function closePanel(){
    overlay.hidden = true;
    document.body.style.overflow = '';
    trigger.classList.remove("active");
  }

  trigger.addEventListener('click', openPanel);

  if (closeBtn) {
    closeBtn.addEventListener('click', closePanel);
  }

  overlay.addEventListener('click', function(e){
    if(e.target === overlay){
      closePanel();
    }
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      closePanel();
    }
  });
})();


// ===============================
// PROJECTS DYNAMIC LOADING
// ===============================

const projectsData = [
  {
    image: "assets/Projects/upvsc1.png",
    title: "Modern UPVC Casement Windows",
    shortDesc: "Energy-efficient casement windows with multi-point locking systems.",
    fullDesc: "Our modern UPVC casement windows offer superior insulation and security. Featuring advanced multi-point locking mechanisms and weather-resistant gaskets, these windows ensure a quiet, dust-free, and energy-efficient indoor environment for premium residential projects."
  },
  {
    image: "assets/Projects/upvsc2.png",
    title: "Premium UPVC Sliding Doors",
    shortDesc: "Smooth-glide sliding door systems for seamless outdoor connectivity.",
    fullDesc: "Designed for elegance and functionality, our premium UPVC sliding doors provide expansive views and effortless operation. The high-quality rollers and reinforced frames guarantee durability and smooth movement for years to come."
  },
  {
    image: "assets/Projects/upvsc3.png",
    title: "UPVC Tilt & Turn Windows",
    shortDesc: "Versatile window systems combining ventilation and security.",
    fullDesc: "Tilt and turn windows offer the perfect balance of ventilation and ease of cleaning. This project involved a complete installation in a multi-story building, focusing on high wind pressure resistance and sound insulation."
  },
  {
    image: "assets/Projects/upvsc4.png",
    title: "Luxury UPVC Villa Windows",
    shortDesc: "Custom-designed window frames for high-end residential villas.",
    fullDesc: "A complete UPVC window and door solution for a luxury villa project. The installation featured wood-finish UPVC profiles that provide the aesthetic of timber with the maintenance-free benefits of UPVC."
  },
  {
    image: "assets/Projects/upvsc5.png",
    title: "Commecial UPVC Glazing",
    shortDesc: "Large-scale UPVC window installations for office buildings.",
    fullDesc: "Executed a large-scale commercial project featuring fixed and openable UPVC windows. The focus was on thermal efficiency and reducing operational costs for the building's climate control systems."
  },
  {
    image: "assets/Projects/upvsc6.png",
    title: "Soundproof UPVC Windows",
    shortDesc: "Advanced acoustic insulation windows for urban environments.",
    fullDesc: "Specialized in urban residential units, these soundproof UPVC windows significantly reduce external noise pollution. Double-glazed units combined with tight-sealing UPVC frames provided a peaceful sanctuary for our clients."
  },
  {
    image: "assets/Projects/upvsc7.png",
    title: "Industrial UPVC Door Systems",
    shortDesc: "Heavy-duty UPVC doors designed for industrial and high-traffic areas.",
    fullDesc: "Our industrial UPVC door systems are built for rugged environments. They are resistant to chemical corrosion and heavy usage, making them ideal for manufacturing facilities and warehouses."
  }
];

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = "";

  projectsData.forEach((project, index) => {
    // Priority: Explicit Title > Filename Title > Fallback
    const fileName = project.image.split('/').pop().split('.')[0];
    const generatedTitle = fileName.charAt(0).toUpperCase() + fileName.slice(1).replace(/-/g, ' ') + " Project";
    const finalTitle = project.title || generatedTitle || "UPVC Installation Project";
    
    const card = document.createElement("div");
    card.className = "card project-card show";
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${finalTitle}">
      </div>
      <div class="project-info">
        <h3 class="card-title">${finalTitle}</h3>
        <p class="text-muted">${project.shortDesc}</p>
        <button class="btn btn-primary btn-sm read-more-btn" data-index="${index}">Read More</button>
      </div>
    `;
    grid.appendChild(card);
  });

  document.querySelectorAll(".read-more-btn").forEach(btn => {
    btn.addEventListener("click", () => openProjectModal(btn.dataset.index));
  });
}

// Modal Logic
const modal = document.getElementById("project-modal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");

function openProjectModal(index) {
  const project = projectsData[index];
  if (!project || !modal) return;

  const fileName = project.image.split('/').pop().split('.')[0];
  const generatedTitle = fileName.charAt(0).toUpperCase() + fileName.slice(1).replace(/-/g, ' ') + " Project";
  const finalTitle = project.title || generatedTitle || "UPVC Installation Project";

  modalImage.src = project.image;
  modalTitle.textContent = finalTitle;
  modalDescription.textContent = project.fullDesc;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

if (modalClose) {
  modalClose.addEventListener("click", closeProjectModal);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeProjectModal();
  });
}

// Initialize projects on page load
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
});