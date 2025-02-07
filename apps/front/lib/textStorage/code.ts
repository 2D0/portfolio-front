import type { CodeListType } from '@/interface';

export const CodeList = {
  Component: {
    codeMap: [
      {
        name: 'page.tsx',
        code: `'use client';
import { useState } from 'react';
import { RadioGroup, InputTab } from '@repo/ui/components';

export default function Page(): JSX.Element {
return (
    <main className="flex justify-center gap-x-8">
      <div className="flex flex-col gap-y-4">
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
            labelProps: {},
          }}
          labelProps
        >
          <InputTab value="사과">사과</InputTab>
          <InputTab value="배" checked>
            배
          </InputTab>
          <InputTab value="바나나">바나나</InputTab>
        </CheckboxGroup>
      </div>
      <div className="flex flex-col gap-y-4">
        <RadioGroup
          name="기본라디오"
          selectvalue="하트"
          className="flex gap-2"
        >
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
    </main>
  );
}`,
      },
      {
        name: 'RadioGroup.tsx',
        code: `'use client';
import { Children, cloneElement, ReactElement, useState } from 'react';
import type { InputBoxPorps } from '@repo/ui/interface';

interface RadioProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  selectvalue: string;
  children: Array<ReactElement>;
}
type RadioGroupProps = RadioProps &
  Pick<InputBoxPorps, 'labelProps' | 'typeProps'>;

export const RadioGroup = (props: RadioGroupProps) => {
  const {
    children,
    name,
    selectvalue,
    labelProps,
    typeProps,
    onChange,
    ...rest
  } = props;
  const [radioValue, setRadioValue] =
    useState<RadioGroupProps['selectvalue']>(selectvalue);

  const renderChild = (child: ReactElement) => {
    const childValue = child.props.value;

    return cloneElement(child, {
      type: 'radio',
      name,
      labelProps,
      typeProps,
      checked: radioValue === childValue,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(childValue);
        onChange?.(event);
      },
    });
  };

  return <div {...rest}>{Children.map(children, renderChild)}</div>;
};`,
      },
      {
        name: 'InputTab.tsx',
        code: `'use client';
import { useId } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@repo/commons/cn';
import type { InputBoxPorps } from '@repo/ui/interface';

const TypeVariants = cva('block w-5 h-5 border border-gray', {
  variants: {
    variant: {
      checkbox:
        "rounded-sm relative before:block before:content-[''] before:absolute before:w-[1.5px] before:h-[5.5px] before:bottom-[5.5px] before:left-[5.5px] before:-rotate-45 before:rounded-md after:content-[''] after:absolute after:w-[1.5px] after:h-[10px] after:bottom-[4.5px] after:right-[6px] after:rotate-45 after:rounded-md",
      radio:
        "grid place-content-center rounded-full before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-300",
    },
    checked: {
      true: 'before:bg-white after:bg-white bg-purple-500',
      false: '',
    },
    defaultVariants: {
      variant: 'checkbox',
    },
  },
});

const LabelVariants = cva('border-2', {
  variants: {
    variant: {
      default: 'border-purple-500 hover:bg-purple-400',
      primary: 'border-blue-400 hover:bg-blue-300',
      destructive: 'border-red-500 hover:bg-red-400',
      disabled: 'border-gray-400 hover:bg-gray-300',
    },
    ghost: {
      true: 'bg-transparent',
      false: '',
    },
    size: {
      default: 'w-fit h-8 px-4',
      lgfit: 'w-fit h-10 px-5',
      sm: 'w-14 h-8',
      md: 'w-20 h-8',
      lg: 'w-36 h-10',
      xl: 'w-52 h-10',
      smfull: 'w-full h-8 min-w-14 px-4',
      lgfull: 'w-full h-10 min-w-20 px-5',
    },
    rounded: {
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
      none: 'rounded-none',
    },
    checked: {
      true: 'text-white imageWhite',
      false: '',
    },
  },
  compoundVariants: [
    {
      checked: true,
      variant: 'default',
      className: 'bg-purple-500',
    },
    {
      checked: true,
      variant: 'primary',
      className: 'bg-blue-500',
    },
    {
      checked: true,
      variant: 'destructive',
      className: 'bg-red-500',
    },
    {
      checked: true,
      variant: 'disabled',
      className: 'bg-gray-400',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'default',
    rounded: 'full',
  },
});

export const InputTab = (props: InputBoxPorps) => {
  const {
    children,
    className,
    labelProps,
    typeProps,
    checked,
    type = 'checkbox',
    ...rest
  } = props;

  const id = useId();

  return (
    <div className="group">
      {/* 코드 랜더를 위해 백틱과 템플릿 리터럴을 임시로 없앴습니다. */}
      <input
        {...rest}
        type={type}
        id={'{rest.name ?? id}-{rest.value}'}
        checked={checked}
        hidden
      />
      <label
        htmlFor={'{rest.name ?? id}-{rest.value}'}
        className={cn(
          'flex justify-center items-center gap-2 w-fit font-mideum leading-none text-white transition-colors duration-200 whitespace-nowrap cursor-pointer',
          labelProps && LabelVariants({ ...labelProps, checked }),
          className,
        )}
      >
        {!labelProps && (
          <i
            className={cn(
              TypeVariants({ ...typeProps, variant: type, checked }),
            )}
          />
        )}
        {children}
      </label>
    </div>
  );
};`,
      },
      {
        name: 'interface.d.ts',
        code: `export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'id'>,
    PropsWithChildren {
  type?: 'checkbox' | 'radio';
  value: string;
  className?: string;
}
export type LabelProps = InputProps & {
  labelProps: VariantProps<typeof LabelVariants>;
  typeProps?: never;
};
export type TypeProps = InputProps & {
  typeProps?: VariantProps<typeof TypeVariants>;
  labelProps?: never;
};
export type InputBoxPorps = TypeProps | LabelProps;
`,
      },
    ],
    stack: ['Next.js14', 'TypeScript', 'Turborepo', 'TailwindCSS'],
    view: true,
  },
  'Next.js14': {
    codeMap: [
      {
        name: 'page.tsx',
        code: `import { getUseCount } from './page.server.tsx';
import { handleSubmit } from './page.action';
import { Text } from '@lib/textStorage/mainPageText.tsx';
import { UI } from './page.client.tsx';

export const revalidate = 300;

export default async function Home() {
  const { count } = await getUseCount();

  return <UI count={count} text={Text} handleSubmit={handleSubmit} />;
}
`,
      },
      {
        name: 'page.client.tsx',
        code: `'use client';
import { useRecoilValue } from 'recoil';
import { languageState } from '@repo/commons/atoms';
import { cn } from '@repo/commons/cn';
import { gugi, mochiyPopOne } from '@repo/ui/fonts';
import { Share } from '@repo/ui/components';
import { DogNameForm } from '@components/index';
import { ShareText } from '@lib/textStorage/shareText';
import Image from 'next/image';

interface UIProps {
  handleSubmit: (event: FormData) => Promise<{ message?: string } | undefined>;
  count: number;
  text: {
    [key: string]: {
      title: {
        deep: string;
        accent: string;
      };
      caption: string;
      count: string;
      unit: string;
      formText: {
        placeholder: string;
        startButton: string;
      };
    };
  };
}

export const UI = ({ count, text, handleSubmit }: UIProps) => {
  const language = useRecoilValue(languageState);
  const { title, caption, count: countText, unit, formText } = text[language];

  return (
    <div className="page-inner py-10 sm:py-14">
      <main className="block-gap w-full">
        <div className="w-[83%] sm:w-[90%]">
          <Image
            className="mb-6 sm:mb-1"
            src="/images/source/main-char.png"
            alt="퍼피티아이"
            layout="responsive"
            width={584}
            height={386}
            priority
          />
        </div>
        <div className="grid gap-5 sm:gap-3">
        {/* 코드 랜더를 위해 백틱과 템플릿 리터럴을 임시로 없앴습니다. */}
          <h1
            className={cn([
              language === 'JA'
                ? '{mochiyPopOne.className} text-[9vw] sm:text-5xl'
                : '{gugi.className} text-[12vw] sm:text-7xl',
              'text-center',
            ])}
          >
            <span className="text-deep">{title.deep}</span>
            <span className="text-accent">{title.accent}</span>
          </h1>
          <p className="text-[4vw] sm:text-2xl text-center font-bold text-primary">
            {caption}
          </p>
        </div>
        <DogNameForm handleSubmit={handleSubmit} formText={formText} />
        <Share shareText={ShareText} />
        <div className="flex gap-3 justify-center items-center">
          <span>{countText}</span>
          <i className="block w-[1px] h-3 bg-foreground" />
          {count} {unit}
        </div>
      </main>
    </div>
  );
};
`,
      },
      {
        name: 'page.server.tsx',
        code: `import 'server-only';
import { kv } from '@vercel/kv';
import { track } from '@vercel/analytics/server';
import { CountText } from '@repo/commons/textStorage/countText.tsx';

export const getUseCount = async () => {
  try {
    const count = await kv.get('puppyti-count');
    return {
      count: count as number,
    };
  } catch (error) {
    track('에러 발생', {
      error: JSON.stringify({
        name: error.name,
        message: error.message,
        stack: error.stack,
      }),
    });
    return {
      count: CountText.puppyti,
    };
  }
};
`,
      },
      {
        name: 'page.action.tsx',
        code: `import { redirect } from 'next/navigation';
import { track } from '@vercel/analytics/server';
import { kv } from '@vercel/kv';
import { createClient } from '@repo/commons/supabase/createClient.ts';

export const mutateUseCount = async (count: number) => {
  const supabase = createClient();
  const { data: useCount, error: useError } = await supabase
    .from('use_count')
    .update({ count: count })
    .match({ id: 2 });

  return { useCount, useError };
};

export const mutateCount = async () => {
  await kv.incr('puppyti-count');
};

export const handleSubmit = async (form: FormData) => {
  'use server';
  const name = form.get('name') as string;

  if (name === '') {
    return { message: '이름을 입력해주세요.' };
  }
  await mutateCount().then(() => {
    track('테스트 시작');
    {/* 코드 랜더를 위해 백틱과 템플릿 리터럴을 임시로 없앴습니다. */}
    redirect('check/{encodeURI(name)}');
  });

  return undefined;
};
`,
      },
    ],
    stack: [
      'Next.js14',
      'TypeScript',
      'Supabase',
      'Turborepo',
      'Vercel',
      'TailwindCSS',
    ],
  },
  'Atomic System': {
    codeMap: [
      {
        name: 'atom',
        code: `import React from 'react';
import { DefaultText, DefaultTextLink } from './TextDefault.style';
import type { TypeText } from 'interface';

const TextDefault = ({
  textDefaultData,
  addTextDefaultData,
}: {
  textDefaultData: TypeText;
  addTextDefaultData?: Omit<TypeText, 'text'>;
}) => {
  const finalTextData = Object.assign({}, textDefaultData, addTextDefaultData);
  const { url, text, target } = finalTextData;

  return url ? (
    <DefaultTextLink
      to={url}
      target={target || '_self'}
      $textDefaultData={finalTextData}
    >
      {text}
    </DefaultTextLink>
  ) : (
    <DefaultText $textDefaultData={finalTextData}>{text}</DefaultText>
  );
};
export default TextDefault;`,
      },
      {
        name: 'molecule',
        code: `import React from 'react';
import { A11yHidden } from 'src/styles/Common.style';
import { PercentBarWrap, PercentBarFill } from './PercentBar.style';
import { TextDefault } from 'src/components/atoms';

export const PercentBar = ({
  percentBarData,
}: {
  percentBarData: {
    dataLength: number;
    step: number;
  };
}) => {
  const { dataLength, step } = percentBarData;
  const percent = (100 / dataLength) * step;

  return (
    <PercentBarWrap>
      <PercentBarFill $percentBarData={percent}>
        <div>
          <A11yHidden>{percent}%</A11yHidden>
        </div>
      </PercentBarFill>
      {/* 코드 랜더를 위해 백틱과 템플릿 리터럴을 임시로 없앴습니다. */}
      <TextDefault
        textDefaultData={{
          text: '{step}/{dataLength}',
        }}
      />
    </PercentBarWrap>
  );
};
`,
      },
      {
        name: 'organism',
        code: `import React from 'react';
import { TypeList } from 'interface';

export const BlockList = ({
  contentType: Content,
  blockListData,
  blockListTable,
}: TypeList) =>
Array.isArray(blockListTable) &&
blockListTable.map((item, index) => {
  const finalItem = Object.assign({}, item, blockListData);

  return (
    (blockListData?.limit ?? index + 1) > index && (
      <li key={item.id ?? index}>
        <Content
          contentData={{
            ...finalItem,
            index: item.index ?? index,
          }}
        />
      </li>
    )
  );
});`,
      },
      {
        name: 'template',
        code: `import React from 'react';
import {
  FormSnsLoginWrap,
  FormSnsLoginBottom,
  FormSnsLoginButtons,
} from './FormSnsLogin.style';
import { ButtonDefault } from 'src/components/atoms';
import { BlockList } from 'src/components/organisms';
import type { TypeButton } from 'interface';

export const FormSnsLogin = ({
  formSnsLoginData,
}: {
  formSnsLoginData: {
    contentType: ({
      buttonDefaultData,
      contentData,
    }: {
      buttonDefaultData?: TypeButton | undefined;
      contentData?: TypeButton | undefined;
    }) => JSX.Element;
    blockListTable: Array<TypeButton>;
    lastButtonData: Partial<TypeButton>;
  };
}) => {
  const { contentType, blockListTable, lastButtonData } = formSnsLoginData;

  return (
    <FormSnsLoginWrap>
      <FormSnsLoginButtons>
        <BlockList contentType={contentType} blockListTable={blockListTable} />
      </FormSnsLoginButtons>
      <FormSnsLoginBottom>
        <ButtonDefault buttonDefaultData={lastButtonData} />
      </FormSnsLoginBottom>
    </FormSnsLoginWrap>
  );
};
`,
      },
    ],
    stack: ['React', 'TypeScript', 'StyledComponents'],
  },
  'Custom Hook': {
    codeMap: [
      {
        name: 'page.tsx',
        code: `'use client';
import { useState } from 'react';
import {
  useTimer,
  useDate,
  type FormatTimeReturnType,
  type DateReturnType,
  type TimerProps,
  type TimerReturnType,
  useFormatTime,
} from '@repo/commons/hooks';
 
 export default function Page(): JSX.Element {
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
     <main>
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
     </main>
   );
 }
 `,
      },
      {
        name: 'useDate.tsx',
        code: `export interface DateReturnType {
  fullDateValue: string;
  dateValue: string;
  timeValue: string;
  year: number;
  month: number;
  date: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export const useDate = (): DateReturnType => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();

  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const milliseconds = today.getMilliseconds();

  {/* 코드 랜더를 위해 백틱과 템플릿 리터럴을 임시로 없앴습니다. */}
  const dateValue = '{year}-{month}-{date}';
  const timeValue = '{hours}:{minutes}:{seconds}';
  const fullDateValue = '{dateValue} {timeValue}';

  return {
    fullDateValue,
    dateValue,
    timeValue,
    year,
    month,
    date,
    day,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
};
`,
      },
      {
        name: 'useFormatTime.tsx',
        code: `export interface FormatTimeReturnType {
  seconds: number;
  minutes: number;
  hours: number;
  formattedTime: string;
  eighteenSeconds: number;
  eighteenMinutes: number;
  eighteenHours: number;
}

export const useFormatTime = (time: number): FormatTimeReturnType => {
  const seconds = Math.floor(time / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const eighteenSeconds = time * 1000;
  const eighteenMinutes = time * 60 * 1000;
  const eighteenHours = time * 60 ** 2 * 1000;

  const displaySeconds = seconds % 60;
  const displayMinutes = minutes % 60;

  let formattedTime =
    displayMinutes.toString().padStart(2, '0') +
    ':' +
    displaySeconds.toString().padStart(2, '0');

  if (hours > 0) {
    formattedTime = hours.toString().padStart(2, '0') + ':' + formattedTime;
  }

  return {
    seconds,
    minutes,
    hours,
    formattedTime,
    eighteenSeconds,
    eighteenMinutes,
    eighteenHours,
  };
};
`,
      },
      {
        name: 'useTimer.tsx',
        code: `import { useState, useEffect } from 'react';
 import { useFormatTime } from '@repo/commons/hooks';
 
 export interface TimerProps {
   timerMode: 'STOPWATCH' | 'TIMER';
   timeValue: number;
 }
 export interface TimerReturnType {
   time: string;
   timerHandler: (timeState: number) => void;
 }
 
 export const useTimer = ({
   timerMode,
   timeValue,
 }: TimerProps): TimerReturnType => {
   const [countTime, setCountTime] = useState<number>(timeValue ?? 0);
   const [isActive, setIsActive] = useState<boolean>(false);
   const { formattedTime: time } = useFormatTime(countTime);
 
   useEffect(() => {
     let interval: ReturnType<typeof setTimeout> | undefined = undefined;
 
     if (isActive && timerMode === 'TIMER' && (countTime ?? 0) > 0) {
       interval = setInterval(() => {
         setCountTime(countTime => (countTime ?? 0) - 1000);
       }, 1000);
     } else if (isActive && timerMode === 'STOPWATCH') {
       interval = setInterval(() => {
         setCountTime(countTime => (countTime ?? 0) + 1000);
       }, 1000);
     } else {
       clearInterval(interval);
     }
 
     return () => clearInterval(interval);
   }, [isActive, countTime, timerMode]);
 
   const timerHandler = (timeState: number) => {
     setIsActive(!!timeState);
   };
 
   return { time, timerHandler };
 };
 `,
      },
    ],
    stack: ['Next.js14', 'TypeScript', 'Turborepo'],
    view: true,
  },
  Context: {
    codeMap: [
      {
        name: 'icon.context.tsx',
        code: `'use client';
import { createContext, useContext, useState } from 'react';
import type { IconNames } from '@repo/ui/interface';

interface IconChangeContextType {
  icon: IconNames;
  setIcon: React.Dispatch<React.SetStateAction<IconNames>>;
}

const IconChangeContext = createContext<IconChangeContextType | null>(null);

export const IconChangeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [icon, setIcon] = useState<IconChangeContextType['icon']>('React');

  return (
    <IconChangeContext.Provider value={{ icon, setIcon }}>
      {children}
    </IconChangeContext.Provider>
  );
};

export const useIconChange = () => {
  const constext = useContext(IconChangeContext);

  if (!constext)
    throw new Error('useIconChange must be used within a IconChangeProvider');

  return constext;
};
`,
      },
      {
        name: 'page.tsx',
        code: `'use client';
import { IconChangeProvider, useIconChange } from '@/contexts/icon.context';
import { Icon } from '@repo/ui/components';
import { IconButtons } from '@components/block-code-view';
import type { IconNames } from '@repo/ui/interface';

export default function Page(): JSX.Element {
  return (
    <main>
      <div className="grid place-items-center gap-4">
        <IconChangeProvider>
          <DisplayData />
        </IconChangeProvider>
      </div>
    </main>
  );
}

const IconMap: Array<IconNames> = ['React', 'Vue', 'TypeScript', 'JavaScript'];
const DisplayData = () => {
  const { icon } = useIconChange();

  return (
    <>
      <div className="w-20 h-20 grid place-items-center bg-white bg-opacity-20 border border-white border-opacity-20 rounded-md">
        <Icon name={icon} size="xl" alt={icon} />
      </div>
      <IconButtons iconMap={IconMap} />
    </>
  );
};`,
      },
      {
        name: 'IconButtons.tsx',
        code: `'use client';
import { useIconChange } from '@/contexts/icon.context';
import { cn } from '@repo/commons/cn';
import type { IconNames } from '@repo/ui/interface';

export const IconButtons = ({ iconMap }: { iconMap: Array<IconNames> }) => {
  const { icon, setIcon } = useIconChange();

  return (
    <ul className="flex gap-2">
      {iconMap.map(iconName => (
        <li key={iconName}>
          <button
            type="button"
            onClick={() => setIcon(iconName)}
            className={cn(
              'px-2 py-1 text-black rounded-md',
              icon === iconName ? '!bg-blue-300' : '!bg-gray-200',
            )}
          >
            {iconName}
          </button>
        </li>
      ))}
    </ul>
  );
};`,
      },
      {
        name: 'Icon.tsx',
        code: `import React from 'react';
import Image from 'next/image';
import type { IconProps } from '@repo/ui/interface';

const IconSizeMap = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 40,
  '2xl': 50,
};

export const Icon = React.memo((props: IconProps) => {
  const { name, size, width, height, ...ohterProps } = props;
  const iconSize = IconSizeMap[size ?? 'lg'];
  const IconSourceMap: Record<IconProps['name'], string> = {
    Global: require('./../images/icons/ico-global.svg'),
    GitHub: require('./../images/icons/ico-github.svg'),
    Notion: require('./../images/icons/ico-notion.svg'),
    Youtube: require('./../images/icons/ico-youtube.svg'),
    Moon: require('./../images/icons/ico-moon.svg'),
    JavaScript: require('./../images/icons/stacks/JavaScript.svg'),
    TypeScript: require('./../images/icons/stacks/TypeScript.svg'),
    jQuery: require('./../images/icons/stacks/jQuery.svg'),
    HTML: require('./../images/icons/stacks/HTML.svg'),
    CSS: require('./../images/icons/stacks/CSS.svg'),
    Figma: require('./../images/icons/stacks/Figma.svg'),
    Jira: require('./../images/icons/stacks/Jira.svg'),
    React: require('./../images/icons/stacks/React.svg'),
    SCSS: require('./../images/icons/stacks/SCSS.svg'),
    StyledComponents: require('./../images/icons/stacks/StyledComponents.png'),
    Supabase: require('./../images/icons/stacks/Supabase.svg'),
    TailwindCSS: require('./../images/icons/stacks/TailwindCSS.svg'),
    Turborepo: require('./../images/icons/stacks/Turborepo.svg'),
    Vue: require('./../images/icons/stacks/Vue.svg'),
    'Next.js14': require('./../images/icons/stacks/Next.js14.svg'),
  };

  return (
    <Image
      src={IconSourceMap[name]}
      {...(size
        ? {
            width: iconSize,
            height: iconSize,
          }
        : { width, height })}
      {...ohterProps}
      style={{
        width: size ? iconSize : width,
        height: size ? iconSize : height,
      }}
    />
  );
});`,
      },
    ],
    stack: ['Next.js14', 'TypeScript', 'Context', 'TailwindCSS'],
    view: true,
  },
} as CodeListType;
