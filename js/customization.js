function openModalSignIn() {
    $("#modal_sign_in").modal("show");
}
var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 8000,
        disableOnInteraction: false,
    },
});


$(document).ready(function () {
    console.log("document is ready");
    $('[data-toggle="offcanvas"], #menu').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })
});
window.onload = function () {
    console.log("window is loaded");
};
