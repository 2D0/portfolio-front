import { Montserrat, Orbit } from 'next/font/google';
import localFont from 'next/font/local';

export const cantique = localFont({ src: '../app/fonts/Cantique.otf' });
export const montserrat = Montserrat({
  weight: '500',
  subsets: ['latin'],
});
export const orbit = Orbit({
  weight: '400',
  subsets: ['latin'],
});
