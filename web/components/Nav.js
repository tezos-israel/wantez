import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Link from "components/Link";

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(1),
  },
  userButtonsContainer: {
    marginLeft: "auto",
  },
  root: {},
}));

import UserButtons from "./UserButtons";

export default function Nav({ loading, user, className = "" }) {
  const styles = useStyles();

  return (
    <AppBar
      position="sticky"
      color="default"
      className={`${className} ${styles.root}`}
    >
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          TzGit
        </Typography>

        <Button color="primary">
          <Link href="/">Bounties</Link>
        </Button>
        {!loading && user && (
          <>
            <Button>
              <Link href="/bounty/create">Create Bounty</Link>
            </Button>
          </>
        )}
        <div className={styles.userButtonsContainer}>
          <UserButtons user={user} loading={loading} />
        </div>
      </Toolbar>
    </AppBar>
  );
}

Nav.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.any,
  className: PropTypes.string,
};
