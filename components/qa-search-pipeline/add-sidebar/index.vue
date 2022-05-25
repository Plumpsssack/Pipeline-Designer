<template>
  <div>
    <b-sidebar
      title="Add-Section"
      shadow
      visible
      no-header-close
      no-close-on-route-change
      no-close-on-esc
      no-close-on-backdrop
    >
      <div class="m-3 nodes-section">
        <h3>Nodes:</h3>
        <NodesSelection></NodesSelection>
      </div>
      <div class="m-3">
        <h3>Edges:</h3>
        <b-button variant="success" @click="$emit('addEdge')"
          >Add Edge <fa icon="plus"></fa
        ></b-button>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import NodesSelection from './nodes-selection.vue'
export default {
  components: { NodesSelection },
}
</script>
<style scoped>
.nodes-section {
  height: 50vh;
}
</style>