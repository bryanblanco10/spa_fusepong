<template>
  <div>
    <Header />
    <Sidebar />
    <div class="content__admin">
			<router-view></router-view>
		</div>
  </div>
</template>

<script>
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

export default {
  name: "Layout",
  components: {
    Sidebar,
    Header
  }
}
</script>

<style>

</style>