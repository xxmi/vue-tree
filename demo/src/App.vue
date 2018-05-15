<template>
  <div id="app">
    <v-tree ref="tree" :data='treeData' @node-click="nodeClick"/>
    <textarea cols="100" rows="10" v-model="newNode"></textarea><br>
    <button @click="addNewNode()">添加到点击的节点下</button>
    <button @click="addRootNewNode()">添加到根节点</button>
  </div>
</template>

<script>
  import {parseTree} from './common/util.js';

  export default {
    name: 'App',
    data () {
      return {
        treeData: [],
        id: 1,
        newNode: '{"id":0,"pid":0,"title":"xxmi.org"}',
        currNode: null
      };
    },
    created () {
      const nodes = [
        {id: 1, pid: 0, title: '中国'},
        {id: 2, pid: 1, title: '重庆'},
        {id: 3, pid: 2, title: '渝北区'},
        {id: 4, pid: 2, title: '沙坪坝区'},
        {id: 5, pid: 0, title: '美国'},
        {id: 6, pid: 5, title: '西西里州'},
        {id: 7, pid: 6, title: '洛杉矶'},
        {id: 8, pid: 7, title: '华盛顿'}
      ];
      this.id = 8;
      this.treeData = parseTree(undefined, nodes);
    },
    methods: {
      addNewNode () {
        ++this.id;
        let newNode = JSON.parse(this.newNode);
        newNode.id = this.id;
        this.$refs.tree.addNode(this.currNode, newNode);
      },
      addRootNewNode () {
        ++this.id;
        let newNode = JSON.parse(this.newNode);
        newNode.id = this.id;
        this.$refs.tree.addNode(null, newNode);
      },
      nodeClick (node) {
        this.currNode = node;
      }
    }
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
