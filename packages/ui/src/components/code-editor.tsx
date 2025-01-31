import { useState } from 'react';
import CodeMirror, { type ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

interface CodeEditorProps
  extends Pick<
    ReactCodeMirrorProps,
    'theme' | 'width' | 'height' | 'maxWidth' | 'maxHeight'
  > {
  value: string;
}

export const CodeEditor = ({
  value,
  theme = 'dark',
  width = '100%',
  maxWidth = '100%',
  height = '100%',
  maxHeight = '400px',
}: CodeEditorProps) => {
  const [code, setCode] = useState<string>(value);

  return (
    <CodeMirror
      value={code}
      extensions={[javascript({ typescript: true })]}
      theme={theme}
      width={width}
      height={height}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      onChange={value => setCode(value)}
    />
  );
};
