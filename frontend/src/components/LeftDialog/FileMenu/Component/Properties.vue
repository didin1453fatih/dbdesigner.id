<template>
  <div>
    <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
      <div>
        <h3>
          Properties
          <a-icon
            type="delete"
            style="right:20px;position: absolute;color:red;cursor: pointer"
            @click="deleteProject"
          />
          <!-- <a-icon type="delete"  style="margin-top:3px;margin-bottom:10px; cursor:auto;color:red;font-size:20px"/> -->
        </h3>
        <div style="margin-top:20px">
          <label>Title</label>
          <a-input
            :value="title"
            style="margin-top:3px;margin-bottom:10px; cursor:auto;color:black"
            @change="setTitle($event.target.value)"
          />
          <label>Status Share</label>
          <br />
          <a-radio-group :value="share_status" style="margin-top:5px;width:100%">
            <a-radio-button
              style="width:33%"
              align="center"
              :value="0"
              @click="changeShareStatus({
            share_status:0
          })"
            >Private</a-radio-button>
            <a-radio-button
              style="width:33%"
              align="center"
              :value="1"
              disabled
              @click="changeShareStatus({
            share_status:1
          })"
            >Protected</a-radio-button>
            <a-radio-button
              style="width:33%"
              align="center"
              :value="2"
              @click="changeShareStatus({
            share_status:2
          })"
            >Public</a-radio-button>
          </a-radio-group>
          <div style="margin-top:10px; width:100%" v-if="share_status===2">
            <label>Link</label>
            <a-input :value="share_link" style="margin-top:5px" @click="doCopy">
              <a-icon slot="addonAfter" type="copy" @click="doCopy" />
            </a-input>
          </div>
          <div style="margin-top:10px">
            <label>Description</label>
            <a-textarea
              :value="description"
              @change="setDescription($event.target.value)"
              style="margin-top:3px;margin-bottom:10px; cursor:auto;color:black"
            />
          </div>

          <div style="margin-top:15px;     text-align: right;">
            <a-button style="right:0" @click="updateProject">Update</a-button>
          </div>
          <a-divider style="background:rgb(217, 217, 217);" />
          <label>Created</label>
          <a-input
            :value="fomatDate(created)"
            style="margin-top:3px;margin-bottom:10px; cursor:auto;color:black"
            disabled
          />
          <label>Updated</label>
          <a-input
            :value="fomatDate(updated)"
            style="margin-top:3px;margin-bottom:10px; cursor:auto;color:black"
            disabled
          />
        </div>
      </div>
    </a-spin>
  </div>
</template>


<script>
import moment from "moment";
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { message } from "ant-design-vue";
export default {
  mounted() {
    this.setTitle(this.oldTitle);
    this.setDescription(this.oldDescription);
  },
  computed: {
    ...mapState("LeftDialog/FileMenu/Component/Properties", {
      data: state => state.data,
      loading: state => state.loading,
      title: state => state.title,
      description: state => state.description
    }),
    ...mapState("Data/Project", {
      oldTitle: state => state.projectDescription.title,
      oldDescription: state => state.projectDescription.description,
      likes: state => state.projectDescription.likes,
      viewers: state => state.projectDescription.viewers,
      share_status: state => state.projectDescription.share_status,
      share_link: state => state.projectDescription.share_link,
      created: state => state.projectDescription.created,
      updated: state => state.projectDescription.updated
    })
  },
  methods: {
    doCopy() {
      this.$copyText(this.share_link).then(
        // eslint-disable-next-line
        function(e) {
          message.success("Link Coppied", 2);
        },
        // eslint-disable-next-line
        function(e) {
          message.error("Coppied error", 2);
        }
      );
    },
    ...mapActions("NewProject", {
      createProject: "createProject"
    }),
    ...mapActions("LeftDialog/FileMenu/Component/Properties", {
      updateProject: "updateProject",
      deleteProject: "deleteProject",
      changeShareStatus: "changeShareStatus"
    }),
    ...mapMutations("LeftDialog/FileMenu/Component/Properties", {
      setTitle: "setTitle",
      setDescription: "setDescription"
    }),
    fomatDate(val) {
      if (val === null) {
        return "";
      }
      return moment(val).format("YYYY-MM-DD hh:mm:ss");
    }
  },
  data() {
    return {
      indicator: <a-icon type="loading" spin />
    };
  }
};
</script>
