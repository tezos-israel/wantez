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

export const APPROVE_APPLICATION = gql`
  mutation approveApplication($gigId: uuid!, $applicationId: uuid!) {
    update_gig_by_pk(pk_columns: { id: $gigId }, _set: { status: work }) {
      id
      status
    }

    updateApplication(
      pk_columns: { id: $applicationId }
      _set: { status: approved }
    ) {
      id
      status
    }
  }
`;

export const RECONSIDER_APPLICATION = gql`
  mutation reconsiderApplication($gigId: uuid!, $applicationId: uuid!) {
    update_gig_by_pk(pk_columns: { id: $gigId }, _set: { status: pending }) {
      id
      status
    }

    updateApplication(
      pk_columns: { id: $applicationId }
      _set: { status: pending }
    ) {
      id
      status
    }
  }
`;

export const DISMISS_APPLICATION = gql`
  mutation dismissApplication($applicationId: uuid!) {
    updateApplication(
      pk_columns: { id: $applicationId }
      _set: { status: dismissed }
    ) {
      id
      status
    }
  }
`;
