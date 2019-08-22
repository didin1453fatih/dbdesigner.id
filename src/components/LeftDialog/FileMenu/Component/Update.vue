<template>
  <div>
    <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
      <div>
        <h3>Update Project</h3>
        <div style="margin-top:20px">
          <label>Title</label>
          <a-input
            :value="title"
            @change="setTitle($event.target.value)"
            style="margin-top:3px"
            placeholder
          />
          <label>Description</label>
          <a-textarea
            :value="description"
            @change="setDescription($event.target.value)"
            style="margin-top:3px"
            placeholder
          />
        </div>
        <div style="margin-top:15px;     text-align: right;">
          <a-button style="right:0" @click="updateProject">Update</a-button>
        </div>
      </div>
    </a-spin>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  mounted() {
    this.setTitle(this.oldTitle)
    this.setDescription(this.oldDescription)
  },
  computed: {
    ...mapState("UpdateProject", {
      data: state => state.data,
      loading: state => state.loading,
      title: state => state.title,
      description: state => state.description
    }),
    ...mapState("Data/Project", {
      oldTitle: state => state.projectDescription.title,
      oldDescription: state => state.projectDescription.description
    })
  },
  methods: {
    ...mapActions("UpdateProject", {
      updateProject: "updateProject"
    }),
    ...mapMutations("UpdateProject", {
      setTitle: "setTitle",
      setDescription: "setDescription"
    })
  },
  data() {
    return {
      indicator: <a-icon type="loading" spin />
    };
  }
};
</script>

