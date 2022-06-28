import React, { useEffect, useState } from "react";
import { query, orderBy, collection, onSnapshot } from "firebase/firestore";
import { dbService } from "fbase";
import Dweet from "components/Dweet";
import DweetFactory from "components/DweetFactory";

const Home = ({ userObj }) => {
    const [dweets, setDweets] = useState([]);
    // async function readDweets() {
    //     const dbDweets = await getDocs(dweetsCol);
    //     dbDweets.forEach((doc) => {
    //         const dweetObj = {
    //             ...doc.data(),
    //             id: doc.id,
    //         }
    //         setDweets(current => [...current, dweetObj]);
    //     });
    //     console.log(dweets);
    // };
    useEffect(() => {
        // readDweets();
        const q = query(
            collection(dbService, "dweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const dweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setDweets(dweetArray);
        })
    }, [])

    return (
        <div>
            <DweetFactory userObj={userObj}/>
            <div>
                {dweets.map(dweet => (
                    <Dweet
                        key={dweet.id}
                        dweetObj={dweet}
                        isOwner={dweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;