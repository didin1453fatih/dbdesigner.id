<template>
  <a-spin :indicator="indicator" :spinning="loading" type="sync" size="large" spin>
    <div>
      <h3>Open</h3>
      <a-input-search placeholder="input search text" @search="onSearch" enterButton/>
      <div  style="overflow-y: auto; height:480px; border: 1px solid #e8e8e8;padding: 4px 12px;margin-top:20px">
        <a-list itemLayout="horizontal" :dataSource="data" >
          <a-list-item @dblclick="openProjectEvent(item.id)" slot="renderItem" slot-scope="item" class="disable-select">
            <a-list-item-meta :description="fomatDate(item.created)">
              <div slot="title" style="width:100%">
                <span>
                  {{item.title}}
                </span>
                <!-- <a-icon type="delete"  style="right:0px;position: absolute;color:red;"/> -->
              </div>              
              <a-avatar shape="square" size="large" slot="avatar" :src="databaseIcon"/>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </a-spin>
</template>
<script>
import moment from "moment"
import { mapActions } from "vuex";
import { mapState } from "vuex";

import databaseIcon from "@/assets/icons8-database-40.png";
export default {
  mounted() {
    this.getData({
      keyword: ""
    });
  },
  computed: {
    ...mapState("LeftDialog/FileMenu/Component/Open", {
      data: state => state.data,
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions("LeftDialog/FileMenu/Component/Open", {
      getData: "getData"
    }),
    ...mapActions("Data/Project", {
      loadProject: "loadProject"
    }),
    openProjectEvent(id) {
      this.loadProject({
        id: id
      });
    },
    onSearch(value) {
      this.getData({
        keyword: value
      });
    },
    fomatDate(val){
        return moment(val).format('YYYY-MM-DD hh:mm:ss')
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
