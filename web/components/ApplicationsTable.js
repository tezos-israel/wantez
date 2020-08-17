import React from "react";
import propTypes from "prop-types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@material-ui/core";

export function ApplicationsTable({ applications }) {
  if (!applications.length) {
    return <div>No Applications</div>;
  }
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Created By</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>{application.applicant.username}</TableCell>
              <TableCell>{application.createdAt}</TableCell>
              <TableCell>{application.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ApplicationsTable.propTypes = {
  applications: propTypes.array.isRequired,
};
