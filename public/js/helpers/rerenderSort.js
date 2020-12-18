import { sortObjectsByKey } from "./sortObjectsByKey.js";

let sortByHeader = "";
let isDescend = false;

const clearTable = () => {
  table.innerHTML = "";
};

// A recursive implementation. It mocks the rerender behavior/philsophy of React.
const rerenderSort = (buildTable, tableData, headers) => (
  selectedHeader
) => () => {
  clearTable();
  isDescend = sortByHeader === selectedHeader ? !isDescend : isDescend;
  sortByHeader = selectedHeader;
  const sortedData = sortObjectsByKey(selectedHeader, isDescend, tableData);
  buildTable(sortedData, headers);
};

export { rerenderSort };
