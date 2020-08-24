function counter_fn() {
    //var counter = document.getElementById("visitor");


    var count = 0;
    count = parseInt(counter.innerHTML);
    count = count + 1;
    counter.innerHTML = count;
    firebase.database().ref('visitor').set(firebase.database.ServerValue.increment(1));
    check();

}
window.onload = counterV;

function counterV() {
    firebase.database().ref('visitor').on('value', function (snapshot) {
        var badge = document.getElementById("visitor");
        badge.innerHTML = snapshot.val();
    });
}
