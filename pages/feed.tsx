import withSession from "../lib/session";
import GetTokensFromServer from "../lib/getTokens";
import GetUserFromServer from "../lib/getUser";
import FeedScroller from "../components/FeedScroller";
import { GetServerSideProps } from "next";
import User from "../types/User";

export const getServerSideProps: GetServerSideProps = withSession(async function ({ req, res }) {
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

  return {
      props:{
          user: user
      }
  }
});

export default function Feed({ user }: { user: User}) {
  return (
      <div className="pageContainer">
          <FeedScroller team={user.userTeam}/>
      </div>
  );
};
