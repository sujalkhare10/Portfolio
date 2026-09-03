// ==========================================================================
// Sujal Khare - Portfolio Interactivity & Smooth Animations
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Navbar scroll background effect & active section tracker
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.cta-link)');

  const handleScroll = () => {
    // Navbar glass elevation
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentSection = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navLinks');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        if (window.lucide) window.lucide.createIcons();
      }
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          if (window.lucide) window.lucide.createIcons();
        }
      });
    });
  }

  // Intersection Observer for Smooth Scroll Reveal Animations
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Copy to Clipboard Helpers with Custom Toast
  const toast = document.getElementById('toast');
  let toastTimeout;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  };

  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('sujal.khare10@gmail.com').then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('sujal.khare10@gmail.com');
      });
    });
  }

  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+919981329829').then(() => {
        showToast('Phone number copied to clipboard!');
      }).catch(() => {
        showToast('+91 9981329829');
      });
    });
  }
});

// Form Submission Handler
window.handleFormSubmit = (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Sending...</span>`;

  setTimeout(() => {
    // Open standard mailto link with prefilled subject and message for guaranteed delivery
    const mailtoUrl = `mailto:sujal.khare10@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Sujal,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
    window.location.href = mailtoUrl;

    feedback.className = 'form-feedback success';
    feedback.textContent = 'Thank you! Your mail client has been opened to send this directly to Sujal.';

    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>Sent Successfully</span> <i data-lucide="check"></i>`;
    if (window.lucide) window.lucide.createIcons();

    document.getElementById('contactForm').reset();
  }, 600);

  return false;
};
