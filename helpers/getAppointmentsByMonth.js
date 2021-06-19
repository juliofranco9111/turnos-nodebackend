const getAppByMonth = (month, list = []) => {
  if (!month || !list) {
    return [];
  }

  const todayDate = new Date();

  const year = todayDate.getFullYear();

  const dateStart = new Date(year, month, 1, 0, 0).getTime();
  const dateEnd = new Date(year, month  + 1, 1, 0, 0, 1).getTime();

  console.log(list.filter((item) => item.start > dateStart));
  return list.filter((item) => item.start > dateStart && item.start < dateEnd);
};

module.exports = {
    getAppByMonth
}
