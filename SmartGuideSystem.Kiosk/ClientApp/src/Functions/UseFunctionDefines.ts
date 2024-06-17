export const CalcTotalPageCountForPaging = (
  totalCount: number,
  onePageItemCount: number
) => {
  let r = totalCount % onePageItemCount;
  totalCount = Math.floor(totalCount / onePageItemCount);
  if (r === 0) {
  } else {
    totalCount += 1;
  }
  return totalCount;
};
