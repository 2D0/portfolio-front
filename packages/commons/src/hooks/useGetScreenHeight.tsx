import { useEffect, useState } from 'react';

export interface GetScreenHeightReturnType {
  screenHeight: number;
}

export const useGetScreenHeight = (): GetScreenHeightReturnType => {
  const [screenHeight, setScreenHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setScreenHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { screenHeight };
};
