import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import {
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from "semantic-ui-react";

import UserButtons from "./UserButtons";

import getWidth from "hooks/getWidth";
import useBoolean from "hooks/useBoolean";

export default function DesktopContainer({ children, user, loading }) {
  const [fixed, showFixedMenu, hideFixedMenu] = useBoolean(false);

  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={showFixedMenu}
        onBottomPassedReverse={hideFixedMenu}
      >
        <Segment inverted textAlign="center" vertical>
          <header>
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
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
                <Menu.Item position="right">
                  <UserButtons
                    user={user}
                    loading={loading}
                    inverted={!fixed}
                  />
                </Menu.Item>
              </Container>
            </Menu>
          </header>
        </Segment>
      </Visibility>
      <Container>{children}</Container>
    </Responsive>
  );
}

DesktopContainer.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
};
