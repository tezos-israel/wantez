import React from "react";
import isAfter from "date-fns/isAfter";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { Button, Paper, TextField, Grid } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useFetchUser } from "lib/user";
import { useTezosContext } from "hooks/TezosContext";

import { SAVE_BOUNTY, GET_BOUNTIES, DELETE_BOUNTY } from "queries/bounties";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  error: {
    marginBottom: theme.spacing(2),
  },
}));

const CreateBountyPage = () => {
  const { user, ...userState } = useFetchUser();
  const { balance, issueBounty, ...tezosState } = useTezosContext();
  const [deleteBounty] = useMutation(DELETE_BOUNTY, {
    update: updateCacheAfterDelete,
  });
  const [createBounty] = useMutation(SAVE_BOUNTY, {
    update: updateCache,
    onCompleted,
  });
  const { handleSubmit, errors, control } = useForm();
  const [globalError, setGlobalError] = React.useState(null);
  const router = useRouter();
  const classes = useStyles();

  const loading = userState.loading || tezosState.loading;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && !user) {
    router.push("/");
    return null;
  }

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {globalError && (
          <Alert severity="error" className={classes.error}>
            <AlertTitle>Failed submission</AlertTitle>
            {globalError}
          </Alert>
        )}
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <Controller
              fullWidth
              name="title"
              as={TextField}
              control={control}
              id="title-input"
              label="Title"
              rules={{ required: "Title is required" }}
              error={!!errors.title}
              helperText={errors.title && errors.title.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              fullWidth
              name="issueUrl"
              as={TextField}
              control={control}
              id="issue-url-input"
              label="Issue URL"
              rules={{ required: "Issue URL is required" }}
              error={!!errors.issueUrl}
              helperText={errors.issueUrl && errors.issueUrl.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              fullWidth
              name="fee"
              as={TextField}
              control={control}
              id="fee-input"
              label="Fee"
              rules={{
                required: "Fee is required",
                validate: {
                  positiveNumber: (value) =>
                    parseFloat(value, 10) > 0 ||
                    "Fee should be a positive number",
                },
              }}
              type="number"
              step="0.1"
              error={!!errors.fee}
              helperText={errors.fee && errors.fee.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              fullWidth
              name="description"
              as={TextField}
              control={control}
              id="description-input"
              label="Description"
              rules={{ required: true }}
              multiline
              error={!!errors.description}
              helperText={errors.description && "Description is required"}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="deadline"
              as={DateTimePicker}
              control={control}
              id="deadline-input"
              label="Deadline"
              rules={{
                required: "Field is required",
                validate: (value) =>
                  isAfter(value, Date.now()) || "Should be after today",
              }}
              minDate={Date.now()}
              minDateMessage="Date should be after today"
              helperText={errors.deadline && errors.deadline.message}
              error={!!errors.deadline}
              variant="inline"
            />
          </Grid>
          <Grid item style={{ marginTop: 16 }}>
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );

  function updateCache(cache, { data }) {
    let existingBountiesQuery = null;
    try {
      existingBountiesQuery = cache.readQuery({
        query: GET_BOUNTIES,
      });
    } catch (e) {
      return;
    }

    if (!existingBountiesQuery) {
      return;
    }

    const newBounty = data.insert_bounty_one;

    cache.writeQuery({
      query: GET_BOUNTIES,
      data: { bounty: [newBounty, ...existingBountiesQuery.bounty] },
    });
  }

  function updateCacheAfterDelete(cache, { data }) {
    const existingBountiesQuery = cache.readQuery({
      query: GET_BOUNTIES,
    });

    if (!existingBountiesQuery) {
      return;
    }
    console.log({ existingBountiesQuery });
    const bountyId = data.delete_bounty_by_pk.id;

    cache.writeQuery({
      query: GET_BOUNTIES,
      data: {
        bounty: existingBountiesQuery.bounty.filter((b) => b.id !== bountyId),
      },
    });
  }

  async function onSubmit(variables) {
    if (balance < variables.fee) {
      setGlobalError("Not enough funds");
      return;
    }
    try {
      await createBounty({ variables });
    } catch (e) {
      console.error(e);
      setGlobalError(e.message);
    }
  }

  async function onCompleted({ insert_bounty_one: bounty }) {
    try {
      await issueBounty({
        ...bounty,
        deadline: Number(new Date(bounty.deadline)),
      });
      router.push("/");
    } catch (error) {
      setGlobalError(
        tezosState.error ||
          error.message ||
          "Failed saving bounty to blockchain"
      );
      console.error(error);
      try {
        await deleteBounty({ variables: { id: bounty.id } });
      } catch (deleteError) {
        console.error(deleteError);
        setGlobalError(deleteError.message || "Failed deleting bounty");
      }
    }
  }
};

export default CreateBountyPage;
