import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { Paper, Typography, Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import { useQuery, useMutation } from "@apollo/client";

import { useTezosContext } from "hooks/TezosContext";
import { useFetchUser } from "lib/user";
import { ConfirmDialog, useDialog } from "components/ConfirmDialog";
import {
  BOUNTY_QUERY,
  GET_BOUNTIES,
  REFUND_BOUNTY,
  APPROVE_APPLICATION,
} from "queries/bounties";
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
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [refundBountyDB] = useMutation(REFUND_BOUNTY, {
    update: updateCacheAfterRefund,
  });

  const [approveApplicationDB] = useMutation(APPROVE_APPLICATION, {
    update: updateCacheAfterApproval,
  });

  const {
    refundBounty: refundBountyTezos,
    approveApplication: approveApplicationTezos,
  } = useTezosContext();

  const {
    isOpen: isConfirmRefundDialogOpen,
    toggle: toggleConfirmRefundDialog,
  } = useDialog();

  const {
    isOpen: isConfirmApproveDialogOpen,
    toggle: toggleConfirmApproveDialog,
  } = useDialog();

  if (loading || userState.loading) {
    return <div>Loading...</div>;
  }

  const { bounty_by_pk: bounty } = data;

  if (error || !bounty) {
    return (
      <Alert severity="error">
        <AlertTitle>Failed loading bounty</AlertTitle>
        {error && error.message}
      </Alert>
    );
  }

  const userApplication =
    user &&
    bounty.applications.find((a) => a.applicant.username === user.nickname);
  const userIsOwner = user && user.nickname === bounty.funder.username;
  const buttons = renderButtons(
    bountyId,
    !["canceled", "finished"].includes(bounty.status),
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
      <ApplicationsTable
        applications={bounty.applications}
        isOwner={userIsOwner}
        onApproveClick={openConfirmApplicationDialog}
      />
      <ConfirmDialog
        isOpen={isConfirmRefundDialogOpen}
        onOk={refundBounty}
        onCancel={toggleConfirmRefundDialog}
      />
      <ConfirmDialog
        isOpen={isConfirmApproveDialogOpen}
        onOk={() => approveApplication(selectedApplication)}
        onCancel={toggleConfirmApproveDialog}
      />
    </Paper>
  );

  function openConfirmApplicationDialog(application) {
    setSelectedApplication(application);
    toggleConfirmApproveDialog();
  }

  function updateCacheAfterRefund(cache, { data }) {
    let existingBountiesQuery;
    try {
      existingBountiesQuery = cache.readQuery({
        query: GET_BOUNTIES,
      });
    } catch (e) {
      //
    }
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

  function updateCacheAfterApproval(cache, { data }) {
    let existingBountiesQuery;
    try {
      existingBountiesQuery = cache.readQuery({
        query: GET_BOUNTIES,
      });
    } catch (e) {
      //
    }
    const applicationId = data.update_application_by_pk.id;
    if (existingBountiesQuery) {
      const newBounties = existingBountiesQuery.bounty.map((bounty) => {
        if (bounty.id !== bountyId) {
          return bounty;
        }
        return transformBounty(bounty);
      });

      cache.writeQuery({ query: GET_BOUNTIES, data: { bounty: newBounties } });
    }

    cache.writeQuery({
      query: BOUNTY_QUERY,
      data: { bounty_by_pk: transformBounty(bounty) },
    });

    function transformBounty(bounty) {
      const applications = bounty.applications.map((application) => {
        if (application.id !== applicationId) {
          return { ...application, status: "dismissed" };
        }
        return { ...application, status: "approved" };
      });
      return { ...bounty, status: "finished", applications };
    }
  }

  async function refundBounty() {
    try {
      await refundBountyTezos(bounty);
      await refundBountyDB({ variables: { id: bounty.id } });
    } catch (err) {
      console.error(err);
      toggleConfirmRefundDialog();
    }
  }

  async function approveApplication(application) {
    try {
      await approveApplicationTezos(bountyId, application.paymentAddress);
      await approveApplicationDB({
        variables: { bountyId, applicationId: application.id },
      });
      toggleConfirmApproveDialog();
    } catch (err) {
      console.error(err);
    }
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
