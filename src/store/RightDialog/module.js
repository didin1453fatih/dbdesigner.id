import Export from "./Export/module";
import Fork from "./Fork/module"
export default {
  namespaced: true,
  modules: {
    Export: Export,
    Fork : Fork
  }
};
