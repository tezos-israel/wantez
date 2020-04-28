import React from "react";
import { useRouter } from "next/router";
import { useMutation, gql } from "@apollo/client";
import { Form, Button, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form";

import Layout from "components/layout";
import { useFetchUser } from "utils/user";

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
  const { user, loading } = useFetchUser({ required: true });
  const [createBounty] = useMutation(SAVE_BOUNTY);
  const { handleSubmit, register, errors } = useForm();
  const [globalError, setGlobalError] = React.useState(null);
  const router = useRouter();

  if (loading) {
    return <Layout>Loading...</Layout>;
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
    <Layout>
      {/* Header */}

      <Form onSubmit={handleSubmit(onSubmit)}>
        {globalError && (
          <Message negative>
            <Message.Header>Failed submittion</Message.Header>
            {globalError}
          </Message>
        )}
        <Form.Field error={!!errors.title} id="title-input">
          <label>Title</label>
          <input ref={register} name="title" />
        </Form.Field>
        <Form.Field error={!!errors.issueUrl} id="issue-url-input">
          <label>Issue URL</label>
          <input ref={register} name="issueUrl" />
        </Form.Field>
        <Form.Field error={!!errors.fee} id="fee-input">
          <label>Fee</label>
          <input
            ref={register}
            type="number"
            step="0.1"
            name="fee"
            defaultValue={0}
          />
        </Form.Field>
        <Form.Field error={!!errors.description} id="decsription-input">
          <label>Description</label>
          <textarea ref={register} name="description" />
        </Form.Field>

        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    </Layout>
  );
};

export default CreateBountyPage;
