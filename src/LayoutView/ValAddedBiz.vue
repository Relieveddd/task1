<template>
  <!-- Header Start -->
  <div class="proc-unit-top-navi-3r auxi-width-3r">
    <div class="inner-bar-3r auxi-width-3t">
      <div class="inner-link-3r proc-unit-char-04">
        <a href="http://www.yzftx.cn">加盟合作</a>
        <a href="/CompanyNews">企业新闻</a>
        <a href="/AboutUs/tousujianyi">投诉建议</a>
        <a href="javascript:;">免费报价</a>
      </div>
    </div>
  </div>
  <div class="proc-unit-main-navi-3r auxi-width-3r">
    <div class="inner-bar-3r auxi-width-3t">
      <div class="inner-logo-3r">
        <a href="/" title="猫老爷装饰"> <img src="/Pict/ValAddedBiz/Logo.jpeg" alt="猫老爷装饰" /></a>
      </div>
      <ul class="inner-navi-3r proc-unit-char">
        <li class="inner-active-3r">
          <div><router-link to="/">首页</router-link></div>
        </li>
        <li class="">
          <div><a>装修服务</a></div>
        </li>
        <li class="">
          <div><a>品质保障</a></div>
        </li>
        <li class="">
          <div><router-link to="/ValAddedBiz/PagingListPict">精英团队</router-link></div>
        </li>
        <li class="">
          <div><a href="/ResidentialCase/city0_style0_type0_area0" target="_blank">装修案例</a></div>
        </li>
        <li class="">
          <div><a href="/Fabricatingyard/city0_process0" target="_blank">装修现场</a></div>
        </li>
        <li class="">
          <div><a target="_blank" href="http://sjal.yzf.com.cn">实景案例库</a></div>
        </li>
        <li class="">
          <div><a>了解猫老爷</a></div>
        </li>
      </ul>
    </div>
  </div>
  <!-- Header End -->
  <!-- Dynamic Content Start -->
  <router-view />
  <!-- Dynamic Content End -->
  <!-- Footer Start -->
  <div class="proc-unit-bottom-navi-3r auxi-width-3r">
    <div class="inner-box-3r auxi-width-3t"></div>
  </div>
  <div class="proc-unit-copyright-3r auxi-width-3r">
    <div class="inner-box-3r auxi-width-3t"></div>
  </div>
  <!-- Footer End -->
</template>

<script setup>
</script>

<style>
@import "@/VisualConfig/CSS/ValAddedBiz/Schema.css";
</style>
