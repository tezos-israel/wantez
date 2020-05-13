import React from "react";
import PropTypes from "prop-types";
import DesktopContainer from "./DesktopContainer";
import MobileContainer from "./MobileContainer";

export default function ResponsiveContainer({ children, user, loading }) {
  return (
    <div>
      <DesktopContainer user={user} loading={loading}>
        {children}
      </DesktopContainer>
      <MobileContainer user={user} loading={loading}>
        {children}
      </MobileContainer>
    </div>
  );
}

ResponsiveContainer.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
};
