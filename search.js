// pages/api/search.js
//
// POST /api/search
// Body: { fullname: string, phone: string }
// Response:
//   200 { found: true, registrant: {...} }
//   200 { found: false }
//   400 { error: "..." }   (missing/invalid input)
//   405 { error: "..." }   (wrong method)

import { findRegistrant } from "../../lib/registrants";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullname, phone } = req.body || {};

  if (!fullname || !String(fullname).trim() || !phone || !String(phone).trim()) {
    return res.status(400).json({ error: "Nama lengkap dan nomor HP wajib diisi." });
  }

  try {
    const registrant = await findRegistrant(fullname, phone);

    if (!registrant) {
      return res.status(200).json({ found: false });
    }

    return res.status(200).json({ found: true, registrant });
  } catch (err) {
    console.error("Search error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan saat mencari data." });
  }
}
