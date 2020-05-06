import React from "react";
import Link from "next/link";
import { Menu } from "semantic-ui-react";
import PropTypes from "prop-types";

function UserMenu({ user, loading }) {
  if (loading) {
    return null;
  }
  return (
    <Menu.Menu position="right">
      {user ? (
        <Menu.Item>
          <Link href="/api/logout">
            <a>Logout</a>
          </Link>
        </Menu.Item>
      ) : (
        <Menu.Item>
          <a href="/api/login">Login</a>
        </Menu.Item>
      )}
    </Menu.Menu>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
};

function Header({ user, loading }) {
  return (
    <header>
      <Menu secondary>
        <Menu.Item>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        {!loading && user && (
          <>
            <Menu.Item>
              <Link href="/bounty/create">
                <a>Create Bounty</a>
              </Link>
            </Menu.Item>
          </>
        )}
        <UserMenu user={user} loading={loading} />
      </Menu>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
};

export default Header;
