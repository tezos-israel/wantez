import Image from 'next/image';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useState, Fragment } from 'react';

import Arrow from './arrow.svg';

export default function HowItWorks({ flowCharts }) {
  const [chartID, setChartId] = useState(flowCharts[0].id);
  const currentChart = flowCharts.find(({ id }) => chartID === id);

  return (
    <div className="flex flex-col items-center w-1/2 m-auto mb-48">
      <div className="font-museo text-5xl font-bold text-blue-500">
        How does Wantez work?
      </div>
      <div className="my-10 space-x-10">
        {flowCharts.map(({ id, title }) => (
          <button
            key={id}
            className={classnames('text-2xl font-bold font-museo', {
              'text-gray-300': chartID !== id,
              'text-blue-500': chartID === id,
            })}
            onClick={() => setChartId(id)}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="flex items-center space-x-24 select-none">
        {currentChart.steps.map((step, index, steps) => (
          <Fragment key={step.title}>
            <div className="relative flex flex-col items-center">
              <Image src={step.imageUrl} alt="" height="180" width="180" />
              <div className="font-museo top-full absolute mt-10 text-2xl font-semibold text-center text-blue-500">
                {step.title}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="ml-5 text-xl font-bold">
                <Arrow />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

HowItWorks.propTypes = {
  flowCharts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      steps: PropTypes.arrayOf(
        PropTypes.shape({ title: PropTypes.string, imageUrl: PropTypes.string })
      ),
    })
  ),
};
