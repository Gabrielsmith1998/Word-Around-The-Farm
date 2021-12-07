import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Routes from '../routes';
import Navagation from '../api/compontents/Navbar';

function Initialize() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userObj = {
          uid: authed.uid,
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          username: authed.email.split('@')[0],
          isAdmin: authed.uid === '8CWNuzJ5Skall5t3MyshHJkqJNW2',
        };
        setUser(userObj);
      } else {
        setUser(false);
      }
    });
  }, []);

  return (
    <div>
      <Navagation user={user} />
      <Routes user={user} />
    </div>
  );
}

export default Initialize;
