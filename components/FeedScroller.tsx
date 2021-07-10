import { Component, useEffect, useState } from "react";
import FeedPostHeader from "./feed/FeedPostHeader";
import FeedCommentsView from "./feed/FeedCommentsView";
import Modal from "react-modal";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserTeam } from "../types/User";
import { FeedAditLog, FeedMediaPost, FeedPollPost, FeedPost } from "../types/Feed";

export default function FeedScroller({ team }: { team: UserTeam }) {
  const [posts, addPosts] = useState<FeedPost[]>([]);
  const [aditLogs, addAditLogs] = useState({});
  const [lastDate, setLastDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const teamId = team.teamId;

  useEffect(() => {
    getPosts();
    getAditLogs();
  }, []);

  function toggleModal() {
    setModalOpen(true);
  }

  function getPosts() {
    fetch(
      `/api/posts?startFrom=${lastDate.getTime()}&teamId=${teamId}&limit=${10}`
    )
      .then((response) => response.json())
      .then((resp) => {
        addNewPosts(resp);
      });
  }

  function getAditLogs() {
    fetch(`/api/aditLogs?teamId=${teamId}`)
      .then((response) => response.json())
      .then((resp) => {
        joinAditLogs(resp);
      });
  }

  function addNewPosts(newPosts: FeedPost[]) {
    if (newPosts.length > 0) {
      addPosts(posts.concat(newPosts));
      setLastDate(new Date(newPosts[newPosts.length - 1].postCreatedAt));
      setCanLoadMore(true);
    } else {
      setCanLoadMore(false);
    }
  }

  function joinAditLogs(data: FeedAditLog[]) {
    let aditLogs =
      data.length > 0
        ? Object.assign({}, ...data.map((x) => ({ [x.posterUUID]: x })))
        : {};
    addAditLogs(aditLogs);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function getPostContentToDisplay(_post: FeedPost) {
    if (_post.postType === "media") {
      let post: FeedMediaPost = _post as FeedMediaPost;
      if (post.isVideo === true) {
        return (
          <video
            controls
            controlsList="nodownload"
            key={post.postUrl}
            className="max-h-65vh m-auto p-3 mb-3 rounded-md shadow-xl object-cover bg-white dark:bg-darkgray flex-1 object-scale-down"
          >
            <source
              src={post.postUrl}
              type="video/mp4"
              className=" rounded-md"
            ></source>
          </video>
        );
      } else {
        return (
          <img
            src={post.postUrl}
            className="max-w-50% md:max-w-35% m-auto mb-3 rounded-md shadow-xl flex-1"
          ></img>
        );
      }
    } else if (_post.postType === "poll") {
      let post = _post as FeedPollPost;
      return (
        <div className="w-full">
          <h1 className="font-bold text-xl text-center">{post.pollQuestion}</h1>
          {post.pollAnswers.map((answer) => (
            <div
              className={`rounded-md m-3 p-6 bg-gray-800 cursor-pointer md:hover:mb-1 hover:mr-1 hover:ml-1 translate ease-in-out`}
              onClick={toggleModal}
              key={answer.pollAnswerId}
            >
              {answer.answer}
            </div>
          ))}
        </div>
      );
    }

    return <p className="flex-1">Not supported</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-0 md:gap-x-5 overflow-y-hidden pb-3">
      <Modal
        isOpen={modalOpen}
        className="modal"
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
      >
        <span>
          Uh oh! Right now you can only vote on polls from the iOS app, but Gary
          is working hard to make sure you can vote on polls wherever you are,
          check back soon!
        </span>
        <button
          className="rounded-md shadow-lg px-5 py-3 block m-auto bg-green-800 mt-5"
          onClick={closeModal}
        >
          Okay!
        </button>
      </Modal>

      <div className="col-span-1">
        <div className="bg-gray-100 dark:bg-darkgraylight shadow-lg rounded-xl p-5 max-h-50 sticky top-0 self-start text-center">
          <h1 className="pageSubtitle">Gary Portal Feed</h1>
          <h3 className="font-bold">{team.team.teamName}</h3>
          <h3 className="font-bold underline pt-5">Adit Logs:</h3>
          <div
            className={`flex flex-row gap-5 overflow-x-scroll w-full justify-center ${
              Object.keys(aditLogs).length >= 1 ? "block" : "hidden"
            }`}
          >
            {Object.keys(aditLogs).map((aditLogGroup) => (
              <div className="flex-none max-w-52 mt-3 cursor-pointer hover:rounded-md hover:shadow-xl hover:bg-gray-300 dark:hover:bg-gray-800 p-2">
                <img
                  src={aditLogs[aditLogGroup].posterDTO?.userProfileImageUrl}
                  className="w-12 h-12 rounded-full self-center m-auto shadow-xl"
                />
                <p className="font-bold overflow-ellipsis overflow-hidden">
                  {aditLogs[aditLogGroup].posterDTO.userFullName}
                </p>
              </div>
            ))}
          </div>
          <span
            className={`font-bold text-center w-full ${
              Object.keys(aditLogs).length == 0 ? "block" : "hidden"
            }`}
          >
            No Adit Logs! Upload some from the Gary Portal iOS app today!
          </span>
        </div>
      </div>
      <div className="col-span-2 grid grid-cols-1 gap-5 max-h-full overflow-y-auto">
        <InfiniteScroll
          dataLength={posts.length >= 1 ? posts.length : 1}
          next={getPosts}
          hasMore={canLoadMore}
          loader={<p>Loading more posts...</p>}
          endMessage={<p>End of Feed!</p>}
        >
          {posts?.map((post) => (
            <div
              key={post.postId}
              className="bg-gray-100 dark:bg-darkgraylight shadow-lg rounded-xl px-3 mb-5"
            >
              <FeedPostHeader post={post} />
              <div className="flex flex-row gap-1 content-center">
                {getPostContentToDisplay(post)}
                <FeedCommentsView
                  comments={post.comments}
                  description={{
                    desc: post.postDescription,
                    poster: post.posterDTO,
                    postedAt: post.postCreatedAt,
                  }}
                />
              </div>
              <div
                className={`w-full block md:hidden font-bold text-center text-xs p-3 ${
                  post.comments.length > 0 ? "block" : "hidden"
                }`}
              >
                Visit Gary Portal from the iOS app to view comments on this post
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
