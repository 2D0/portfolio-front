'use client';
import { ImageBox } from '@repo/ui/components';

interface BlockChatProps {
  text: string;
  selectList?: Array<string>;
}

export const BlockChat = ({ text, selectList }: BlockChatProps) => {
  return (
    <div>
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
      <div className="w-fit p-2 bg-[#DBDBDB] text-[#222] rounded-xl">
        {text}
        {selectList ? (
          <ul>
            {selectList.map(item => (
              <div key={item}>{item}</div>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};
