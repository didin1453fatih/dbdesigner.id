<template>
  <a-drawer
    placement="right"
    :width="480"
    :closable="false"
    @close="SET_VISIBLE(false)"
    :visible="visible"
  >
    <div
      style="width: -webkit-fill-available;
         height: -webkit-fill-available;margin:-24px"
    >
      <table style="width: -webkit-fill-available;
         height: 100vh">
        <tr>
          <td style="background-color:#2B569A;width: 100px;vertical-align:top">
            <div style="padding-top:10px;height:-webkit-fill-available;;">
              <div
                style="width:100%; padding-left:13px;padding-top:3px; padding-bottom:3px; "
                @click="closeFilePanel"
              >
                <img src="../../../assets/icons8-go-back-50.png" width="35px" />
              </div>
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ; margin-top:10px;"
                @click="SET_STEP('info')"
              >
                <label style="color:white">Info</label>
              </div>
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="SET_STEP('evaluate')"
              >
                <label style="color:white">Evaluate</label>
              </div>
              <div
                style="width:100%;font-weight: 300; padding-left:13px;padding-top:3px; padding-bottom:3px ;"
                @click="SET_STEP('execute')"
              >
                <label style="color:white">Execute</label>
              </div>
            </div>
          </td>
          <td style="background-color:#F1F1F1;vertical-align:top">
            <div style="padding-top:20px; padding-left:25px; width:90%" class="fg-black">
              <div v-if="step==='info'">
                <a-spin
                  :indicator="indicator"
                  :spinning="loading_read_info"
                  type="sync"
                  size="large"
                  spin
                >
                  <h3>Fork Info</h3>
                  <div style="margin-top:20px">
                    <label>Title</label>
                    <a-input
                      :value="origin_title"
                      style="margin-top:3px;margin-bottom:7px; cursor:auto;color:black"
                      disabled
                    />
                    <label>Owner</label>
                    <a-input
                      :value="origin_owner"
                      style="margin-top:3px;margin-bottom:7px; cursor:auto;color:black"
                      disabled
                    />
                    <label>Share</label>
                    <a-input
                      :value="origin_share_status"
                      style="margin-top:3px;margin-bottom:7px; cursor:auto;color:black"
                      disabled
                    />
                    <label>Description</label>
                    <a-textarea
                      :value="origin_description"
                      style="margin-top:3px;cursor:auto;color:black"
                      disabled
                    />
                  </div>

                  <div style="margin-top:30px;     text-align: right;">
                    <a-button style="right:0px" @click="stepEvent('evaluate')">Next</a-button>
                  </div>
                </a-spin>
              </div>
              <div v-if="step==='evaluate'">
                <h3>Fork Evaluate</h3>
                <div style="margin-top:20px">
                  <label>Title</label>
                  <a-input
                    @change="SET_FORKER_TITLE($event.target.value)"
                    :value="forker_title"
                    style="margin-top:3px;margin-bottom:7px"
                  />
                  <label>Origin Owner</label>
                  <a-input
                    :value="origin_owner"
                    style="margin-top:3px;margin-bottom:7px; cursor:auto;color:black"
                    disabled
                  />
                  <label>Forker Owner</label>
                  <a-input
                    :value="forker_owner"
                    style="margin-top:3px;margin-bottom:7px; cursor:auto;color:black"
                    disabled
                  />
                  <label>Share</label>
                  <br />
                  <a-select
                    :defaultValue="forker_share_status"
                    style="margin-top:3px;margin-bottom:7px; width:100px"
                    @change="SET_FORKER_SHARE_STATUS"
                  >
                    <a-select-option :value="0">Private</a-select-option>
                    <a-select-option :value="2">Public</a-select-option>
                  </a-select>
                  <br />
                  <!-- <a-input
                    @change="SET_FORKER_SHARE_STATUS($event.target.value)"
                    :value="forker_share_status"
                    style="margin-top:3px;margin-bottom:7px"
                  />-->
                  <label>Description</label>
                  <a-textarea
                    @change="SET_FORKER_DESCRIPTION($event.target.value)"
                    rows="7"
                    :value="forker_description"
                    style="margin-top:3px"
                  />
                </div>

                <div style="margin-top:30px;     text-align: right;">
                  <a-button @click="stepEvent('info')">Back</a-button>
                  <a-button style="right:0px" @click="stepEvent('execute')">Next</a-button>
                </div>
              </div>
              <div v-if="step==='execute'">
                <a-spin
                  :indicator="indicator"
                  :spinning="loading_execute"
                  type="sync"
                  size="large"
                  spin
                >
                  <h3>Fork {{loading_execute===true?'Executing':'Finished'}}</h3>
                  <div style="margin-top:52px;margin-bottom:52px;right:0;align:right">
                    {{emote}}
                    <div v-show="this.loading_execute==false">
                      Design forked ✔
                      Design loaded in canvas ✔
                    </div>
                  </div>
                  <div style="margin-top:30px;     text-align: right;">
                    <a-button style="right:0px" @click="SET_VISIBLE(false)">Close</a-button>
                  </div>
                </a-spin>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </a-drawer>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations, mapActions } from "vuex";

export default {
  methods: {
    ...mapMutations("RightDialog/Fork/Layout", {
      SET_VISIBLE: "SET_VISIBLE",
      SET_STEP: "SET_STEP",
      SET_FORKER_TITLE: "SET_FORKER_TITLE",
      SET_FORKER_SHARE_STATUS: "SET_FORKER_SHARE_STATUS",
      SET_FORKER_DESCRIPTION: "SET_FORKER_DESCRIPTION"
    }),
    closeFilePanel() {
      this.SET_VISIBLE(false);
    },
    ...mapActions("RightDialog/Fork/Layout", {
      readOriginInfo: "readOriginInfo",
      execute: "execute"
    }),
    stepEvent(value) {
      this.SET_STEP(value);
      if (value === "execute") {
        this.emote = "";
        var emoteTemplete = [
          "😁",
          "😃",
          "😄",
          "😁",
          "😆",
          "️😊",
          "🙂",
          "🙃",
          "😁",
          "🤨",
          "😏",
          "😘",
          "😏",
          "😬",
          "😯",
          "👍"
        ];
        this.execute();
        var inter = setInterval(() => {
          this.emote += emoteTemplete[parseInt(Math.random() * 16)];
          if (this.loading_execute === false) {
            clearInterval(inter);
            var count = 0;
            var interDot = setInterval(() => {
              if (count++ <= 3) {
                this.emote += ". ";
              } else if (count >= 4) {
                this.emote += " Finish ✔";
                clearInterval(interDot);
              }
            }, 300);
          }
        }, 500);
      }
    }
  },
  components: {},
  computed: {
    ...mapState("RightDialog/Fork/Layout", {
      visible: state => state.visible,
      step: state => state.step,
      origin_title: state => state.origin_title,
      origin_owner: state => state.origin_owner,
      origin_share_status: state => state.origin_share_status,
      origin_description: state => state.origin_description,
      forker_title: state => state.forker_title,
      forker_share_status: state => state.forker_share_status,
      forker_description: state => state.forker_description,
      loading_read_info: state => state.loading_read_info,
      loading_execute: state => state.loading_execute
    }),
    ...mapState("Data/Account", {
      forker_owner: state => state.username
    })
  },
  data() {
    return {
      emote: "",
      indicator: <a-icon type="loading" spin />
    };
  }
};
</script>

<style scoped>
</style>
