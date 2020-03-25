<template>
  <div>
    <information-alert />
    <warning-alert />
    <ribbon-menu />
    <canvas-layout />
    <table-detail />
    <left-panel />
    <export />
    <fork />
    <loading-global />
  </div>
</template>

<script>
import qs from "querystringify";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import LoadingGlobal from "./components/Utill/LoadingGlobal/Layout";
import RibbonMenu from "./components/TopMenu/Layout.vue";
import LeftPanel from "./components/LeftDialog/FileMenu/Layout.vue";
import Export from "./components/RightDialog/Export/Layout";
import Fork from "./components/RightDialog/Fork/Layout";
import TableDetail from "./components/RightDialog/TableDetail/Layout.vue";
import { message } from "ant-design-vue";
import InformationAlert from "./components/TopAlert/Information/Layout";
import WarningAlert from "./components/TopAlert/Warning/Layout";
import bagroundPatternImage from "@/assets/canvas-background.png";
import CanvasLayout from "./components/MainCanvas/Layout";
import Bowser from "bowser";
export default {
  components: {
    CanvasLayout,
    InformationAlert,
    WarningAlert,
    RibbonMenu,
    LeftPanel,
    Export,
    LoadingGlobal,
    TableDetail,
    Fork
  },
  methods: {
    ...mapActions("LeftDialog/FileMenu/Component/EmailConfirmation", {
      emailConfirmation: "emailConfirmation"
    }),
    ...mapMutations("LeftDialog/FileMenu/Component/EmailConfirmation", {
      SET_TOKEN_EMAIL_CONFIRMATION: "SET_TOKEN"
    }),
    ...mapMutations("LeftDialog/FileMenu/Component/ResetPassword", {
      SET_TOKEN_RESET_PASSWORD: "SET_TOKEN"
    }),
    ...mapMutations("LeftDialog/FileMenu/Layout", {
      leftPanelSetVisible: "setVisible",
      leftPanelSetPanelName: "setPanelName"
    }),
    ...mapMutations("RightDialog/Export/Component/Image", {
      SET_IMAGE_BASE_64: "SET_IMAGE_BASE_64"
    }),
    ...mapActions("Data/Project", {
      loadProject: "loadProject",
      setEmptyDiagram: "setEmptyDiagram",
      autoSave: "autoSave"
    }),
    ...mapActions("Data/Account", {
      globalReadAccount: "globalReadAccount"
    }),
    ...mapMutations("TopAlert/Warning/Layout", {
      setWarningBrowserVisible: "setVisible",
      setWarningBrowserMessage: "setMessage"
    })
  },
  created() {
    this.setEmptyDiagram();
  },
  async mounted() {
    const bagroundPattern = new window.Image();
    bagroundPattern.src = bagroundPatternImage;
    bagroundPattern.onload = () => {
      this.bagroundPattern = bagroundPattern;
    };

    const browser = Bowser.getParser(window.navigator.userAgent);
    if (
      browser
        .getBrowserName()
        .toLowerCase()
        .indexOf("chrome") < 0
    ) {
      this.setWarningBrowserMessage(
        "You detect use " +
          browser.getBrowserName() +
          "!!!  " +
          "Use Chrome browser for better experience 😃😃😃"
      );
      this.setWarningBrowserVisible(true);
    }

    var parsed = qs.parse(window.location.toString().split("?")[1]);

    if (parsed.message !== undefined) {
      if (parsed.success == "true") {
        message.success(parsed.message, 2);
      } else if (parsed.success == "false") {
        message.error(parsed.message, 2);
      }
    }

    switch (parsed.action) {
      case "reset-password":
        this.leftPanelSetVisible(true);
        this.leftPanelSetPanelName("resetPassword");
        this.SET_TOKEN_RESET_PASSWORD(parsed.token);
        break;
      case "email-confirmation":
        this.leftPanelSetVisible(true);
        this.leftPanelSetPanelName("emailConfirmation");
        this.SET_TOKEN_EMAIL_CONFIRMATION(parsed.token);
        this.emailConfirmation();
        break;
      case "open":
        this.globalReadAccount({
          uuid: parsed.uuid
        });
        this.loadProject({
          uuid: parsed.uuid
        });
        break;
      case "login":
        this.globalReadAccount({
          uuid: parsed.uuid
        });
        this.leftPanelSetVisible(true);
        this.leftPanelSetPanelName("login");
        break;
      case "re-login":
        this.leftPanelSetVisible(true);
        this.leftPanelSetPanelName("login");
        break;
      case "registration":
        this.leftPanelSetVisible(true);
        this.leftPanelSetPanelName("registration");
        break;
      case "open-project":
        this.globalReadAccount();
        this.leftPanelSetVisible(true);
        this.leftPanelSetPanelName("open");        
        break;
      case "new-project":
        this.globalReadAccount();
        this.leftPanelSetVisible(true);
        this.leftPanelSetPanelName("new");        
        break;
      default:
        this.globalReadAccount();
        break;
    }

    this.autoSave();
  },
  computed: {},
  data() {
    return {
      bagroundPattern: null,
      scaleBy: 1.01
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
