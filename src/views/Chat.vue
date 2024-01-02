<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-blue-500 text-white p-4">
      <h1
        class="text-2xl font-semibold mb-4 text-center bg-blue-700 shadow-lg rounded-xl"
      >
        {{ firstName }}'s Chat Room
      </h1>
      <button
        @click="openPopup"
        class="float-right mr-2 px-4 py-2 bg-red-500 rounded-md hover:bg-red-600"
      >
        Logout
      </button>

      <button class="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600 ml-2">
        <router-link :to="{ name: 'profile' }">Your profile</router-link>
      </button>

      <PopUp
        :is-visible="popUpvisible"
        @close="closePopup"
        title="Logging Out?"
        class="text-black"
      >
        <!-- Content for the popup goes here -->
        <p>Are you sure you want to log out?</p>
        <div class="flex gap-3 text-white mt-2">
          <button
            @click="logout"
            class="bg-red-600 px-6 rounded-lg hover:bg-red-800"
          >
            Yes
          </button>

          <button
            @click="closePopup"
            class="bg-green-600 px-6 rounded-lg hover:bg-green-800"
          >
            Cancel
          </button>
        </div>
      </PopUp>
    </header>

    <main
      class="flex flex-col p-4 bg-blue-100 h-[73vh] chat-container scroll-smooth"
      v-chat-scroll
      ref="scrollToMe"
    >
      <div v-for="(message, index) in messages" :key="index" class="mb-4">
        <span class="font-semibold">{{ message.sender }}:</span>
        {{ message.content }}
      </div>
    </main>
    <div class="fixed bottom-0 w-full bg-white">
      <form
        @submit.prevent="sendMessage"
        class="flex p-4 border-t border-gray-300"
      >
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type your message..."
          class="w-full px-4 py-2 border-yellow-500 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          class="ml-2 px-4 py-2 float-right bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";
import useMessageStore from "@/stores/messages";
import PopUp from "@/components/PopUp.vue";
import firebase from "firebase/app";
import { msgCollection } from "@/includes/firebase";

export default {
  name: "Chat",
  components: {
    PopUp,
  },
  data() {
    return {
      username: "",
      firstName: "",
      newMessage: "",
      // Assume you have a list of messages in this format
      messages: [
        {
          sender: "",
          content: "",
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        },

        // ... more messages
      ],
      popUpvisible: false,
    };
  },
  methods: {
    openPopup() {
      this.popUpvisible = true;
    },
    closePopup() {
      this.popUpvisible = false;
    },
    ...mapActions(useUserStore, ["singout"]),
    ...mapActions(useMessageStore, ["sndmsg"]),

    async sendMessage() {
      if (this.newMessage.trim() === "") return;
      try {
        const m = this.newMessage;
        this.newMessage = "";

        await this.sndmsg(this.username, m);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },

    async logout() {
      console.log("Logout clicked");
      this.openPopup();
      await this.singout();
      this.$router.push("/");
    },
  },
  watch: {
    messages() {
      this.$nextTick(function () {
        var container = this.$refs.scrollToMe;
        container.scrollTop = container.scrollHeight + 120;
      });
    },
  },
  async mounted() {
    this.username = localStorage.getItem("name");
    const spaceIndex = this.username.indexOf(" ");
    this.firstName =
      spaceIndex !== -1 ? this.username.slice(0, spaceIndex) : this.username;

    // Load existing messages
    const querySnapshot = await msgCollection.orderBy("timestamp").get();
    this.messages = querySnapshot.docs.map((doc) => doc.data());

    // Listen for real-time updates
    msgCollection.orderBy("timestamp").onSnapshot((snapshot) => {
      this.messages = snapshot.docs.map((doc) => doc.data());
    });

    const res = localStorage.getItem("loggedInStatus");
    console.log("chat mounted res = ", res);
    if (res === null || res === "false") {
      this.$router.push("/");
    }
  },
};
</script>

<style>
.chat-container {
  overflow-y: auto;
}
</style>
