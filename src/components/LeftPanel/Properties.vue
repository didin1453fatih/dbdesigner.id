<template>
  <div>
      <div>
        <h3>Properties</h3>
        <div style="margin-top:20px">
          <label>Title</label>
          <a-input
            :value="title"
            style="margin-top:3px;margin-bottom:10px; cursor:auto;color:black"
            disabled

          />
          <!-- <label>Likes</label>
          <a-input
            :value="likes"
            style="margin-top:3px;margin-bottom:10px; cursor:auto;color:black"
            disabled

          />        
          <label>Viewers</label>
          <a-input
            :value="viewers"
            style="margin-top:3px;margin-bottom:10px; cursor:auto;color:black"
            disabled
          />                     -->
          <label>Status Share</label>
          <a-input
            :value="status_share"
            style="margin-top:3px;margin-bottom:10px; cursor:auto;color:black"
            disabled
          />                              
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
          <label>Description</label>
          <a-textarea
            :value="description"
            style="margin-top:3px;margin-bottom:10px; cursor:auto;color:black"
            disabled
          />
        </div>
      </div>
  </div>
</template>


<script>
import moment from "moment"
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("diagram", {
      title: state => state.projectDescription.title,
      description: state => state.projectDescription.description,
      likes: state => state.projectDescription.likes,
      viewers: state => state.projectDescription.viewers,
      status_share: state => state.projectDescription.status_share,
      created: state => state.projectDescription.created,
      updated: state => state.projectDescription.updated,
    })
  },
  methods: {
    ...mapActions("NewProject", {
      createProject: "createProject"
    }),
    ...mapMutations("NewProject", {
      setTitle: "setTitle",
      setDescription: "setDescription"
    }),
    fomatDate(val){
        return moment(val).format('YYYY-MM-DD hh:mm:ss')
    }
  },
  data() {
    return {
      indicator: <a-icon type="loading" spin />
    };
  }
};
</script>

