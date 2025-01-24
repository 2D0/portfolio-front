import { StackMap } from '@/interface';

export const StackList = {
  language: [
    {
      name: 'JavaScript',
      title: '연산자 기초 숙지, 함수, 변수, 조건문, 이벤트 핸들링 작업 가능',
      desc: `기본적인 연산자 기호의 뜻이나 상황에 따라 어떤 변수를 쓰는지 알고 있고, 함수 선언 및 조건문을 활용한 이벤트 처리가 가능합니다.
호이스팅 영향을 덜 받기 위해 주로 표현식 함수를 사용하고, 변하지 않는 값인 정수를 선언할 때는 “const” 변하는 값인 변수를 선언할 때는 “let”을 사용하며,
중복으로 쓰이는 데이터는 렌더링 속도를 줄이기 위해 공통 변수를 선언하여 모듈화 시키는 편입니다.
변수와 글자(string)를 합칠 때 템플릿 리터럴을 사용하거나 if else 등 조건문을 줄 때 삼항 연산자를 사용하는 등 불필요한 코드를 줄일 수 있다면 최대한 간단하면서 효율적인 방법을 찾으려 노력하며 작업합니다.`,
    },
    {
      name: 'TypeScript',
      title: '기본적인 타입 및 일부 고급 타입 사용 가능',
      desc: `string, number, boolean과 같은 기본적인 타입을 사용할 수 있습니다.
뿐만 아니라 교차 타입, 유니언 타입, 문자열 리터럴 타입 등 고급 타입을 활용하여 좀 더 정확하고 유연한 타입을 사용할 수 있습니다.
타입 스크립트의 사용 기간이 짧아 모든 고급 타입들을 숙지하지 못했지만 세련되고 효율적인 타입을 선언하기 위해 공부 중이며 현재는 타입 확장을 통한 조건부 타입에 대해 공부하고 있습니다.`,
    },
    {
      name: 'jQuery',
      title: '기본적인 내장 함수 숙지 및 이벤트 구현 가능',
      desc: `렌더링 속도로 인해 제이쿼리를 잘 사용하지 않고 있지만 click, keyUp 등의 이벤트 메소드를 사용해 이벤트 핸들링이 가능합니다.
  each 메소드를 사용해 한꺼번에 중복되는 엘리먼트에 데이터 적용 및 이벤트 핸들링이 가능합니다.`,
    },
    {
      name: 'HTML',
      title: '웹 접근성 준수해서 마크업 짜기 가능',
      desc: `시멘틱 태그를 적극적으로 활용하여 SEO에 최적화될 수 있도록 작업합니다.
  시각 장애인들을 고려하여 홈페이지를 보이스 스피커로 읽을 시 사진과 아이콘 버튼이 무엇인지 알 수 있도록 img 태그의 “art” 속성에 알맞은 설명을 넣고,
  아이콘을 만들기 위한 용도의 태그에는 어떤 목적으로 사용하는지 화면에 출력되지 않지만 dom에는 남아있게 하여 사운드로 읽힐 수 있게 작업합니다.
  간단한 +(플러스), -(마이너스), X(엑스), >(화살표) 등은 자주 사용되는 아이콘이라
  span과 i 등 인라인 요소 태그를 활용하여 길이, 굵기, 색상을 편하게 수정할 수 있도록 css로 고유 아이콘 class 명을 만들어 직접 퍼블리싱으로 구현하고 있습니다.`,
    },
    {
      name: 'CSS',
      title:
        '많은 css 속성들을 암기하고 있고 가장 효율적인 방법으로 스타일 구현 가능',
      desc: `렌더링 시 페인트 단계를 거치지 않게 하기 위해 display:none은 opacity:0으로, 작업하며
  dom에 보일 필요 없는 태그가 필요할 시 before, after를 사용합니다.
  class 작명 시 BEM 방법론을 사용하거나 회사 내의 네이밍 컨벤션을 지켜 협업 시 문제 되지 않도록 작명을 합니다.
  필요에 따라 animate 효과를 사용하며 checkbox, radio 등 섬세한 label 커스텀이 가능합니다.
  버튼, 텍스트 인풋, 라디오, 체크박스, 컬러, 배경 등 공통으로 사용되는 것들은 class 명을 모듈화 시키며,
  동그라미, 세모, 네모, 화살표 등 css로 구현할 수 있는 아이콘들은 다른 페이지에서도 사용할 가능성이 높아
  길이와 굵기 색상을 언제든 편하게 수정할 수 있도록 img를 사용하지 않고 css로 모듈화 시켜 직접 퍼블리싱으로 구현하고 있습니다.`,
    },
  ],
  frontend: [
    {
      name: 'React',
      title: '기본적인 사용법 및 custom hook, react query 사용 가능',
      desc: `자식 component에 props를 전달하는 법을 알고 있으며
react는 단방향 데이터 바인딩이기 때문에 부모에게 props를 전달해야 할 경우
최상위 component 혹은 layout에 state를 만들어 props drilling으로 props를 전달하는 것을 알고 있습니다.
프로젝트가 커질수록 데이터 바인딩이 복잡해지고 props drilling이 많이 생길 수 있기 때문에
상태 관리 툴인 리덕스, 리코일, 주스탠드 등을 사용해 state를 관리하는 것이
프로젝트를 관리하기에 깔끔하고 효율적이라는 것을 알고 있으며 그중 recoil을 사용하여 데이터 관리를 하는 편입니다.
또한 fetch 해온 데이터를 react query와 context를 사용해 다른 페이지에서도 데이터를 사용할 수 있게 작업한 것도 경험해 본 적이 있습니다.
useEffect를 통해 dom이 mount 될 경우 이벤트를 실행되게 하거나
deps에 조건을 넣어 조건이 만족될 경우 이벤트가 실행될 수 있게 작업할 수 있습니다.
useEffect는 페이지가 렌더링 될 때마다 계속해서 이벤트가 실행될 수 있기 때문에
이벤트 실행 코드에 if 문을 넣거나 useMemo 혹은 useCallback을 사용하여 무분별하게 이벤트가 실행되는 것을 막아야 하는 경우도  있다는 것을 알고 있습니다.`,
    },
    {
      name: 'Next.js14',
      title:
        '앱 라우팅 및 api 라우팅 설정 및 next 전용 태그를 통해 데이터를 캐싱 하는 등 기본적인 사용법 숙지',
      desc: `next13 이후 버전의 앱 라우팅하는 법과 api 라우팅하는 방법 및 동적인 페이지 라우팅하는 방법을 알고 있습니다.
client 페이지와 sever 페이지를 구분하여 각자 상황에 맞는 페이지를 연결하고 form action을 사용해 server only로 데이터가 안전하게 전송될 수 있도록 합니다.
next Image 태그를 활용하여 이미지 캐싱 및 최적화에 노력하고 Link 태그를 사용해 페이지를 캐싱 할 수 있도록 합니다.
next의 params 기능을 통해 페이지의 파라미터 데이터를 가져와 필요한 페이지를 노출시킵니다.
최근 5개가량의 프로젝트를 모두 next js 14를 사용했고 기본적인 활용법들을 잘 알고 있습니다.`,
    },
    {
      name: 'Vue',
      title: 'v-if, v-for, @click 등 기본 메소드 숙지 및 라이브러리 연결 가능',
      desc: `같이 다니던 직장 동료분이 html로 만들어진 프로젝트를 vue로 리팩토링 하자 하여 처음 접하게 되었고,
vue로 작업했던 이유는 react에 비해 사용하기 쉽고 특히 양방향으로 데이터 바인딩이 된다는 장점이 있어 사용하였습니다.
간편한 작업이 가능한 대신 양방향 데이터 바인딩으로 인해 데이터가 꼬이거나 에러가 날 수 있다는 단점이 있어
이 점을 유의하여 데이터, 이벤트 정의가 겹치는 게 없는지 확인하며 작업하였습니다.
react의 hook의 useEffect와 같은 원리인 데이터 변경 시 실행되는 watch와 렌더링 시 실행되는 mounted의 개념을 알고 있습니다.
vue는 CSR 프레임워크이기 때문에 SEO 검색엔진에 노출되지 않는 단점이 있어 CSR과 SSR을 병행할 수 있도록  nuxt.js를 사용하여 작업하였습니다.`,
    },
    {
      name: 'Turborepo',
      title:
        '레포들을 하나로 관리하고 공동 데이터와 개별 데이터를 구분하여 작업 및 빌드 가능',
      desc: `apps에서 개별 레포를 관리 및 작업하고 최상단 루트에 있는 packages 속 config를 통해 공통으로 사용할 여러 config들을 설정합니다. 또한 최상단 루트의 packages 속 ui 및 hook에 공통으로 사용할 컴포넌트 및 관련 데이터를 만들어 apps 속 개별 레포에서 공통 자료들을 불러와 사용할 수 있도록 하여 통일성을 지키고 중복 작업을 없애 효율 적으로 작업합니다.
  단 공통으로 사용될 데이터들을 미리 선별 및 기획하여 작업합니다.`,
    },
    {
      name: 'TailwindCSS',
      title:
        'config를 설정해 css를 컨트롤 하고 clsx를 통해 동적인 클래스 병합하여 사용 가능',
      desc: `tailwind.config.ts에 content를 설정해 필요한 클래스만 사용할 수 있도록 하고, 필요한 상황에서는 theme를 통해 클래스를 커스텀 하여 스타일을 적용합니다. 또한 모노레포에서는 공통 config에서 global 로 스타일을 설정한 뒤  prefix를 설정하여 레포마다 개별로 스타일을 적용할 수 있도록 하고 이 외에 다른 옵션들도 필요에 따라 설정하여 사용합니다.
  다만 theme 커스텀 같은 경우는 남용하지 않고 꼭 필요한 경우에만 설정하여 사용할 수 있도록 합니다.
  이외에도 clsx 라이브러리를 활용하여 동적인 클래스들을 tailwind에 머지 하여 사용할 수 있도록 합니다.`,
    },
    {
      name: 'StyledComponents',
      title: 'props 데이터를 활용하여 스타일 구현 가능',
      desc: `component를 pascal case로 작명 후 템플릿 리터럴을 사용해 css style을 등록한 뒤 page에서 component를 import 하여 사용합니다.
  page에서 StyledComponents로 props 전달하는 방식은 일반 component에 전달하는 방법과 동일하며
  템플릿 리터럴 속 스콥과({}) 달러 사인($)을 사용해 props를 전달받은 뒤 state에 따라 스타일이 바뀌도록 연출합니다.`,
    },
    {
      name: 'SCSS',
      title: '@if, @else, & 등 scss 기본 문법 숙지',
      desc: `scss를 사용할 땐 시너지 효과가 있는 BEM 방법론을 같이 사용하며 블록 요소에 중복되는 클래스 명이 있을 경우 코드를 줄이기 위해 & 연산자를 사용합니다.
  조건에 따라 스타일이 바뀌어야 하는 속성이 있을 경우 @if 등 scss의 조건문을 통해 좀 더 효율적이고 짧은 코드를 짤 수 있도록 연구하여 작업합니다.`,
    },
  ],
  backend: [
    {
      name: 'Supabase',
      title:
        '오브젝트 데이터 및 파일 등을 업로드하거나 다운로드할 수 있도록 작업 가능하며 기본적인 auth 설정 사용 가능',
      desc: `supabase 데이터를 get 하거나 post 할 수 있도록 작업 가능하고, storage에 bucket을 만들어 사진 혹은 파일을 업로드하거나 다운로드할 수 있도록 기능 작업 가능합니다.
supabase 기본 기능 중 auth 연결을 통해 회원가입 기능을 간단하게 구현할 수 있습니다. 
백엔드에 능숙하지 못하여 RLS 정책을 설정하는 것이 미숙하지만 supabase에서 기본으로 제공하는 ai 기능을 통해 기본적인 설정이 가능합니다.`,
    },
  ],
  etc: [
    {
      name: 'GitHub',
      title: '브랜치 생성 및 활용이 가능하며 협업에서 필요한 기본 기능 숙지',
      desc: `툴은 소스 트리, 깃허브 데스크톱, 인텔리제이, itrem2를 사용하고 있으며 어떤 부분을 어떻게 수정했는지 알기 쉽게 네이밍 컨벤션을 적용하여  커밋하고 있습니다.
feature 브랜치를 만들어 기능 개발 후 origin 브랜치로 커밋 메시지를 작성하여 push 합니다.
작업 내역의 이미지와 메시지 작성 후 remote 브랜치로 PR(pull request)을 날린 뒤 팀원의 코드 리뷰를 반영하여 remote 브랜치에 최종으로 squash merge 합니다.
merge 후엔 local 브랜치를 최신화 시키기 위해  remote 브랜치를 fetch 한 뒤 local 브랜치를 rebase 하거나 기존 local 브랜치 삭제 후 remote 브랜치를 chekout 하여 필요에 따라 cherry-pick을 적용해 최신 상태로 만듭니다.`,
    },
    {
      name: 'Jira',
      title: '프로젝트 및 티켓 생성 후 진행현 연결하여 오토매틱 설정 가능',
      desc: `프로젝트를 생성한 뒤 티켓을 연결할 깃허브를 연결합니다. 그 후 오토매틱 설정으로 커밋이나 푸시 등 이벤트가 생길 경우 자동으로 티켓이 진행중으로 바뀌거나 완료로 될 수 있도록 규칙을 만들어 처리합니다.
  티켓을 생성할 때는 큰 틀로 할 일을 만들고 하위 항목을 추가하여 세밀한 티켓들을 생성합니다. 
  마지막으로 담당자를 설정하여 작업자를 할당합니다.`,
    },
    {
      name: 'Figma',
      title: '컴포넌트 생성 및 프로토타입 인스턴스 활용으로 디자인 가능',
      desc: `처음 figma 사용은 단순히 포토샵처럼 디자인만 작업하기 위해 사용했었는데
  프론트 개발자로서 디자이너와 협업 능력을 기르기 위해서 component 및 prototype으로 interactions을 활용해 작업해 보았습니다.
  코드로 웹을 구현하는 것과 마찬가지로 figma도 component 하나를 생성한 뒤 여러 곳에 붙여 재활용이 가능했고
  수정이 필요할 시 component 원본을 수정하면 가져다 쓴 모든 component가 같이 수정이 되어 편리했습니다.
  또한  interactions 설정 후 present로 디자인을 보면 클릭했을 때 나타나는 모달 혹은 페이지 전환 등
  동적으로 디자인을 확인할 수 있어 프론트 작업 시 정확도가 높은 작업을 할 수 있겠구나 생각했습니다.`,
    },
  ],
} as Record<string, StackMap[]>;
