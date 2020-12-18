/**
 *
 * @param {Array.<Object>} tableData each key represents a table header, each object represents one row
 */
import { propOr } from "./helpers/propOr.js";
import { rerenderSort } from "./helpers/rerenderSort.js";

const emptyCell = "";
const tableId = "table";
const table = document.getElementById(tableId);

const clearTable = () => {
  table.innerHTML = "";
};

const createTableHeader = (headerRow, setSort) => (header, index) => {
  const cell = headerRow.insertCell(index);
  cell.innerHTML = header;
  cell.onclick = setSort(header);
};

const createTableBody = (body, headers) => (data, rowIndex) => {
  const row = body.insertRow(rowIndex);
  headers.forEach((columnHeader, colIndex) => {
    const cell = row.insertCell(colIndex);
    cell.innerHTML = propOr(emptyCell, columnHeader, data);
  });
};

const buildTable = (tableData, headers) => {
  clearTable();
  const setSort = rerenderSort(buildTable, tableData, headers);
  const headerRow = table.createTHead().insertRow(0);
  headers.forEach(createTableHeader(headerRow, setSort));
  const body = table.createTBody();
  tableData.forEach(createTableBody(body, headers));
};

export { buildTable };
