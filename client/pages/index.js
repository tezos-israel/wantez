import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Layout from "../components/layout";
import { useFetchUser } from "../hooks/use-user";

const QUERY = gql`
  {
    bounty(limit: 10) {
      fee
      title
      funder {
        email
      }
    }
  }
`;

const Home = () => {
  const { user, loading } = useFetchUser();
  const { loading: loadingBounties, error, data } = useQuery(QUERY);
  return (
    <Layout user={user} loading={loading}>
      <>
        {loading && <p>Loading login info...</p>}

        {!loading && !user && (
          <>
            <p>
              To test the login click in <i>Login</i>
            </p>
            <p>
              Once you have logged in you should be able to click in{" "}
              <i>Profile</i> and <i>Logout</i>
            </p>
          </>
        )}

        {user && (
          <>
            <h4>Rendered user info on the client</h4>
            <img src={user.picture} alt="user picture" />
            <p>nickname: {user.nickname}</p>
            <p>name: {user.name}</p>
          </>
        )}

        {loadingBounties ? (
          <div>Loading bounties</div>
        ) : error ? (
          <div>Failed loading bounties</div>
        ) : (
          <div>{data.bounty[0].fee}</div>
        )}
      </>
    </Layout>
  );
};

export default Home;
