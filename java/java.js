document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.getElementById("videoCarousel");
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const firstCard = carousel.querySelector(".card");
    const firstCardWidth = firstCard.offsetWidth;
    let isDragging = false,
        startX,
        startScrollLeft,
        timeoutId;

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;
        const newScrollLeft = startScrollLeft - (e.pageX - startX);
        if (newScrollLeft <= 0 || newScrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
            isDragging = false;
            return;
        }
        carousel.scrollLeft = newScrollLeft;
    };

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    const autoPlay = () => {
        if (window.innerWidth < 800) return;
        const totalCardWidth = carousel.scrollWidth;
        const maxScrollLeft = totalCardWidth - carousel.offsetWidth;
        if (carousel.scrollLeft >= maxScrollLeft) return;
        timeoutId = setTimeout(() =>
            carousel.scrollLeft += firstCardWidth, 2500);
    };
	const videoPlayer = document.querySelector('.video-player');
	const video = videoPlayer.querySelector('.video');
	const volume = videoPlayer.querySelector('.volume');
	const muteButton = videoPlayer.querySelector('.mute-button');


    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseenter", () =>
        clearTimeout(timeoutId));
    carousel.addEventListener("mouseleave", autoPlay);

    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ?
                -firstCardWidth : firstCardWidth;
        });
    });
	document.addEventListener("DOMContentLoaded", function() {
		const video = document.getElementById("myVideo");
		const volume = document.querySelector('.volume');
		const muteButton = document.getElementById('audio-control');
	
		if (!video || !volume || !muteButton) {
			console.error("Video, volume control, or mute button not found");
			return;
		}
	
		// Volume
		volume.addEventListener('input', (e) => {
			video.volume = e.target.value;
		});
	
		// Mute button
		muteButton.addEventListener('click', () => {
			if (video.muted) {
				video.muted = false;
				muteButton.textContent = 'Mute';
			} else {
				video.muted = true;
				muteButton.textContent = 'Unmute';
			}
		});
	});
});
// Smooth scrolling for the "#movies" section
document.querySelector('a[href="#movies"]').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior (i.e., jumping to the anchor)
    smoothScroll('#movies');
});

// Smooth scrolling for the "#TvShows" section
document.querySelector('a[href="#TvShows"]').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior (i.e., jumping to the anchor)
    smoothScroll('#TvShows');
});

// Smooth scrolling for the "#newandpopular" section
document.querySelector('a[href="#newandpopular"]').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior (i.e., jumping to the anchor)
    smoothScroll('#newandpopular');
});

// Function to perform smooth scrolling to a target element
function smoothScroll(targetSelector) {
    const targetElement = document.querySelector(targetSelector); // Select the target element to scroll to
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset; // Get the absolute position of the target element relative to the viewport
    const startPosition = window.pageYOffset; // Get the current vertical scroll position of the viewport
    const distance = targetPosition - startPosition; // Calculate the distance to scroll
    const duration = 1000; // Duration of the scroll animation in milliseconds

    let startTime = null; // Initialize variable to store the start time of the animation

    // Define animation function
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime; // Set the start time if it's not already set
        const timeElapsed = currentTime - startTime; // Calculate the elapsed time since the animation started
        const scrollProgress = Math.min(timeElapsed / duration, 1); // Calculate the progress of the animation (between 0 and 1)
        const easing = easeOutQuart(scrollProgress); // Apply easing function to the scroll progress
        window.scrollTo(0, startPosition + distance * easing); // Scroll the viewport to the calculated position
        if (timeElapsed < duration) requestAnimationFrame(animation); // Continue the animation until the duration is reached
    }

    // Define easing function (easeOutQuart)
    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t; // Quartic easing function for smooth acceleration and deceleration
    }

    // Start the animation by calling the animation function
    requestAnimationFrame(animation);
}