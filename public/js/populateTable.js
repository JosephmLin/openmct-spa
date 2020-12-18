import { buildTable } from "./buildTable.js";
import { generateIdCheckboxes } from "./helpers/generateIdCheckboxes.js";
import { retrieveTableProps } from "./helpers/retrieveTableProps.js";

let idState = {
  "pwr.v": true,
  "pwr.c": true,
};

const filterData = (data) => data.filter(({ id }) => idState[id]);
const rerenderTable = (data, headers) => () => {
  const filteredData = filterData(data);
  buildTable(filteredData, headers);
};

const init = async () => {
  const { data, headers } = await retrieveTableProps(Object.keys(idState));

  const thunkedRerenderTable = rerenderTable(data, headers);

  const oncheck = (id) => () => {
    idState = {
      ...idState,
      [id]: !idState[id],
    };
    generateIdCheckboxes(idState, oncheck);
    thunkedRerenderTable();
  };

  generateIdCheckboxes(idState, oncheck);
  thunkedRerenderTable();
};

init();
