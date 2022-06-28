import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const DweetFactory = ({userObj}) => {
    const [dweet, setDweet] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [fileName, setFileName] = useState(null);
    const fileInput = useRef();

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentURL = null;
        if (attachment !== null) {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentURL = await getDownloadURL(response.ref);
        }
        const dweetObj = {
            text: dweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentURL
        }
        try {
            const docRef = await addDoc(collection(dbService, 'dweets'), dweetObj);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setAttachment(null);
        setFileName(null);
        setDweet('');
        fileInput.current.value = null;
    }
    const onChange = (event) => {
        setDweet(event.target.value);
    }
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event
        setFileName(files[0].name);
        const theFile = files[0];
        if (theFile) {
            const reader = new FileReader();
            reader.onloadend = (finishedEvent => {
                const {
                    currentTarget: { result }
                } = finishedEvent;
                setAttachment(result);
            })
            reader.readAsDataURL(theFile);
        }
    }
    const onClearAttachment = () => {
        setAttachment(null);
        fileInput.current.value = null;
    }

    return (
        <form onSubmit={onSubmit}>
            {attachment &&
                <div>
                    <img src={attachment} width='50px' height='50px' />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>}
            <input
                onChange={onChange}
                value={dweet}
                type='text'
                placeholder="What's on your mind?"
                maxLength={120} />
            <input ref={fileInput} type='file' accept='image/*' onChange={onFileChange} />
            <input type='submit' value='Dweet' />
        </form>
    );
}
export default DweetFactory;