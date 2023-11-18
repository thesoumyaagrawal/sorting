<template>
    <div>
      <Header
        :array="array"
        :started="started"
        @sort="quickSort"
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
    let sorted = Array(array.length).fill(0);
  
    return {
      array: array,
      sorted: sorted,
      sortedCount: 0,
      sortedIndex: -1,
      pivot: -1,
      active: -1,
      started: false,
    };
  };
  
  export default {
    name: "quick-sort",
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
        this.sorted = Array(this.array.length).fill(0);
      },
  
      getClassName(_, index) {
        let className = "col ";
  
        if (this.pivot === index) {
          return className + "current";
        }
  
        if (index <= this.sortedIndex - 1 && index > this.pivot) {
          return className + "smaller";
        }
  
        if (index <= this.active && index > this.pivot) {
          return className + "active";
        }
  
        if (this.sorted[index] === 1) {
          return className + "done";
        }
  
        return className;
      },
  
      swap(x, y) {
        [this.array[x], this.array[y]] = [this.array[y], this.array[x]];
      },
  
      async quickSort() {
        this.started = true;
        var array = this.array;
  
        while (this.sortedCount !== array.length) {
          /* the first unsorted element (denoted with 0) will be the pivot */
          this.pivot = this.sorted.findIndex((element) => element === 0);
          this.sortedIndex = this.pivot + 1;
  
          for (let j = this.sortedIndex; this.sorted[j] === 0; j++) {
            await this.sleep();
            this.active = j;
  
            if (array[j] < array[this.pivot]) {
              this.swap(j, this.sortedIndex++);
            }
          }
  
          await this.sleep();
  
          this.swap(this.pivot, this.sortedIndex - 1);
          this.pivot = this.sortedIndex - 1;
          this.sorted[this.pivot] = 1;
          this.active = -1;
          this.sortedIndex = -1;
          this.sortedCount++;
  
          await this.sleep();
        }
  
        this.sorted = Array(this.array.length).fill(0);
        this.sortedCount = 0;
        this.pivot = -1;
        this.active = -1;
        this.started = false;
      },
      reset() {
        this.$emit("reset");
      },
    },
  };
  </script>