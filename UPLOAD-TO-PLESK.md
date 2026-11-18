# Uploading the website to Plesk

The folder **`htpn.apaxgrp.com`** in this project is a mirror of the
**`htpn.apaxgrp.com`** folder in Plesk. Whatever is inside one should be inside the other.

```
This project                         Plesk → Files
─────────────                        ─────────────
htpn.apaxgrp.com/          ───►      htpn.apaxgrp.com/
├── index.html                       ├── index.html
├── favicon.ico                      ├── favicon.ico
├── robots.txt                       ├── robots.txt
└── assets/                          ├── assets/
    └── (images, code, styles)       │   └── (same files)
                                     └── cgi-bin/   ← Plesk's own folder, leave it alone
```

Nothing else in this project goes to Plesk. That includes `google-sheet-form/`, `source-files/`, `APAX_XGRIDS.png`, `.git` and `.vscode`.

## Get the latest version first

After merging a pull request on GitHub, open a terminal in the project folder and run:

```bash
git checkout main
git pull
```

## Small update (usual case)

Each pull request lists the files it changed. In **Plesk → Files → htpn.apaxgrp.com**, upload just those files into the matching place, and choose **replace** when asked:

| Changed file in this project | Upload into Plesk folder |
|---|---|
| `htpn.apaxgrp.com/index.html` | `htpn.apaxgrp.com/` |
| `htpn.apaxgrp.com/assets/…` | `htpn.apaxgrp.com/assets/` |

Then open https://htpn.apaxgrp.com and press **Ctrl+Shift+R**.

## Full re-upload (if something looks broken)

1. On your computer, open the `htpn.apaxgrp.com` folder, select **everything inside it**, then right-click and choose **Compress to ZIP**.
2. In **Plesk → Files → htpn.apaxgrp.com**, delete everything **except `cgi-bin`**.
3. Upload the ZIP, click it, and choose **Extract Files**.
4. Check that `index.html` and `assets/` sit **directly** inside `htpn.apaxgrp.com`, not inside another folder.
5. Delete the ZIP file.

## Test locally before uploading

```bash
cd htpn.apaxgrp.com
npx serve -l 3000
```

Then open http://localhost:3000.
