<template>
  <div>
    <Header
      :started="started"
      :array="array"
      @sort="mergeSort"
      @reset="reset"
      @changeArray="changeArray"
    />

    <div class="array">
      <template   v-for="(partition, partitionIndex) in partitions"
        :key="partitionIndex">
        <RenderArray
          :arrayLength="length"
          :array="partition"
          :color="colors[partitionIndex]"
          :max="Math.max(...array)"
          class="partition"
        />
      </template>
    </div>

    <RenderArray :array="temp" :max="Math.max(...array)" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import RenderArray from "@/components/RenderArray.vue";

const getInitialState = () => {
  let array = _.shuffle(_.range(1, 11));
  let partitions = array.map((element) => [element]);
  let temp = Array(array.length).fill(0);

  return {
    array: array,
    partitions: partitions,
    length: partitions.length,
    colors: [],
    temp: temp,
    started: false,
  };
};

export default {
  name: "merge-sort",
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
      this.partitions = newArray.map((element) => [element]);
      this.temp = Array(newArray.length).fill(0);
      this.length = this.partitions.length;
      this.colorPartitions();
    },
    async mergeSort() {
      this.started = true;
      const partitions = this.partitions;

      this.colorPartitions();

      await this.sleep();

      while (partitions.length > 1) {
        for (let i = 0; i < partitions.length - 1; i++) {
          const left = [...partitions[i]];
          const right = [...partitions[i + 1]];

          if (this.mergeNext(i, left, right)) {
            const merged = await this.mergePartitions(i, left, right);

            await this.copyBackToOriginal(i, merged);

            break;
          }
        }
      }
      this.colors = [];
      this.temp = [];
      this.started = false;
    },

    mergeNext(i, left, right) {
      return (
        left.length === right.length || i + 1 === this.partitions.length - 1
      );
    },

    async mergePartitions(indexOfLeft, left, right) {
      let merged = [];

      while (left.length > 0 || right.length > 0) {
        if (right.length === 0 || left[0] < right[0]) {
          /* copy from left partition */
          merged.push(left.shift());
          this.partitions[indexOfLeft].deleteNext();
        } else {
          /* copy from right partition */
          merged.push(right.shift());
          this.partitions[indexOfLeft + 1].deleteNext();
        }
        this.fillTempArray(indexOfLeft, merged);
        await this.sleep();
      }
      /* Replaces the merged partitions with an array of zeroes to keep the other elements at the right index */
      this.partitions.splice(indexOfLeft, 2, [...Array(merged.length).fill(0)]);

      /* The merged array keeps the color of the left partition */
      this.colors.splice(indexOfLeft + 1, 1);

      return merged;
    },

    fillTempArray(indexOfLeft, merged) {
      /* temp is used to display the result of merging
         Padding zeroes are used to display it at the right index
         (if an element is zero, it doesn't appear visually, but takes up the same space)
      */
      this.temp.fill(0);

      let mergedStarts = 0;
      for (let i = 0; i < indexOfLeft; i++) {
        mergedStarts += this.partitions[i].length;
      }

      this.temp.splice(mergedStarts, merged.length, ...merged);
    },

    async copyBackToOriginal(startIndex, merged) {
      for (let j = 0; j < merged.length; j++) {
        this.partitions[startIndex][j] = merged[j];
        this.temp.deleteNext();
        await this.sleep();
      }
    },

    colorPartitions() {
      for (let i = 0; i < this.partitions.length; i++) {
        this.colors.push(this.getColor(i));
      }
    },

    getColor(index) {
      const step = 255 / Math.round(this.length / 3);
      const redRange = Math.round(this.length / 3);
      const greenRange = Math.round((2 * this.length) / 3);

      let color = {};

      if (index <= redRange) {
        color = {
          red: 255,
          green: step * index,
          blue: 0,
        };
      } else if (index <= greenRange) {
        color = {
          red: 0,
          green: 255,
          blue: (index - redRange) * step,
        };
      } else {
        color = {
          red: (index - greenRange) * step,
          green: 0,
          blue: 255,
        };
      }

      return `rgba(${color.red}, ${color.green}, ${color.blue}, 0.75)`;
    },
    reset() {
      this.$emit("reset");
    },
  },
};
</script>

<style scoped>
.partition {
  margin: 0 0 20px 0;
}
</style>