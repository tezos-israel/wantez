import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

import Link from "components/Link";

export default function UserMenu({ user, loading, inverted, onLogout }) {
  if (loading) {
    return null;
  }
  return (
    <>
      {user ? (
        <Button color="primary" inverted={inverted} onClick={onLogout}>
          Log out
        </Button>
      ) : (
        <Link href="/login">
          <Button color="primary" inverted={inverted}>
            Log in / Sign up
          </Button>
        </Link>
      )}
    </>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  inverted: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
};
