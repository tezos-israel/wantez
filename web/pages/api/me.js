import { decryptCookie } from 'lib/cookie';

export default async (req, res) => {
  const { method } = req;

  if (method !== 'GET') {
    return res
      .status(400)
      .json({ message: 'This route only accepts GET requests' });
  }

  try {
    const userFromCookie = await decryptCookie(req.cookies.auth);
    /* send back response with user obj */
    return res.json({ authorized: true, user: userFromCookie });
  } catch (error) {
    /* if there's no valid auth cookie, user is not logged in */
    return res.json({ authorized: false, error });
  }
};
