<template>
  <b-container>
    <h1>QA Pipeline Designer</h1>
    <AddSidebar @addEdge="onAddEdge"></AddSidebar>
    <EditSidebar
      v-model="editSidebarVisibility"
      :node="currentNode"
      :edgeId="currentEdgeId"
    ></EditSidebar>
    <GraphPipeline
      @select-node="onSelectNode"
      @select-edge="onSelectEdge"
      ref="graphPipeline"
    ></GraphPipeline>
  </b-container>
</template>

<script>
import GraphPipeline from '@/components/qa-search-pipeline/graph-pipeline.vue'
import EditSidebar from '@/components/qa-search-pipeline/edit-sidebar.vue'
import AddSidebar from '@/components/qa-search-pipeline/add-sidebar'
export default {
  components: { GraphPipeline, EditSidebar, AddSidebar },
  data() {
    return {
      editSidebarVisibility: false,
      currentNode: null,
      currentEdgeId: null,
    }
  },
  methods: {
    onSelectNode(node) {
      this.editSidebarVisibility = true
      this.currentEdgeId = null
      this.currentNode = node
    },
    onSelectEdge(edgeId) {
      this.editSidebarVisibility = true
      this.currentNode = null
      this.currentEdgeId = edgeId
    },
    onAddEdge() {
      this.$refs.graphPipeline.addEdgeMode()
    },
  },
}
</script>

<style>
</style>
