
export const validatePassword = (pass) => {
  const len = pass.length;
  let output;
  if (len < 6) {
    output = true;
  } else {
    output = false;
  }
  return output;
};
