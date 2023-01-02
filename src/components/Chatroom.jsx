import React, { useState, useRef } from "react"
import firebase from 'firebase'
import { firestore } from "../firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { auth } from "../firebase"
import ChatMessage from "./ChatMessage"
import Button from "./Button"

export default function Chatroom() {
  const messagesRef = firestore.collection("messages")
  const query = messagesRef.orderBy("createdAt").limit(25)
  const [messages] = useCollectionData(query, { idField: "id" })
  const [formValue, setFormValue] = useState('')
  const dummy = useRef()

  const sendMessage = async(e) => {
    e.preventDefault()

    const { uid, photoURL } = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')

    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id}>{msg.text}</ChatMessage>
          ))}
        
        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <Button>S</Button>
      </form>
    </>
  )
}
