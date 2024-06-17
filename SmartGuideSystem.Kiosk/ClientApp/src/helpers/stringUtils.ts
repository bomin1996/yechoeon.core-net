export function selectString(
  first?: string,
  second?: string,
  placeHolder = ""
) {
  if (first !== undefined && first !== null && first !== "") {
    return first;
  } else if (second !== undefined && second !== null && second !== "") {
    return second;
  } else {
    return placeHolder;
  }
}
