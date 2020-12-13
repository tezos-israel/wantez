import { useReducer, useCallback } from 'react';

import { debounce } from 'lib/debounce';

export function useRepoInfo() {
  const defaultState = {
    title: '',
    description: '',
    error: '',
    loading: false,
  };
  const [
    { title, description, error, imageUrl, loading },
    dispatch,
  ] = useReducer(reducer, defaultState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onUrlChange = useCallback(debounce(handleUrlChange, 1000), []);

  return {
    title,
    description,
    error,
    imageUrl,
    loading,
    onUrlChange,
  };

  function handleUrlChange(url) {
    const site = parseUrlSite(url);

    if (!site) {
      dispatchError(`${url} is not support`);
      return;
    }

    switch (site) {
      case 'github':
        return handleGithubUrl(url);
      case 'gitlab':
        return handleGitlabUrl(url);
      default:
        dispatchError(`${url} is not support`);
    }
  }

  function parseUrlSite(url) {
    if (url.match(/^https?:\/\/(www\.)?github/)) {
      return 'github';
    }
    if (url.match(/^https?:\/\/(www\.)?gitlab/)) {
      return 'gitlab';
    }
    return '';
  }

  function reducer(state, { type, payload }) {
    switch (type) {
      case 'ERROR':
        return { ...defaultState, error: payload.message };
      case 'START':
        return { ...defaultState, loading: true };
      case 'END':
        return { ...payload, loading: false };
    }
  }

  function dispatchError(message) {
    dispatch({ type: 'ERROR', payload: { message } });
  }

  async function handleGitlabUrl(url) {
    const { owner, repo, issue, success } = parseGitlabUrl(url);

    if (!success) {
      dispatchError(`Failed parsing gitlab url: ${url}`);
      return;
    }

    dispatch({ type: 'START' });
    try {
      const res = await fetch(
        `/api/gitlab?owner=${owner}&repo=${repo}&issue=${issue}`
      );
      const { error, title, imageUrl, description } = await res.json();

      if (error) {
        dispatchError(`Failed fetching gitlab info: ${error}`);
        return;
      }

      dispatch({ type: 'END', payload: { imageUrl, description, title } });
    } catch (e) {
      dispatchError(`Failed loading gitlab: ${e.message}`);
    }
  }

  function parseGitlabUrl(url) {
    const matches = url.match(/^https?:\/\/(www\.)?gitlab.com\/(.+)\??/);
    if (!matches) {
      return { success: false };
    }

    const [, , path] = matches;
    if (!path) {
      return { success: false };
    }

    const splits = path.split('/');

    if (!splits.length || splits.length !== 5) {
      return { success: false };
    }

    const [owner, repo, , , issue] = splits;
    return { owner, repo, issue: parseInt(issue, 10), success: true };
  }

  async function handleGithubUrl(url) {
    const { owner, repo, issue, success } = parseGithubUrl(url);
    if (!success) {
      dispatchError(`Failed parsing github url: ${url}`);
      return;
    }

    dispatch({ type: 'START' });
    try {
      const res = await fetch(
        `/api/github?owner=${owner}&repo=${repo}&issue=${issue}`
      );
      const { error, title, imageUrl, description } = await res.json();

      if (error) {
        dispatchError(`Failed fetching gitlab info: ${error}`);
        return;
      }
      dispatch({ type: 'END', payload: { imageUrl, description, title } });
    } catch (e) {
      dispatchError(`Failed loading github: ${e.message}`);
    }
  }

  function parseGithubUrl(url) {
    const matches = url.match(/^https?:\/\/(www\.)?github.com\/(.+)\??/);
    if (!matches) {
      return { success: false };
    }

    const [, , path] = matches;
    if (!path) {
      return { success: false };
    }

    const splits = path.split('/');
    if (!splits.length || splits.length !== 4) {
      return { success: false };
    }

    const [owner, repo, , issue] = splits;
    return { owner, repo, issue: parseInt(issue, 10), success: true };
  }
}
