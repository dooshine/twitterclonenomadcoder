import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  }
  return <>
    {init
      ?
      <AppRouter
        isLoggedIn={Boolean(userObj)}
        userObj={userObj}
        refreshUser={refreshUser}
      />
      :
      "Initializing...."
    }
    {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
  </>;
}

export default App;
