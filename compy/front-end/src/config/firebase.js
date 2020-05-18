import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions'

let firebaseConfig = {
    apiKey: "AIzaSyAr7v6_XC16icLSfqq2Ll7u6Tdp2OKaSSQ",
    authDomain: "compy-6a1fe.firebaseapp.com",
    databaseURL: "https://compy-6a1fe.firebaseio.com",
    projectId: "compy-6a1fe",
    storageBucket: "compy-6a1fe.appspot.com",
    messagingSenderId: "753436923858",
    appId: "1:753436923858:web:f11fe1ebe4f278bbd4da0b",
    measurementId: "G-QPQGSG9XZR"
}

firebase.initializeApp(firebaseConfig);

export default firebase;

