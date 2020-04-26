import React from "react";
import { useMutation, gql } from "@apollo/client";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";

import Layout from "components/layout";

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
  const [createBounty] = useMutation(SAVE_BOUNTY);
  const { handleSubmit, register, errors } = useForm();

  return (
    <Layout>
      {/* Header */}

      <Form onSubmit={handleSubmit((variables) => createBounty({ variables }))}>
        <Form.Field error={!!errors.title} id="title-input">
          <label>Title</label>
          <input ref={register} name="title" />
        </Form.Field>
        <Form.Field error={!!errors.issueUrl} id="issue-url-input">
          <label>Issue URL</label>
          <input ref={register} name="issueUrl" />
        </Form.Field>
        <Form.Field error={!!errors.description} id="decsription-input">
          <label>Description</label>
          <textarea ref={register} name="description" />
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
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    </Layout>
  );
};

export default CreateBountyPage;
