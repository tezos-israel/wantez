import React from "react";

import { Button, Paper, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

import { useForm, Controller } from "react-hook-form";

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
  const globalError = "";

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

  function onSubmit() {}
}
