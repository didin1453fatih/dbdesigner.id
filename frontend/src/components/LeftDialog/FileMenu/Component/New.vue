<template>
  <div>
    <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
      <div>
        <h3>New Project</h3>
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
          <a-button style="right:0" @click="createProject">Create</a-button>
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
  computed: {    
    ...mapState("LeftDialog/FileMenu/Component/NewProject", {
      title: state => state.title,
      description: state => state.description,
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions("LeftDialog/FileMenu/Component/NewProject", {
      createProject: "createProject"
    }),
    ...mapMutations("LeftDialog/FileMenu/Component/NewProject", {
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

