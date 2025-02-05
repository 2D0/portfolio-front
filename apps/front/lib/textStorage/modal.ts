import type { ModalListType } from '@/interface';

export const ModalList: ModalListType = {
  1: [
    {
      id: 0,
      senderId: '2d0',
      receiverId: 'anon',
      contentList: [
        { type: 'text', content: '반갑습니다. 우주 챗봇 2D0 입니다.' },
        {
          type: 'text',
          content: '이름 어떻게 되시나요?',
        },
      ],
    },
    {
      id: 1,
      senderId: 'anon',
      receiverId: '2d0',
      contentList: [{ type: 'input', nextStep: 2 }],
    },
  ],
  2: [
    {
      id: 2,
      senderId: '2d0',
      receiverId: 'anon',
      contentList: [
        {
          type: 'name',
          selectName: 'visitor',
          content: '님..! 이곳에 오게된 계기가 무엇인가요?',
          selectList: [
            { id: 'career', content: '채용하기 위해' },
            { id: 'watch', content: '구경하기 위해' },
            { id: 'curious', content: '궁금해서' },
          ],
          nextStep: 3,
        },
      ],
    },
  ],
  3: [
    {
      id: 3,
      senderId: '2d0',
      receiverId: 'anon',
      contentList: [
        {
          type: 'select',
          content: '이곳에 오신 소감이 어떠신가요?',
          selectName: 'thought',
          selectMap: {
            career: '담당자님이셨군요..(굽신)',
            watch: '우주 손님이셨군요..!',
            curious: '호기심이 많으시군요..!',
          },
          selectList: [
            { id: 'cool', content: '멋져요' },
            { id: 'beautiful', content: '아름다워요' },
            { id: 'interest', content: '흥미로워요' },
          ],
          nextStep: 4,
        },
      ],
    },
  ],
  4: [
    {
      id: 4,
      senderId: '2d0',
      receiverId: 'anon',
      contentList: [
        {
          type: 'select',
          selectName: 'thought',
          selectMap: {
            cool: `멋지다니..! 당신도 멋져요..😎`,
            beautiful: `아름답다니..! 당신도 아름다워요..🌹`,
            interest: `흥미롭다니..! 저두요..😝`,
          },
        },
        {
          type: 'select',
          selectName: 'score',
          content: '이곳을 만든 제가 마음에 드시나요?',
          selectList: [
            { id: 'yes', content: '네' },
            { id: 'ofcourse', content: '당연하죠' },
            { id: 'hum', content: '음..' },
          ],
          nextStep: 5,
        },
      ],
    },
  ],
  5: [
    {
      id: 5,
      senderId: '2d0',
      receiverId: 'anon',
      contentList: [
        {
          type: 'select',
          selectName: 'score',
          selectMap: {
            yes: '긍정적인 평가',
            ofcourse: '격렬한 환영이라니!',
            hum: '마음에 와닿지 않으신가 보군요... 그래도',
          },
          content: '감사합니다 :) 앞으로 더 발전하기 위해 노력하겠습니다.',
        },
      ],
    },
  ],
};
