import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { AppBar, Toolbar, Button } from "@material-ui/core";

import UserButtons from "./UserButtons";

export default function Nav({ loading, user }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Button>
        {!loading && user && (
          <>
            <Button>
              <Link href="/bounty/create">
                <a>Create Bounty</a>
              </Link>
            </Button>
          </>
        )}
        <UserButtons user={user} loading={loading} />
      </Toolbar>
    </AppBar>
  );
}

Nav.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.any,
};
