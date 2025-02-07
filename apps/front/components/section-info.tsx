import { type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ImageBox } from '@repo/ui/components';
import { BackgroundStars } from '@components/background-stars';

export const SectionInfo = (props: HTMLAttributes<HTMLDivElement>) => {
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  return (
    <section
      {...props}
      className="w-full min-h-screen h-fit flex flex-col items-center justify-center relative"
    >
      <div className="h-24" />
      <div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-[max-content_1fr] place-items-center gap-6 dm:gap-16 page-inner relative sm:absolute z-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -250, y: -150, scale: 0.5 }}
          animate={
            inView
              ? { opacity: 1, x: 0, y: 0, scale: 1 }
              : { opacity: 0, x: -250, y: -150, scale: 0.5 }
          }
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <ImageBox
            imagePorps={{
              src: '/images/source/char-diane.png',
              alt: 'char-diane',
              width: 400,
              height: 400,
            }}
            rounded="none"
            className="relative w-[180px] sm:w-[250px] md:w-[300px] xl:w-[400px] h-[180px] sm:h-[250px] md:h-[300px] xl:h-[400px]"
          />
        </motion.div>
        <motion.ul
          className="grid gap-6 md:gap-10 xl:gap-20"
          initial={{ opacity: 0, x: 250, y: -150, scale: 0.5 }}
          animate={
            inView
              ? { opacity: 1, x: 0, y: 0, scale: 1 }
              : { opacity: 0, x: 250, y: -150, scale: 0.5 }
          }
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <li className="flex flex-col gap-2 md:gap-4">
            <h3 className="text-xl md:text-2xl xl:text-3xl font-bold">
              ❤️‍🔥 내 삶의 원동력 프론트엔드 개발 ❤️‍🔥
            </h3>
            <p className="text-base md:text-lg xl:text-xl">
              살면서 하고 싶은 게 생기면 그&nbsp;
              <span className="text-blue-200">
                꿈에 근처에라도 가보기 전까진 단 한 번도 포기한 적 없었습니다.
              </span>
              &nbsp;이 경험으로 나라는 사람은 하고 싶은 건 무조건 해내는구나
              용기와 믿음을 얻었습니다. 틈틈이
              <span className="text-blue-200">
                cs 지식 및 프론트 개발 관련 강의 시청 혹은 문서를 읽고 노션에
                습득한 지식을 정리
              </span>
              하거나 사이드 프로젝트 작업을 하여 지식과 스킬을 늘려 비전공자
              개발자 이지만 전공자 개발자와 견주어도 손색없도록 공부하고
              있습니다. 멈추지 않으면 실패는 없다 생각합니다.&nbsp;
              <span className="text-blue-200">
                도전하면 50% 도전 안 하면 0% 라는 마인드로 속도가 아닌 방향
              </span>
              을 중요시하여 내가 원하는 목표를 향해 믿음을 가지고 나아가고
              있습니다.
            </p>
          </li>
          <li className="flex flex-col gap-2 md:gap-4">
            <h3 className="text-xl md:text-2xl xl:text-3xl font-bold">
              🪡 섬세한 퍼블리싱이 가능한 프론트엔드 개발자 🪡
            </h3>
            <p className="text-base md:text-lg xl:text-xl">
              3년 차의 프론트 및 퍼블리셔 직무 경험으로&nbsp;
              <span className="text-blue-200">
                반응형과 스타일 모듈화를 시켜 섬세한 퍼블리싱이 가능
              </span>
              하며 세련된 코드를 짜기 위해 작업 전&nbsp;
              <span className="text-blue-200">
                데이터 구조에 대해 연구하며 component 동작 원리를 파악 후 기능을
                구현
              </span>
              합니다. 구현이 완료되면 중복되는 코드는 모듈화 시키고 통일할 수
              있는 코드를 줄여 렌더링 속도가 상향될 수 있도록 리팩토링하고
              있습니다. 알고 있는 이상 모르는 척할 수 없는 대충이 불가능한
              개발자이기 때문에 제 손에 거친 프로젝트들은&nbsp;
              <span className="text-blue-200">
                최신 트렌드를 적용하거나 새롭게 알게 된 더 나은 방법을
                적용하면서 최고의 퀄리티를 가질 수 있도록 끊임없이 연구하고 도전
              </span>
              하고 있습니다.
            </p>
          </li>
        </motion.ul>
      </div>
      <div className="block sm:hidden h-48" />
      <BackgroundStars className="w-screen h-full sm:h-screen absolute sm:relative -z-10 sm:z-0" />
    </section>
  );
};
