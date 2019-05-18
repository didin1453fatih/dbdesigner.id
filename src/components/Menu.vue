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
        <span
          style="font-size: 1.0rem;padding-top:5px; margin-right:15px"
        >~ Pemeriksaan Labolatorium</span>
        <span class="mif-github fg-orange" style="font-size: 1.5rem;margin-right:10px"></span>
      </div>
    </ul>
    <div class="tabs-content">
      <div class="tab-panel" id="tab_home" style="display: block;">
        <div class="tab-panel-group">
          <div class="tab-group-content">
            <button class="fluent-big-button" @click="addNewTable">
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
            <button class="fluent-big-button" @click="openExport(true)">
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
            <button class="fluent-big-button">
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
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("diagram", {
      saveProjectEvent: "saveProject"
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
    ...mapMutations("LeftPanel", {
      openLeftPanel: "setVisible"
    })
  }
};
</script>




