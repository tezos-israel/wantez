import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
} from "semantic-ui-react";

import UserButtons from "./UserButtons";

import getWidth from "hooks/getWidth";
import useBoolean from "hooks/useBoolean";

export default function MobileContainer({ children, user, loading }) {
  const [sidebarOpened, openSidebar, closeSidebar] = useBoolean(false);

  return (
    <Responsive
      as={Sidebar.Pushable}
      getWidth={getWidth}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Sidebar
        as={Menu}
        animation="push"
        inverted
        onHide={closeSidebar}
        vertical
        visible={sidebarOpened}
      >
        <Link href="/" passHref>
          <Menu.Item as="a">Home</Menu.Item>
        </Link>
        {!loading && user && (
          <>
            <Menu.Item>
              <Link href="/bounty/create">
                <a>Create Bounty</a>
              </Link>
            </Menu.Item>
          </>
        )}
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment inverted textAlign="center" vertical>
          <Container>
            <Menu inverted pointing secondary size="large">
              <Menu.Item onClick={openSidebar}>
                <Icon name="sidebar" />
              </Menu.Item>
              <Menu.Item position="right">
                <UserButtons user={user} loading={loading} inverted />
              </Menu.Item>
            </Menu>
          </Container>
        </Segment>

        <Container>{children}</Container>
      </Sidebar.Pusher>
    </Responsive>
  );
}

MobileContainer.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
};
