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
