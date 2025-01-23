import { CareerList } from '@lib/textStorage/career';
import { UI } from './page.client';

export default function Page(): JSX.Element {
  return <UI career={CareerList} />;
}
