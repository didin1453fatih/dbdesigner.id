export default {
  loadingData(state, value) {
    state.loadingData = value;
  },
  stok(state, value) {
    state.stok = value;
  },
  totalData(state, value) {
    state.totalData = value;
  },
  currentPage(state, value) {
    state.currentPage = value;
  },
  pageSize(state, value) {
    state.pageSize = value;
  },
  setSelectedDetail(state, value) {
    state.selectedLog = value;
  },
  setkeyWordLevel(state, value) {
    state.keyWordLevel = value;
  },
  setkeyWordAksi(state, value) {
    state.keyWordAksi = value;
  },
  setkeyWordNoLab(state, value) {
    state.keyWordNoLab = value;
  },
  setkeyWordSuccess(state, value) {
    state.keyWordSuccess = value;
  },
  namaSelectedReagen(state, value) {
    state.namaSelectedReagen = value;
  },
  selectedReagen(state, value) {
    state.selectedReagen = value;
  },
  namaSelectedStok(state, value) {
    state.namaSelectedStok = value;
  },
  selectedStok(state, value) {
    state.selectedStok = value;
  },
  kodeStokInput(state, value) {
    state.kodeStokInput = value;
  },
  jumlahStok(state, value) {
    state.jumlahStok = value;
  }
};
