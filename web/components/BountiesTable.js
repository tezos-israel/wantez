import React from "react";
import propTypes from "prop-types";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@material-ui/core";

export function BountiesTable({ bounties }) {
  if (!bounties.length) {
    return <div>No Bounties</div>;
  }
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Fee</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Applications</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {bounties.map((bounty) => (
            <TableRow key={bounty.id}>
              <TableCell>
                <Link href={`/bounty/${bounty.id}`}>
                  <a>{bounty.title}</a>
                </Link>
              </TableCell>
              <TableCell>{bounty.fee}</TableCell>
              <TableCell>{bounty.status}</TableCell>
              <TableCell>
                {bounty.applications_aggregate.aggregate.count}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

BountiesTable.propTypes = {
  bounties: propTypes.array.isRequired,
};
