import React from "react";
import { useRouter } from "next/router";
import { useMutation, gql } from "@apollo/client";
import { Button, Paper, TextField, Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const SAVE_BOUNTY = gql`
  mutation(
    $title: String!
    $issueUrl: String!
    $description: String!
    $fee: numeric
  ) {
    insert_bounty_one(
      object: {
        title: $title
        issueUrl: $issueUrl
        description: $description
        fee: $fee
      }
    ) {
      id
    }
  }
`;

const CreateBountyPage = () => {
  // const { user, loading } = useUser();
  const [createBounty] = useMutation(SAVE_BOUNTY);
  const { handleSubmit, errors, control } = useForm();
  const [globalError, setGlobalError] = React.useState(null);
  const router = useRouter();
  const classes = useStyles();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!loading && !user) {
  //   router.push("/");
  //   return null;
  // }

  async function onSubmit(variables) {
    try {
      await createBounty({ variables });
      router.push("/");
    } catch (e) {
      setGlobalError(e.message);
    }
  }

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {globalError && (
          <Alert>
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
              rules={{ required: true }}
              error={!!errors.title}
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
              rules={{ required: true }}
              error={!!errors.issueUrl}
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
                required: true,
                validate: {
                  positiveNumber: (value) => parseFloat(value, 10) > 0,
                },
              }}
              type="number"
              step="0.1"
              error={!!errors.fee}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              fullWidth
              name="description"
              as={TextField}
              control={control}
              id="description-input"
              label="description"
              rules={{ required: true }}
              multiline
              error={!!errors.description}
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
};

export default CreateBountyPage;
