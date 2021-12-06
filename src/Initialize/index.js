import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Routes from '../routes';
import SignIn from '../views/SignIn';

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
        };
        setUser(userObj);
      } else {
        setUser(false);
      }
    });
  }, []);

  return (
    <div>
      {user ? (
        <>
          <Routes user={user} />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default Initialize;
