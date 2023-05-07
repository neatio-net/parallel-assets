<template>
  <div class="footer-panel">
    <div class="footer-box">
      <div class="t-and-c">
        <a
          href="https://neatio.net/pages/terms.html"
          target="_blank"
          rel="noopener"
          ><span style="color: #ddd">Terms</span></a
        >
        © 2023 Neatio
      </div>

      <div class="contact"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterPanel",
};
</script>

<style lang="scss">
.footer-panel {
  height: auto;
  color: #fff;
  background-color: #000000;
  position: relative;
  border-top: #00ffff solid 1px;
}
.footer-box {
  width: auto;
  justify-content: center;
  margin: 0 auto;
}

.t-and-c {
  text-align: left;
  display: inline-block;
  margin: 5px;
  color: #ddd;
}
</style>

