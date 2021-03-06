import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { GET_GIGS } from 'queries/gigs';
import Layout from 'components/Layout';
import { WantezList, Filter, TagsList } from 'components/Dashboard';

import Loader from 'react-loader-spinner';

export default function ExplorePage({ network }) {
  const router = useRouter();
  const [tags, setTags] = useState([]);

  const { data, loading, error } = useQuery(GET_GIGS);

  const [filterValues, setFilterValues] = useState({
    timeCommitment: [],
    experienceLevel: [],
  });

  if (process.env.NEXT_PUBLIC_SHOW_ONLY_LANDING_PAGE === 'true') {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return null;
  }

  const gigs =
    data &&
    data.gig
      .filter(
        (gig) =>
          (!filterValues.timeCommitment.length ||
            filterValues.timeCommitment.includes(gig.timeCommitment)) &&
          (!filterValues.experienceLevel.length ||
            filterValues.experienceLevel.includes(gig.experienceLevel))
      )
      .filter((gig) =>
        tags.every((tag) =>
          gig.gig_tags.some((tagInfo) => tagInfo.tag.name === tag)
        )
      );

  return (
    <Layout network={network}>
      {loading ? (
        <Loader type="TailSpin" color="#cacaca" height={50} width={50} />
      ) : error ? (
        <div className="alert" severity="error">
          <div className="alert-title">Failed loading gigs</div>
          {error.message || error}
        </div>
      ) : (
        <div className="flex flex-1 w-full">
          <div className="relative z-10 w-1/4">
            <Filter value={filterValues} onChange={handleFilterChange} />
          </div>
          <div className="flex flex-col flex-1">
            <div className="tag-list h-20">
              <TagsList tags={tags} onChange={setTags} />
            </div>
            <div className="flex-auto">
              <WantezList gigs={gigs} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );

  function handleFilterChange(value) {
    setFilterValues(value);
  }
}

ExplorePage.propTypes = {
  network: PropTypes.object.isRequired,
};
