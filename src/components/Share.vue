<template>
  <div style="padding-right:30px">
    <h3>Share</h3>
    <div style="margin-top:20px">
      <label>Link</label>
      <br>
      <a-input defaultValue="http://halo.fun/asdwoksk" style="margin-top:5px">
        <a-icon slot="addonAfter" type="copy"/>
      </a-input>
    </div>
    <div style="margin-top:20px">
      <label>Password</label>
      <br>
      <a-input placeholder="Input Password" style="margin-top:5px"/>
    </div>

    <div style="margin-top:30px;     text-align: right;">
      <a-button style="right:0px">Share</a-button>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    onChangeTo() {},
    onChangeDatabase() {},
    onChangeScript() {},
    closeFilePanel() {}
  }
};
</script>

<style>
</style>

