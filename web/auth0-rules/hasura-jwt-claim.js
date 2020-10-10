// eslint-disable-next-line no-unused-vars
function main(user, context, callback) {
  const namespace = 'https://hasura.io/jwt/claims';
  context.accessToken[namespace] = {
    'x-hasura-default-role': 'user',
    // do some custom logic to decide allowed roles
    'x-hasura-allowed-roles': ['user'],
    'x-hasura-user-id': user.user_metadata.user_app_id,
  };
  callback(null, user, context);
}
