import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@repo/commons/hooks';
import {
  setIsChatOpen,
  setChatStep,
  setUserName,
  setChatAnswear,
  setSelectMap,
} from '@repo/commons/store/slices/front.slice.ts';
import { track } from '@vercel/analytics';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { montserrat } from '@/public/fonts';
import { cn } from '@repo/commons/cn';
import { ModalList } from '@/lib/textStorage/modal';
import { Icon } from '@repo/ui/components';
import { BlockChat } from './block-chat';
import type { SelectMapType, ContentList } from '@/interface';

export const ModalChatbot = () => {
  const dispatch = useAppDispatch();
  const { isChatOpen, chatStep, userName, chatAnswear, selectMap } =
    useAppSelector(state => state.front);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [chatHistory, setChatHistory] = useState(ModalList[1]);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    chatStep !== 1 &&
      setChatHistory(prev => [
        ...prev,
        ...(chatAnswear
          ? [
              {
                id: `${chatStep}-${prev.length}`,
                senderId: 'anon',
                receiverId: '2d0',
                contentList: [
                  {
                    type: 'text' as ContentList<SelectMapType>['type'],
                    content: chatAnswear,
                  },
                ],
              },
            ]
          : []),
        ...ModalList[chatStep],
      ]);
  }, [chatStep]);

  useEffect(() => {
    scrollToBottomWhenMounted();
  }, [chatHistory]);

  const scrollToBottomWhenMounted = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      {isChatOpen ? (
        <div className="max-w-full sm:max-w-80 w-full max-h-full sm:max-h-[500px] h-full fixed bottom-0 sm:bottom-4 left-0 sm:left-4 z-50 rounded-xl p-4 bg-white">
          <button
            className="grid place-content-center w-5 h-5 absolute top-0.5 right-0.5"
            onClick={() => {
              dispatch(setIsChatOpen(false));
              track('챗봇 닫기', {
                name: userName,
                visitor: selectMap.visitor,
                thought: selectMap.thought,
                score: selectMap.score,
              });
              setChatHistory(ModalList[1]);
              dispatch(setChatStep(1));
              dispatch(setUserName(''));
              dispatch(setChatAnswear(''));
              dispatch(setSelectMap({ visitor: '', thought: '', score: '' }));
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
                  userName={userName}
                  selectMap={selectMap}
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
          onClick={() => {
            dispatch(setIsChatOpen(true));
            track('챗봇 오픈');
          }}
          className="flex flex-col items-center fixed bottom-4 left-4 z-50"
        >
          <div className={cn(montserrat.className, 'animate-bounce relative')}>
            <div className="relative w-fit min-w-8 sm:min-w-10 px-1.5 py-1.5 sm:px-2.5 sm:py-2 text-white text-center text-xs font-semibold rounded-full z-10 bg-red-500 after:block after:content-[''] after:absolute  after:left-1/2  after:-bottom-2  after:w-0  after:h-0  after:border-l-8  after:border-l-transparent  after:border-r-8  after:border-r-transparent  after:border-t-8  after:border-t-red-500  after:transform  after:-translate-x-1/2">
              CHATBOT
            </div>
            <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-red-500 transform -translate-x-1/2" />
          </div>
          <div className="w-11 sm:w-14 h-11 sm:h-14 relative">
            <Icon
              name="Moon"
              alt="챗봇 버튼"
              className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        </button>
      )}
    </>
  );
};
