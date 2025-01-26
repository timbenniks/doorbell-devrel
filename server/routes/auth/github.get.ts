export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        githubId: user.id,
        login: user.login,
        name: user.name,
        avatar: user.avatar_url,
        email: user.email,
      }
    })
    return sendRedirect(event, '/app')
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/app')
  },
})