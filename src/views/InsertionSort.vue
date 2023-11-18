<template>
  <div>
    <Header
      :done="done === array.length"
      :started="started"
      :array="array"
      @sort="insertionSort"
      @reset="reset"
      @changeArray="changeArray"
    />

    <RenderArray :array="array" :max="max" :getClassName="getClassName" />
    <RenderArray
      :array="sorting"
      :max="max"
      :getClassName="
        () => {
          return 'col current';
        }
      "
    />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import RenderArray from "@/components/RenderArray.vue";

const getInitialState = () => {
  let array = _.shuffle(_.range(1, 11));
  let sorting = Array(10).fill(0);
  let max = Math.max(...array);

  return {
    array: array,
    sorting: sorting,
    done: -1,
    started: false,
    active: -1,
    max: max,
  };
};

export default {
  name: "insertion-sort",
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
      this.max = Math.max(...this.array);
      this.sorting = Array(this.array.length).fill(0);
    },

    setCurrent(current, index) {
      this.sorting.fill(0);
      this.sorting[index] = current;
    },

    getClassName(_, index) {
      let className = "col ";

      if (index === this.active) {
        return className + "active";
      }

      if (index <= this.done) {
        return className + "done";
      }

      return className;
    },

    async insertionSort() {
      this.started = true;
      let array = this.array;

      for (let i = 0; i < array.length; i++) {
        const current = array[i];
        array[i] = 0;

        let j = i - 1;
        this.done = i;

        this.setCurrent(current, i);
        this.active = j;

        await this.sleep();

        while (j >= 0 && array[j] > current) {
          [array[j + 1], array[j]] = [array[j], array[j + 1]];
          this.setCurrent(current, j);
          this.active = --j;

          await this.sleep();
        }
        await this.sleep();

        array[j + 1] = current;
      }

      this.done = this.array.length;
      this.active = -1;
      this.sorting.fill(0);

      await this.sleep();

      this.done = -1;
      this.started = false;
    },
    reset() {
      this.$emit("reset");
    },
  },
};
</script>
