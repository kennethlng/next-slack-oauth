# next-slack-oauth

This is an example implementation of the Slack OAuth2 integration flow as outlined [here](https://api.slack.com/authentication/oauth-v2). The example app is built jn Next.js and deployed to Vercel. 

![](https://a.slack-edge.com/fbd3c/img/api/articles/oauth_scopes_tutorial/slack_oauth_flow_diagram.png)

You might find this handy if you're building a Slack app and you want users on your website to be able to install/integrate your Slack app in their Slack workspace. At the end of the OAuth2 flow, assuming the user has granted you the permissions to install your Slack app, you will receive a Slack access token that will allow you to perform actions, such as sending messages and getting a list of channels, in their workspace either as a Slack bot or on the user's behalf.   

To see this example in action, go to https://next-slack-oauth.vercel.app. 

## Getting started

Create a Slack app.

`NEXT_PUBLIC_SLACK_CLIENT_ID` and `SLACK_CLIENT_SECRET`.

> Remember that any variables exposed to the browser must be prefixed with `NEXT_PUBLIC_`.

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## OAuth2 flow

### Asking for scopes

Upon clicking the "Connect" button, your app will redirect the user to Slack's authorization screen at `https://slack.com/oauth/v2/authorize`. Included in the URL are a list of scopes that your app is requesting the user to approve. In this example, the scopes are `channels:read`, `chat:write`, and `chat:write.public`.

```ts
const SLACK_OAUTH_BASE_URL = "https://slack.com/oauth/v2/authorize";
```

```ts
const SLACK_SCOPES = ["chat:write", "channels:read", "chat:write.public"];
```

```ts
const origin =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";
const REDIRECT_URI = origin + "/api/auth/callback/slack";
```

The `state` parameter only accepts a string, so in order to pass in an object you must first encode the object in Base64, and then decode it later (this will be shown later). The callback page (redirect URL) is handled server-side and may not necessarily have the data you need to perform other operations, so you will need to include other information in this state, such as the user ID, workspace ID, or Slack team ID. 

```ts
const state = {
  redirect_uri: REDIRECT_URI,
  // Incude any other data
};

// Encode the state
const encodedState = btoa(JSON.stringify(state));
```

Convert the params object into URL query parameters and construct the authorization URL.

```ts
const params = {
  client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID as string,
  scope: SLACK_SCOPES.join(","),
  redirect_uri: REDIRECT_URI,
  state: encodedState,
};

const authUrl =
  SLACK_OAUTH_BASE_URL + "?" + new URLSearchParams(params).toString();
```

Finally, open the URL.

```ts
window.open(authUrl);
```

Full example:

```tsx
const Example = () => {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const REDIRECT_URI = origin + "/api/auth/callback/slack";

  const handleConnect = () => {
    const state = {
      redirect_uri: REDIRECT_URI,
    };

    // Encode the state
    const encodedState = btoa(JSON.stringify(state));

    const params = {
      client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID as string,
      scope: SLACK_SCOPES.join(","),
      redirect_uri: REDIRECT_URI,
      state: encodedState,
    };

    const authUrl =
      SLACK_OAUTH_BASE_URL + "?" + new URLSearchParams(params).toString();

    window.open(authUrl);
  };

  return (
    <button
      type="button"
      onClick={handleConnect}
    >
      Connect
    </button>
  );
}

```

### Waiting for user to approve the requested scopes

<img width="1552" alt="Screen Shot 2022-12-03 at 4 34 05 PM" src="https://user-images.githubusercontent.com/13254616/205468148-d43b3e9d-554d-4b15-a351-54c9e879bb36.png">

## Deploy on Vercel

Deploying a Nextjs app on Vercel is really seamless.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

The OAuth flow only works on secured websites. You cannot test the flow on `localhost`.

### Add environment variables

<img width="1552" alt="Screen Shot 2022-12-03 at 4 32 52 PM" src="https://user-images.githubusercontent.com/13254616/205468117-4c06c30d-0acb-4b74-a583-86e70f17474a.png">

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
