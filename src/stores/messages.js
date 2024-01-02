import { defineStore } from "pinia";
import { msgCollection } from "@/includes/firebase";
import firebase from "firebase/app";


export default defineStore('messages', {

    actions: {
        async sndmsg(username, newMessage) {
            const docRef = await msgCollection.add({
                sender: username,
                content: newMessage,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            console.log("Message sent successfuly with ID:", docRef.id);
            console.log(docRef);
        }


    }



})