import React from "react";
import propTypes from "prop-types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Button,
} from "@material-ui/core";

export function ApplicationsTable({ applications, isOwner, onApproveClick }) {
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
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>{application.applicant.username}</TableCell>
              <TableCell>{application.createdAt}</TableCell>
              <TableCell>{application.status}</TableCell>
              <TableCell>
                {isOwner && application.status === "pending" && (
                  <Button onClick={() => onApproveClick(application)}>
                    Approve
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ApplicationsTable.propTypes = {
  applications: propTypes.array.isRequired,
  isOwner: propTypes.bool.isRequired,
  onApproveClick: propTypes.func.isRequired,
};
