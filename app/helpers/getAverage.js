const getAverage = (array, s_element) => {
  let sum = 0;
  array.forEach(function (item, index, array) {
    sum += item[s_element];
  });
  let average = sum / array.length;
  console.log(average);
  return average;
};

export default getAverage;
