import Image from 'next/image';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useState, Fragment } from 'react';

import Arrow from './arrow.svg';

export default function HowItWorks({ flowCharts }) {
  const [chartID, setChartId] = useState(flowCharts[0].id);
  const currentChart = flowCharts.find(({ id }) => chartID === id);

  return (
    <div className="sm:w-1/2 sm:px-0 flex flex-col items-center px-10 m-auto mb-48">
      <div className="font-museo text-5xl font-bold text-blue-500">
        How does Wantez work?
      </div>
      <div className="flex my-10 space-x-10">
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
      <div className="sm:flex sm:items-center sm:space-x-24 sm:space-y-0 space-y-24 select-none">
        {currentChart.steps.map((step, index, steps) => (
          <Fragment key={step.title}>
            <div className="relative flex flex-col items-center">
              <Image src={step.imageUrl} alt="" height="180" width="180" />
              <div className="font-museo top-full sm:absolute mt-10 text-2xl font-semibold text-center text-blue-500">
                {step.title}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="sm:ml-5 w-content sm:rotate-0 mx-auto text-xl font-bold transform rotate-90">
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
