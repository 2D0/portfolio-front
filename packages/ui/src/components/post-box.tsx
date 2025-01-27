import { ImageBox } from './image-box';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@repo/commons/cn';
import type { PostType } from '@repo/ui/interface';

interface PostBoxProps
  extends Partial<React.RefAttributes<HTMLDivElement>>,
    VariantProps<typeof boxVariants> {
  postContent: PostType;
}

const mergeText = (content: Array<PostType['content'][number]>) => {
  let allText = '';
  const firstImage = content.find(item => item.type === 'image');

  for (const item of content) {
    let textLengthLimit = allText.length >= 100;

    if (item.type === 'paragraph' && Array.isArray(item.content)) {
      for (const text of item.content) {
        if (text.type === 'text' && typeof text.text === 'string') {
          allText += text.text;
          if (textLengthLimit) break;
        }
      }
    }
    if (textLengthLimit) break;
  }
  return { allText, firstImage };
};

const boxVariants = cva(
  'flex flex-col gap-3 p-4 sm:p-6 text-white rounded-2xl',
  {
    variants: {
      variant: {
        default: 'bg-black bg-opacity-80',
        transparent: 'bg-gray-100 bg-opacity-10',
      },
      border: {
        default: 'border border-gray-300',
        primary: 'border border-purple-500',
        destructive: 'border border-red-500',
      },
      rounded: {
        default: 'rounded-2xl',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      rounded: 'default',
    },
  },
);

export const PostBox = ({
  variant,
  border,
  rounded,
  postContent,
  ...ref
}: PostBoxProps) => {
  const { allText, firstImage } = mergeText(postContent.content) || {};
  const { src, alt } = firstImage?.attrs || {};

  return (
    <div {...ref} className={cn(boxVariants({ variant, border, rounded }))}>
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-gray-400" />
        <div className="flex flex-col gap-0.5">
          <strong className="accentText text">포도맛주스</strong>
          <span className="caption">1일 전</span>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_max-content] gap-3.5 sm:gap-2.5 h-16 sm:h-24">
        <div className="flex flex-col gap-1">
          <h3 className="subtitle">제목어쩌구저쩌구</h3>
          {allText && (
            <div className="h-fit text-ellipsis line-clamp-2 sm:line-clamp-3 overflow-hidden">
              {allText}
            </div>
          )}
        </div>
        {src && (
          <ImageBox
            imagePorps={{
              src: src,
              width: 200,
              height: 100,
              alt: alt ?? '이미지',
            }}
            className="w-28 sm:w-40 h-full"
          />
        )}
      </div>
    </div>
  );
};
