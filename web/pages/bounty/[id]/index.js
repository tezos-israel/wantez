import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { Paper, Typography, Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import { useQuery, useMutation } from "@apollo/client";

import { useTezosContext } from "hooks/TezosContext";
import { useFetchUser } from "lib/user";
import { ConfirmDialog, useDialog } from "components/ConfirmDialog";
import { BOUNTY_QUERY, REFUND_BOUNTY, GET_BOUNTIES } from "queries/bounties";
import { ApplicationsTable } from "components/ApplicationsTable";

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
  header: { display: "flex" },
  buttons: { marginLeft: "auto" },
}));

export default function BountyPage() {
  const { user, ...userState } = useFetchUser();
  const classes = useStyles();
  const router = useRouter();
  const bountyId = router.query.id;
  const { data, loading, error } = useQuery(BOUNTY_QUERY, {
    variables: { id: bountyId },
  });

  const [refundBountyDB] = useMutation(REFUND_BOUNTY, {
    onCompleted,
    update: updateCache,
  });

  const { refundBounty: refundBountyTezos } = useTezosContext();

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
  const userApplication =
    user &&
    bounty.applications.find((a) => a.applicant.username === user.nickname);
  const userIsOwner = user && user.nickname === bounty.funder.username;
  const buttons = renderButtons(
    bountyId,
    bounty.status !== "canceled",
    userIsOwner,
    userApplication,
    toggleConfirmRefundDialog
  );

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4">{bounty.title}</Typography>
        <div className={classes.buttons}>{buttons}</div>
      </div>
      <Typography variant="body1">{bounty.fee}</Typography>
      <Typography variant="body1">{bounty.funder.name}</Typography>
      <ApplicationsTable applications={bounty.applications} />
      <ConfirmDialog
        isOpen={isConfirmRefundDialogOpen}
        onOk={refundBounty}
        onCancel={toggleConfirmRefundDialog}
      />
    </Paper>
  );

  function onCompleted() {
    toggleConfirmRefundDialog();
  }

  function updateCache(cache, { data }) {
    const existingBountiesQuery = cache.readQuery({
      query: GET_BOUNTIES,
    });
    const bountyId = data.update_bounty_by_pk.id;
    if (existingBountiesQuery) {
      const newBounties = existingBountiesQuery.bounty.map((bounty) => {
        if (bounty.id !== bountyId) {
          return bounty;
        }
        return { ...bounty, status: "canceled" };
      });

      cache.writeQuery({ query: GET_BOUNTIES, data: { bounty: newBounties } });
    }

    const existingBountyQuery = cache.readQuery({ query: BOUNTY_QUERY });

    const bounty = existingBountyQuery.bounty_by_pk;
    cache.writeQuery({
      query: BOUNTY_QUERY,
      data: { bounty_by_pk: { ...bounty, status: "canceled" } },
    });
  }

  async function refundBounty() {
    try {
      await refundBountyTezos(bounty);
      await refundBountyDB({ variables: { id: bounty.id } });
    } catch (err) {
      console.error(err);
    }
    // refundBountyDB;
  }
}

function renderButtons(bountyId, isAlive, isOwner, application, onRefundClick) {
  if (!isAlive) {
    return null;
  }

  if (isOwner) {
    return <Button onClick={onRefundClick}>Refund</Button>;
  }

  if (application) {
    return null;
  }

  return (
    <Link href={`${bountyId}/application`}>
      <a>Apply</a>
    </Link>
  );
}
