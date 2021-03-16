import { gql } from '@apollo/client';

export const GET_GIGS = gql`
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

export const GIG_QUERY = gql`
  query($id: uuid!) {
    bounty_by_pk(id: $id) {
      id
      title
      fee
      status
      imageUrl
      createdAt
      timeCommitment
      description
      experienceLevel
      categories {
        category
      }
      funder {
        username
      }
      applications {
        id
        createdAt
        status
        paymentAddress
        details
        applicant {
          username
        }
      }
      bounty_tags {
        tag_id
      }
    }
  }
`;

// $estHours: numeric
// $title: String!
// $description: String!
export const SAVE_GIG = gql`
  mutation(
    $fee: numeric
    $experienceLevel: experienceLevel_enum
    $categories: [bounty_category_insert_input!]!
    $timeCommitment: timeCommitmentTypes_enum
    $issueUrl: String!
    $deadline: timestamptz!
    $tags: [bounty_tags_insert_input!]!
    $imageUrl: String!
    $title: String!
    $description: String!
  ) {
    insert_bounty_one(
      object: {
        fee: $fee
        experienceLevel: $experienceLevel
        timeCommitment: $timeCommitment
        issueUrl: $issueUrl
        title: $title
        description: $description
        imageUrl: $imageUrl
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

export const DELETE_GIG = gql`
  mutation($id: uuid!) {
    delete_bounty_by_pk(id: $id) {
      id
    }
  }
`;

export const REFUND_GIG = gql`
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
