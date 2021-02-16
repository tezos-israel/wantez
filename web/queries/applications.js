import { gql } from '@apollo/client';

export const CREATE_APPLICATION = gql`
  mutation applyToGig($details: String!, $gigId: uuid!, $address: String!) {
    insertApplication(
      object: { details: $details, bountyId: $gigId, paymentAddress: $address }
    ) {
      id
      createdAt
      bountyId
      details
      applicantId
      paymentAddress
    }
  }
`;
