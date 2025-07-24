    // Slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.card');
    const dots = document.querySelectorAll('.slider-dot');
    const main = document.getElementById('main');

    function updateSlider() {
        main.style.transform = `translateX(-${currentSlide * 25}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function moveSlide(direction) {
        currentSlide += direction;
        
        // Check boundaries
        if (currentSlide < 0) currentSlide = slides.length - 1;
        if (currentSlide >= slides.length) currentSlide = 0;
        
        updateSlider();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    main.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    main.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            moveSlide(1); // Swipe left
        }
        if (touchEndX > touchStartX + 50) {
            moveSlide(-1); // Swipe right
        }
    }

    // Auto-advance slides (optional)
    setInterval(() => {
        moveSlide(1);
    }, 5000);
