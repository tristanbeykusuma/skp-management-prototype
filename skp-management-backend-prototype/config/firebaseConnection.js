const { getStorage } = require("firebase/storage");
const { initializeApp } = require("firebase/app");
require("firebase/storage");
const admin = require("firebase-admin");
var serviceAccount = require("../skpmanagement-dd95e-firebase-adminsdk-1a595-ca19858ddf.json");

const firebaseConfig = {
    apiKey: "AIzaSyBsGqGGmOtLF-vBuD_WTsmlk5nJYSzs7L4",
    authDomain: "skpmanagement-dd95e.firebaseapp.com",
    projectId: "skpmanagement-dd95e",
    storageBucket: "skpmanagement-dd95e.appspot.com",
    messagingSenderId: "215292644709",
    appId: "1:215292644709:web:5ed07e4f7ca2648798a58c",
    measurementId: "G-04DV3S5TER"
};

const firebasedb = initializeApp(firebaseConfig);

const firebasedbbucket = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://skpmanagement-dd95e.appspot.com"
});

module.exports = {firebasedb,firebasedbbucket};