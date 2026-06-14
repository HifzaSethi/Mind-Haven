importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyAT6XDgrCw2UCCBjDUYBynJLiQTRG6PkwU',
  authDomain: 'mental-health-system-8c11b.firebaseapp.com',
  projectId: 'mental-health-system-8c11b',
  messagingSenderId: '623823394270',
  appId: '1:623823394270:web:f2a06ac44e789b5a85f94f',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('BACKGROUND MESSAGE:', payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/vite.svg',
  });
});
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
