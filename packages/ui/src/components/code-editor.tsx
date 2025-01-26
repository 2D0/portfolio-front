import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

interface CodeEditorProps {
  value: string;
}

export const CodeEditor = ({ value }: CodeEditorProps) => {
  const [code, setCode] = useState<string>(value);

  return (
    <CodeMirror
      value={code}
      extensions={[javascript({ typescript: true })]}
      theme="dark"
      width="100%"
      height="100%"
      maxHeight="400px"
      onChange={value => setCode(value)}
    />
  );
};
