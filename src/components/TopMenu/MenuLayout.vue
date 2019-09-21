<template>
  <div
    class="fluent-menu"
    data-role="fluentmenu"
    style="border-bottom: solid 1px rgb(217, 217, 217);"
  >
    <!-- <div style="    position: absolute;widt">
      <div style="right:0">
        Makan
      </div>
    </div>-->
    <div style="position: absolute;width: 100%;margin-top: 2px;">
      <span style="font-size: 0.8rem; margin-left:40%;z-index: 10">{{savedMessage}}</span>
    </div>
    <ul class="tabs-holder">
      <li class="special" @click="openLeftPanel(true)">
        <a>File</a>
      </li>
      <li class="active" @click="ribbonMenuClick(1)">
        <a href="#tab_home">Home</a>
      </li>
      <li class @click="ribbonMenuClick(2)">
        <a href="#tab_mailings">Edit</a>
      </li>
      <li @click="ribbonMenuClick(3)">
        <a href="#tab_folder">Account</a>
      </li>
      <div style=";text-align: right;">
        <span style="font-size: 1.0rem;padding-top:5px; margin-right:5px">
          {{title}} ~
          <b>{{username}}</b>
        </span>
        <span class="mif-github fg-orange" style="font-size: 1.5rem;margin-right:10px"></span>
      </div>
    </ul>
    <div class="tabs-content" v-show="visibleRibbonMenu">
      <div class="tab-panel" id="tab_home" style="display: block;">
        <div class="tab-panel-group">
          <div class="tab-group-content">
            <button class="fluent-big-button" @click="addNewTableEvent">
              <span class="icon mif-table"></span>
              <span class="label" style="margin-top:5px">New Table</span>
            </button>
            <button class="fluent-big-button" @click="saveProjectEvent">
              <span class="icon mif-sd-card" style="width:50px"></span>
              <span class="label" style="margin-top:5px">Save</span>
            </button>
            <!-- <div class="tab-content-segment">
              <button class="fluent-big-button dropdown-toggle">
                <span class="icon mif-paper-plane"></span>
                <span class="label"  style="margin-top:5px">
                    Export
                </span>
              </button>
              <ul class="d-menu" data-role="dropdown">
                <li>
                  <a >Message</a>
                </li>
                <li>
                  <a >Event</a>
                </li>
                <li>
                  <a >Meeting</a>
                </li>
                <li>
                  <a >Contact</a>
                </li>
              </ul>
            </div>-->
            <!-- <div class="tab-content-segment">
              <button class="fluent-big-button">
                <span class="icon mif-folder-sd-card"></span>
                <span class="label"  style="margin-top:5px">
                    Share
                </span>
              </button>
            </div>-->
          </div>
          <div class="tab-group-caption">Table</div>
        </div>
        <div class="tab-panel-group">
          <div class="tab-content-segment">
            <button class="fluent-big-button" @click="openExportPanel">
              <span class="icon mif-paper-plane" style="width:50px"></span>
              <span class="label" style="margin-top:5px">Export</span>
            </button>
            <ul class="d-menu" data-role="dropdown">
              <li>
                <a>Public</a>
              </li>
              <li>
                <a>Link Only</a>
              </li>
              <li>
                <a>With Password</a>
              </li>
            </ul>
          </div>
          <div class="tab-content-segment">
            <button class="fluent-big-button" @click="openSharePanel">
              <span class="icon mif-share" style="width:50px"></span>
              <span class="label" style="margin-top:5px">Share</span>
            </button>
            <ul class="d-menu" data-role="dropdown">
              <li>
                <a>SQL Create</a>
              </li>
              <li>
                <a>Link Only</a>
              </li>
              <li>
                <a>PNG</a>
              </li>
              <li>
                <a>PDF</a>
              </li>
            </ul>
          </div>

          <div class="tab-group-caption">Export</div>
        </div>

        <!-- <div class="tab-panel-group">
          <div class="tab-content-segment">
            <button class="fluent-big-button" @click="openExport(true)" style="width:60px">
              <img :src="topicIcon" />
              <span class="label" style="margin-top:5px">Comment</span>
            </button>
          </div>
          <div class="tab-content-segment">
            <button class="fluent-big-button" style="width:60px">
              <img :src="helpSupport" />
              <span class="label" style="margin-top:5px">Help</span>
            </button>
          </div>

          <div class="tab-group-caption">Interaction</div>
        </div>-->

        <div class="tab-panel-group">
          <div class="tab-group-content">
            <div class="tab-content-segment" style="width: 75px;">
              <button class="fluent-button" style="width:100%" @click="widthClick">
                <span class="mif-flow-line" style="font-size: 15px;"></span>
                <a-input
                  v-if="pageEditable===0"
                  ref="widthEdit"
                  style="font-size: 11px;
                        height: 20px;
                        border-radius: 0px;
                        width: 40px;
                        padding: 3px;
                        border-color: rgb(217, 217, 217);
                        box-shadow: none;"
                  @blur="pageEditable=-1"
                />
                <span v-if="pageEditable!==0" class="label">90 px</span>
              </button>
              <button class="fluent-button" style="width:100%" @click="heightClick">
                <span
                  class="mif-flow-line"
                  style="
                  -webkit-transform: rotate(90deg);
                  -moz-transform: rotate(90deg);
                  -o-transform: rotate(90deg);
                  -ms-transform: rotate(90deg);
                  transform: rotate(90deg);
                  font-size: 15px;"
                ></span>
                <a-input
                  @blur="pageEditable=-1"
                  v-if="pageEditable===1"
                  ref="heightEdit"
                  style="font-size: 11px;
                        height: 20px;
                        border-radius: 0px;
                        width: 40px;
                        padding: 3px;
                        border-color: rgb(217, 217, 217);
                        box-shadow: none;"
                />
                <span v-if="pageEditable!==1" class="label">90 px</span>
              </button>
              <div class="tab-content-segment" style="width:100%">
                <button
                  class="fluent-button dropdown-toggle dropdown-toggle-none-icon"
                  style="width:100%;padding-right: 0px;"
                >
                  <span class="mif-search on-left"></span>
                  <a-input
                    ref="heightEdit"
                    style="font-size: 11px;
                        height: 20px;
                        border-radius: 0px;
                        width: 40px;
                        padding: 3px;
                        border-color: rgb(217, 217, 217);
                        box-shadow: none;"
                  />
                </button>
                <ul class="d-menu" data-role="dropdown" style="display: none;width:78px">
                  <li style="width:70px !important" @click="onZoom(0.25)">
                    <a style=";width:78px  !important;  min-width: 0rem;">25%</a>
                  </li>
                  <li style=";width:70px" @click="onZoom(0.5)">
                    <a style=";width:78px  !important;  min-width: 0rem;">50%</a>
                  </li>
                  <li style=";width:70px" @click="onZoom(0.75)">
                    <a style=";width:78px  !important;  min-width: 0rem;">75%</a>
                  </li>
                  <li style=";width:70px" @click="onZoom(1)">
                    <a style=";width:78px  !important;  min-width: 0rem;">100%</a>
                  </li>
                  <li style=";width:70px" @click="onZoom(1.25)">
                    <a style=";width:78px  !important;  min-width: 0rem;">125%</a>
                  </li>                  
                  <li style=";width:70px" @click="onZoom(2)">
                    <a style=";width:78px  !important;  min-width: 0rem;">200%</a>
                  </li>                  
                </ul>
              </div>
              <!-- <button class="fluent-button">
                <span class="mif-loop2"></span>Forward
              </button>-->
            </div>
            <div class="tab-content-segment">
              <button class="fluent-tool-button" style="font-size: 25px;margin-top:3px">
                <!-- <span class="mif-table on-left" style="font-size: 20px;"></span> -->
                <img :src="gridIcon" />
              </button>
              <button class="fluent-tool-button" style="font-size: 25px;margin-top:0px">
                <!-- <span class="mif-table on-left" style="font-size: 20px;"></span> -->
                <img :src="targetingFocusImage" />
              </button>
              <!-- <button class="fluent-tool-button">
                <img src="images/Folder-Rename.png" />
              </button>
              <button class="fluent-tool-button">
                <img src="images/Calendar-Next.png" />
              </button>-->
            </div>
          </div>
          <div class="tab-group-caption">Page</div>
        </div>
        <!-- <div class="tab-panel-group">
          <div class="tab-group-content">
            <div class="input-control text">
              <input type="text" />
              <button class="button">
                <span class="mif-search"></span>
              </button>
            </div>
            <button class="fluent-button">
              <span class="icon-book on-left"></span>Address Book
            </button>
            <div class="tab-content-segment">
              <button class="fluent-button dropdown-toggle">
                <span class="mif-filter on-left"></span>
                <span class="label">Mail Filters</span>
              </button>
              <ul class="d-menu" data-role="dropdown" style="display: none;">
                <li>
                  <a>Unread messages</a>
                </li>
                <li>
                  <a>Has attachments</a>
                </li>
                <li class="divider"></li>
                <li>
                  <a>Important</a>
                </li>
                <li>
                  <a>Broken</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="tab-group-caption">Search</div>
        </div>-->
      </div>
      <div class="tab-panel" id="tab_folder" style="display: block;">
        <div class="tab-panel-group">
          <div class="tab-group-content">
            <div class="tab-content-segment">
              <button class="fluent-big-button" @click="logoutAccount">
                <span class="mif-cancel" style="width:50px"></span>
                <span class="label" style="margin-top:5px">Logout</span>
              </button>
            </div>
            <div class="tab-content-segment">
              <button class="fluent-big-button" @click="accountEvent">
                <span class="mif-user" style="width:50px"></span>
                <span class="label" style="margin-top:5px">Account</span>
              </button>
            </div>
          </div>
          <div class="tab-group-caption">Account</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import { mapState } from "vuex";
