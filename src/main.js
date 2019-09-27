import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import { store } from "./store/index";
import App from "./App.vue";
import VueKonva from "vue-konva";
import "ant-design-vue/dist/antd.css";
import {
  DatePicker,
  Button,
  Row,
  Col,
  Checkbox,
  Drawer,
  Input,
  Table,
  Icon,
  Tabs,
  Menu,
  Avatar,
  List,
  message,
  Radio,
  Spin,
  Modal,
  Divider,
  Alert,
  Select,
  AutoComplete
} from "ant-design-vue";
Vue.use(AutoComplete);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Drawer);
Vue.use(Select);
Vue.use(Checkbox);
Vue.use(Table);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Tabs);
Vue.use(Menu);
Vue.use(List);
Vue.use(Avatar);
Vue.use(Alert);
Vue.use(Divider);
Vue.use(Modal);
Vue.use(Spin);
Vue.use(Radio);
Vue.prototype.$message = message;
Vue.use(DatePicker);
Vue.use(VueKonva);

Vue.use(VueClipboard);
Vue.config.productionTip = false;

new Vue({
  store: store,
  render: h => h(App)
}).$mount("#app");
