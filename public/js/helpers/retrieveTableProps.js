const historyUrl = "http://localhost:8080/history";
const MS_PER_MINUTE = 60000;
const fifteenMinutesInMilliseconds = MS_PER_MINUTE * 15;
const start = new Date(Date.now() - fifteenMinutesInMilliseconds).valueOf();
const end = Date.now();

const retrieveHistory = (selectedIds) => {
  return axios.get(
    `${historyUrl}/${selectedIds.join(",")}?start=${start}&end=${end}`
  );
};

const getHeaders = (arr) => {
  let allHeaders = {};
  arr.forEach((obj) => (allHeaders = { ...allHeaders, ...obj }));
  return Object.keys(allHeaders);
};

async function retrieveTableProps(selectedIds) {
  const { data } = await retrieveHistory(selectedIds);
  const headers = getHeaders(data);
  return {
    data,
    headers,
  };
}

export { retrieveTableProps };
