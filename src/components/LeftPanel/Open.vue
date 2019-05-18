<template>
  <div>
    <h3>Open</h3>
    <a-input-search placeholder="input search text" @search="onSearch" enterButton/>
    <a-list itemLayout="horizontal" :dataSource="data" style="margin-top:20px">
      <a-list-item @dblclick="openProjectEvent(item.id)" slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="item.created">
          <span slot="title" href="https://vue.ant.design/">{{item.title}}</span>
          <a-avatar shape="square" size="large" slot="avatar" :src="databaseIcon"/>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";

import databaseIcon from "../../assets/icons8-database-40.png";
export default {
  computed: {
    ...mapState("ListProject", {
      data: state => state.data
    })
  },
  methods: {
    ...mapActions("ListProject", {
      getData: "getData",
    }),
    ...mapActions("diagram", {
      loadProject: "loadProject"
    }),
    openProjectEvent(id) {
      // window.alert("me click");
      this.loadProject({
        id: id
      });
    },
    onSearch(value) {
      this.getData({
        keyword: value
      });
    }
  },
  data() {
    return {
      keyword: "",
      databaseIcon: databaseIcon
    };
  }
};
</script>

