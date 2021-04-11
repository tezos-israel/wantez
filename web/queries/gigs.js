import { gql } from '@apollo/client';

export const GET_GIGS = gql`
  {
    gig {
      title
      id
      fee
      status
      experienceLevel: experience_level
      image_url
      createdAt: created_at
      timeCommitment: time_commitment
      gig_tags {
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
    gig_by_pk(id: $id) {
      id
      title
      fee
      status
      image_url
      createdAt: created_at
      timeCommitment: time_commitment
      description
      experienceLevel: experience_level
      categories {
        category
      }
      funder {
        username
      }
      applications {
        id
        createdAt: created_at
        status
        paymentAddress: payment_address
        details
        applicant {
          username
        }
      }
      gig_tags {
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
    $experienceLevel: experience_level_enum
    $categories: [gig_category_insert_input!]!
    $timeCommitment: time_commitment_type_enum
    $issueUrl: String!
    $deadline: timestamptz!
    $tags: [gig_tags_insert_input!]!
    $imageUrl: String!
    $title: String!
    $description: String!
  ) {
    insert_gig_one(
      object: {
        fee: $fee
        experience_level: $experienceLevel
        time_commitment: $timeCommitment
        issue_url: $issueUrl
        title: $title
        description: $description
        image_url: $imageUrl
        deadline: $deadline
        categories: { data: $categories }
        gig_tags: { data: $tags }
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
    delete_gig_by_pk(id: $id) {
      id
    }
  }
`;

export const REFUND_GIG = gql`
  mutation($id: uuid!) {
    update_gig_by_pk(pk_columns: { id: $id }, _set: { status: "canceled" }) {
      id
    }
  }
`;

export const APPROVE_APPLICATION = gql`
  mutation($gigId: uuid!, $applicationId: uuid!) {
    update_gig_by_pk(pk_columns: { id: $gigId }, _set: { status: "finished" }) {
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
          gig_id: { _eq: $gigId }
          _not: { applicant_id: { _eq: $applicationId } }
        }
      }
      _set: { status: "dismissed" }
    ) {
      affected_rows
    }
  }
`;
