<template>
  <div>
    <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
      <div>
        <h3>New Project</h3>
        <div style="margin-top:20px">
          <label>Title</label>
          <a-input v-model="title" style="margin-top:3px" placeholder/>
          <label>Description</label>
          <a-textarea v-model="description" style="margin-top:3px" placeholder/>
        </div>
        <div style="margin-top:15px;     text-align: right;">
          <a-button style="right:0" @click="onCreateEvent">Create</a-button>
        </div>
      </div>
    </a-spin>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("NewProject", {
      data: state => state.data,
      loading : state => state.loading
    })
  },
  methods: {
    ...mapActions("NewProject", {
      createProject: "createProject"
    }),
    onCreateEvent() {
      this.createProject({
        title: this.title,
        description: this.description
      });
    }
  },
  data() {
    return {
      indicator: <a-icon type="loading" spin />,
      title: "",
      description: ""
    };
  }
};
</script>

