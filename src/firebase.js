import firebase from "firebase";
import 'firebase/analytics';

const MODES = {
	DEV: "Dev",
};
const devMode = MODES.DEV;

let config = {};

if (devMode === MODES.DEV) {
	 config = {
        apiKey: "AIzaSyC8J8n8xCsHVQ9sjuRz4vhN4uwDHqtcHrs",
        authDomain: "web-messenger-sainyi-068390.firebaseapp.com",
        databaseURL: "https://web-messenger-sainyi-068390.firebaseio.com",
        projectId: "web-messenger-sainyi-068390",
        storageBucket: "web-messenger-sainyi-068390.appspot.com",
        messagingSenderId: "1009602292230",
        appId: "1:1009602292230:web:594313587f605bdf147187",
        measurementId: "G-43PWLJJNB1"
      };
} else {
	
}
export const fb = firebase.initializeApp(config);
//export const fn = firebase.functions();
export const db = firebase.firestore();
// export const realtimeDB = firebase.database();
export const auth = firebase.auth();
export const analytics = firebase.analytics();

// if (window.location.hostname === "localhost" && devMode === MODES.LOCAL) {
// 	db.useEmulator("localhost", 5002);
// 	fn.useEmulator("localhost", 5001);
// 	auth.useEmulator("http://localhost:9099/");
// 	// realtimeDB.useEmulator("http://localhost:9000/");
// }

//if (window.location.hostname === "localhost" && devMode === MODES.DEV) {
	//db.useEmulator("localhost", 5002);
	//fn.useEmulator("localhost", 5001);
//	auth.useEmulator("http://localhost:9099/");
	// realtimeDB.useEmulator("http://localhost:9000/");
//}