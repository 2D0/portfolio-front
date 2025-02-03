import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useModal } from '@/contexts/modal.context';
import { ModalList } from '@/lib/textStorage/modal';
import { Icon } from '@repo/ui/components';
import { BlockChat } from './block-chat';
import type { SelectMapType, ContentList } from '@/interface';

export const ModalChatbot = () => {
  const {
    isModal,
    setIsModal,
    step,
    setStep,
    nameValue,
    setNameValue,
    answear,
    setAnswear,
    selectId,
    setSelectId,
  } = useModal();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [chatHistory, setChatHistory] = useState(ModalList[1]);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    step !== 1 &&
      setChatHistory(prev => [
        ...prev,
        ...(answear
          ? [
              {
                id: `${step}-${prev.length}`,
                senderId: 'anon',
                receiverId: '2d0',
                contentList: [
                  {
                    type: 'text' as ContentList<SelectMapType>['type'],
                    content: answear,
                  },
                ],
              },
            ]
          : []),
        ...ModalList[step],
      ]);
  }, [step]);

  useEffect(() => {
    scrollToBottomWhenMounted();
  }, [chatHistory]);
  const scrollToBottomWhenMounted = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <>
      {isModal ? (
        <div className="max-w-full sm:max-w-80 w-full max-h-full sm:max-h-[500px] h-full fixed bottom-0 sm:bottom-4 left-0 sm:left-4 z-50 rounded-xl p-4 bg-white">
          <button
            className="grid place-content-center w-5 h-5 absolute top-0.5 right-0.5"
            onClick={() => {
              setIsModal(false);
              setChatHistory(ModalList[1]);
              setStep(1);
              setNameValue('');
              setAnswear('');
              setSelectId({ visitor: '', thought: '', score: '' });
            }}
          >
            <span className="block relative w-3 h-0.5 before:block before:content-[''] before:w-full before:h-full before:absolute before:bg-[#222] before:rounded-md before:-rotate-45 after:block after:content-[''] after:w-full after:h-full after:absolute after:bg-[#222] after:rounded-md after:rotate-45" />
          </button>
          <div
            ref={ref}
            className="flex flex-col gap-6 w-full h-full p-3 overflow-y-auto bg-[#333] rounded-lg"
          >
            {chatHistory.map(chat => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: -50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                }}
              >
                <BlockChat
                  {...chat}
                  nameValue={nameValue}
                  selectId={selectId}
                  inView={inView}
                />
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsModal(true)}
          className="fixed bottom-4 left-4 z-50"
        >
          <Icon name="Moon" alt="챗봇 버튼" />
        </button>
      )}
    </>
  );
};
