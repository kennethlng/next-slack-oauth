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

The OAuth flow only works on secured websites. You cannot test the flow on `localhost`.

## Dedicated Vercel domain for your branch

Whenever your PR or main branch is updated, Vercel will automatically deploy a new "Preview" site for each change. 

<img width="1552" alt="Screen Shot 2022-12-03 at 4 10 45 PM" src="https://user-images.githubusercontent.com/13254616/205467599-7c83fb59-0cbe-4df2-90b4-04d15b02f3c2.png">

> Notice that each preview site created for each git commit is unique.

Because the `redirect_uri` is based on each new site, Slack will require you to include each new `redirect_uri` in the Slack app's "OAuth & Permissions" "Redirect URLs" configuration. If any `redirect_uri` is not included in that list, the oauth flow is immediately exited.

<img width="631" alt="Screen Shot 2022-12-03 at 4 15 26 PM" src="https://user-images.githubusercontent.com/13254616/205467699-ce2336b9-83c6-4d3b-97cd-2a389ce2d5f7.png">

As you can image, this gets pretty tedious. To prevent this hassle, I recommend creating a unique domain in Vercel for the specific branch you're working with in your project. For example, if you're working on a branch in your project called `slack-integration`, you can create a unique domain dedicated to hosting deployments from the `slack-integration` branch.

<img width="1552" alt="Screen Shot 2022-12-03 at 4 05 05 PM" src="https://user-images.githubusercontent.com/13254616/205467549-90d436f1-8fdf-450c-8870-24978f8da157.png">

<img width="1552" alt="Screen Shot 2022-12-03 at 4 05 13 PM" src="https://user-images.githubusercontent.com/13254616/205467551-f8b74efc-9c6c-4252-b528-46d0189ed373.png">

Now, in the Slack app, add your redirect URL using this unique domain.

<img width="620" alt="Screen Shot 2022-12-03 at 4 16 40 PM" src="https://user-images.githubusercontent.com/13254616/205467732-4d9ec4ee-7579-4fa4-bb8b-1cc411aa0a3b.png">