import topicIcon from "@/assets/icons8-topic-96.png";
import targetingFocusImage from "@/assets/square-targeting-focus.png";
import gridIcon from "@/assets/grid-icon.png";
import helpSupport from "@/assets/icons8-online-support-filled-100.png";
import { EventBus } from "@/helper/EventBus";
export default {
  computed: {
    ...mapState("Data/Project", {
      title: state => state.projectDescription.title,
      description: state => state.projectDescription.description,
      savedMessage: state => state.savedMessage
    }),
    ...mapState("Data/Account", {
      username: state => state.username,
      accountId: state => state.id
    })
  },
  methods: {
    heightClick() {
      this.pageEditable = 1;
      setTimeout(() => {
        this.$refs.heightEdit.focus();
      }, 500);
    },
    widthClick() {
      this.pageEditable = 0;
      setTimeout(() => {
        this.$refs.widthEdit.focus();
      }, 500);
    },
    onZoom(value) {
      EventBus.$emit("Canvas/scale", {
        x: value,
        y: value
      });
    },
    ...mapActions("Data/Project", {
      saveProject: "saveProject"
    }),
    ...mapActions("LeftDialog/FileMenu/Layout", {
      logoutAccount: "logoutAccount"
    }),
    ...mapMutations("ExportDesign", {
      openExport: "setVisible"
    }),
    ...mapMutations("Data/Project", {
      changeTablePotition: "changeTablePotition",
      highlightRelation: "highlightRelation",
      setLineStyleConnector: "setLineStyleConnector",
      addNewTable: "addNewTable",
      setHighLightRelation: "setHighLightRelation"
    }),
    ...mapMutations("LeftDialog/FileMenu/Layout", {
      openLeftPanel: "setVisible",
      setLeftPanelName: "setPanelName"
    }),
    ...mapMutations("RightDialog/Export/Layout", {
      setVisibleExportAndShare: "setVisible",
      setPanelNameExportAndShare: "setPanelName"
    }),
    accountEvent() {
      this.openLeftPanel(true);
      this.setLeftPanelName("account");
    },
    saveProjectEvent() {
      if (this.accountId === null) {
        message.error("You are the guest, Login first");
        this.openLeftPanel(true);
        this.setLeftPanelName("login");
      } else if (this.title !== null) {
        this.saveProject();
      } else {
        message.error("The project is empty");
      }
    },
    addNewTableEvent() {
      if (this.accountId === null) {
        message.error("You are the guest, Login first");
        this.openLeftPanel(true);
        this.setLeftPanelName("login");
      } else if (this.title !== null) {
        this.addNewTable();
      } else {
        message.error("The project is empty");
      }
    },
    openExportPanel() {
      if (this.accountId === null) {
        message.error("You are the guest, Login first");
        this.openLeftPanel(true);
        this.setLeftPanelName("login");
      } else if (this.title !== null) {
        this.setVisibleExportAndShare(true);
        this.setPanelNameExportAndShare("sql");
      } else {
        message.error("The project is empty");
      }
    },
    openSharePanel() {
      if (this.accountId === null) {
        message.error("You are the guest, Login first");
        this.openLeftPanel(true);
        this.setLeftPanelName("login");
      } else if (this.title !== null) {
        this.setVisibleExportAndShare(true);
        this.setPanelNameExportAndShare("share");
      } else {
        message.error("The project is empty");
      }
    },
    ribbonMenuClick(value) {
      if (value == this.numberRibbonMenu) {
        this.visibleRibbonMenu = !this.visibleRibbonMenu;
      } else {
        this.visibleRibbonMenu = true;
        this.numberRibbonMenu = value;
      }
    }
  },
  data() {
    return {
      visibleRibbonMenu: true,
      numberRibbonMenu: 0,
      pageEditable: -1,
      topicIcon: topicIcon,
      gridIcon: gridIcon,
      targetingFocusImage: targetingFocusImage,
      helpSupport: helpSupport
    };
  }
};
</script>




<style scoped>
.dropdown-toggle-none-icon:before {
  display: none !important;
}
</style>