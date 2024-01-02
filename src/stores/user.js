import { defineStore } from "pinia";
import { auth, userCollection } from "@/includes/firebase";

export default defineStore('users', {
    state: () => (
        {
            userLoggedInStatus: false,
            userRegisteredStatus: true,
            userName: '',
            email: '',
            currentUserID: ''
        }
    ),
    actions: {
        async register(values) {
            console.log('you are in registered component');

            const registeredUserData = await auth.createUserWithEmailAndPassword(values.email, values.password);


            registeredUserData.user.updateProfile({
                displayName: values.username
            })



            this.userRegisteredStatus = true;
            console.log('from actions userRssegisteredStatus = ', this.userRegisteredStatus);


            const dataAdded = await userCollection.doc(registeredUserData.user.uid).set({
                name: values.username,
                email: values.email
            })

            

            if (dataAdded) {
                console.log('data added successfully as ', dataAdded);
            }

        },
        async login(values) {
            console.log('you are trying to login');

            const userLoggedInData = await auth.signInWithEmailAndPassword(values.email, values.password);

            this.userLoggedInStatus = true;
            console.log("userLoggedInStatus = ", this.userLoggedInStatus);

            

            this.userName = userLoggedInData.user.displayName;
            this.email = userLoggedInData.user.email;
            localStorage.setItem('loggedInStatus', `${this.userLoggedInStatus}`)
            localStorage.setItem('name', `${this.userName}`)
            localStorage.setItem('email', `${this.email}`)



        },
        async singout() {
            console.log('you are trying to sign out');
            auth.signOut();
            this.userLoggedInStatus = false;
            this.userName = ''
            this.email = ''
            localStorage.setItem('loggedInStatus', `${this.userLoggedInStatus}`)
            localStorage.setItem('name', `${this.userName}`)
            localStorage.setItem('email', `${this.email}`)


        }
    }


})