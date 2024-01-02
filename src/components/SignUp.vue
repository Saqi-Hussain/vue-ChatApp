<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600"
  >
    <div class="bg-white p-8 rounded-md shadow-md w-full max-w-md">
      <h2 class="text-3xl font-extrabold text-center text-gray-800 mb-4">
        Chat App Sign Up
      </h2>
      <div
        v-show="Loader == true"
        class="text-white text-center p-1 rounded-lg bg-gradient-to-r from-yellow-600 to-red-400"
      >
        Loading...
      </div>
      <div
        v-show="Loader == false"
        :class="bgClass"
        class="p-2 text-center rounded-xl text-white"
      >
        {{ msgToUser }}
      </div>
      <veeform @submit="signup" :validationSchema="schema">
        <veefield name="username" v-slot="{ field, errors }">
          <div class="mb-4">
            <label
              for="username"
              class="block text-sm font-medium text-gray-600"
              >Username</label
            >
            <input
              v-model="username"
              type="text"
              id="username"
              name="username"
              :class="{ 'border-red-600': errors.length > 0 }"
              class="form-input mt-1 block w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
              v-bind="field"
            />
            <div v-for="error in errors" :key="error" :class="textClass">
              {{ error }}
            </div>
          </div>
        </veefield>

        <veefield name="email" v-slot="{ field, errors }">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-600"
              >Email</label
            >
            <input
              v-model="email"
              type="email"
              id="email"
              name="email"
              :class="{ 'border-red-600': errors.length > 0 }"
              class="form-input mt-1 block w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
              v-bind="field"
            />
          </div>
          <div v-for="error in errors" :key="error" :class="textClass">
            {{ error }}
          </div>
        </veefield>

        <veefield name="password" v-slot="{ field, errors }">
          <div class="mb-4">
            <label
              for="password"
              class="block text-sm font-medium text-gray-600"
              >Password</label
            >
            <input
              v-model="password"
              type="password"
              id="password"
              name="password"
              :class="{ 'border-red-600': errors.length > 0 }"
              class="form-input mt-1 block w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
              v-bind="field"
            />
          </div>
          <div v-for="error in errors" :key="error" :class="textClass">
            {{ error }}
          </div>
        </veefield>

        <veefield name="confirmPassword" v-slot="{ field, errors }">
          <div class="mb-6">
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-600"
              >Confirm Password</label
            >
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              :class="{ 'border-red-600': errors.length > 0 }"
              class="form-input mt-1 block w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
              v-bind="field"
            />
          </div>
          <div v-for="error in errors" :key="error" :class="textClass">
            {{ error }}
          </div>
        </veefield>

        <button
          type="submit"
          class="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Sign Up
        </button>

        <router-link :to="{ name: 'login' }" class="link">
          Or Login
        </router-link>
      </veeform>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useUserState from "@/stores/user";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      textClass: "text-red-600",
      bgClass: "",
      msgToUser: "",
      Loader: false,
      schema: {
        username: "required|min:4|max:100",
        email: "required|email",
        password: "required|min:6",
        confirmPassword: "required|confirmed:@password",
      },
    };
  },
  methods: {
    ...mapActions(useUserState, ["register"]),
    async signup(values) {
      console.log("Signing up...");
      console.log(values);
      this.Loader = true;
      try {
        await this.register(values);
        this.Loader = false;

        this.msgToUser = "Succeed!! Registeration in process";
        this.bgClass = "bg-green-600";
        setTimeout(() => {
          //for vanishing the error to user after 2.5 secs
          this.msgToUser = "Redirecting to login page...";
          this.bgClass = "bg-blue-600";
          setTimeout(() => {
            this.msgToUser = "";
            this.bgClass = "";
            this.$router.push("/");
          }, 1500);
        }, 2500);
      } catch (error) {
        console.log(error.message);
        this.Loader = false;
        this.msgToUser = error.message;
        this.bgClass = "bg-red-600";
        setTimeout(() => {
          //for vanishing the error to user after 2.5 secs
          this.msgToUser = "";
          this.bgClass = "";
        }, 2500);
      }
    },
  },
  mounted() {
    const res = localStorage.getItem("loggedInStatus");
    if (res === "true") {
      this.$router.push("chat");
    }
  },
};
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
