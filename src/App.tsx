import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getToken, onMessage } from 'firebase/messaging'
import { messaging } from './firebase/firebaseConfig'
import { toast, ToastContainer } from 'react-toastify'
import Message from './Message'

function App() {
  const { VITE_APP_VAPID_KEY } = import.meta.env;

  async function requestPermission() {
    //requesting permission using Notification API
    console.log("Requesting permission...", VITE_APP_VAPID_KEY);
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
        serviceWorkerRegistration: await navigator.serviceWorker.register("/firebase-messaging-sw.js"),
      });

      //We can send token to server
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  onMessage(messaging, (payload) => {
    console.log(payload);
    toast(<Message notification={payload.notification} />);
  });

  function showNotification() {
    toast(<Message notification={'hello'} />);
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => showNotification()}>
          count is
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ToastContainer />
    </>
  )
}

export default App
