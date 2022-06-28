import React, { useRef, useState } from 'react';
import { doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "fbase";
import { deleteObject, ref } from "firebase/storage"

const Dweet = ({ dweetObj, isOwner }) => {
    const [edit, setEdit] = useState(null);
    const DweetTextRef = doc(dbService, "dweets", `${dweetObj.id}`);

    const onDeleteClick = async () => {
        const ok = window.confirm('Are you sure you want to delete this dweet?');
        if (ok) {
            await deleteDoc(DweetTextRef);
            await deleteObject(ref(storageService, dweetObj.attachmentURL));
        }
    }
    const onEditClick = async (event) => {
        event.preventDefault();
        if (edit !== null) {
            await updateDoc(DweetTextRef, {
                text: edit
            });
            setEdit(null);
        } else {
            setEdit(dweetObj.text)
        }
    }
    const onChange = (event) => {
        setEdit(event.target.value);
    }

    return (
        <div>
            {
                edit === null
                    ?
                    <>
                        {dweetObj.attachmentURL && <img src={dweetObj.attachmentURL} width='50px' height='50px' />}
                        <h4>
                            {dweetObj.text}
                        </h4>
                    </>
                    :
                    (isOwner &&
                        <>
                            <form onSubmit={onEditClick}>
                                <input
                                    onChange={onChange}
                                    value={edit}
                                    required
                                    type='text'
                                />
                            </form>
                        </>
                    )
            }
            {isOwner &&
                <>
                    <button onClick={onEditClick}>
                        Edit Dweet
                    </button>
                    <button onClick={onDeleteClick}>
                        Delete Dweet
                    </button>
                </>
            }
        </div>
    );
}

export default Dweet;