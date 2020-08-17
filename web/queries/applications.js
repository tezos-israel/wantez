import { gql } from "@apollo/client";

export const CREATE_APPLICATION = gql`
  mutation($details: String!, $bountyId: uuid!) {
    insert_application_one(object: { details: $details, bountyId: $bountyId }) {
      id
    }
  }
`;
