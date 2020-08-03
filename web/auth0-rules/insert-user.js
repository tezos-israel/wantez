/* global auth0, request, configuration */
// eslint-disable-next-line no-unused-vars
function main(user, context, callback) {
  const { identities, email, nickname } = user;

  let id;
  graphqlRequest(userMutationBuilder(), {
    nickname,
    email,
  })
    .then((data) => {
      id = data.insert_user_one.id;
      const socialQuery = socialAccountsMutationBuilder(id, identities);
      return graphqlRequest(socialQuery);
    })
    .then(() => {
      user.user_metadata = user.user_metadata || {};
      user.user_metadata.user_app_id = id;
      return auth0.users.updateUserMetadata(user.user_id, user.user_metadata);
    })
    .then(() => {
      callback(null, user, context);
    })
    .catch((error) => {
      callback(error);
    });

  function graphqlRequest(query, variables = {}) {
    return new Promise((resolve, reject) => {
      const adminSecret = context.clientMetadata.development
        ? configuration.hasuraAdminSecretDev
        : configuration.hasuraAdminSecret;

      const url = context.clientMetadata.hasuraUrl;
      request.post(
        {
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": adminSecret,
          },
          url: url,
          body: JSON.stringify({
            query,
            variables,
          }),
        },
        function (error, response, body) {
          if (error) {
            return reject(error);
          }
          try {
            body = JSON.parse(body);
          } catch (e) {
            return reject(`body is not json ${body}`);
          }

          if (body.errors) {
            return reject(body.errors[0]);
          }

          resolve(body.data);
        }
      );
    });
  }

  function socialAccountsMutationBuilder(id, identities) {
    const socialAccounts = identities
      .map(
        ({ provider, user_id }) =>
          `{ site: "${provider}", handle: "${user_id}", userId: "${id}" }`
      )
      .join(", ");
    return `
			mutation {
  			insert_socialAccount(objects: [${socialAccounts}], on_conflict: {constraint: socialAccount_pkey, update_columns: handle}) {
          returning {
            handle
          }
				}
			}`;
  }

  function userMutationBuilder() {
    return `
      mutation ($nickname: String!, $email: String) {
        insert_user_one(object: {username: $nickname, email: $email}, on_conflict: {constraint: user_email_key, update_columns: [lastSeenAt, username]}) {
          id
        }
      }
    `;
  }
}
