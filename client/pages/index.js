import React from "react";
import Head from "next/head";
import Link from "next/link";
import Nav from "../components/nav";
import { useUser } from "utils/user";
// import { useQuery, gql } from "@apollo/client";

const Home = () => {
  const { user, loading: loadingUser } = useUser();
  // const { loading, data, error } = useQuery(gql`
  //   {
  //     bounty {
  //       id
  //       fee
  //     }
  //   }
  // `);
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>

      <Nav />

      <div className="hero">
        <h1 className="title">Welcome to useAuth Next.js example!</h1>
        <p className="description">To get started, click that button 👇👇👇</p>
        <p className="description">
          {!loadingUser &&
            (user ? (
              <Link href="/api/logout">
                <a>Logout</a>
              </Link>
            ) : (
              <Link href="/api/login">
                <a>Login</a>
              </Link>
            ))}
        </p>

        <h1 className="title">Hi {user ? user.name : "people"}</h1>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Home;
