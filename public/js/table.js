import { renderTable } from "./renderTable.js";
import { generateIdCheckboxes } from "./helpers/generateIdCheckboxes.js";
import { retrieveTableProps } from "./helpers/retrieveTableProps.js";
import { MCTWebSocketState } from "./helpers/MCTWebSocketState.js";

let idState = {
  "pwr.v": true,
  "pwr.c": true,
};

const wsState = new MCTWebSocketState(Object.keys(idState));

const filterData = (data) => data.filter(({ id }) => idState[id]);
const rerenderTable = (data, headers) => {
  const filteredData = filterData(data);
  renderTable(filteredData, headers);
};

const init = async () => {
  const { data, headers } = await retrieveTableProps(Object.keys(idState));
  let subscribedData = [...data];

  const receiveSubscribedDataAndRerenderTable = (newData) => {
    subscribedData.push(newData);
    rerenderTable(subscribedData, headers);
  };

  wsState.setRetrieveData(receiveSubscribedDataAndRerenderTable);
  wsState.mapStateToSubscriptions(idState);

  const oncheck = (id) => () => {
    idState = {
      ...idState,
      [id]: !idState[id],
    };
    wsState.mapStateToSubscriptions(idState);
    generateIdCheckboxes(idState, oncheck);
    rerenderTable(subscribedData, headers);
  };

  generateIdCheckboxes(idState, oncheck);
  rerenderTable(subscribedData, headers);
};

init();
