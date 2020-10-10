import React from "react";
import propTypes from "prop-types";
import Link from "next/link";

export function BountiesTable({ bounties }) {
  if (!bounties.length) {
    return <div>No Bounties</div>;
  }
  return (
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Fee</td>
            <td>Status</td>
            <td>Applications</td>
          </tr>
        </thead>

        <tbody>
          {bounties.map((bounty) => (
            <tr key={bounty.id}>
              <td>
                <Link href={`/bounty/${bounty.id}`}>
                  <a>{bounty.title}</a>
                </Link>
              </td>
              <td>{bounty.fee}</td>
              <td>{bounty.status}</td>
              <td>
                {bounty.applications_aggregate.aggregate.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}

BountiesTable.propTypes = {
  bounties: propTypes.array.isRequired,
};
