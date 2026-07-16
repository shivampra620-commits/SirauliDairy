// ===============================
// Firebase Configuration
// ===============================

const firebaseConfig = {
  apiKey: "AIzaSyDGN3S-97C-qrMkSL8GoJZ3PW1Z5zAoFtM",
  authDomain: "siraulidairy.firebaseapp.com",
  databaseURL: "https://siraulidairy-default-rtdb.firebaseio.com",
  projectId: "siraulidairy",
  storageBucket: "siraulidairy.firebasestorage.app",
  messagingSenderId: "635800288572",
  appId: "1:635800288572:web:f9f9c925f30c0c76f4b239"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Realtime Database
const db = firebase.database();

// Database References
const farmersRef = db.ref("farmers");
const milkRef = db.ref("milk");
const paymentsRef = db.ref("payments");
const adminRef = db.ref("admin");

console.log("✅ Firebase Connected Successfully");
