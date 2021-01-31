import Divider from 'components/shared/Divider';
import { Hero } from './Hero';
import { Features } from './Features';
import HowItWorks from './HowItWorks';
import Vision from './Vision';

import data from 'data/home.json';

export function LandingPage() {
  return (
    <>
      <Hero title={data.title} about={data.about} />
      <Features features={data.features} />
      <Divider className="w-3/4 mx-auto my-20 border-blue-400 border-dashed" />
      <HowItWorks flowCharts={data.flowCharts} />
      <Vision text={data.vision.text} title={data.vision.title} />
      {/*<div className="h-screen">
        <div className="w-1/2 py-10 mx-auto">
          <h2 className="mb-8 text-2xl font-bold">
            Join us now (leave contact info)
          </h2>
        </div>
      </div>{' '}
      */}
    </>
  );
}
