export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      ok: false,
      error: "Method Not Allowed"
    });
  }

  return res.status(200).json({
    ok: true,
    service: "serahor-cs16-api",
    status: "online",
    endpoint: "/api/cs16/update"
  });
}
