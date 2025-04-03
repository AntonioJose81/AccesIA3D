document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');

        questionButton.addEventListener('click', () => {
            const isOpening = !questionButton.classList.contains('active');

             // Close other open items
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item) {
            //         otherItem.querySelector('.faq-question').classList.remove('active');
            //         const otherAnswer = otherItem.querySelector('.faq-answer');
            //         otherAnswer.style.maxHeight = null;
            //         otherAnswer.classList.remove('show');
            //         otherAnswer.style.padding = '0 1rem'; // Reset padding
            //     }
            // });


            // Toggle current item
            questionButton.classList.toggle('active');
            answerDiv.classList.toggle('show');

            if (answerDiv.classList.contains('show')) {
                // Set max-height to scrollHeight when opening
                answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
                answerDiv.style.padding = '0.5rem 1rem 1rem 1rem'; // Apply padding when open
            } else {
                // Reset max-height and padding when closing
                answerDiv.style.maxHeight = null;
                 answerDiv.style.padding = '0 1rem'; // Reset padding immediately
            }
        });

         // Ensure answer div has transition property set even if initially hidden
         answerDiv.style.transition = 'max-height 0.5s ease-out, padding 0.5s ease-out';
    });


    // Simple Form Submission Handler (Placeholder)
    const form = document.getElementById('signup-form');
    const formMessage = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission for now

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');

            // Basic validation
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
                formMessage.textContent = 'Por favor, completa ambos campos.';
                formMessage.className = 'form-message error';
                return;
            }
             if (!validateEmail(emailInput.value.trim())) {
                formMessage.textContent = 'Por favor, introduce un email válido.';
                formMessage.className = 'form-message error';
                return;
            }


            // Simulate successful submission
            formMessage.textContent = '¡Gracias por tu interés! Te contactaremos pronto.';
            formMessage.className = 'form-message success';
            form.reset(); // Clear the form

            // In a real scenario, you would send the data to a server here
            // using fetch() or similar.
            console.log('Form submitted (simulated):');
            console.log('Name:', nameInput.value);
            console.log('Email:', emailInput.value);

             // Optional: Hide message after a few seconds
             setTimeout(() => {
                formMessage.textContent = '';
                 formMessage.className = 'form-message';
             }, 5000);
        });
    }

     // Email validation helper function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }


    // Add subtle scroll animations (optional - can be extended)
    const animatedElements = document.querySelectorAll('.benefit-item, .testimonial-item, .target-audience li, .membership-column, .faq-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
         // Set initial state for animation
         el.style.opacity = '0';
         el.style.transform = 'translateY(20px)';
         el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });


});