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

    dismissedApplications: updateApplications(
      where: {
        _and: { gig_id: { _eq: $gigId }, _not: { id: { _eq: $applicationId } } }
      }
      _set: { status: dismissed }
    ) {
      affected_rows
      returning {
        id
        status
      }
    }
  }
`;
