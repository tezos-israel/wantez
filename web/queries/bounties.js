import { gql } from '@apollo/client';

export const GET_BOUNTIES = gql`
  {
    bounty {
      title
      id
      fee
      status
      experienceLevel
      imageUrl
      createdAt
      timeCommitment
      bounty_tags {
        tag {
          name
        }
      }
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

// $estHours: numeric
// $title: String!
// $description: String!
export const SAVE_BOUNTY = gql`
  mutation(
    $fee: numeric
    $experienceLevel: experienceLevel_enum
    $categories: [bounty_category_insert_input!]!
    $timeCommitment: timeCommitmentTypes_enum
    $issueUrl: String!
    $deadline: timestamptz!
    $tags: [bounty_tags_insert_input!]!
  ) {
    insert_bounty_one(
      object: {
        fee: $fee
        experienceLevel: $experienceLevel
        timeCommitment: $timeCommitment
        issueUrl: $issueUrl
        title: "example"
        description: "example description"
        deadline: $deadline
        categories: { data: $categories }
        bounty_tags: { data: $tags }
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
