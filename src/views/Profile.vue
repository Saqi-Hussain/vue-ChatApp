<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600"
  >
    <div class="bg-white p-8 rounded-md shadow-md w-full max-w-md">
      <div class="flex items-center justify-center mb-4">
        <img
          src="../assets/defaultProfilePicture/default-profile-picture-removebg-preview.png"
          alt="User Profile"
          class="h-16 w-13 rounded-full object-cover"
        />
      </div>
      <h2 class="text-3xl font-extrabold text-center text-gray-800 mb-4">
        Hi {{ firstName }}
      </h2>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-600">Username:</label>
        <span class="text-lg font-semibold">{{ username }}</span>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-600">Email:</label>
        <span class="text-lg font-semibold">{{ email }}</span>
      </div>
      <div class="mb-6">
        <button
          @click="editProfile"
          class="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Edit Profile
        </button>
      </div>
      <button
        @click="openPopup"
        class="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-700 transition duration-300"
      >
        Logout
      </button>

      <button
        class="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 mt-6"
      >
        <router-link :to="{ name: 'chat' }"> Back to chat room </router-link>
      </button>

      <PopUp
        class="text-black"
        :is-visible="popUpvisible"
        @close="closePopup"
        title="Logging Out?"
      >
        <!-- Content for the popup goes here -->
        <p>Are you sure to logout ?</p>
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
            Cancle
          </button>
        </div>
      </PopUp>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";
import PopUp from "@/components/PopUp.vue";
export default {
  components: {
    PopUp,
  },
  data() {
    return {
      firstName: "",
      username: "",
      email: "",
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
    editProfile() {
      // Add your logic for navigating to the edit profile page or modal
      console.log("Editing profile...");
    },
    async logout() {
      console.log("Logout clicked");
      // this.openPopup();
      await this.singout();
      this.$router.push("/");
    },
  },
  mounted() {
    this.username = localStorage.getItem("name");
    const spaceIndex = this.username.indexOf(" ");
    this.firstName =
      spaceIndex !== -1 ? this.username.slice(0, spaceIndex) : this.username;
    this.email = localStorage.getItem("email");
    const res = localStorage.getItem("loggedInStatus");
    console.log("chat mounted res = ", res);
    if (res === null || res === "false") {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
