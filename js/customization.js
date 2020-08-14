function openModalSignIn() {
	$("#modal_sign_in").modal("show");
}

$(function () {
    $('.btn-group-fab').on('click', '.btn', function () {
        $('.btn-group-fab').toggleClass('active');
    });
});

function check() {
firebase.database().ref('counter').on('value', function(snapshot) {
	if (snapshot.val() < 50) {
		document.getElementById("button-download").disabled = false;
	}
	else {
		document.getElementById("button-download").disabled = true;
		$('.collapse').collapse();
	}
});
}

function setValue() {
	firebase.database().ref('counter').set("0");
	check();
}
