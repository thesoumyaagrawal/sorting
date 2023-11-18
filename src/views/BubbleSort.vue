<template>
  <div>
    <Header
      :started="started"
      :array="array"
      @sort="bubbleSort"
      @reset="reset"
      @changeArray="changeArray"
    />
    <RenderArray
      :array="array"
      :max="Math.max(...array)"
      :getClassName="getClassName"
    />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import RenderArray from "@/components/RenderArray.vue";

const getInitialState = () => {
  let array = _.shuffle(_.range(1, 11));
  return {
    array: array,
    active: [],
    done: array.length,
    started: false,
  };
};

export default {
  name: "bubble-sort",
  data: getInitialState,
  props: {
    sleep: Function,
  },
  components: {
    Header,
    RenderArray,
  },
  methods: {
    getClassName(_, index) {
      if (index >= this.done) return "col done";

      return this.active.includes(index) ? "col active" : "col";
    },

    changeArray(newArray) {
      this.array = newArray;
      this.done = newArray.length;
    },

    async bubbleSort() {
      this.started = true;
      var array = this.array;

      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          this.active = [j, j + 1];

          if (array[j] > array[j + 1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
          }

          await this.sleep();
        }
        this.done--;
      }

      await this.sleep();

      this.done = this.array.length;
      this.active = [];
      this.started = false;
    },
    reset() {
      this.$emit("reset");
    },
  },
};
</script>
