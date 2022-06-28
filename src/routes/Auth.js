import React from "react";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from 'firebase/auth';
import AuthForm from "components/AuthForm";

const Auth = () => {


    const onSocialClick = async (event) => {
        const auth = getAuth();
        const { name } = event.target;
        let provider;
        if(name === 'google'){
            provider = new GoogleAuthProvider(); 
            // .then((result) => {
            //     const credential = GoogleAuthProvider.credentialFromResult(result);
            //   }).catch((error) => {
            //     const credential = GoogleAuthProvider.credentialFromError(error);
            //     setError(error.message);
            //   });
        } else if(name === 'github'){
            provider = new GithubAuthProvider();
            // .then((result) => {
            //     const credential = GithubAuthProvider.credentialFromResult(result);
            //   }).catch((error) => {
            //     const credential = GithubAuthProvider.credentialFromError(error);
            //     setError(error.message);
            //   });
        }
        const data = await signInWithPopup(auth, provider)
    }
    return (
        <div>
            <AuthForm />
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    );
}
export default Auth; 