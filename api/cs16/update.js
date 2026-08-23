export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method Not Allowed"
    });
  }

  const expectedToken =
    process.env.CS16_API_TOKEN || "GizliVeGuvenliToken123!";

  const receivedToken = req.headers["x-server-token"];

  if (receivedToken !== expectedToken) {
    return res.status(401).json({
      ok: false,
      error: "Unauthorized"
    });
  }

  const body = req.body;

  if (
    !body ||
    typeof body.map !== "string" ||
    !Array.isArray(body.players)
  ) {
    return res.status(400).json({
      ok: false,
      error: "Invalid payload"
    });
  }

  const latestData = {
    map: body.map,
    players: body.players,
    receivedAt: new Date().toISOString()
  };

  // Test amacıyla Vercel loglarına da yazıyoruz.
  console.log(
    "[CS16] Veri alindi:",
    JSON.stringify(latestData)
  );

  return res.status(200).json({
    ok: true,
    players: body.players.length,
    receivedAt: latestData.receivedAt
  });
}
