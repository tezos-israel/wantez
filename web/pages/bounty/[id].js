import React from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";

import { useFetchUser } from "lib/user";
import { ConfirmDialog, useDialog } from "components/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
  header: { display: "flex" },
  buttons: { marginLeft: "auto" },
}));

const BOUNTY_QUERY = gql`
  query($id: uuid!) {
    bounty_by_pk(id: $id) {
      title
      fee
      funder {
        username
      }
    }
  }
`;

export default function BountyPage() {
  const { user, ...userState } = useFetchUser();
  const classes = useStyles();
  const router = useRouter();
  const { data, loading, error } = useQuery(BOUNTY_QUERY, {
    variables: { id: router.query.id },
  });

  const {
    isOpen: isConfirmRefundDialogOpen,
    toggle: toggleConfirmRefundDialog,
  } = useDialog();

  if (loading || userState.loading) {
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
      <div className={classes.header}>
        <Typography variant="h4">{bounty.title}</Typography>
        <div className={classes.buttons}>
          {user &&
            (user.nickname === bounty.funder.username ? (
              <Button onClick={toggleConfirmRefundDialog}>Refund</Button>
            ) : (
              <Button disabled>Apply</Button>
            ))}
        </div>
      </div>
      <Typography variant="body1">{bounty.fee}</Typography>
      <Typography variant="body1">{bounty.funder.name}</Typography>
      <ConfirmDialog
        isOpen={isConfirmRefundDialogOpen}
        onOk={refundBounty}
        onCancel={toggleConfirmRefundDialog}
      />
    </Paper>
  );

  function refundBounty() {}
}
