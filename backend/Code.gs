// Bound to the ParUp Smoke Test Signups spreadsheet.
const TAB_NAME = 'Signups';
const HEADERS = ['Timestamp', 'Email', 'Location', 'Availability', 'Experience', 'Preferred round style', 'Consent', 'Source'];

function setup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Open Apps Script from the ParUp signups spreadsheet first.');
  let sheet = spreadsheet.getSheetByName(TAB_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(TAB_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
}

function doPost(e) {
  const values = (e && e.parameter) || {};
  if (String(values.website || '').trim()) return reply_('success'); // hidden honeypot
  const email = String(values.email || '').trim().toLowerCase().slice(0, 254);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || values.consent !== 'yes') return reply_('error');
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(5000);
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(TAB_NAME);
    if (!sheet) sheet = spreadsheet.insertSheet(TAB_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const existing = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      if (existing.some(row => String(row[0]).trim().toLowerCase() === email)) return reply_('duplicate');
    }
    sheet.appendRow([new Date(), email, clean_(values.location), clean_(values.availability), clean_(values.experience), clean_(values.round_style), 'yes', clean_(values.source) || 'ParUp Pages']);
    return reply_('success');
  } catch (error) {
    console.error(error);
    return reply_('error');
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function reply_(status) {
  const html = '<!doctype html><script>window.parent.postMessage({type:"parup-signup",status:"' + status + '"},"*");</script>';
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function clean_(value) {
  const cleaned = String(value || '').trim().replace(/[\u0000-\u001f]/g, '').slice(0, 180);
  return /^[=+\-@]/.test(cleaned) ? "'" + cleaned : cleaned;
}
