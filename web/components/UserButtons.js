import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

import Link from "components/Link";

export default function UserMenu({ user, loading, inverted }) {
  if (loading) {
    return null;
  }
  return (
    <>
      {user ? (
        <Link href="/api/logout">
          <Button color="primary" inverted={inverted}>
            Log out
          </Button>
        </Link>
      ) : (
        <>
          <Link href="/api/login">
            <Button color="primary" inverted={inverted}>
              Log in / Sign up
            </Button>
          </Link>
        </>
      )}
    </>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  inverted: PropTypes.bool,
};
