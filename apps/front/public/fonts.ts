import { Montserrat, Gowun_Dodum } from 'next/font/google';
import localFont from 'next/font/local';

export const cantique = localFont({ src: './fonts/Cantique.otf' });
export const montserrat = Montserrat({
  weight: '500',
  subsets: ['latin'],
});
export const gowunDodum = Gowun_Dodum({
  weight: '400',
  subsets: ['latin'],
});
