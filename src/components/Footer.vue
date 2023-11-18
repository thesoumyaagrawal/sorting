<template>
  <footer>
    <span>Slower</span>
    <input
      type="range"
      v-model="animationSpeed"
      v-on:change="signalChange"
      min="100"
      max="800"
      step="25"
    />
    <span>Faster</span>
  </footer>
</template>

<script>
export default {
  name: "footer-animation-speed",
  data() {
    return {
      animationSpeed: {
        default: 500,
        type: Number,
      },
    };
  },
  emits: ["speedChanged"],
  methods: {
    signalChange() {
      this.$emit("speedChanged", this.animationSpeed);
    },
  },
};
</script>

<style scoped>
footer {
  width: 100%;
  height: 30px;
  padding: 15px 0 0 0;
  color: #333333;
  background: #0000000F;
}

footer > span {
  padding: 0 6px;
}

input[type="range"] {
  overflow: hidden;
  width: 150px;
  background-color: #9a905d;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 12px;
  -webkit-appearance: none;
  color: #5bfab2;
  margin-top: -1px;
}

input[type="range"]::-webkit-slider-thumb {
  width: 12px;
  -webkit-appearance: none;
  height: 12px;
  background: #434343;
}
</style>
