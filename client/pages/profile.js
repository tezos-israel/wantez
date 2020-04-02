import React from "react";
import propTypes from "prop-types";

import { useFetchUser } from "../hooks/use-user";
import Layout from "../components/layout";

ProfileCard.propTypes = {
  user: propTypes.shape({
    picture: propTypes.string.isRequired,
    nickname: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
  }),
};

function ProfileCard({ user }) {
  return (
    <>
      <h1>Profile</h1>

      <div>
        <h3>Profile (client rendered)</h3>
        <img src={user.picture} alt="user picture" />
        <p>nickname: {user.nickname}</p>
        <p>name: {user.name}</p>
      </div>
    </>
  );
}

function Profile() {
  const { user, loading } = useFetchUser({ required: true });

  return (
    <Layout user={user} loading={loading}>
      {loading ? <>Loading...</> : <ProfileCard user={user} />}
    </Layout>
  );
}

export default Profile;
