import { useModal } from '@/contexts/modal.context';
import { Icon } from '@repo/ui/components';
import { BlockChat } from './block-chat';

export const ModalChatbot = () => {
  const { isModal, setIsModal } = useModal();

  return (
    <>
      {isModal ? (
        <div className=" max-w-80 w-full max-h-[500px] h-full fixed bottom-4 left-4 z-50 rounded-lg p-4 pt-0 bg-white">
          <button
            className="grid place-content-center w-5 h-5 ml-auto -mr-3"
            onClick={() => setIsModal(false)}
          >
            <span className="block relative w-3 h-0.5 before:block before:content-[''] before:w-full before:h-full before:absolute before:bg-[#222] before:rounded-md before:-rotate-45 after:block after:content-[''] after:w-full after:h-full after:absolute after:bg-[#222] after:rounded-md after:rotate-45" />
          </button>
          <div className="w-full h-full bg-[#333] rounded-md">
            <BlockChat
              text={`반갑습니다.
          우주 로봇 2D0 입니다.`}
            />
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
