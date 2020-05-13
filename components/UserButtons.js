import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

export default function UserMenu({ user, loading, inverted }) {
  if (loading) {
    return null;
  }
  return (
    <>
      {user ? (
        <Link href="/api/logout">
          <Button as="a" inverted={inverted}>
            Log out
          </Button>
        </Link>
      ) : (
        <>
          <Link href="/api/login">
            <Button as="a" inverted={inverted}>
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
