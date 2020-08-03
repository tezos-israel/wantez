import { gql } from "@apollo/client";

export const GET_BOUNTIES = gql`
  {
    bounty {
      title
      id
      fee
      status
    }
  }
`;

export const SAVE_BOUNTY = gql`
  mutation(
    $title: String!
    $issueUrl: String!
    $description: String!
    $fee: numeric
    $deadline: String!
  ) {
    insert_bounty_one(
      object: {
        title: $title
        issueUrl: $issueUrl
        description: $description
        fee: $fee
        deadline: $deadline
      }
    ) {
      id
      fee
      title
      status
      deadline
    }
  }
`;

export const DELETE_BOUNTY = gql`
  mutation($id: uuid!) {
    delete_bounty_by_pk(id: $id) {
      id
    }
  }
`;
