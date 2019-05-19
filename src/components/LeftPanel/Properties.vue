<template>
  <div>
    <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
      <div>
        <h3>Properties</h3>
        <div style="margin-top:20px">
          <label>Title</label>
          <a-input
            :value="title"
            style="margin-top:3px; cursor:auto"
            disabled

          />
          <label>Description</label>
          <a-textarea
            :value="description"
            style="margin-top:3px; cursor:auto"
            disabled
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
    ...mapState("NewProject", {
      title: state => state.title,
      description: state => state.description,
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions("NewProject", {
      createProject: "createProject"
    }),
    ...mapMutations("NewProject", {
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

