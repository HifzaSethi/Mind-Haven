import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAT6XDgrCw2UCCBjDUYBynJLiQTRG6PkwU',
  authDomain: 'mental-health-system-8c11b.firebaseapp.com',
  projectId: 'mental-health-system-8c11b',
  storageBucket: 'mental-health-system-8c11b.firebasestorage.app',
  messagingSenderId: '623823394270',
  appId: '1:623823394270:web:f2a06ac44e789b5a85f94f',
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
