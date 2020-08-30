/*function openModalSignIn() {
    $("#modal_sign_in").modal("show");
}
var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 15000,
        disableOnInteraction: false,
    },
});


$(document).ready(function () {
    $("#menu").click(function () {
        if ($("input[type=checkbox]").is(":checked")) {
            $('.offcanvas-collapse').toggleClass('open');
        } else {
            $('.offcanvas-collapse').toggleClass('open');
        }
    });
});

*/

jQuery(function ($) {

    $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if (
            $(this)
            .parent()
            .hasClass("active")
        ) {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .parent()
                .removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .next(".sidebar-submenu")
                .slideDown(200);
            $(this)
                .parent()
                .addClass("active");
        }
    });

    $("#close-sidebar").click(function () {
        $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function () {
        $(".page-wrapper").addClass("toggled");
    });




});


$("#input_user_name").on('input', function () {
    if ($(this).val().length >= 16) {
        document.getElementById("input_user_name").disabled = true;
        document.getElementById("buttonUpdate").disabled = false;
        $('.collapse').collapse();
    }
});
