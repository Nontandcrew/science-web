document.addEventListener('DOMContentLoaded', function() {
    let nextDom = document.getElementById('next');
    let prevDom = document.getElementById('prev');

    let carouselDom = document.querySelector('.carousel');
    let sliderDom = carouselDom.querySelector('.list');
    let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');

    let timeRunning = 3000;
    let timeAutoNext = 7000;

    nextDom.addEventListener('click', function() {
        showSlider('next');    
    });

    prevDom.addEventListener('click', function() {
        showSlider('prev');    
    });

    let runTimeOut;
    let runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);

    function showSlider(type) {
        let sliderItemsDom = sliderDom.querySelectorAll('.item');
        let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
        
        if (type === 'next') {
            sliderDom.appendChild(sliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            carouselDom.classList.add('next');
        } else {
            sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            carouselDom.classList.add('prev');
        }

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextDom.click();
        }, timeAutoNext);
    }
});
