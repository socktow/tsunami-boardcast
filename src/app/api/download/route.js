import fs from "fs";
import path from "path";

// helper sanitize
function sanitizeFilename(name) {
  return name.replace(/[\/\\:*?"<>|]/g, "_").replace(/\s+/g, "_");
}

export async function GET() {
  const agentsUrl = "https://valorant-api.com/v1/agents";
  const mapsUrl = "https://valorant-api.com/v1/maps";

  try {
    // gọi API
    const [agentsRes, mapsRes] = await Promise.all([
      fetch(agentsUrl),
      fetch(mapsUrl),
    ]);

    const agentsData = await agentsRes.json();
    const mapsData = await mapsRes.json();

    const agents = agentsData.data.filter((a) => a.displayIcon);
    const maps = mapsData.data.filter((m) => m.splash);

    // folder base
    const baseDir = path.join(process.cwd(), "public", "valorant");
    const agentDir = path.join(baseDir, "agents");
    const mapDir = path.join(baseDir, "maps");

    [baseDir, agentDir, mapDir].forEach((dir) => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });

    // download helper
    async function downloadImage(url, filepath) {
      if (!url) return; // skip nếu null
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(filepath, buffer);
    }

    let total = agents.length * 3 + maps.length * 2; // agent có 3 loại ảnh, map có 2
    let downloaded = 0;

    // tải agents
    for (let agent of agents) {
      const safeName = sanitizeFilename(agent.displayName);

      const files = [
        { url: agent.displayIcon, ext: "png", suffix: "icon" },
        { url: agent.bustPortrait, ext: "png", suffix: "bust" },
        { url: agent.fullPortrait, ext: "png", suffix: "full" },
      ];

      for (let f of files) {
        if (!f.url) continue;
        const filename = `${safeName}_${f.suffix}.${f.ext}`;
        const filePath = path.join(agentDir, filename);
        await downloadImage(f.url, filePath);
        downloaded++;
      }
    }

    // tạo folder riêng cho map
    const splashDir = path.join(mapDir, "splash");
    const tallDir = path.join(mapDir, "listViewIconTall");
    [splashDir, tallDir].forEach((dir) => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });

    // tải maps
    for (let map of maps) {
      const safeName = sanitizeFilename(map.displayName);

      const files = [
        { url: map.splash, ext: "jpg", dir: splashDir },
        { url: map.listViewIconTall, ext: "png", dir: tallDir },
      ];

      for (let f of files) {
        if (!f.url) continue;
        const filename = `${safeName}.${f.ext}`;
        const filePath = path.join(f.dir, filename);
        await downloadImage(f.url, filePath);
        downloaded++;
      }
    }

    return new Response(
      JSON.stringify({ success: true, total, downloaded }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Download error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
