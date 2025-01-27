import { useState } from 'react';
import {
  RadioGroup,
  InputTab,
  CheckboxGroup,
  Icon,
  InfinityScrollContainer,
  PostBox,
} from '@repo/ui/components';
import {
  useTimer,
  useDate,
  type FormatTimeReturnType,
  type DateReturnType,
  type TimerProps,
  type TimerReturnType,
  useFormatTime,
} from '@repo/commons/hooks';
import type { PostType } from '@repo/ui/interface';

export const ViewComponent = () => {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <CheckboxGroup
          name="기본체크박스"
          className="flex gap-2"
          allSelect={{
            position: 'top',
            children: (
              <>
                <Icon name="Global" size="md" alt="인풋" />
                기본 체크박스 전체선택
              </>
            ),
          }}
        >
          <InputTab value="사과" checked>
            사과
          </InputTab>
          <InputTab value="배">배</InputTab>
          <InputTab value="바나나" checked>
            바나나
          </InputTab>
        </CheckboxGroup>
        <CheckboxGroup
          name="버튼체크박스"
          className="flex gap-2"
          allSelect={{
            position: 'top',
            children: (
              <>
                <Icon name="Global" size="md" alt="인풋" />
                버튼 체크박스 전체선택
              </>
            ),
            labelProps: {
              variant: 'primary',
            },
          }}
          labelProps={{
            variant: 'primary',
          }}
        >
          <InputTab value="사과">사과</InputTab>
          <InputTab value="배" checked>
            배
          </InputTab>
          <InputTab value="바나나">바나나</InputTab>
        </CheckboxGroup>
      </div>
      <div className="flex flex-col space-y-4">
        <RadioGroup name="기본라디오" selectvalue="하트" className="flex gap-2">
          <InputTab value="하트">❤️ 하트</InputTab>
          <InputTab value="병아리">🐥 병아리</InputTab>
          <InputTab value="별">⭐️ 별</InputTab>
        </RadioGroup>
        <RadioGroup
          name="버튼라디오"
          selectvalue="하트"
          className="flex gap-2"
          labelProps={{
            variant: 'disabled',
          }}
        >
          <InputTab value="하트">❤️ 하트</InputTab>
          <InputTab value="병아리">🐥 병아리</InputTab>
          <InputTab value="별">⭐️ 별</InputTab>
        </RadioGroup>
      </div>
    </>
  );
};

export const ViewTimer = () => {
  const [switchTimerMode, setSwitchTimerMode] =
    useState<TimerProps['timerMode']>('STOPWATCH');
  const { hours }: DateReturnType = useDate();
  const [itemData, setItemData] = useState<number>(hours);
  const { eighteenHours }: FormatTimeReturnType = useFormatTime(itemData);
  const { time, timerHandler }: TimerReturnType = useTimer({
    timerMode: switchTimerMode,
    timeValue: eighteenHours,
  });

  return (
    <div className="grid place-items-center gap-2">
      {switchTimerMode}
      <span className="p-2 border border-white rounded-md">{time}</span>
      <button
        type="button"
        className="py-1 px-2 rounded-md font-bold bg-black bg-opacity-80 hover:bg-opacity-100 transition-opacity duration-300"
        onClick={() => {
          setSwitchTimerMode(
            switchTimerMode === 'TIMER' ? 'STOPWATCH' : 'TIMER',
          );
          timerHandler(eighteenHours);
        }}
      >
        CHANGE AND START
      </button>
    </div>
  );
};

const fetchData = async (
  pageParam: number,
  limit: number,
): Promise<{ rows: Array<PostType>; hasMore: boolean }> => {
  try {
    const res = await fetch(`/api/posts?page=${pageParam}&limit=${limit}`);
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
    const { posts, hasMore } = (await res.json()) as {
      posts: Array<PostType>;
      hasMore: boolean;
    };

    return { rows: posts, hasMore: hasMore };
  } catch (error) {
    return { rows: [], hasMore: false };
  }
};

export const ViewInfinitScroll = () => {
  return (
    <InfinityScrollContainer<PostType>
      limit={2}
      fetchData={fetchData}
      queryKey={'posts'}
      className="w-full max-w-[600px] h-[600px] p-4 rounded-2xl bg-back-section"
      maxPages={10}
    >
      {(item, ref) => <PostBox ref={ref} postContent={item} />}
    </InfinityScrollContainer>
  );
};
