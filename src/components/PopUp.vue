<template>
  <transition name="fade">
    <div v-if="isVisible" class="popup-container">
      <div class="popup">
        <div class="popup-header">
          <span class="popup-title">{{ title }}</span>
          <button @click="closePopup" class="popup-close-btn">X</button>
        </div>
        <div class="popup-content">
          <!-- Your content goes here -->
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Popup Title",
    },
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.popup-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.popup-close-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #999;
}
</style>
