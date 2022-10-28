<template>
  <header class="bg-dark">
    <div class="container h-100">
      <nav class="h-100">
        <ul class="h-100 d-flex justify-content-start align-items-center p-0">
          <li>
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Add' }">Add Item</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
header {
  width: 100vw;
  height: 90px;
}

ul li {
  list-style-type: none;
  height: 100%;
}

ul li a {
  height: 100%;
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-size: 22px;
  font-weight: 600;
}

ul li:hover {
  background-color: rgb(141, 139, 139);
}
ul li:hover a {
  color: #000;
}
</style>
