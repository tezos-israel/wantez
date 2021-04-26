import clx from 'classnames';

import { useAuthContext } from 'hooks/AuthContext';

import Divider from '@shared/Divider';
import { HalfCirclePaper } from '@shared/HalfCirclePaper';

import Card from '../shared/Card';

import GigApplications from './GigApplications';
import GigFunder from './GigFunder';
import GigDescription from './GigDescription';
import GigTags from './GigTags';
import Header from './GigInfoHeader';

import { gigProps } from './props';
import styles from './gigInfo.module.css';

export function GigInfo({ gig }) {
  const { user } = useAuthContext();

  const isFunder = !!user && gig.funder.username === user.email;

  return (
    <div className="relative">
      <div
        className={clx(
          'absolute w-full overflow-hidden bg-white',
          styles.bgHalfCirclePaper
        )}
      >
        <HalfCirclePaper />
      </div>

      <Card className={clx(styles.gigContent, 'relative')}>
        <div className="md:px-10 lg:px-20">
          <Header gig={gig} isFunder={isFunder} user={user} />

          <Divider className="border-blue-600 border-dashed" />

          <GigDescription description={gig.description} />

          <GigTags tags={gig.gig_tags} />

          <Divider className="border-blue-600 border-dashed" />

          <GigApplications
            isFunder={isFunder}
            applications={gig.applications}
            currentUsername={user && user.email}
          />

          <Divider className="border-gray-400 border-dashed" />

          <GigFunder funder={gig.funder} />
        </div>
      </Card>
    </div>
  );
}

GigInfo.propTypes = {
  gig: gigProps,
};
