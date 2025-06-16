// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenu.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        // Reset hamburger menu
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Portfolio filtering with smooth animations
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach((item, index) => {
            // Add delay for staggered animation
            setTimeout(() => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }, index * 100);
        });
    });
});

// Form validation and submission
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset previous errors
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });

    let isValid = true;

    // Validate name
    const name = document.getElementById('name');
    if (name.value.trim() === '') {
        name.closest('.form-group').classList.add('error');
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        email.closest('.form-group').classList.add('error');
        isValid = false;
    }

    // Validate subject
    const subject = document.getElementById('subject');
    if (subject.value.trim() === '') {
        subject.closest('.form-group').classList.add('error');
        isValid = false;
    }

    // Validate message
    const message = document.getElementById('message');
    if (message.value.trim() === '') {
        message.closest('.form-group').classList.add('error');
        isValid = false;
    }

    if (isValid) {
        // Show success message with animation
        successMessage.classList.add('show');
        contactForm.reset();
        
        // Reset form labels
        document.querySelectorAll('.form-group label').forEach(label => {
            label.style.top = '1rem';
            label.style.fontSize = '1rem';
            label.style.color = '#666';
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.portfolio-card, .skill-card, .contact-card, .about-content, .section-title').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target;
            const level = skillBar.getAttribute('data-level');
            setTimeout(() => {
                skillBar.style.width = level + '%';
            }, 500);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Check if images exist and handle errors
document.addEventListener('DOMContentLoaded', () => {
    // Fix profile image
    const profileImg = document.querySelector('.about-image img');
    profileImg.onerror = function() {
        this.src = '/placeholder.svg?height=300&width=300';
        console.log('Profile image not found. Using placeholder.');
    };
    
    // Fix project images
    document.querySelectorAll('.card-image img').forEach((img, index) => {
        img.onerror = function() {
            this.src = `/placeholder.svg?height=250&width=400&text=Project ${index + 1}`;
            console.log(`Project image ${index + 1} not found. Using placeholder.`);
        };
    });
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
});