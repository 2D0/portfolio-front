import { CareerList } from '@lib/textStorage/career';
import { StackList } from '@lib/textStorage/stack';
import { ProjectList } from '@lib/textStorage/project';
import { CodeList } from '@lib/textStorage/code';
import { ContactMap } from '@lib/textStorage/contact';
import { UI } from './page.client';

export default function Page(): JSX.Element {
  return (
    <UI
      career={CareerList}
      stack={StackList}
      project={ProjectList}
      code={CodeList}
      contact={ContactMap}
    />
  );
}
