export default async function handler(req, res) {
  const { q, topic } = req.query;
  const apiKey = "4ae0694e5791eb3086160cc6d8b9438f";

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(q || "latest")}${
        topic ? `&topic=${topic}` : ""
      }&lang=en&max=12&apikey=${apiKey}`
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ API Error:", response.status, text);
      return res.status(response.status).send(text);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("⚠️ Fetch failed:", err);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
}
