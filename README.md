# qa-search-pipeline

> Deepset Coding Challenge

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

**Pipeline Designer:**

For the scope of this task, please implement a web page where the user can create and
move around two or more nodes/elements. The nodes could be a Query, Retriever and
Reader. A combination of these defines a QA Search Pipeline in our context. It would be
nice to have if you could connect nodes with a line.
You do not have to implement everything from scratch. Feel free to use available tools
and libraries that help you implement the needed functionality.

- Users can add and remove nodes to the design area
- Any nodes can connect to each other
- Query node must be always the first node in the pipeline and it can be only one
- There could be multiple Retriever and Reader

**Description of your solution:**

I have developed a solution where the user can add edges and nodes using the left sidebar and delete nodes and edges using the right sidebar.

To add a node, the user must first select what type of node he/she wants to add.
Currently, there are only two types (retriever and reader). The query node cannot be added because there can only be one. Therefore, it is also not possible to delete the query node.

When the user selects a node type, the different nodes are displayed. To add this node, the node must be clicked.

To add an edge, the user must press the "Add edge" button and select two nodes.
To delete an edge or a node, the user has to click on it and press the delete button in the right sidebar. After a confirmation dialog it will be deleted.

For a better view, the nodes can be moved as desired.

**Assumptions and limitations of the solution**

Currently there is no algorithm that checks if there is a circular reference or if the direction of the edges is correct (except for the query node).

**How would you connect to the back-end**.

I would create a login screen if not present, and store a token from the back end. I would also create an Axios instance and add the token. This would allow me to send requests to the backend.

For the saving requests i would create the yaml file from the nodes and edges

**Future Enhancements**.

- It would be nice if the nodes could be added by drag and drop.
- The nodes could have their own image related to the type.
- Details of the node or edge could be added and edited in the right sidebar.
- The change from yaml to UI and vice versa would be very helpful
