import React from "react";
import propTypes from "prop-types";


export function ApplicationsTable({ applications, isOwner, onApproveClick }) {
  if (!applications.length) {
    return <div>No Applications</div>;
  }
  return (
      <table>
        <thead>
          <tr>
            <td>Created By</td>
            <td>Created At</td>
            <td>Status</td>
            <td />
          </tr>
        </thead>

        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.applicant.username}</td>
              <td>{application.createdAt}</td>
              <td>{application.status}</td>
              <td>
                {isOwner && application.status === "pending" && (
                  <button type="button" onClick={() => onApproveClick(application)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}

ApplicationsTable.propTypes = {
  applications: propTypes.array.isRequired,
  isOwner: propTypes.bool.isRequired,
  onApproveClick: propTypes.func.isRequired,
};
