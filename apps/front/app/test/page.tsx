'use client';
import { useState } from 'react';
import { RadioGroup, InputTab } from '@repo/ui/components';

export default function Page(): JSX.Element {
  const [radioValue, setRadioValue] = useState<string>('체크라디오');
  const [buttonRadioValue, setButtonRadioValue] =
    useState<string>('버튼라디오');

  return (
    <main>
      <div className="flex flex-col space-y-4">
        <RadioGroup name="기본라디오" selectvalue="전체" className="flex gap-2">
          <InputTab value="전체">전체</InputTab>
          <InputTab value="하트">❤️ 하트</InputTab>
          <InputTab value="병아리">🐥 병아리</InputTab>
          <InputTab value="별">⭐️ 별</InputTab>
        </RadioGroup>
        <RadioGroup
          name="버튼라디오"
          selectvalue="전체"
          className="flex gap-2"
          labelProps={{
            variant: 'disabled',
          }}
        >
          <InputTab value="전체">전체</InputTab>
          <InputTab value="하트">❤️ 하트</InputTab>
          <InputTab value="병아리">🐥 병아리</InputTab>
          <InputTab value="별">⭐️ 별</InputTab>
        </RadioGroup>
      </div>
    </main>
  );
}
