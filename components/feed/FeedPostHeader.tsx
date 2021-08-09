import { FeedPost } from "../../types/Feed";
import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import Modal from "react-modal";
import ReportModal from "../ReportModal";
import { useState } from "react";
import { ReportType } from "../../types/Report";
import { useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import toast from "react-hot-toast";

const { DateTime } = require("luxon");

const FeedPostHeader = ({ post }: { post: FeedPost }) => {
  const appStore = useSelector((state: StoreState) => state.app);
  const { currentChatUUID, currentChat, currentUser, latestChatMessage } =
    appStore;
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        className="modal"
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        overlayClassName="reactmodaloverlay"
      >
        <ReportModal
          reportType={ReportType.Feed}
          reportId={post.postId.toString()}
          reporterUUID={currentUser.userUUID}
          onCancel={() => {
            setModalOpen(false);
          }}
          onReport={() => {
            setModalOpen(false);
            toast(
              "Report submitted successfully, thanks for keeping Gary Portal safe!",
              {
                duration: 5000,
                position: "bottom-center",
                className: "gptoast",
              }
            );
          }}
        />
      </Modal>

      <div className="w-full py-3 flex flex-row">
        <img
          src={post.posterDTO.userProfileImageUrl}
          className="w-12 h-12 rounded-full"
        />
        <p className="self-center px-3 font-bold">
          {post.posterDTO.userFullName}
        </p>
        <p className="self-center px-3 italic font-extralight text-sm">
          {DateTime.fromMillis(
            new Date(post.postCreatedAt).getTime()
          ).toRelative()}
        </p>
        <span className="flex-1"></span>
        <DotsCircleHorizontalIcon className="w-8 h-8 cursor-pointer hover:scale-110" onClick={() => { setModalOpen(true); }}/>
      </div>
    </div>
  );
};

export default FeedPostHeader;
