import React from "react";

import { useQuery, gql } from "@apollo/client";
import { Paper } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { useTezosContext } from "hooks/TezosContext";
import { BountiesTable } from "components/BountiesTable";

const FETCH_BOUNTIES = gql`
  {
    bounty {
      title
      id
      fee
      status
    }
  }
`;

const Home = () => {
  const { data, ...queryState } = useQuery(FETCH_BOUNTIES);
  const { ...tezosState } = useTezosContext();

  const loading = tezosState.loading || queryState.loading;
  if (loading) {
    return <div>Loading...</div>;
  }

  const error = tezosState.error || queryState.error;
  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Failed loading bounties</AlertTitle>
        {error.message}
      </Alert>
    );
  }
  return (
    <Paper>
      <BountiesTable bounties={data.bounty} />
    </Paper>
  );
};

export default Home;
