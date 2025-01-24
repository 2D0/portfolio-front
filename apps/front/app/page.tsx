import { CareerList } from '@lib/textStorage/career';
import { StackList } from '@lib/textStorage/stack';
import { UI } from './page.client';

export default function Page(): JSX.Element {
  return <UI career={CareerList} stack={StackList} />;
}
