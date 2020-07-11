var firebaseConfig = {
    apiKey: "AIzaSyA0EUZyka-YGPhipgYChM5YKih1Xot1Atw",
    authDomain: "minilabs-cdn.firebaseapp.com",
    databaseURL: "https://minilabs-cdn.firebaseio.com",
    projectId: "minilabs-cdn",
    storageBucket: "minilabs-cdn.appspot.com",
    messagingSenderId: "1082822216036",
    appId: "1:1082822216036:web:ce7243c8496d24fc41d271",
    measurementId: "G-KPQ6YMFZ6Y"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();
	
document.getElementById("btn-sign-in").style.display = "none";
document.getElementById("btn-sign-out").style.display = "none";
	  

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
	  $("#modal_sign_in").modal("hide");
	  document.getElementById("floatingActionButton").style.display ="block";
	  // Buttons Navbar
	  document.getElementById("btn-sign-in").style.display = "none";
	  document.getElementById("btn-sign-out").style.display = "block";
	  
	} else {
	  document.getElementById("floatingActionButton").style.display ="none";
	  // Buttons Navbar
	  document.getElementById("btn-sign-in").style.display = "block";
	  document.getElementById("btn-sign-out").style.display = "none";
	  
	}
});

function formSignIn() {
  $("#modal_sign_in").modal("show");
}

function signIn() {

	if (firebase.auth().currentUser) {
		// [START signout]
		firebase.auth().signOut();
		// [END signout]
	} else {
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
		if (email.length < 4) {
			alert('Por favor insira um endereço de e-mail.');
			return;
		}
		if (password.length < 4) {
			alert('Por favor insira uma senha.');
			return;
		}

		// Sign in with email and pass.
		// [START authwithemail]
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// [START_EXCLUDE]
			if (errorCode === 'auth/wrong-password') {
				alert('Senha incorreta.');
			}
			else if (errorCode === 'auth/user-not-found') {
				alert('Usuário não registrado.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
			document.getElementById('quickstart-sign-in').disabled = false;
			// [END_EXCLUDE]
		});
		// [END authwithemail]
	}
	document.getElementById('quickstart-sign-in').disabled = true;

}

function signOut() {
	firebase.auth().signOut().then(function () {
		// Sign-out successful.
		window.location.reload();
	}).catch(function (error) {
		// An error happened.
	});
}

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml12');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml12 .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 2000 + 30 * i
  }).add({
    targets: '.ml12 .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 2000 + 30 * i
  });
