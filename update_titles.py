from pathlib import Path
for p in Path("src").rglob("*.tsx"):
    try:
        c = p.read_text(encoding="utf-8")
        n = c.replace("Chief Marketing Officer", "Chief Executive Officer (CEO)").replace("CMO", "CEO").replace("Lahore DHA RAHBAR", "DHA II (Rehbar) Lahore-Pakistan").replace("DHA RAHBAR", "DHA II (Rehbar) Lahore-Pakistan")
        if n != c:
            p.write_text(n, encoding="utf-8")
            print("updated", p)
    except Exception as e: print("error", p, e)
