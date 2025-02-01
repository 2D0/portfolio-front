import { Montserrat, Gowun_Dodum, Jua } from 'next/font/google';
import localFont from 'next/font/local';

export const cantique = localFont({ src: '../app/fonts/cantique.otf' });
export const jua = Jua({
  weight: '400',
  subsets: ['latin'],
});
export const montserrat = Montserrat({
  weight: '500',
  subsets: ['latin'],
});
export const gowunDodum = Gowun_Dodum({
  weight: '400',
  subsets: ['latin'],
});
