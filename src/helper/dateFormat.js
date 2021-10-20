const dateFormat = (date) => {
  let d = new Date(date);

  let getYear = d.getUTCFullYear();
  let getMonth = d.getUTCMonth();
  let getDate = d.getUTCDate();

  let dateFormated = `${getYear}-${getMonth}-${getDate}`;
  return dateFormated;
};

export default dateFormat;
