import { gql } from "@apollo/client";

export const GET_BOUNTIES = gql`
  {
    bounty {
      title
      id
      fee
      status
      applications_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const BOUNTY_QUERY = gql`
  query($id: uuid!) {
    bounty_by_pk(id: $id) {
      id
      title
      fee
      status
      funder {
        username
      }
      applications {
        id
        createdAt
        status
        paymentAddress
        applicant {
          username
        }
      }
    }
  }
`;

export const SAVE_BOUNTY = gql`
  mutation(
    $title: String!
    $issueUrl: String!
    $description: String!
    $fee: numeric
    $deadline: timestamptz!
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

export const REFUND_BOUNTY = gql`
  mutation($id: uuid!) {
    update_bounty_by_pk(pk_columns: { id: $id }, _set: { status: "canceled" }) {
      id
    }
  }
`;

export const APPROVE_APPLICATION = gql`
  mutation($bountyId: uuid!, $applicationId: uuid!) {
    update_bounty_by_pk(
      pk_columns: { id: $bountyId }
      _set: { status: "finished" }
    ) {
      id
    }

    update_application_by_pk(
      pk_columns: { id: $applicationId }
      _set: { status: "approved" }
    ) {
      id
    }

    update_application(
      where: {
        _and: {
          bountyId: { _eq: $bountyId }
          _not: { applicantId: { _eq: $applicationId } }
        }
      }
      _set: { status: "dismissed" }
    ) {
      affected_rows
    }
  }
`;
