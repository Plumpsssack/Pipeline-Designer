<template>
  <div>
    <b-sidebar
      right
      shadow
      :visible="visible"
      @change="$emit('change', $event)"
      title="Details"
    >
      <div class="p-4">
        <div v-if="node">
          <h5>Name:</h5>
          <label class="text-primary">{{ title }}</label>
          <h5>Type:</h5>
          <label class="text-primary">{{ type }}</label>
        </div>
        <p v-if="edgeId">Do you want to delete this edge?</p>
        <div class="d-flex justify-content-end mt-2">
          <b-button
            title="delete"
            variant="danger"
            @click="onDeleteClick"
            v-if="!notDelitable"
            >Delete <fa icon="times"></fa
          ></b-button>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'visible',
    event: 'change',
  },
  props: {
    visible: Boolean,
    node: Object,
    edgeId: String,
  },
  data() {
    return {
      currentVisibility: false,
    }
  },
  computed: {
    title() {
      return this.node?.label
    },
    type() {
      return this.node?.typeTitle
    },
    notDelitable() {
      return this.node?.notDelitable
    },
  },
  methods: {
    async onDeleteClick() {
      if (this.edgeId) {
        const confirm = await this.$bvModal.msgBoxConfirm(
          'Are you sure you want to delete this edge?',
          {
            okTitle: 'Yes delete',
            okVariant: 'danger',
          }
        )
        if (confirm) {
          this.$store.dispatch('qaSearchPipeline/deleteEdge', this.edgeId)
        }
      } else {
        const confirm = await this.$bvModal.msgBoxConfirm(
          'Are you sure you want to delete this node?',
          {
            okTitle: 'Yes delete',
            okVariant: 'danger',
          }
        )
        if (confirm) {
          this.$store.dispatch('qaSearchPipeline/deleteNode', this.node.id)
        }
      }

      this.$emit('change', false)
    },
  },
}
</script>