// Main JavaScript for ABtesting.ai Clone
// Modern ES6+ JavaScript with animations and interactions

import { businessConfig } from '../../config.js';
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper';
import AOS from 'aos';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Register Swiper modules
Swiper.use([Navigation, Pagination, Autoplay]);

class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.populateContent();
    this.initAnimations();
    this.initSwiper();
    this.initFormHandlers();
    this.initMobileMenu();
    this.initScrollEffects();
    this.initAnalytics();
    this.initAccessibility();
  }

  // Populate content from business configuration
  populateContent() {
    // Update page title and meta
    document.title = `${businessConfig.company.name} - ${businessConfig.company.tagline}`;
    
    // Update favicon
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = businessConfig.company.favicon;
    document.head.appendChild(favicon);

    // Update logo
    const logos = document.querySelectorAll('.logo img, .footer-logo img');
    logos.forEach(logo => {
      logo.src = businessConfig.company.logo;
      logo.alt = businessConfig.company.name;
    });

    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = this.highlightText(businessConfig.hero.title);
    }

    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
      heroDescription.innerHTML = this.highlightText(businessConfig.hero.subtitle);
    }

    const ctaButton = document.querySelector('.hero .btn-primary');
    if (ctaButton) {
      ctaButton.textContent = businessConfig.hero.ctaText;
      ctaButton.href = businessConfig.hero.ctaUrl;
    }

    const heroInput = document.querySelector('.hero input[type="text"]');
    if (heroInput) {
      heroInput.placeholder = businessConfig.hero.placeholder;
    }

    // Update navigation
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.innerHTML = businessConfig.navigation.map(item => 
        `<a href="${item.url}">${item.title}</a>`
      ).join('');
    }

    // Update features
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
      if (businessConfig.features[index]) {
        const title = feature.querySelector('.feature-title');
        const copy = feature.querySelector('.feature-copy');
        
        if (title) title.innerHTML = this.highlightText(businessConfig.features[index].title);
        if (copy) copy.textContent = businessConfig.features[index].description;
      }
    });

    // Update statistics
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
      if (businessConfig.stats[index]) {
        const value = stat.querySelector('.stat-value');
        const text = stat.querySelector('.stat-text');
        
        if (value) {
          value.innerHTML = `<em>${businessConfig.stats[index].value.charAt(0)}</em>${businessConfig.stats[index].value.slice(1)}<span>${businessConfig.stats[index].unit}</span>`;
        }
        if (text) {
          text.innerHTML = `${businessConfig.stats[index].description} <a href="${businessConfig.stats[index].link}">Learn more</a>.`;
        }
      }
    });

    // Update trusted by logos
    const trustedLogos = document.querySelector('.logos');
    if (trustedLogos) {
      trustedLogos.innerHTML = businessConfig.trustedBy.map(client => 
        `<img src="${client.logo}" alt="${client.name}" loading="lazy">`
      ).join('');
    }

    // Update footer
    const footerLinks = document.querySelector('.footer .links');
    if (footerLinks) {
      footerLinks.innerHTML = businessConfig.footerLinks.map(link => 
        `<a href="${link.url}">${link.title}</a>`
      ).join('');
    }

    const copyright = document.querySelector('.copyright');
    if (copyright) {
      const currentYear = new Date().getFullYear();
      copyright.innerHTML = `Copyright © ${currentYear} — <a href="mailto:${businessConfig.contact.email}">${businessConfig.contact.email}</a>`;
    }

    // Update social links
    const socialLinks = document.querySelector('.social-links');
    if (socialLinks) {
      socialLinks.innerHTML = `
        <a href="${businessConfig.social.twitter}" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
          </svg>
        </a>
        <a href="${businessConfig.social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>
          </svg>
        </a>
      `;
    }
  }

  // Highlight text with <em> tags for styling
  highlightText(text) {
    return text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  }

  // Initialize animations
  initAnimations() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });

    // GSAP animations for hero section
    const heroTimeline = gsap.timeline();
    
    heroTimeline
      .from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from('.hero .input-group', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3');

    // Animate statistics on scroll
    gsap.utils.toArray('.stat-value').forEach(stat => {
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        onEnter: () => this.animateNumber(stat)
      });
    });

    // Animate features on scroll
    gsap.utils.toArray('.feature').forEach((feature, index) => {
      gsap.from(feature, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: feature,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay: index * 0.1
      });
    });
  }

  // Animate numbers counting up
  animateNumber(element) {
    const text = element.textContent;
    const match = text.match(/(\+|~|<)?(\d+)/);
    
    if (match) {
      const prefix = match[1] || '';
      const number = parseInt(match[2]);
      const suffix = text.replace(match[0], '').replace(prefix, '');
      
      gsap.from({ value: 0 }, {
        value: number,
        duration: 2,
        ease: 'power2.out',
        onUpdate: function() {
          element.innerHTML = `<em>${prefix}</em>${Math.round(this.targets()[0].value)}${suffix}`;
        }
      });
    }
  }

  // Initialize Swiper carousel
  initSwiper() {
    const swiperContainer = document.querySelector('.swiper-container');
    if (swiperContainer) {
      new Swiper(swiperContainer, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 1,
          }
        }
      });
    }
  }

  // Initialize form handlers
  initFormHandlers() {
    // Hero form submission
    const heroForm = document.querySelector('.hero form');
    if (heroForm) {
      heroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = heroForm.querySelector('input[type="text"]');
        const url = input.value.trim();
        
        if (this.validateURL(url)) {
          // Redirect to signup with URL parameter
          window.location.href = `${businessConfig.hero.ctaUrl}?url=${encodeURIComponent(url)}`;
        } else {
          this.showNotification('Please enter a valid URL', 'error');
        }
      });
    }

    // Newsletter subscription
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        if (this.validateEmail(email)) {
          this.subscribeNewsletter(email);
        } else {
          this.showNotification('Please enter a valid email address', 'error');
        }
      });
    });
  }

  // Initialize mobile menu
  initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', 
          navLinks.classList.contains('active') ? 'true' : 'false'
        );
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.focus();
        }
      });
    }
  }

  // Initialize scroll effects
  initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (header) {
        if (currentScrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
      }
      
      lastScrollY = currentScrollY;
    });
  }

  // Initialize analytics
  initAnalytics() {
    // Google Analytics
    if (businessConfig.analytics.googleAnalytics && businessConfig.analytics.googleAnalytics !== 'UA-XXXXXXXXX-X') {
      gtag('config', businessConfig.analytics.googleAnalytics);
    }

    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', {
            event_category: 'Button',
            event_label: button.textContent.trim()
          });
        }
      });
    });
  }

  // Initialize accessibility features
  initAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView();
        }
      });
    }

    // Keyboard navigation for custom elements
    document.querySelectorAll('[role="button"]').forEach(button => {
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    });

    // Announce dynamic content changes to screen readers
    this.createAriaLiveRegion();
  }

  // Create ARIA live region for announcements
  createAriaLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'aria-live-region';
    document.body.appendChild(liveRegion);
  }

  // Announce message to screen readers
  announceToScreenReader(message) {
    const liveRegion = document.getElementById('aria-live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  // Utility functions
  validateURL(url) {
    try {
      // Add protocol if missing
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      color: 'white',
      backgroundColor: type === 'error' ? '#dc3545' : '#28a745',
      zIndex: '1000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);

    // Announce to screen readers
    this.announceToScreenReader(message);
  }

  async subscribeNewsletter(email) {
    try {
      // Replace with your actual newsletter subscription endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        this.showNotification('Successfully subscribed to newsletter!', 'success');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      this.showNotification('Failed to subscribe. Please try again.', 'error');
    }
  }
}

// Initialize the app
const app = new App();

// Export for use in other modules
export default app;