import { authService, dbService } from "fbase";
import { updateProfile } from "firebase/auth";
import { collection, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName ? userObj.displayName : '');
    const disName = useRef();
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut()
        navigate('/');
    };
    const getMyDweets = async () => {

        const q = query(
            collection(dbService, 'dweets'),
            where('creatorId', '==', userObj.uid),
            orderBy("createdAt", "desc")
        );
        const dweets = await getDocs(q);
        console.log(dweets.docs.map((dweet) => dweet.data()));
    };

    useEffect(() => {
        getMyDweets();
    }, []);

    const onChange = (e) => {
        const {
            target: { value }
        } = e
        setNewDisplayName(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (newDisplayName !== userObj.displayName) {
            await updateProfile(authService.currentUser, {
                displayName: newDisplayName
            });
            refreshUser();
        }
    };

    return (
            <>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder='Display name'
                    value={newDisplayName}
                    onChange={onChange}
                    ref={disName}
                />
                <input type='submit' value='Update Profile' />
            </form>
            <button onClick={onLogOutClick}>
                Log Out
            </button>
        </>
    );
}
export default Profile;