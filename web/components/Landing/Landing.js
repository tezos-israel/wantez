// import { useState } from 'react';

import { Hero } from './Hero';
import { Features } from './Features';

import data from 'data/home.json';

export function LandingPage() {
  // const [flowChartDev, setFlowChartDev] = useState(false);
  return (
    <>
      <Hero title={data.title} about={data.about} />
      <Features features={data.features} />
      {/*<div className="flex flex-col items-center w-1/2 m-auto my-20">
        <div className="my-10 space-x-10">
          <button
            className={`text-xl font-bold ${
              !flowChartDev ? '' : 'text-gray-500'
            }`}
            onClick={() => setFlowChartDev(false)}
          >
            Funder
          </button>
          <button
            className={`text-xl font-bold ${
              flowChartDev ? '' : 'text-gray-500'
            }`}
            onClick={() => setFlowChartDev(true)}
          >
            Developer
          </button>
        </div>
        <div className="flex items-center space-x-20 select-none">
          {data.flowCharts[flowChartDev ? 'developer' : 'funder'].map(
            (step, index, steps) => (
              <div key={index}>
                <div
                  className="relative flex flex-col items-center"
                  key={step.title}
                >
                  <img src={step.imageUrl} alt="" />
                  <div className="absolute bottom-0 -mb-10">{step.title}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className="text-xl font-bold">{'>'}</div>
                )}
              </div>
            )
          )}
        </div>
      </div>
      <div className="h-96 flex items-center text-black bg-gray-300">
        <div className="flex w-1/2 py-10 mx-auto">
          <img src={data.vision.imageUrl} alt="" className="mr-10" />
          <div className="my-auto">
            <h2 className="mb-8 text-xl font-bold">{data.vision.title}</h2>
            <div>{data.vision.text}</div>
          </div>
        </div>
      </div>
      <div className="h-screen">
        <div className="w-1/2 py-10 mx-auto">
          <h2 className="mb-8 text-2xl font-bold">
            Join us now (leave contact info)
          </h2>
        </div>
      </div> */}
    </>
  );
}
