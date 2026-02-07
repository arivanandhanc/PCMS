import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const endpoint = process.env.CONTENTSTACK_AUTOMATE_ENDPOINT;
  const apiKey = process.env.CONTENTSTACK_AUTOMATE_API_KEY;

  if (!endpoint || !apiKey) {
    return res
      .status(500)
      .json({ message: "Automate environment variables missing" });
  }

  try {
    const automateRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ah-http-key": apiKey,
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (!automateRes.ok) {
      const errText = await automateRes.text();
      throw new Error(errText);
    }

    return res.status(200).json({ message: "Message submitted!" });
  } catch (error) {
    console.error("Automate error:", error);
    return res
      .status(500)
      .json({ message: "Failed to submit form. Please try again." });
  }
}
