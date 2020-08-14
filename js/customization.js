function openModalSignIn() {
	$("#modal_sign_in").modal("show");
}

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
