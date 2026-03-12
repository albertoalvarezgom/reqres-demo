export const isDevMode = (): boolean => {
  const devMode = import.meta.env.VITE_DEV_MODE;
  return devMode === 'true' || devMode === true;
};

export const mockDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
