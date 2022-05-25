<template>
  <b-card class="mt-4">
    <b-card v-if="infoText" class="position-absolute info-card">
      <div class="d-flex">
        <p>{{ infoText }}</p>

        <b-button
          @click="onDisableEditMode"
          size="sm"
          class="ml-3"
          title="cancelAddNode"
          ><fa icon="times"></fa
        ></b-button>
      </div>
    </b-card>
    <network
      ref="network"
      :nodes="nodes"
      :edges="edges"
      :options="options"
      :events="events"
      @select-node="onSelectNode"
      @select-edge="onSelectEdge"
    >
    </network>
  </b-card>
</template>
<script>
import { Network } from 'vue-vis-network'
import { mapGetters } from 'vuex'

export default {
  components: {
    Network,
  },
  data() {
    return {
      infoText: '',
      events: ['selectNode', 'selectEdge'],
    }
  },
  computed: {
    ...mapGetters('qaSearchPipeline', ['nodes', 'edges']),
    options() {
      return {
        height: '600px',
        width: '100%',
        physics: false,
        edges: { smooth: false },
        nodes: {
          shape: 'dot',
          size: 30,
          font: {
            size: 32,
          },
          borderWidth: 2,
        },
        manipulation: {
          addEdge: this.addEdge,
        },
        interaction: {
          selectConnectedEdges: false,
        },
      }
    },
  },
  methods: {
    addEdgeMode() {
      this.$refs.network.addEdgeMode()
      this.infoText = 'Add an edge by clicking on two nodes.'
    },

    onSelectNode(params) {
      const nodes = params?.nodes
      if (nodes && nodes.length > 0) {
        const node = this.nodes.find((node) => node.id == nodes[0])

        if (!node) return

        this.$emit('select-node', node)
      }
    },
    onSelectEdge(params) {
      if (params.edges.length == 0) return
      this.$emit('select-edge', params.edges[0])
    },
    onDisableEditMode() {
      this.$refs.network.disableEditMode()
      this.infoText = ''
    },
    addEdge(edgeData, callback) {
      // No self reference possible

      if (edgeData.from === edgeData.to) return

      // Check if edge already exists
      if (
        this.edges.some(
          (edge) =>
            (edge.from === edgeData.from && edge.to === edgeData.to) ||
            (edge.from === edgeData.to && edge.to === edgeData.from)
        )
      ) {
        return
      }

      let arrows = 'to'

      // Query Node should always be the first node
      let node = this.nodes.find((node) => node.id == edgeData.to)

      if (node && node.isQuery) {
        arrows = 'from'
      }

      //TODO check circular reference
      //TODO check logical edge direction

      const edge = {
        ...edgeData,
        arrows,
      }

      this.$store.dispatch('qaSearchPipeline/addEdge', edge)
      callback(edge)
    },
  },
  watch: {
    nodes() {
      // track changes on nodes and disable EditMode
      this.onDisableEditMode()
    },
    edges() {
      // track changes on edges and disable EditMode
      this.onDisableEditMode()
    },
  },
}
</script>

<style lang="scss">
.vis-manipulation {
  display: none !important;
}
.vis-edit-mode {
  display: none !important;
}
.info-card {
  z-index: 1000;
  right: 14px;
}
</style>