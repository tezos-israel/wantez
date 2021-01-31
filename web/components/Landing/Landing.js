// import { useState } from 'react';

import { Title } from './Title';

const data = {
  title: 'Join the Wantez community',
  about: `Wantez is an incentivized freelancer site built on the Tezos blockchain for creating cooperation between developer teams, freelancers, and entrepreneurs. It’s a platform for Funders and Contributors to meet and cooperate together for bug bounties & requests while ensuring proper and timely remuneration for all open source projects. Wantez allows developers across the world to earn for contributing code & bug fixes to developing companies while incentivizing and helping to bring more developers into the Tezos ecosystem.  Wantez will also allow for developing companies to more cost-efficiently operate and patch bugs. Startups will be able to augment their teams for temporary periods of time or for sprints without needing to bear the costs of increasing the total team size.`,

  sections: [
    {
      title: 'Fund your gig',
      imageUrl: 'https://via.placeholder.com/300',
      description:
        'As an open-source software (OSS) company, start-up, or institution, you post a bounty proposal on the platform of a bug you want solved with details of the job required, the expected timeline, and the amount of the bounty or payment. As the funder, you approve which contributor you want to complete the assignment. Once approved and the contributor has patched any holes, he gets paid in XTZ. This simple process allows you to continue developing and make rapid progress on your open source projects. ',
    },
    {
      title: 'Explore gigs',
      imageUrl: 'https://via.placeholder.com/300',
      description:
        'As a developer, you can scroll through the list of bounties from various OSS, and find projects you want to get paid to work on. With Wantez, you can optimize and utilize your ability to fix issues. Explore tons of open source gigs who are looking for your help!  ',
    },
  ],

  vision: {
    imageUrl: 'http://via.placeholder.com/300',
    title: 'Lets make the world a better place (vision)',
    text:
      'Wantez believes in supporting and contributing to the evolution of open source projects. Often, bugs and unsolved errors stifle innovation and progress. Utilizing the Tezos blockchain, we aim to solve these issues through creating a thriving ecosystem built on problem-solving, accelerating innovation, and mutually beneficial collaboration',
  },

  flowCharts: {
    funder: [
      { title: 'Post', imageUrl: 'https://via.placeholder.com/200' },
      { title: 'Approve', imageUrl: 'https://via.placeholder.com/200' },
      {
        title: 'Upgrade your project',
        imageUrl: 'https://via.placeholder.com/200',
      },
    ],
    developer: [
      { title: 'Search', imageUrl: 'https://via.placeholder.com/200' },
      { title: 'Work', imageUrl: 'https://via.placeholder.com/200' },
      { title: 'Get Paid', imageUrl: 'https://via.placeholder.com/200' },
    ],
  },
};

export function LandingPage() {
  // const [flowChartDev, setFlowChartDev] = useState(false);
  return (
    <>
      <Title title={data.title} about={data.about} />
      {/* <div className="w-1/2 min-h-screen m-auto">
        <div className="space-y-10">
          {data.sections.map((section, index) => (
            <div
              className={`flex items-center ${
                index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
              }`}
              key={index}
            >
              <div className="w-80 h-80 mx-10">
                <img
                  src={section.imageUrl}
                  alt={section.title}
                  aria-hidden="true"
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1 p-10">
                <h2 className="mb-8 text-xl font-bold">{section.title}</h2>
                <div className="text-lg font-light">{section.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center w-1/2 m-auto my-20">
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
