$(document).ready(function() {
    $(".filter-item").click(function() {
        const value = $(this).attr("data-filter");
        if (value == 'all') {
            $(".post-box").show('1000');
        } else {
            $('.post-box').hide('1000');
            $('.post-box.' + value).show('1000');
        }
        $(this).addClass("active-filter").siblings().removeClass("active-filter");
    });
});

let header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0);
});