<template>
  <footer class="footer">
    <div class="container-fluid d-flex flex-wrap justify-content-between">
      <nav>
        <ul class="footer-menu">
         
        </ul>
      </nav>
      <div class="copyright">
        &copy; {{year}}, Desenvolvedores: João Queroga, Fabio Michel
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style>
</style>
