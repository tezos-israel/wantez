import React from "react";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import { Message, Table } from "semantic-ui-react";

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
      <Message error header="Failed loading bounties" content={error.message} />
    );
  }
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Fee</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.bounty.map((bounty) => (
          <Table.Row key={bounty.id}>
            <Table.Cell selectable>
              <Link href={`/bounty/${bounty.id}`}>
                <a>{bounty.title}</a>
              </Link>
            </Table.Cell>
            <Table.Cell>{bounty.fee}</Table.Cell>
            <Table.Cell>{bounty.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default Home;
