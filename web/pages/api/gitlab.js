const fetch = require('isomorphic-unfetch');

export default async (req, res) => {
  const { owner, repo, issue } = req.query;
  try {
    const fetchResult = await fetch('https://gitlab.com/api/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITLAB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            project(fullPath: "${owner}/${repo}") {
              avatarUrl
              issue(iid: "${issue}") {
                title
                description
              }
            }
          }
        `,
      }),
    });
    const {
      data: { project },
    } = await fetchResult.json();
    if (!project) {
      res.status(500).send({ error: 'Project not found' });
      return;
    }

    if (!project.issue) {
      res.status(500).send({ error: 'Issue not found' });
      return;
    }

    return res.json({
      imageUrl: project.avatarUrl,
      title: project.issue.title,
      description: project.issue.description,
    });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};
