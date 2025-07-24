
document.addEventListener('DOMContentLoaded', function() {
    // Carousel navigation
    const sponsorList = document.querySelector('.sponsor-list');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sponsorWidth = 320; // Should match your CSS sponsor width
    
    prevBtn.addEventListener('click', () => {
        sponsorList.scrollBy({ left: -sponsorWidth, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        sponsorList.scrollBy({ left: sponsorWidth, behavior: 'smooth' });
    });
    
    // Auto-hide buttons when at scroll extremes
    sponsorList.addEventListener('scroll', function() {
        const atStart = this.scrollLeft === 0;
        const atEnd = this.scrollLeft + this.clientWidth >= this.scrollWidth - 1;
        
        prevBtn.style.visibility = atStart ? 'hidden' : 'visible';
        nextBtn.style.visibility = atEnd ? 'hidden' : 'visible';
    });
    
    // Initial check
    sponsorList.dispatchEvent(new Event('scroll'));
    
    // Modal functionality
    const modal = document.getElementById('sponsorModal');
    const modalSponsorName = document.getElementById('modalSponsorName');
    const modalSponsorDesc = document.getElementById('modalSponsorDesc');
    const visitWebsite = document.getElementById('visitWebsite');
    const visitLinkedIn = document.getElementById('visitLinkedIn');
    const closeModal = document.querySelector('.close-modal');
    
    let currentSponsor = null;
    
    // Handle sponsor clicks
    document.querySelectorAll('.sponsor').forEach(sponsor => {
        // Single click opens modal
        sponsor.addEventListener('click', function(e) {
            // Don't open modal if clicking on LinkedIn button
            if (e.target.closest('.linkedin-btn')) return;
            
            currentSponsor = this;
            modalSponsorName.textContent = this.querySelector('h3').textContent;
            modalSponsorDesc.textContent = this.querySelector('p').textContent;
            
            // Set button URLs
            visitWebsite.onclick = () => {
                window.open(this.dataset.website, '_blank');
            };
            
            visitLinkedIn.onclick = () => {
                window.open(this.dataset.linkedin, '_blank');
            };
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        
        // Double click opens website directly
        sponsor.addEventListener('dblclick', function() {
            window.open(this.dataset.website, '_blank');
        });
        
        // LinkedIn button click
        sponsor.querySelector('.linkedin-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            window.open(sponsor.dataset.linkedin, '_blank');
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(125, 204, 240, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(125, 204, 240, 0.9)';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    });
});
