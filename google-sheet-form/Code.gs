/**
 * "Schedule Talk to Expert" form -> Google Sheet
 *
 * Every time someone submits the form on the website, this script:
 *   1. adds a new row to the "Responses" tab of this Google Sheet
 *   2. sends a notification email to NOTIFY_EMAIL
 *
 * Setup: see google-sheet-form/README.md
 */

// Who gets an email for every new submission. Set to '' to turn emails off.
const NOTIFY_EMAIL = 'beapax2022@gmail.com';

// Name of the tab the responses go into (created automatically).
const SHEET_NAME = 'Responses';

const HEADERS = ['Submitted at', 'Full Name', 'Email', 'Phone', 'Company / Organization', 'Agreed to terms'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const data = JSON.parse(e.postData.contents);
    const clean = (v, max) => String(v == null ? '' : v).trim().slice(0, max);

    const fullName = clean(data.fullName, 100);
    const email = clean(data.email, 255);
    const phone = clean(data.phone, 20);
    const company = clean(data.company, 200);
    const agreed = data.agree === 'Yes';

    if (!fullName || !email || !phone || !company || !agreed) {
      return reply({ status: 'error', message: 'Please fill in all fields and agree to the terms.' });
    }

    const sheet = getSheet();
    // A leading = + - @ would make Sheets treat the text as a formula; the ' keeps it as plain text.
    const safe = (v) => (/^[=+\-@]/.test(v) ? "'" + v : v);
    sheet.appendRow([new Date(), safe(fullName), safe(email), safe(phone), safe(company), 'Yes']);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: email,
        subject: 'New Talk to Expert request: ' + fullName,
        body:
          'New "Schedule Talk to Expert" submission\n\n' +
          'Full Name: ' + fullName + '\n' +
          'Email: ' + email + '\n' +
          'Phone: ' + phone + '\n' +
          'Company / Organization: ' + company + '\n\n' +
          'All responses: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
      });
    }

    return reply({ status: 'ok', message: 'Saved' });
  } catch (err) {
    console.error(err);
    return reply({ status: 'error', message: 'Something went wrong. Please try again.' });
  } finally {
    lock.releaseLock();
  }
}

// Lets you check the link works by opening it in a browser.
function doGet() {
  return reply({ status: 'ok', message: 'Talk to Expert form endpoint is running.' });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
