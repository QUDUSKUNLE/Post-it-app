
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


export const memberOfGeneralGroups = (generalGroups) => {
  const generalArrays = (Object.values(generalGroups));
  const membersOfGeneralGroup = [];
  for (let i = 0; i < generalArrays.length; i++) {
    membersOfGeneralGroup.push((Object.values(generalArrays[i]))[0]);
  }
  return (membersOfGeneralGroup.map((member) => member.user));
};
