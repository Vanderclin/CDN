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


$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
