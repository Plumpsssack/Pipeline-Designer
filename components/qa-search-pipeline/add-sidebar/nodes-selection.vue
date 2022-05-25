<template>
  <div>
    <transition
      mode="out-in"
      enter-active-class="slide-in-left"
      leave-active-class="slide-out-right"
    >
      <div key="nodes" v-if="currentNodeType">
        <div class="d-flex justify-content-end m-2">
          <b-button variant="primary" @click="onBackClick"
            >Back <fa icon="circle-arrow-left"></fa
          ></b-button>
        </div>
        <b-list-group>
          <b-list-group-item
            v-for="node in nodes"
            :key="'node_' + node.id"
            button
            class="list-group-item-hover"
            title="add Node"
            @click="onAddNodeClick(node)"
          >
            {{ node.title }}
            <fa icon="plus" class="text-success float-right"></fa>
          </b-list-group-item>
        </b-list-group>
      </div>
      <b-list-group key="nodeTypes" v-else>
        <b-list-group-item
          v-for="type in nodeTypes"
          :key="'type_' + type.id"
          button
          class="list-group-item-hover"
          @click="onNodeTypeClick(type)"
        >
          <fa :icon="type.icon"></fa> {{ type.title }}
        </b-list-group-item>
      </b-list-group>
    </transition>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBrain,
  faCircleArrowLeft,
  faFilter,
} from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid'

library.add(faBrain, faFilter, faCircleArrowLeft)

export default {
  data() {
    return {
      currentNodeType: null,

      nodeTypes: [],
    }
  },
  computed: {
    nodes() {
      return this.currentNodeType?.nodes
    },
  },
  methods: {
    onNodeTypeClick(type) {
      this.currentNodeType = type
    },
    onAddNodeClick(node) {
      this.$store.dispatch('qaSearchPipeline/addNode', {
        id: uuidv4(),
        typeTitle: this.currentNodeType.title,
        label: node.title,
        group: this.currentNodeType.id,
      })
    },
    onBackClick() {
      this.currentNodeType = null
    },
  },
  mounted() {
    //TODO Load from Backend

    this.nodeTypes = [
      {
        id: 1,
        title: 'Retriever',
        icon: 'filter',
        nodes: [
          { id: 1, title: 'ESRetriever1' },
          { id: 2, title: 'ESRetriever2' },
          { id: 3, title: 'ESRetriever3' },
        ],
      },
      {
        id: 2,
        title: 'Reader',
        icon: 'brain',
        nodes: [
          { id: 1, title: 'QAReader' },
          { id: 2, title: 'QAReader2' },
          { id: 3, title: 'QAReader3' },
        ],
      },
    ]
  },
}
</script>


<style scoped lang="scss">
@import 'assets/styles/animations/slide-out-right.scss';
@import 'assets/styles/animations/slide-in-left.scss';

.list-group-item-hover {
  transition: all 0.3s ease-in-out;
}
.list-group-item-hover:hover {
  transform: translateX(0.45rem);
}
</style>

