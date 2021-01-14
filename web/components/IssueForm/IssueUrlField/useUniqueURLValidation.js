import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

export function useUniqueURLValidation(issueUrl) {
  const CHECK_URL_UNIQUENESS = gql`
    query($issueUrl: String) {
      bounty_aggregate(where: { issueUrl: { _eq: $issueUrl } }) {
        aggregate {
          count
        }
      }
    }
  `;

  const [isUnique, setIsUnique] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { refetch } = useQuery(CHECK_URL_UNIQUENESS, {
    skip: true,
  });

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const response = await refetch({ issueUrl });
      if (!response) {
        setIsUnique(false);
        setIsLoading(false);
        setError('');
        return;
      }
      const { data, error } = response;
      setIsUnique(!!(data && data.bounty_aggregate.aggregate.count === 0));
      setIsLoading(false);
      setError(error || '');
    })();
  }, [issueUrl]);

  return [isUnique, isLoading, error];
}
