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
