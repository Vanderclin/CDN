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

document.getElementById("btn-file-upload").style.display = "none";
document.getElementById("btn-sign-in").style.display = "none";
document.getElementById("btn-sign-out").style.display = "none";


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $("#modal_sign_in").modal("hide");
        document.getElementById("floatingActionButton").style.display = "block";

        // Buttons Navbar
        document.getElementById("btn-file-upload").style.display = "block";
        document.getElementById("btn-sign-in").style.display = "none";
        document.getElementById("btn-sign-out").style.display = "block";

    } else {
        document.getElementById("floatingActionButton").style.display = "none";
        // Buttons Navbar
        document.getElementById("btn-file-upload").style.display = "none";
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









function startUpload() {

    var ehi_file_name = document.getElementById("ehi_file_name").value;
    var ehi_date_create = document.getElementById("ehi_date_create").value;
    var ehi_date_expired = document.getElementById("ehi_date_expired").value;
    var ehi_day_quantity = document.getElementById("ehi_day_quantity").value;
    var ehi_file_upload = document.getElementById("ehi_file_upload").files[0];

    var uid = firebase.auth().currentUser.uid;

    var ref = firebase.storage().ref("resources");
    var uploadTask = ref.child(Date.now() + "/" + ehi_file_upload.name + "/").put(ehi_file_upload);

    uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        $('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress);
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING:
                console.log('Upload is running');
                break;
        }
    }, function (error) {
        console.log(error);
    }, function () {

        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            var user = firebase.auth().currentUser;
            var data = {
                file_name: ehi_file_name,
                file_create: ehi_date_create,
                file_expired: ehi_date_expired,
                file_days: ehi_day_quantity,
                file_url: downloadURL
            };
            firebase.database().ref().child("identification/" + uid).set(data)
                .then(function () {
                    //setTimeout(function () {
                      //  window.location.reload();
                    //}, 4000);

                }).catch(function (error) {
                    alert("Ocorreu um erro durante a atualização");
                });


        });
    });
};
