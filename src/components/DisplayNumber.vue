<template>
  <div>
  <span
    v-for="(digit, digitIndex) in number"
    :key="digitIndex"
    :class="getColorOfDigit(number, digitIndex)"
  >
    {{ digit }}
  </span>
</div>
</template>

<script>
export default {
  name: "display-number",
  props: {
    number: String,
    index: Number,
  },
  methods: {
    getColorOfDigit(number, digitIndex) {
      let currentIndex = number.length - this.index - 1;

      if (digitIndex === currentIndex && number !== "0") {
        return "red";
      }
    },
  },
};
</script>

<style scoped>
.red {
  color: red;
}
</style>
