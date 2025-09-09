// Custom JavaScript for the Portfolio (Light Theme)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Add a class to the navbar on scroll for a more polished look
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('main-nav');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
        alert("Thank you for your message! I'll get back to you shortly.");
        this.reset();
    } else {
        alert("Please fill in all the fields.");
    }
});
