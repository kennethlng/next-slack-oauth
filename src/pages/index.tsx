import Head from "next/head";

const SLACK_OAUTH_URL = "https://slack.com/oauth/v2/authorize";
const SLACK_SCOPES = ["chat:write", "channels:read", "chat:write.public"];

export default function Home() {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const REDIRECT_URI = origin + "/api/auth/callback/slack";

  const handleConnect = () => {
    const state = {
      workspace_id: "signal",
      redirect_uri: REDIRECT_URI,
    };

    const params = {
      client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID as string,
      scope: SLACK_SCOPES.join(","),
      redirect_uri: REDIRECT_URI,
      state: btoa(JSON.stringify(state)),
    };

    const url = SLACK_OAUTH_URL + "?" + new URLSearchParams(params).toString();

    window.open(url);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Integrate Slack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-full">
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                Integrate Slack
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              {/* Replace with your content */}
              <div className="px-4 py-8 sm:px-0">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleConnect}
                >
                  Connect
                </button>
              </div>
              {/* /End replace */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
