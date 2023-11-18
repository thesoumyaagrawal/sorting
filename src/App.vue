<template>
  <div>
    <Navbar />
    <div id="content">
      <router-view :key="key" :sleep="sleep" @reset="handleReset" />
    </div>
    <Footer @speedChanged="changeSpeed">
      </Footer>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "app",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      animationSpeed: 500,
      key: 0,
    };
  },
  methods: {
    sleep() {
      return new Promise((resolve) =>
        setTimeout(resolve, 900 - this.animationSpeed)
      );
    },

    changeSpeed(value) {
      this.animationSpeed = value;
    },

    handleReset() {
      this.key++;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#content {
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: calc(100vh - 90px);
}

.array {
  min-height: 250px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 0 10px 20px 10px;
}
</style>
