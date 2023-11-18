<template>
  <div>
    <Header
      :started="started"
      :array="array"
      @sort="selectionSort"
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
    done: -1,
    minimum: -1,
    active: -1,
    started: false,
    height: 0,
  };
};

export default {
  name: "selection-sort",
  data: getInitialState,
  props: {
    sleep: Function,
  },
  components: {
    Header,
    RenderArray,
  },
  methods: {
    changeArray(newArray) {
      this.array = newArray;
    },

    getClassName(_, index) {
      let className = "col ";

      if (index <= this.done) {
        return className + "done";
      }
      if (index == this.minimum) {
        return className + "current";
      }
      if (index == this.active) {
        return className + "active";
      }

      return className;
    },

    async selectionSort() {
      this.started = true;
      let array = this.array;

      for (let i = 0; i < array.length; i++) {
        this.minimum = i;

        for (let j = i; j < array.length; j++) {
          if (array[j] < array[this.minimum]) {
            this.minimum = j;
          }
          this.active = j;
          await this.sleep();
        }

        [array[i], array[this.minimum]] = [array[this.minimum], array[i]];

        this.active = -1;
        this.done = i;
        this.minimum = -1;
        await this.sleep();
      }

      this.done = -1;
      this.started = false;
    },
    reset() {
      this.$emit("reset");
    },
  },
};
</script>
