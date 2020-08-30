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

//document.getElementById("page-splash").style.display = "block";

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        document.getElementById("page-splash").style.display = "none";
    }
    if (displayName === null) {
        document.getElementById("user_name").innerHTML = "Sem nome";
        document.getElementById("user_email").innerHTML = email;
        $("#modal_update_user").modal({
            backdrop: 'static',
            keyboard: false
        });
    } else if (displayName) {
        document.getElementById("user_name").innerHTML = displayName;
        document.getElementById("user_email").innerHTML = email;
    } else {

        // Página Inicial
        document.getElementById("page-splash").style.display = "block";

    }
});

function signIn() {
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
    document.getElementById('quickstart-sign-in').disabled = true;

}

function signOut() {
    setTimeout(function () {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            window.location.reload();
        }).catch(function (error) {
            // An error happened.
        });
    }, 1000);
}

function updateProfile() {
    var username = document.getElementById("input_user_name").value;
    var user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: username
    }).then(function () {
        // Update successful.
        $("#modal_update_user").modal("hide");
    }).catch(function (error) {
        // An error happened.
    });
}
/*
firebase.database().ref('current_points').set(firebase.database.ServerValue.increment(1));
    check();
};
*/


firebase.database().ref('user').on('value', function (snapshot) {

    var cp = document.getElementById("current_points").innerHTML = snapshot.child('current_points').val();
    document.getElementById("current_device").innerHTML = snapshot.child('current_device').val();
    document.getElementById("current_guests").innerHTML = snapshot.child('current_guests').val();
    
    
    function mascara(v) {
        v = v.replace(/\D/g, "");
        v = new String(Number(v));
        var len = v.length;
        if (1 == len)
            v = v.replace(/(\d)/, "0,0$1");
        else if (2 == len)
            v = v.replace(/(\d)/, "0,$1");
        else if (len > 2) {
            v = v.replace(/(\d{2})$/, ',$1');
            if (len > 5) {
                var x = len - 5,
                    er = new RegExp('(\\d{' + x + '})(\\d)');
                v = v.replace(er, '$1.$2');
            }
        }
        return v;
    }
    document.getElementById("current_balance").innerHTML = "R$ " + (mascara('' + cp + ''));
});


/*
function check() {

    var codec = "10";
    firebase.database().ref('current_points').on('value', function (snapshot) {
        if (snapshot.val() < codec) {
            //$('.collapse').collapse();
            //document.getElementById("current_info").innerHTML = "Saque permitido"
        } else {
            //$('.collapse').collapse();
            //document.getElementById("current_info").innerHTML = "Saque não permitido"
        }
    });
}
*/
function setValue() {
    // Define o valor para 0
    firebase.database().ref('current_points').set("0");
    check();
}


window.onload = check;
