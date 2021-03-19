<template>
  <div class="body">
    <div class="navbar">
      <input type="checkbox">
      <span></span>
      <span></span>
      <ul>
        <li><a href="javascript:void (0)">
          <router-link to="/">Home</router-link>
        </a></li>
        <li><a href="javascript:void (0)">
          <router-link to="/about">About</router-link>
        </a></li>
        <li><a href="javascript:void (0)">
          <router-link to="/test">test</router-link>
        </a></li>
        <li><a href="javascript:void (0)">
          <router-link to="/echarts">echarts</router-link>
        </a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'

export default {
  name: "header",
  data() {
    return {}
  },
  mounted() {
  },
  created() {
  },
  methods: {}
}
</script>

<style scoped>

.body {
  display: flex;
  justify-content: center;
  align-items: center;

}

.body, .navbar, .navbar ul {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar {
  width: 100%;
  position: relative;
  padding: 20px;
  border-radius: 50px;
  background: linear-gradient(#231002, #3d0c2d);
}

.navbar input {
  width: 40px;
  height: 40px;
  opacity: 0;
}

/*//收缩情况下的两条横线*/
.navbar span {
  position: absolute;
  left: 25px;
  top: calc(50% - 10px);
  width: 30px;
  height: 4px;
  border-radius: 15px;
  background-color: #631313;
  pointer-events: none;
  transition: transform 0.3s ease-in-out, top 0.3s ease-in-out 0.3s;
}

.navbar span:nth-child(3) {
  top: calc(50% + 6px);
  background-color: #ec72fa;
}

.navbar ul {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.5s;
}

.navbar ul li {
  list-style: none;
  margin: 0 5px;
}

.navbar ul li a {
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.navbar ul li a:hover {
  color: #fb7299;
}

.navbar input:checked ~ ul {
  width: 250px;
}

.navbar input:checked ~ span:nth-child(2) {
  top: calc(50% - 2px);
  transform: rotate(-45deg);
  background-color: #fb7299;
  cursor: pointer;
  transition: top 0.3s ease-in-out, transform 0.3s ease-in-out 0.3s;
}

.navbar input:checked ~ span:nth-child(3) {
  top: calc(50% - 2px);
  transform: rotate(45deg);
  background-color: #fb7299;
  cursor: pointer;
  transition: top 0.3s ease-in-out, transform 0.3s ease-in-out 0.3s;
}
</style>
