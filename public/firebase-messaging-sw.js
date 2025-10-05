/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.13.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging-compat.js");

// firebase.initializeApp({
//   apiKey: "AIzaSyCqPQbg7iy6lPUAuv8NaMkLtgero0YjV0c",
//   authDomain: "click-mobile-app-1d007.firebaseapp.com",
//   projectId: "click-mobile-app-1d007",
//   storageBucket: "click-mobile-app-1d007.firebasestorage.app",
//   messagingSenderId: "682616849976",
//   appId: "1:682616849976:web:b5b8a162dfe71013f608cd",
//   measurementId: "G-D7GS8C173S"
// });

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const firebaseConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/vite.svg" // optional
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
