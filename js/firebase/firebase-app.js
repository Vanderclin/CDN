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
	
document.getElementById("navbarToggleUp").classList.add('collapse-in');
document.getElementById("navbarToggleUp").classList.remove('collapse');

