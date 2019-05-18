import Vue from "vue";
import App from "./App.vue";
import VueKonva from "vue-konva";
import "ant-design-vue/dist/antd.css";
import { DatePicker } from "ant-design-vue";
import { Button } from "ant-design-vue";
Vue.use(Button);
import { Row } from "ant-design-vue";
Vue.use(Row);
import { Col } from "ant-design-vue";
Vue.use(Col);
import { Drawer } from "ant-design-vue";
Vue.use(Drawer);
import { Select } from "ant-design-vue";
Vue.use(Select);
import { Checkbox } from "ant-design-vue";
Vue.use(Checkbox);
import { Table } from "ant-design-vue";
Vue.use(Table);
import { Input } from "ant-design-vue";
Vue.use(Input);
import { Icon } from "ant-design-vue";
Vue.use(Icon);

import { Tabs } from "ant-design-vue";
Vue.use(Tabs);

import { Menu } from "ant-design-vue";
Vue.use(Menu);

import { List } from "ant-design-vue";
Vue.use(List);
import { Avatar } from "ant-design-vue";
Vue.use(Avatar);
import { message, Radio, Spin } from "ant-design-vue";
Vue.use(Spin);
Vue.use(Radio);
Vue.prototype.$message = message;
Vue.use(DatePicker);
Vue.use(VueKonva);
import { store } from "./store/index";

Vue.config.productionTip = false;

new Vue({
  store: store,
  render: h => h(App)
}).$mount("#app");
