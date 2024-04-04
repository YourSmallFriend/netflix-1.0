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
	});
});
// langzaam scrollen/tijd voor dat je bent aangekomen bij movies, series of iets anders.
document.querySelector('a[href="#movies"]').addEventListener('click', function (e) {
    e.preventDefault(); // zorgt dat die niet het default ding doet van het instant snappen naar het ding.
    smoothScroll('#movies');
});
document.querySelector('a[href="#TvShows"]').addEventListener('click', function (e) {
    e.preventDefault();
    smoothScroll('#TvShows');
});
document.querySelector('a[href="#newandpopular"]').addEventListener('click', function (e) {
    e.preventDefault();
    smoothScroll('#newandpopular');
});
document.querySelector('a[href="#MyList"]').addEventListener('click', function (e) {
    e.preventDefault();
    smoothScroll('#MyList');
});

// functie van het scrollen naar de kaarten ig
function smoothScroll(targetSelector) {
    const targetElement = document.querySelector(targetSelector); // Selecteerd het ding waar die naar toe moet scrollen
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset; //pakt de absolute positie van het scerm/viewport 
    const startPosition = window.pageYOffset; //pakt het vertikale hoogte van het scherm
    const distance = targetPosition - startPosition; // berekend de aftand van het scrollen 
    const duration = 1000; //spreekt voor zichzelf 

    let startTime = null; 

    // animatie functie
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime; // zet de tijd als dat al niet gedaan was
        const timeElapsed = currentTime - startTime; // berekent de tijd van waneer de animatie was gestart tot nu
        const scrollProgress = Math.min(timeElapsed / duration, 1);
        const easing = easeOutQuart(scrollProgress);
        window.scrollTo(0, startPosition + distance * easing); // Scroll the viewport to the calculated position
        if (timeElapsed < duration) requestAnimationFrame(animation); // laat de animatei doorgaan tot dat die klaar is 
    }

    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t; // een ease out functie die er voor zorgt dat het niet op een te snelle of lamzame manier start of eindigt, het is kut om uit te leggen. het zorgt voor een smooth acceleration and deceleration.
    }
    requestAnimationFrame(animation);
}