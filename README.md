# next-slack-oauth

https://api.slack.com/authentication/oauth-v2

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Environment variables

`NEXT_PUBLIC_SLACK_CLIENT_ID` and `SLACK_CLIENT_SECRET`.

> Remember that any variables exposed to the browser must be prefixed with `NEXT_PUBLIC_`.

## OAuth

### Asking for scopes

Upon clicking the "Connect" button, your app will redirect the user to Slack's authorization screen at `https://slack.com/oauth/v2/authorize`. Included in the URL are a list of scopes that your app is requesting the user to approve. In this example, the scopes are `channels:read`, `chat:write`, and `chat:write.public`.

###

## Deploy on Vercel

Deploying a Nextjs app on Vercel is really seamless.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Whenever your PR or main branch is updated, Vercel will automatically deploy a new "Preview" site for each change. Because the `redirect_uri` is based on each new site, Slack will require you to include each new `redirect_uri` in the Slack app's "OAuth & Permissions" "Redirect URLs" configuration. If any `redirect_uri` is not included in that list, the oauth flow is immediately exited.

To prevent this hassle, I recommend creating a unique domain in Vercel for the specific branch you're working with in your project. For example, if you're working on a branch in your project called `slack-integration`, you can create a unique domain dedicated to hosting deployments from the `slack-integration` branch.
