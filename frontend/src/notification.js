import { getToken } from 'firebase/messaging';
import { messaging } from './firebase';

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    // STEP 1: register SW
    const registration = await navigator.serviceWorker.register(
      '/firebase-messaging-sw.js'
    );

    // IMPORTANT: wait until SW is ready
    await navigator.serviceWorker.ready;

    console.log('SW ACTIVE:', registration);

    // STEP 2: get token
    const token = await getToken(messaging, {
      vapidKey:
        'BJRWfvhUICuM256GJPcuYfzx5qcaaaErvo-RSI6lCaZHRiBN5TOw_PD8IQdRzgtEVY9_VxAdP3_OtyOss_p0qL0',
      serviceWorkerRegistration: registration,
    });

    console.log('FCM TOKEN:', token);

    return token;
  } catch (err) {
    console.log('FCM ERROR:', err);
  }
};
