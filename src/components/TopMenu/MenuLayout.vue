<template>
  <div class="fluent-menu" data-role="fluentmenu">
    <!-- <div style="    position: absolute;widt">
      <div style="right:0">
        Makan
      </div>
    </div>-->
    <ul class="tabs-holder">
      <li class="special" @click="openLeftPanel(true)">
        <a>File</a>
      </li>
      <li class="active">
        <a href="#tab_home">Home</a>
      </li>
      <li class>
        <a href="#tab_mailings">Edit</a>
      </li>
      <li>
        <a href="#tab_folder">Account</a>
      </li>
      <div style="width:100%;text-align: right;">
        <span style="font-size: 1.0rem;padding-top:5px; margin-right:5px">{{title}} ~ <b>{{username}}</b></span>
        <span class="mif-github fg-orange" style="font-size: 1.5rem;margin-right:10px"></span>
      </div>
    </ul>
    <div class="tabs-content">
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
                  <a href="#">Message</a>
                </li>
                <li>
                  <a href="#">Event</a>
                </li>
                <li>
                  <a href="#">Meeting</a>
                </li>
                <li>
                  <a href="#">Contact</a>
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
                <a href="#">Public</a>
              </li>
              <li>
                <a href="#">Link Only</a>
              </li>
              <li>
                <a href="#">With Password</a>
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
                <a href="#">SQL Create</a>
              </li>
              <li>
                <a href="#">Link Only</a>
              </li>
              <li>
                <a href="#">PNG</a>
              </li>
              <li>
                <a href="#">PDF</a>
              </li>
            </ul>
          </div>

          <div class="tab-group-caption">Export</div>
        </div>

        <div class="tab-panel-group">
          <div class="tab-content-segment">
            <button class="fluent-big-button" @click="openExport(true)" style="width:60px">
              <img :src="topicIcon">
              <!-- <span class="icon mif-paper-plane" style="width:50px"></span> -->
              <span class="label" style="margin-top:5px">Comment</span>
            </button>
          </div>
          <div class="tab-content-segment">
            <button class="fluent-big-button" style="width:60px">
              <img :src="helpSupport">
              <!-- <span class="icon mif-share" style="width:50px"></span> -->
              <span class="label" style="margin-top:5px">Help</span>
            </button>
          </div>

          <div class="tab-group-caption">Interaction</div>
        </div>

        <!-- <div class="tab-panel-group">
          <div class="tab-group-content">
            <div class="tab-content-segment">
               <div class="tab-content-segment active-container"> 
              <button class="fluent-button dropdown-toggle">
                <span class="mif-share on-left"></span>
                <span class="label">Share</span>
              </button>
              <ul class="d-menu" data-role="dropdown" style="display: none;">
                <li>
                  <a href="#">Public</a>
                </li>
                <li>
                  <a href="#">Link Only</a>
                </li>
                <li>
                  <a href="#">With Password</a>
                </li>
              </ul>
              <button class="fluent-button dropdown-toggle">
                <span class="mif-paper-plane on-left"></span>
                <span class="label">Export</span>
              </button>
              <ul class="d-menu" data-role="dropdown" style="display: none;">
                <li>
                  <a href="#">SQL Create</a>
                </li>
                <li>
                  <a href="#">Link Only</a>
                </li>
                <li>
                  <a href="#">PNG</a>
                </li>
                <li>
                  <a href="#">PDF</a>
                </li>
        </ul>-->
        <!-- </div> -->
        <!-- <button class="fluent-button">
                <span class="mif-loop"></span>Replay
              </button>
              <button class="fluent-button">
                <span class="mif-infinite"></span>Replay all
              </button>
              <button class="fluent-button">
                <span class="mif-loop2"></span>Forward
        </button>-->
        <!-- </div> -->
        <!-- <div class="tab-content-segment">
              <button class="fluent-tool-button">
                <img src="images/Notebook-Save.png">
              </button>
              <button class="fluent-tool-button">
                <img src="images/Folder-Rename.png">
              </button>
              <button class="fluent-tool-button">
                <img src="images/Calendar-Next.png">
              </button>
        </div>-->
        <!-- </div> -->
        <!-- <div class="tab-content-segment">
              <button class="fluent-big-button dropdown-toggle">
                <span class="icon mif-paper-plane"></span>
                <span class="label"  style="margin-top:5px">
                    Export
                </span>
              </button>
              <ul class="d-menu" data-role="dropdown">
                <li>
                  <a href="#">Message</a>
                </li>
                <li>
                  <a href="#">Event</a>
                </li>
                <li>
                  <a href="#">Meeting</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
        </div>-->

        <!-- <div class="tab-group-caption">Export</div>
        </div>-->
      </div>
      <div class="tab-panel" id="tab_folder" style="display: block;">
        <div class="tab-panel-group">
          <div class="tab-group-content">
            <div class="tab-content-segment">
              <button class="fluent-big-button" @click="logoutAccount">
                <span class="mif-cancel" style="width:50px"></span>
                <span class="label" style="margin-top:5px" >Logout</span>
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
import helpSupport from "@/assets/icons8-online-support-filled-100.png";
export default {
  computed: {
    ...mapState("diagram", {
      title: state => state.projectDescription.title,
      description: state => state.projectDescription.description
    }),
    ...mapState("Account", {
      username: state => state.username,
      accountId: state => state.id
    })
  },
  methods: {
    ...mapActions("diagram", {
      saveProject: "saveProject"
    }),
    ...mapActions("Account", {
      logoutAccount: "logoutAccount"
    }),
    ...mapMutations("ExportDesign", {
      openExport: "setVisible"
    }),
    ...mapMutations("diagram", {
      changeTablePotition: "changeTablePotition",
      highlightRelation: "highlightRelation",
      setLineStyleConnector: "setLineStyleConnector",
      addNewTable: "addNewTable",
      setHighLightRelation: "setHighLightRelation"
    }),
    ...mapMutations("LeftDialog/FileMenu/Layout", {
      openLeftPanel: "setVisible",
      setLeftPanelName:"setPanelName"
    }),
    ...mapMutations("ExportAndShare", {
      setVisibleExportAndShare: "setVisible",
      setPanelNameExportAndShare:"setPanelName"
    }),
    accountEvent(){
      this.openLeftPanel(true)
      this.setLeftPanelName('account')
    },
    saveProjectEvent(){
      if(this.accountId===null){
        message.error('You are the guest, Login first')
        this.openLeftPanel(true)
        this.setLeftPanelName('login')        
      }else if(this.title!==null){
        this.saveProject();
      }else{
        message.error('The project is empty')
      }
    },
    addNewTableEvent(){
      if(this.accountId===null){
        message.error('You are the guest, Login first')
        this.openLeftPanel(true)
        this.setLeftPanelName('login')        
      }else if(this.title!==null){
        this.addNewTable();
      }else{
        message.error('The project is empty')
      }
    },    
    openExportPanel(){
      if(this.accountId===null){
        message.error('You are the guest, Login first')
        this.openLeftPanel(true)
        this.setLeftPanelName('login')        
      }else if(this.title!==null){
        this.setVisibleExportAndShare(true);
        this.setPanelNameExportAndShare('export')
      }else{
        message.error('The project is empty')
      }
    },
    openSharePanel(){
      if(this.accountId===null){
        message.error('You are the guest, Login first')
        this.openLeftPanel(true)
        this.setLeftPanelName('login')        
      }else if(this.title!==null){
        this.setVisibleExportAndShare(true);
        this.setPanelNameExportAndShare('share')
      }else{
        message.error('The project is empty')
      }
    }
  },
  data() {
    return {
      topicIcon: topicIcon,
      helpSupport: helpSupport
    };
  }
};
</script>




