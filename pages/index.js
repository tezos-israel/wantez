import React from "react";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

const FETCH_BOUNTIES = gql`
  {
    bounty {
      title
      id
      fee
      status
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(FETCH_BOUNTIES);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Failed loading bounties</AlertTitle>
        {error.message}
      </Alert>
    );
  }
  return (
    <Paper>
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
            {data.bounty.map((bounty) => (
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
    </Paper>
  );
};

export default Home;
