function isANumber(s_input) {
  const NUMBERS = "0123456789";

  let is_a_number = false;
  let i = 0;

  do {
    const element = s_input[i];
    is_a_number = Boolean(NUMBERS.search(element) >= 0);
    i++;
  } while (is_a_number && i < s_input.length);

  return is_a_number;
}

export default isANumber;
