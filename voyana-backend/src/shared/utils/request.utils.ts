export const getRouteParam = (param: string | string[] | undefined) => {
  if (Array.isArray(param)) {
    return param[0]?.trim();
  }

  return param?.trim();
};
