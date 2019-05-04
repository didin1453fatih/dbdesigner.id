<template>
  <div>
    <h3>Open</h3>
    <a-input-search placeholder="input search text" @search="onSearch" enterButton/>
    <a-list itemLayout="horizontal" :dataSource="data" style="margin-top:20px">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta description="Created 12-12-2019">
          <span slot="title" href="https://vue.ant.design/">{{item.title}}</span>
          <a-avatar shape="square" size="large" slot="avatar" :src="databaseIcon"/>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];
import databaseIcon from "../../assets/icons8-database-40.png";
export default {
  methods: {
    onSearch() {}
  },
  data() {
    return {
      data,
      databaseIcon: databaseIcon
    };
  }
};
</script>

