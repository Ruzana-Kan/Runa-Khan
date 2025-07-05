// Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');

        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.innerHTML = mobileMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.innerHTML = '☰';
            });
        });

        // Particle system
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Enhanced header scroll effect
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
                header.querySelector('.logo').style.color = '#333';
                header.querySelectorAll('.nav-links a').forEach(link => {
                    link.style.color = '#333';
                });
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.1)';
                header.style.boxShadow = 'none';
                header.querySelector('.logo').style.color = 'white';
                header.querySelectorAll('.nav-links a').forEach(link => {
                    link.style.color = 'white';
                });
            }

            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        });

        // Enhanced form submission with animation
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
            
            setTimeout(() => {
                submitBtn.textContent = '✓ Sent!';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                    this.reset();
                }, 2000);
            }, 1000);
        });

        // Enhanced Intersection Observer for staggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.animation = 'bounceIn 0.8s ease-out';
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe all cards and sections with staggered animation
        document.querySelectorAll('.experience-card, .skill-category, .stat-card').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Enhanced floating shapes with mouse interaction
        const shapes = document.querySelectorAll('.shape');
        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        shapes.forEach((shape, index) => {
            setInterval(() => {
                const rect = shape.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (mouseX - centerX) * 0.1;
                const deltaY = (mouseY - centerY) * 0.1;
                
                shape.style.transform = `translate(${deltaX}px, ${deltaY + Math.sin(Date.now() * 0.001 + index) * 20}px)`;
            }, 50);
        });

        // Scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function() {
            const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });

        // Text animation on scroll
        const textElements = document.querySelectorAll('.about-text p, .experience-description');
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInLeft 0.8s ease-out';
                }
            });
        });

        textElements.forEach(el => {
            textObserver.observe(el);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });

        // Initialize particles
        createParticles();

        // Add pulse animation to CTA button
        const ctaButton = document.querySelector('.cta-button');
        setInterval(() => {
            ctaButton.style.animation = 'pulse 2s infinite';
        }, 3000);

        // Typing effect for hero subtitle
        const subtitle = document.querySelector('.hero-subtitle');
        const subtitleText = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        setTimeout(() => {
            const typeInterval = setInterval(() => {
                subtitle.textContent += subtitleText.charAt(i);
                i++;
                if (i > subtitleText.length) {
                    clearInterval(typeInterval);
                }
            }, 100);
        }, 2000);

        // Add tilt effect to cards
        document.querySelectorAll('.experience-card, .skill-category, .stat-card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });

        // Smooth reveal animation for sections
        const sections = document.querySelectorAll('section');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            sectionObserver.observe(section);
        });