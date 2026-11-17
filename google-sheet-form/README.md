# Talk to Expert form → Google Sheet

Submissions from the website's **Schedule Talk to Expert** form are saved as rows in a Google Sheet you own.
For each one, an email is also sent to `beapax2022@gmail.com`.

## One-time setup (about 5 minutes)

1. Sign in to Google with the account that should own the responses, then go to <https://sheets.new> to create a blank sheet.
   Name it e.g. **Talk to Expert – Responses**.
2. In the sheet's menu, click **Extensions → Apps Script**.
3. Delete everything in the editor, then paste in the contents of [`Code.gs`](Code.gs).
   Click 💾 **Save**.
4. Click **Deploy → New deployment**.
   - Click the ⚙️ next to "Select type" and choose **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**.
5. Google asks you to **Authorize access**:
   - Pick your account.
   - On "Google hasn't verified this app", click **Advanced → Go to … (unsafe)**. This is your own script, so it's safe.
   - Click **Allow**.
6. Copy the **Web app URL**. It looks like `https://script.google.com/macros/s/…/exec`.
   Opening it in a browser should show `"Talk to Expert form endpoint is running."`.
7. Put that URL into the website. It's the `TALK_TO_EXPERT_FORM_URL` line in `event.apaxgrp/index.html`.

## Seeing responses

Open the Google Sheet and go to the **Responses** tab.
It has one row per submission: date, name, email, phone, company.
The tab is created automatically on the first submission.

## Changing the script later

After editing `Code.gs` in Apps Script, click **Deploy → Manage deployments → ✏️ Edit**, set **Version: New version**, then click **Deploy**.
This keeps the same URL, so the website doesn't need changing.
