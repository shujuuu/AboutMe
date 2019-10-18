let firebase = require("firebase");
let firebaseConfig = {
    apiKey: "AIzaSyA8HPBmzyUaI7IfjLfXShc1qzjuQzc8BEw",
    authDomain: "aboutme-f30b6.firebaseapp.com",
    databaseURL: "https://aboutme-f30b6.firebaseio.com",
    projectId: "aboutme-f30b6",
    storageBucket: "aboutme-f30b6.appspot.com",
    messagingSenderId: "92114102053",
    appId: "1:92114102053:web:4739ac7581e2b698891ccc"
};
firebase.initializeApp(firebaseConfig);
let ref = firebase.app().database().ref();
// let verbsRef = ref.child("sleep/");
// verbsRef = verbsRef.push();
// let current_verb_ref = verbsRef.push({
//     how: ["well"],
//     description: "scream"
// });
let playersRef = firebase.database().ref("sleep/");
playersRef.set ({
    how: {
        number: 1,
        age: 30
    },
});






