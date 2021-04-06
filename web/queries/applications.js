import { gql } from '@apollo/client';

export const CREATE_APPLICATION = gql`
  mutation applyToGig($details: String!, $gigId: uuid!, $address: String!) {
    insertApplication(
      object: { details: $details, gig_id: $gigId, payment_address: $address }
    ) {
      id
      createdAt: created_at
      status
      details
      paymentAddress: payment_address
      applicant {
        username
      }
      gigId: gig_id
    }
  }
`;

export const DELETE_APPLICATION = gql`
  mutation deleteApplication($appId: uuid!) {
    deleteApplication(id: $appId) {
      gigId: gig_id
      id
    }
  }
`;
