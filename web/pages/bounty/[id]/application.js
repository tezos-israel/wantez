import React, { useState } from "react";

import { useRouter } from "next/router";

import { Button, Paper, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

import { useMutation } from "@apollo/client";

import { useForm, Controller } from "react-hook-form";

import { CREATE_APPLICATION } from "queries/applications";
import { useTezosContext } from "hooks/TezosContext";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  error: {
    marginBottom: theme.spacing(2),
  },
}));

export default function CreateApplication() {
  const classes = useStyles();
  const { handleSubmit, errors, control } = useForm();
  const [createApplication] = useMutation(CREATE_APPLICATION, {
    onCompleted,
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const { address } = useTezosContext();
  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {error && (
          <Alert severity="error" className={classes.error}>
            <AlertTitle>Failed submission</AlertTitle>
            {error}
          </Alert>
        )}
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <Controller
              fullWidth
              name="details"
              as={TextField}
              control={control}
              id="details-input"
              label="Details"
              rules={{ required: true }}
              multiline
              error={!!errors.details}
              helperText={errors.details && "Details is required"}
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

  async function onSubmit({ details }) {
    try {
      await createApplication({
        variables: {
          details,
          bountyId: router.query.id,
          paymentAddress: address,
        },
      });
    } catch (e) {
      setError(e.message);
    }
  }

  function onCompleted() {
    router.push("/");
  }
}
