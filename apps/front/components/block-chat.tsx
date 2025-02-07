'use client';
import { Fragment, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  chatAnswearState,
  chatStepState,
  selectMapState,
  userNameState,
} from '@lib/constraints/atoms/modal.atom';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { useDate } from '@repo/commons/hooks';
import { ImageBox } from '@repo/ui/components';
import { cn } from '@repo/commons/cn';
import type { ModalList, SelectMapType } from '@/interface';

interface BlockChatProps extends ModalList {
  userName: string;
  selectMap: Record<keyof SelectMapType, SelectMapType[keyof SelectMapType]>;
  inView: boolean;
}

const blockChatVariants = cva('grid gap-2 text-gray-300', {
  variants: {
    target: {
      true: 'grid-cols-[max-content_minmax(0,max-content)_max-content]',
      false: 'grid-cols-[max-content_minmax(0,max-content)] justify-end',
    },
  },
  defaultVariants: {
    target: true,
  },
});

const chatBoxVariants = cva(
  'flex flex-col gap-2 w-fit p-2.5 text-[#222] rounded-xl',
  {
    variants: {
      target: {
        true: 'bg-[#ddd]',
        false: 'bg-[#F3DB86]',
      },
    },
    defaultVariants: {
      target: true,
    },
  },
);

const inputVariants = cva('w-[150px] rounded-md placeholder:text-sm px-2', {
  variants: {
    disabled: {
      true: 'bg-transparent',
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
  },
});
const inputContainerVariants = cva(
  "w-6 h-6 rounded-full relative before:block before:content-[''] before:absolute before:w-0.5 before:h-2 before:bottom-[6px] before:left-[6.8px] before:-rotate-45 before:rounded-md before:bg-[#F3DB86] after:content-[''] after:absolute after:w-0.5 after:h-3 after:bottom-[5px] after:right-[8.3px] after:rotate-45 after:rounded-md after:bg-[#F3DB86]",
  {
    variants: {
      disabled: {
        true: '!bg-gray-400',
        false: '!bg-[#7A93C5]',
      },
    },
    defaultVariants: {
      disabled: true,
    },
  },
);

const Time = (time: string) => <span className="mt-auto text-sm">{time}</span>;

export const BlockChat = ({
  senderId,
  contentList,
  userName,
  selectMap,
  inView,
}: BlockChatProps) => {
  const [step, setStep] = useRecoilState(chatStepState);
  const setUserName = useSetRecoilState(userNameState);
  const setAnswear = useSetRecoilState(chatAnswearState);
  const setSelectMap = useSetRecoilState(selectMapState);
  const { timeValue } = useDate();
  const [time] = useState<string>(timeValue);
  const isSender = senderId === '2d0';

  return (
    <div className={cn(blockChatVariants({ target: isSender }))}>
      {!isSender ? (
        Time(time)
      ) : (
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-white">
          <ImageBox
            imagePorps={{
              src: '/images/source/char-diane.png',
              alt: 'char-diane',
              width: 400,
              height: 400,
            }}
            rounded="none"
            className="relative w-[40px] h-[40px]"
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        {contentList.map((chat, index) => (
          <motion.div
            key={index}
            className={cn(chatBoxVariants({ target: isSender }))}
            initial={{ opacity: 0, y: -50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: 0.3 * index }}
          >
            {chat.type === 'name' ? userName : ''}
            {chat.selectMap && chat.selectName ? (
              <>
                {Object.entries(selectMap).map(([key, value]) => (
                  <Fragment key={key}>{chat.selectMap?.[value]}</Fragment>
                ))}
                <br />
              </>
            ) : null}
            {chat.content}
            {chat.selectList ? (
              <ul className="flex flex-col gap-1.5">
                {chat.selectList.map(select => (
                  <li key={select.id}>
                    <button
                      type="button"
                      className="flex items-center gap-1 px-2 py-1 rounded-full !bg-white before:block before:content-[''] before:w-3 before:h-3 before:rounded-full before:bg-[#7A93C5]"
                      onClick={() => {
                        if (step >= (chat.nextStep ?? 0)) return;
                        chat.selectName &&
                          setSelectMap(prev => ({
                            ...prev,
                            [chat.selectName as string]: select.id,
                          }));
                        setAnswear(select.content);
                        chat.nextStep && setStep(chat.nextStep);
                      }}
                      disabled={step >= (chat.nextStep ?? 0)}
                    >
                      {select.content}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            {chat.type === 'input' ? (
              <div className="flex gap-x-1.5">
                <input
                  value={userName}
                  placeholder="이름을 입력해 주세요."
                  onChange={e => setUserName(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && userName && chat.nextStep) {
                      setStep(chat.nextStep);
                    }
                  }}
                  readOnly={step !== 1}
                  className={cn(inputVariants({ disabled: step !== 1 }))}
                />
                <button
                  type="button"
                  onClick={() =>
                    userName && chat.nextStep && setStep(chat.nextStep)
                  }
                  disabled={!userName}
                  className={cn(
                    inputContainerVariants({ disabled: !userName }),
                  )}
                />
              </div>
            ) : null}
          </motion.div>
        ))}
      </div>
      {isSender ? Time(time) : null}
    </div>
  );
};
