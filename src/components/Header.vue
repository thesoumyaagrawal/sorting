<template>
  <div id="header">
    <div>
      <input id="array-input" type="text" :value="userInput" ref="newArray" />
      <button type="button" :disabled="started" v-on:click="changeArray">
        Sort
      </button>
      <button type="button" v-on:click="reset" class="reset">Reset</button>
      <div v-if="error && !started" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sort-header",
  props: {
    started: Boolean,
    range: {
      default: { min: 1, max: 99 },
      type: Object,
    },
    array: Array,
  },
  data() {
    return {
      userInput: this.array.toString(),
      error: undefined,
    };
  },
  emits: ["sort", "reset", "changeArray"],
  methods: {
    sort() {
      this.$emit("sort");
    },
    reset() {
      this.$emit("reset");
    },
    changeArray() {
      this.userInput = this.$refs.newArray.value.replaceAll(" ", "").split(",");

      if (this.userInput.length > 20 || this.userInput.length < 3) {
        this.error = "The array must have at least 3 and maximum 20 numbers.";
        return;
      }

      let array = [];
      this.error = undefined;

      for (const element of this.userInput) {
        if (this.isInteger(element)) {
          if (
            Number(element) > this.range.max ||
            Number(element) < this.range.min
          ) {
            this.error = `The elements must be between ${this.range.min} and ${this.range.max}`;
            return;
          }
          array.push(Number(element));
        } else {
          this.error = "The array contains invalid numbers";
          return;
        }
      }

      this.$emit("changeArray", array);
      this.$emit("sort");
    },

    isInteger(value) {
      return /^\d+$/.test(value);
    },
  },
};
</script>

<style scoped>
#header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  background: #0000008a;
}

#array-input {
  border: 0;
  padding: 6px 12px;
  min-width: 200px;
  outline: none;
}

@media only screen and (max-width: 599px) {
  #array-input {
    min-width: auto;
    width: 150px;
  }
}

button {
  min-width: 80px;
  background: #f8e511;
  color: #333;
  border: none;
  margin: 2px;
  padding: 6px;
  cursor: pointer;
  font-weight: bold;
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

.reset {
  background: #ec5555;
}

.error {
  color: #610000;
  padding: 2px 0 0;
}
</style>
