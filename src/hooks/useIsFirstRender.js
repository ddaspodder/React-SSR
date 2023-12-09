import React, { useMemo } from "react";

const useIsFirstRender = () => {
  const res = useMemo(() => ({
    value: true,
  }), []);
  const firstRender = res.value;
  res.value = false;
  return firstRender;
};

export default useIsFirstRender;
