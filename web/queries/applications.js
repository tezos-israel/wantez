import { gql } from '@apollo/client';

export const CREATE_APPLICATION = gql`
  mutation applyToGig($details: String!, $gigId: uuid!, $address: String!) {
    insertApplication(
      object: { details: $details, gigId: $gigId, paymentAddress: $address }
    ) {
      id
      createdAt
      status
      details
      paymentAddress
      applicant {
        username
      }
      gigId
    }
  }
`;

export const DELETE_APPLICATION = gql`
  mutation deleteApplication($appId: uuid!) {
    deleteApplication(id: $appId) {
      gigId
      id
    }
  }
`;
