import React from "react";
import { useRouter } from "next/router";
import { useMutation, gql } from "@apollo/client";
import { Button, FormControl } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useForm } from "react-hook-form";

import { useUser } from "utils/user";

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
        issue_url: $issueUrl
        description: $description
        fee: $fee
      }
    ) {
      id
    }
  }
`;

const CreateBountyPage = () => {
  const { user, loading } = useUser();
  const [createBounty] = useMutation(SAVE_BOUNTY);
  const { handleSubmit, register, errors } = useForm();
  const [globalError, setGlobalError] = React.useState(null);
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && !user) {
    router.push("/");
    return null;
  }

  async function onSubmit(variables) {
    try {
      await createBounty({ variables });
      router.push("/");
    } catch (e) {
      setGlobalError(e.message);
    }
  }

  return (
    <div>
      {/* Header */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {globalError && (
          <Alert>
            <AlertTitle>Failed submittion</AlertTitle>
            {globalError}
          </Alert>
        )}
        <FormControl error={!!errors.title} id="title-input">
          <label>Title</label>
          <input ref={register} name="title" />
        </FormControl>
        <FormControl error={!!errors.issueUrl} id="issue-url-input">
          <label>Issue URL</label>
          <input ref={register} name="issueUrl" />
        </FormControl>
        <FormControl error={!!errors.fee} id="fee-input">
          <label>Fee</label>
          <input
            ref={register}
            type="number"
            step="0.1"
            name="fee"
            defaultValue={0}
          />
        </FormControl>
        <FormControl error={!!errors.description} id="decsription-input">
          <label>Description</label>
          <textarea ref={register} name="description" />
        </FormControl>

        <Button primary type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateBountyPage;
