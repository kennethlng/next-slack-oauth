/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const SLACK_ACCESS_TOKEN_URL = "https://slack.com/api/oauth.v2.access";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { code, state } = req.query;

    // Parse the state to retreive the workspace ID
    const decodedState = JSON.parse(atob(state as string));
    const { redirect_uri } = decodedState;

    // Exchange authorization code for access token
    const result = await axios({
      method: "post",
      url: SLACK_ACCESS_TOKEN_URL,
      data: {
        code,
        client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Get the access token from the response
    const data = result.data;
    const { access_token } = data;

    // Save the access token to the database
    console.log("Access token: ", access_token);

    res.status(200).json({
      message: "Slack access token saved",
    });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
