import { gql } from '@apollo/client';

export const ONBOARDING_MUTATION = gql`
  mutation updateUserDetails($firstName: String!) {
    insertUserDetails(
      object: { first_name: $firstName, last_name: "" }
      on_conflict: {
        constraint: user_details_pkey
        update_columns: [first_name]
      }
    ) {
      user_id
    }
  }
`;

export const FETCH_DETAILS = gql`
  query fetchUserDetails($userId: uuid!) {
    userDetails(user_id: $userId) {
      first_name
      last_name
    }
  }
`;
