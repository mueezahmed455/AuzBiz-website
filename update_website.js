const fs = require("fs");

// Update layout.tsx
let layout = fs.readFileSync("src/app/layout.tsx", "utf8");
layout = layout.replace("AUZBIZ — Dream Beyond Borders | Premium Travel & Events Agency Lahore", "AUZBIZ — Dream Beyond Borders | Travel, Umrah, Visa & Corporate Events | Lahore");
fs.writeFileSync("src/app/layout.tsx", layout);
