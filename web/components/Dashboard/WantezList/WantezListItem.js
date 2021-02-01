import React from 'react';
import PropTypes from 'prop-types';

import styles from './WantezListItem.module.css';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseJSON from 'date-fns/parseJSON';
import Link from 'next/link';

export function WantezListItem({
  title,
  imgUrl,
  fee,
  status,
  experienceLevel,
  createdAt,
  applicationsCount,
  id,
  tags,
}) {
  const levelClass = getLevelClass(experienceLevel);
  const feeInILS = fee * 2;
  return (
    <Link href={`/gig/${id}`}>
      <a
        className={`${styles.item} relative flex h-32 py-4 pl-8 mr-8 text-blue-500 transition-all duration-500 ease-in-out border-4 border-l-0 border-blue-500 border-solid cursor-pointer`}
      >
        <div
          className={`${styles.clickToOpen} absolute w-8 h-32 text-xs text-white transition duration-500 ease-in-out bg-blue-500 border-r-2 border-dashed`}
        >
          <div className="flex items-center justify-center w-32 h-8 text-center origin-bottom-left transform rotate-90 -translate-y-full">
            <div className="transform rotate-180">Click to open</div>
          </div>
        </div>
        <div className="w-24 h-24">
          <img src={imgUrl} className="object-cover w-full h-full" />
        </div>

        <div className="grid flex-auto grid-cols-12 grid-rows-2 px-10">
          <div className="col-span-10">
            <span className="font-bold">{title}</span>
          </div>
          <div className="col-span-1 col-start-12 text-right">
            <div className="font-bold">{fee} XTZ</div>
            <div className="font-medium text-gray-500">{feeInILS} ILS</div>
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
          <div className="flex items-end justify-end col-span-3 space-x-4">
            {tags.map((tag) => (
              <div
                key={tag}
                className="px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-sm"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div
          className={
            'w-6 ml-auto -my-4  border-l-2 border-blue-500 border-dashed ' +
            levelClass
          }
        ></div>
      </a>
    </Link>
  );
}

WantezListItem.propTypes = {
  id: PropTypes.string.isRequired,
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
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function getLevelClass(experienceLevel) {
  switch (experienceLevel) {
    case 'beginner':
      return 'bg-green-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'pro':
      return 'bg-purple-600';
  }
}
