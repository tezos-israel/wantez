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
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Fee</TableCell>
            <TableCell>Status</TableCell>
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
