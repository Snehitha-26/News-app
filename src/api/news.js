export default async function handler(req, res) {
  const { q = "latest", topic = "" } = req.query;
  const apiKey = process.env.GNEWS_API_KEY; 

  if (!apiKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const url = `https://gnews.io/api/v4/search?q=${q}${topic ? `&topic=${topic}` : ""}&lang=en&max=12&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
