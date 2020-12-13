import { Octokit } from '@octokit/core';

export default async (req, res) => {
  const githubClient = new Octokit({
    auth: process.env.GITHUB_API_TOKEN,
  });
  const { owner, repo } = req.query;

  const issueNumber = parseInt(req.query.issue, 10);
  try {
    const { repository } = await githubClient.graphql(
      `
        query($owner: String!, $repo: String!, $issue: Int!) {
          repository(name: $repo, owner: $owner) {
            openGraphImageUrl
            issue(number: $issue) {
              body
              title
            }
          }
        }
      `,
      { owner, repo, issue: issueNumber }
    );

    if (!repository) {
      res.status(500).send({ error: 'Repository not found' });
      return;
    }

    const { openGraphImageUrl: imageUrl, issue } = repository;

    if (!issue) {
      res.status(500).send({ error: 'Issue not found' });
      return;
    }

    const { body: description, title } = issue;

    return res.json({
      imageUrl,
      title,
      description,
    });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};
