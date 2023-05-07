<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@font-face {
  font-family: "Anita";
  src: local("Anita"),
   url(./fonts/pirulen.ttf) format("truetype");

} 

@font-face {
  font-family: "Alien";
  src: local("Alien"),
   url(./fonts/alien.ttf) format("truetype");

} 

@font-face {
  font-family: "Anita";
  src: local("Anita"),
   url(./fonts/anita.ttf) format("truetype");

} 
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #00ffff;
  font-family: Anita, Helvetica;
  
}

.el-icon-success {
  display: none !important;
}

.el-icon-close {
  display: none !important;
}



.main {
  background-image:  url('assets/hero-bg.png');
  background-blend-mode: multiply;
  /* background-color: #000; */
  background-size: cover;



}

.box0 {
padding-top: 20px;
margin-top: 10px;
padding-bottom: 20px;
border-style: solid;
border-width: 1px;
border-color: azure;
border-radius: 10px;
background: #000;
display: flex;
width: 95vw;
max-width: 720px;
margin: 0px auto 0px auto;
position: relative;
text-align: left;
box-sizing: 1px;
border: none;
border: 1px solid #00ffff;
box-shadow: 0 0 40px #00bfff6e;
}

.box1 {

  padding: 12px;
  max-width: 840px;
  height: auto;
  border-style: solid;
  border-width: 1px;
  border-color: azure;
  border-radius: 10px;
  background: #000;
  margin: 0px auto 0px auto;
  position: relative;
  text-align: left;
  box-sizing: 1px;
  border: none;
  border: 1px solid #00ffff;
  box-shadow: 0 0 40px #00bfff6e;
}


.box2 {

  padding: 12px;
  max-width: 840px;
  height: auto;
  border-style: solid;
  border-width: 1px;
  border-color: azure;
  border-radius: 10px;
  background: #000;
  margin: 0px auto 0px auto;
  position: relative;
  text-align: left;
  box-sizing: 1px;
  border: none;
  border: 1px solid #00ffff;
  box-shadow: 0 0 40px #00bfff6e;
}

@media only screen and (max-width: 560px) {
  .el-message-box {
  width: 268px;
}
.information1{
  text-align: center;
  min-height: 10vh;
  font-family: Anita;
  color: #fff;
  font-size: 18px;
}
}

.el-button {
  border-radius: 10px !important;
  font-weight: bold !important;
  font-family: Anita, Helvetica !important;
}
.el-message-box {
  border-radius: 10px !important;
  background-color: #000 !important;
  font-family: Anita, Arial, Helvetica, sans-serif !important;
}

.el-message-box__content {
  color: #00ffff !important;
  font-size: 1rem !important;
}

.el-message-box__message {
  text-align: center !important;
} 
.el-radio__input.is-checked + .el-radio__label {
  color: #00ffff !important;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #00ffff !important;
  background: #00ffff !important;
}
.el-radio__inner:hover {
  border: 1px solid #00ffff !important;
}




.aw {
  color: rgba(102, 102, 102, 1);
  font-size: 34px;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #00ffff !important;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #00ffff !important;
  background: #00ffff !important;
}
.el-radio__inner:hover {
  border: 1px solid #00ffff !important;
}
.sk {
  color: rgba(102, 102, 102, 1);
  font-size: 16px;
  font-weight: bold;
  margin-top: 30px;
}
.skbtn {
  width: 416px;
  height: 50px;
  border-radius: 4px;
  border: 1px solid #ddd;
  line-height: 50px;
  cursor: pointer;
  color: #ddd;
  text-align: center;
  font-size: 14px;
}



.bg-box {
  overflow: hidden;
  height: 188px;
  width: 100%;
}
.el-input__inner {
  background-color: #000 !important;
}

.el-select .el-input.is-focus .el-input__inner {
  border-color: #00ffff !important;
}
.el-select .el-input__inner:focus {
  border-color: #00ffff !important;
}
.el-select-dropdown__item.selected {
  color: #00ffff !important;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus {
  border-color: #00ffff !important;
}
</style>
