const state = () => ({
    edges: [],
    //Query Node schould always be there
    nodes: [{
        id: 1,
        notDelitable: true,
        isQuery: true,
        label: 'Query',
        group: "0",
        typeTitle: 'Query',
    },],
});

const mutations = {
    addEdge(state, edge) {
        state.edges.push(edge);
    },
    addNode(state, node) {
        state.nodes.push(node);
    },
    deleteEdge(state, edge) {
        state.edges.splice(state.edges.indexOf(edge), 1);
    },
    deleteNode(state, nodeId) {
        state.nodes = state.nodes.filter(node => node.id !== nodeId);
        // delete edges referenced by nodeId
        state.edges = state.edges.filter(edge => edge.from !== nodeId && edge.to !== nodeId);
    }
}

const actions = {
    addEdge({ commit }, edge) {
        commit('addEdge', edge);
    },
    addNode({ commit }, node) {
        commit('addNode', node);
    },
    deleteEdge({ commit }, edge) {
        commit('deleteEdge', edge);
    },
    deleteNode({ commit }, nodeId) {
        commit('deleteNode', nodeId);
    }
}

const getters = {
    edges: state => state.edges,
    nodes: state => state.nodes,
}

export { state, mutations, actions, getters }