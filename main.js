const RenderNotifications = async () => {
    // Get Notifications
    const notifications = await GetNotifications();
    // Get Slider Container
    const sliderContainer = document.querySelector('.slider');
    
    notifications.map(n => {
        let title = n.attributes.title;
        let imageUrl = n.attributes.image.data.attributes.url

        var div = document.createElement("div")
        div.classList.add('slide');
        div.style.background = `url('http://localhost:1337${imageUrl}') no-repeat center center/cover`;
        div.innerHTML = `<div class='content'><h1>${title}</h1><p>Testing</p></div>`;

        sliderContainer.appendChild(div);
    })

    const slides = document.querySelectorAll('.slide');
    const next = document.querySelector('#next');
    const prev = document.querySelector('#prev');
    const auto = true;
    const intervalTime = 5000;
    let slideInterval;

    slides[0].classList.add('current');

    const nextSlide = () => {
        // Get Current Class
        const current = document.querySelector('.current');
        // Remove 'Current' class
        current.classList.remove('current');
        // Check for next slide
        if(current.nextElementSibling) {
            // Add current to next sibling
            current.nextElementSibling.classList.add('current');
        } else {
            // Add current to start
            slides[0].classList.add('current')
        }
        setTimeout(() => current.classList.remove('current'));
    }

    const prevSlide = () => {
        // Get Current Class
        const current = document.querySelector('.current');
        // Remove 'Current' class
        current.classList.remove('current');
        // Check for previous slide
        if(current.previousElementSibling) {
            // Add current to previous sibling
            current.previousElementSibling.classList.add('current');
        } else {
            // Add current to last slide
            slides[slides.length - 1].classList.add('current')
        }
        setTimeout(() => current.classList.remove('current'));
    }

    // Button Events
    next.addEventListener('click', e => {
        nextSlide();
        if(auto) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    })

    prev.addEventListener('click', e => {
        prevSlide();
        if(auto) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    })

    // Auto Slide
    if(auto) {
        // Run next slide at interval time
        slideInterval = setInterval(nextSlide, intervalTime);
    }

}

RenderNotifications();

// Fetch Notications from API
async function GetNotifications() {
    const response = await  fetch(`http://localhost:1337/api/notifications?populate=image`)
    const result = await response.json()
    return result.data;
}
