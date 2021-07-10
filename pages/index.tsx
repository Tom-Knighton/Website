import Head from "next/head";
import GetTokensFromServer from "../lib/getTokens";
import GetUserFromServer from "../lib/getUser";
import withSession from "../lib/session";
import FeedService from "../network/FeedService";
import { PlayIcon, ChartSquareBarIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Modal from "react-modal";
import { GetServerSideProps } from "next";
import User from "../types/User";
import { FeedPostDTO } from "../types/Feed";

Modal.setAppElement("#__next");

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({ req, res }) {
    let user = await GetUserFromServer(req, res);
    let { token, refresh } = await GetTokensFromServer(req, res);

    if (!user || !token || !refresh) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    let postDTOs = await FeedService.GetPostDTOs(user.userUUID, token);
    return {
      props: {
        user,
        postDTOs,
      },
    };
  }
);

function PostPreviewContent({ post }: { post: FeedPostDTO }) {
  return post.isVideo ? (
    <PlayIcon className="w-16 h-full self-center m-auto" />
  ) : post.postType === "poll" ? (
    <ChartSquareBarIcon className="w-16 h-full self-center m-auto" />
  ) : (
    <img
      src={post.postUrl}
      className="max-w-full max-h-full w-full h-full object-cover rounded-md border-none"
    />
  );
}


export default function Home({ user, postDTOs }: { user: User, postDTOs: FeedPostDTO[] }) {
  const posts = postDTOs;
  return (
    <div>
      <Head>
        <title>Gary Portal</title>
        <meta name="description" content="Gary Portal Website" />
      </Head>
      <div className="pageContainer">
        <div className="profileGrid">
          <div className="profileCard2">
            <div className="flexrow_sm_col">
              <img
                src={user?.userProfileImageUrl}
                className="rounded-full h-28 w-28 shadow-lg md:h-40 md:w-40"
              />
              <div className="flex flex-col px-5 place-items-center md:place-items-start">
                <h1 className="text-3xl font-bold pt-3 md:pt-0">
                  {user?.userFullName}
                </h1>
                <h1 className="text-3xl">{user?.userSpanishName}</h1>
                <h1 className="text-xl italic">@{user?.userName}</h1>
                <button className="mt-1 md:mt-5 p-3 px-5 text-base font-semibold focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200 rounded-xl block border-b border-purple-300 bg-purple-200 hover:bg-purple-300 text-purple-700">
                  Staff Panel
                </button>
              </div>
            </div>
          </div>

          <div className="profileCard row-span-2">
            <div className="flex flex-col place-items-center gap-4">
              <h1 className="text-3xl font-bold">Points:</h1>
              <hr />

              <h1 className="profilePointsText">
                AMIGO POINTS: {user?.userPoints?.amigoPoints?.toLocaleString()}
              </h1>
              <h1 className="profilePointsText">
                POSITIVE POINTS:{" "}
                {user?.userPoints?.positivityPoints?.toLocaleString()}
              </h1>
              <br />
              <h1 className="profilePointsText">
                PRAYERS: {user?.userPoints?.prayers?.toLocaleString()}
              </h1>
              <h1 className="profilePointsText">
                MEANINGFUL PRAYERS:{" "}
                {user?.userPoints?.meaningfulPrayers?.toLocaleString()}
              </h1>
            </div>
          </div>

          <div className="profileCard2  row-span-2">
            <div className="flex flex-col place-items-center gap-4">
              <h1 className="text-3xl font-bold">Statistics:</h1>
              <hr />
              <div className="flexrow_sm_col gap-1">
                <h1 className="profileStatsPre">Amigo Rank:</h1>
                <span className="profileStatsText">
                  {user?.userRanks?.amigoRank?.rankName}
                </span>
              </div>
              <div className="flexrow_sm_col gap-1">
                <h1 className="profileStatsPre flex-1">Positivity Rank:</h1>
                <span className="profileStatsText">
                  {user?.userRanks?.positivityRank?.rankName}
                </span>
              </div>
              <br />
              <div className="flexrow_sm_col gap-1">
                <h1 className="profileStatsPre">Team:</h1>
                <span className="profileStatsText">
                  {user?.userTeam?.team?.teamName}
                </span>
              </div>
              <div className="flexrow_sm_col gap-1">
                <h1 className="profileStatsPre">Team Standing:</h1>
                <span className="profileStatsText">{user?.userStanding}</span>
              </div>
            </div>
          </div>

          <div className="profileCard row-span-2">
            <div className="flex flex-col place-items-center gap-4">
              <h1 className="text-3xl font-bold">Recent Posts:</h1>
              <hr />
              <div className="grid grid-cols-3 gap-y-2 gap-x-2 md:gap-x-5">
                {posts
                  ?.slice(1)
                  .slice(-6)
                  .map((post) => (
                    <div
                      key={post.postId}
                      className="profilePost max-w-40 max-h-40 rounded-lg shadow bg-darkgray overflow-none justify-center place-items-center"
                    >
                      <PostPreviewContent post={post} />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="profileCard2 overflow-x-auto">
            <div className="flex flex-col place-items-center gap-4 overflow-x-auto">
              <h1 className="text-3xl font-bold">Misc:</h1>
              <hr />

              <div className="flex flex-row gap-5 max-w-full overflow-x-auto max-w-full">
                <Link href="/profile/prayerRoom">
                  <div className="miscCard prayer">
                    <h1 className="cardName">Prayer Room</h1>
                    <div className="desc">
                      <span>For all your praying needs</span>
                    </div>
                  </div>
                </Link>

                <Link href="/rules">
                  <div className="miscCard rules">
                    <h1 className="cardName">Rules &amp; Regulations</h1>
                    <div className="desc">
                      <span>
                        The official Rules and Regulations of Gary Portal
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="miscCard feedback">
                  <h1 className="cardName">Feedback</h1>
                  <div className="desc">
                    <span>Provide meaningful feedback to Al Himself</span>
                  </div>
                </div>

                <Link href="/computerdating">
                  <div className="miscCard computer">
                    <h1 className="cardName">Computer Dating</h1>
                    <div className="desc">
                      <span>Re-read the original prophecy</span>
                    </div>
                  </div>
                </Link>

                <div className="miscCard settings">
                  <h1 className="cardName">Settings</h1>
                  <div className="desc">
                    <span>Modify your account settings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
