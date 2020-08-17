import { gql } from "@apollo/client";

export const CREATE_APPLICATION = gql`
  mutation($details: String!, $bountyId: uuid!, $paymentAddress: String!) {
    insert_application_one(
      object: {
        details: $details
        bountyId: $bountyId
        paymentAddress: $paymentAddress
      }
    ) {
      id
    }
  }
`;
