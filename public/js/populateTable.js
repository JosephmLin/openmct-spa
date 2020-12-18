import { buildTable } from "./buildTable.js";
function populateTable() {
  buildTable(
    [
      { a: "1", b: "2", c: "4" },
      { c: "3", d: "4" },
    ],
    ["a", "b", "c", "d"]
  );
}

populateTable();
