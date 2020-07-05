import React from "react";

import { useQuery, gql } from "@apollo/client";
import { Paper } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

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
  const { data, loading, error } = useQuery(FETCH_BOUNTIES);
  if (loading) {
    return <div>Loading...</div>;
  }

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
