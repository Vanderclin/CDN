var firebaseConfig = {
    apiKey: "AIzaSyCgbqJQLrzuVQTIUES7zYi_J9auaWjra1M",
    authDomain: "cdn-minilabs.firebaseapp.com",
    databaseURL: "https://cdn-minilabs.firebaseio.com",
    projectId: "cdn-minilabs",
    storageBucket: "cdn-minilabs.appspot.com",
    messagingSenderId: "275157132530",
    appId: "1:275157132530:web:1fa50ce7d9b32824129c6b",
    measurementId: "G-VN5J44D1BY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

document.getElementById("btn-sign-in").style.display = "none";
document.getElementById("btn-sign-out").style.display = "none";


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $("#modal_sign_in").modal("hide");
        document.getElementById("floatingActionButton").style.display = "block";

        // Buttons Navbar
        document.getElementById("btn-sign-in").style.display = "none";
        document.getElementById("btn-sign-out").style.display = "block";

    } else {
        document.getElementById("floatingActionButton").style.display = "none";
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
            } else if (errorCode === 'auth/user-not-found') {
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

var button = document.getElementById("button-download"),
    count = 0;

button.onclick = function () {
    firebase.database().ref('counter').set(firebase.database.ServerValue.increment(1));
    check();
};

firebase.database().ref('counter').on('value', function (snapshot) {
    var badge = document.getElementById("badge-value");
    badge.innerHTML = snapshot.val();
});


