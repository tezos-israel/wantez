import React from 'react';
import PropTypes from 'prop-types';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseJSON from 'date-fns/parseJSON';

export function WantezListItem({
  title,
  imgUrl,
  fee,
  status,
  experienceLevel,
  createdAt,
  applicationsCount,
}) {
  const levelClass = getLevelClass(experienceLevel);
  const feeInILS = fee * 2;
  return (
    <>
      <style jsx>{`
        .item {
          left: 0;
        }

        .item:hover {
          @apply bg-blue-500;
          @apply text-white;
          left: 20px;
        }

        .item:hover .click-to-open {
          opacity: 1;
        }

        .click-to-open {
          left: -20px;
          top: -4px;
          line-height: 2rem;
        }
      `}</style>
      <div className="item flex h-32 py-4 pl-8 mr-8 border-4 border-l-0 border-blue-500 border-solid text-blue-500 relative transition-all duration-500 ease-in-out cursor-pointer">
        <div className="absolute bg-blue-500 click-to-open h-32 w-8 border-r-2 border-dashed text-xs opacity-0 text-white transition duration-500 ease-in-out">
          <div className="transform rotate-90 w-32 h-8 origin-bottom-left -translate-y-full text-center">
            <div className="transform rotate-180">Click to open</div>
          </div>
        </div>
        <div className="h-50 w-50">
          <img src={imgUrl} className="object-cover w-full h-full" />
        </div>

        <div className="grid flex-auto grid-cols-12 grid-rows-2 px-10">
          <div className="col-span-10">
            <span className="font-bold">{title}</span>
          </div>
          <div className="col-span-1 col-start-12  text-right">
            <div className="font-bold">{fee} XTZ</div>
            <div className="text-gray-500 font-medium">{feeInILS} ILS</div>
          </div>
          <div className="flex items-end col-span-9 space-x-4">
            <div className="flex items-center text-xs text-gray-500 capitalize">
              <div className="w-3 h-3 mr-1 bg-gray-400 rounded-full" />
              {status}
            </div>
            <div className="h-4 border-r border-gray-500"></div>
            <div className="flex items-center text-xs text-gray-500 capitalize">
              {experienceLevel}
            </div>
            <div className="h-4 border-r border-gray-500"></div>
            <div className="flex items-center text-xs text-gray-500">
              {formatDistanceToNow(parseJSON(createdAt), { addSuffix: true })}
            </div>
            <div className="h-4 border-r border-gray-500"></div>
            <div className="flex items-center text-xs text-gray-500">
              {applicationsCount} Applications
            </div>
          </div>
          {/* <div className="flex items-end justify-end col-span-3 space-x-4">
            <div className="px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-sm">
              js
            </div>
            <div className="px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-sm">
              react
            </div>
          </div> */}
        </div>

        <div
          className={
            'w-6 ml-auto -my-4  border-l-2 border-blue-500 border-dashed ' +
            levelClass
          }
        ></div>
      </div>
    </>
  );
}

WantezListItem.propTypes = {
  title: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  fee: PropTypes.number.isRequired,
  status: PropTypes.oneOf([
    'pending',
    'work',
    'finished',
    'canceled',
    'pendingPayment',
    'complete',
  ]).isRequired,
  experienceLevel: PropTypes.oneOf(['beginner', 'medium', 'pro']),
  createdAt: PropTypes.string.isRequired,
  applicationsCount: PropTypes.number.isRequired,
};

function getLevelClass(experienceLevel) {
  switch (experienceLevel) {
    case 'beginner':
      return 'bg-green-500';
    case 'medium':
      return 'bg-orange-500';
    case 'pro':
      return 'bg-purple-600';
  }
}
