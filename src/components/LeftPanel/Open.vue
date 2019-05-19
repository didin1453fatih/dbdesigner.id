<template>
  <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
    <div>
      <h3>Open</h3>
      <a-input-search placeholder="input search text" @search="onSearch" enterButton/>
      <div s style="overflow-y: auto; height:480px; border: 1px solid #e8e8e8;padding: 4px 12px;margin-top:20px">
        <a-list itemLayout="horizontal" :dataSource="data" >
          <a-list-item @dblclick="openProjectEvent(item.id)" slot="renderItem" slot-scope="item" class="disable-select">
            <a-list-item-meta :description="item.created">
              <span slot="title" href="https://vue.ant.design/">{{item.title}}</span>
              <a-avatar shape="square" size="large" slot="avatar" :src="databaseIcon"/>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </a-spin>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";

import databaseIcon from "../../assets/icons8-database-40.png";
export default {
  mounted() {
    this.getData({
      keyword: ""
    });
  },
  computed: {
    ...mapState("ListProject", {
      data: state => state.data,
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions("ListProject", {
      getData: "getData"
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
      indicator: <a-icon type="loading" spin />,
      keyword: "",
      databaseIcon: databaseIcon
    };
  }
};
</script>

<style>
.disable-select {
    user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
   cursor: pointer;
}
</style>
