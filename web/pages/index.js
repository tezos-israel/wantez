import React from "react";

import { useQuery } from "@apollo/client";
import { Paper } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { useTezosContext } from "hooks/TezosContext";
import { BountiesTable } from "components/BountiesTable";

import { GET_BOUNTIES } from "queries/bounties";
import Layout from "components/Layout";

const Home = () => {
  const { data, ...queryState } = useQuery(GET_BOUNTIES);
  const { ...tezosState } = useTezosContext();

  const loading = tezosState.loading || queryState.loading;
  if (loading) {
    return <div>Loading...</div>;
  }

  const error = tezosState.error || queryState.error;
  if (error) {
    return (
      <Layout>
        <Alert severity="error">
          <AlertTitle>Failed loading bounties</AlertTitle>
          {error.message}
        </Alert>
      </Layout>
    );
  }
  return (
    <Layout>
      <Paper>
        <div>{process.env.DOMAIN}</div>
        <BountiesTable bounties={data.bounty} />
      </Paper>
    </Layout>
  );
};

export default Home;
