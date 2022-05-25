import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

Vue.component("fa", FontAwesomeIcon);

// Standard Icons

library.add(faPlus, faTimes)


