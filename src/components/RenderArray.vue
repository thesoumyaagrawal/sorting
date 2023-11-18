<template>
  <div class="array">
    <div
      v-for="(item, index) in array"
      :key="index"
      :style="getStyling(item, index)"
      :class="getClassName(item, index) + ' ' + applyMobileStyling()"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "render-array",
  props: {
    array: Array,
    max: {
      default: undefined,
      type: Number,
    },
    arrayLength: {
      default: undefined,
      type: Number,
    },
    color: {
      default: undefined,
      type: String,
    },
    getClassName: {
      default: () => {
        return "col";
      },
      type: Function,
    },
    getStyling: {
      default: function(item) {
        if (!this.max) {
          this.max = Math.max(...this.array);
        }

        let height = 0;
        if (item !== 0) {
          height = (200 / this.max) * item + 20;
        }

        if (this.color) {
          return `height: ${height}px; background-color:${this.color};`;
        }
        return `height: ${height}px`;
      },
      type: Function,
    },
  },

  methods: {
    applyMobileStyling() {
      let length = this.array.length;
      if (this.arrayLength) {
        length = this.arrayLength;
      }
      if (length > 12 && length < 15) {
        return "col-mobile-base";
      } else if (length > 15) {
        return "col-mobile-small";
      }
    },
  },
};
</script>

<style scoped>
.col {
  width: 25px;
  color: #333333;
  background: #D7D8DC;
  margin-right: 1px;
}

@media only screen and (max-width: 599px) {
  .col-mobile-small {
    font-size: 12px;
    width: 15px;
    margin-right: 1px;
  }

  .col-mobile-base {
    font-size: 12px;
    width: 20px;
    margin-right: 1px;
  }
}

.active {
  background: #6b9b37;
}

.done {
  background: #ffeb3b;
}

.current {
  background: #f44336;
}

.smaller {
  background: #9c27b0;
}
</style>
