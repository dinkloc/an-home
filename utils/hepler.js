const { parseISO } = require('date-fns');
const { differenceInDays } = require('date-fns');

const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(
    parseISO(dateStr1.toISOString()),
    parseISO(dateStr2.toISOString()),
  );

module.exports = subtractDates;
