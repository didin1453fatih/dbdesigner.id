<template>
  <div style=" padding-top:40px; background:#F1F1F1">
    <div style="padding-left:100px;">
      <h2 style="font-weight:400;margin-bottom:5px;color:#444444">Dbdesigner.id</h2>
      <h3 style="font-weight:300;margin-bottom:0;color:#444444">
        Joy your design
        <h5 style="display: inline-block">😎😎😎</h5>
      </h3>
    </div>
    <a-row>
      <a-col :span="8" style="padding-left:100px;">
        <div class="help">
          <label class="help-text">Recent</label>
          <a>Design Smart City</a>
          <a>On Page repot</a>
          <a>Law of theor</a>
          <a>More..</a>
        </div>

        <div class="help">
          <label class="help-text">Help</label>
          <a>Start design</a>
          <a>Github Repository</a>
          <a>Inroduction Video</a>
        </div>
      </a-col>
      <a-col :span="16">
        <div class="help">
          <label class="help-text">New Feature</label>
          <a>Change order of field</a>
          <a>Change color</a>
          <a>More..</a>
        </div>

        <div class="help">
          <label class="help-text">News</label>
          <a>Got 10 star in github</a>
          <a>Google link in google.com</a>
          <a>Inroduction Video</a>
          <a>More..</a>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {};
</script>

<style>
.help {
  margin-top: 40px;
}
.help a {
  display: block;
}
.help-text {
  display: block;
  padding-bottom: 5px;
  font-size: 20px;
}
</style>

