import { useCallback, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { debounce } from 'lib/debounce';

const CHECK_URL_UNIQUENESS = gql`
  query($issueUrl: String) {
    gig_aggregate(where: { issueUrl: { _eq: $issueUrl } }) {
      aggregate {
        count
      }
    }
  }
`;

export function useUniqueURLValidation() {
  const [isUnique, setIsUnique] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { refetch } = useQuery(CHECK_URL_UNIQUENESS, {
    skip: true,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onUrlChange = useCallback(debounce(handleUrlChange, 1000), []);

  return { isUnique, isLoading, error, onUrlChange };

  async function handleUrlChange(issueUrl) {
    setIsLoading(true);
    const response = await refetch({ issueUrl });
    if (!response) {
      setIsUnique(false);
      setIsLoading(false);
      setError('');
      return;
    }
    const { data, error } = response;
    setIsUnique(!!(data && data.gig_aggregate.aggregate.count === 0));
    setIsLoading(false);
    setError(error || '');
  }
}
