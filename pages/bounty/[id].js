import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
}));

const BOUNTY_QUERY = gql`
  query($id: uuid!) {
    bounty_by_pk(id: $id) {
      title
      fee
      funder {
        name
      }
    }
  }
`;

export default function BountyPage() {
  const classes = useStyles();
  const router = useRouter();
  const { data, loading, error } = useQuery(BOUNTY_QUERY, {
    variables: { id: router.query.id },
  });
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

  const { bounty_by_pk: bounty } = data;
  return (
    <Paper className={classes.root}>
      <Typography variant="h4">{bounty.title}</Typography>
      <Typography variant="body1">{bounty.fee}</Typography>
      <Typography variant="body1">{bounty.funder.name}</Typography>
    </Paper>
  );
}
