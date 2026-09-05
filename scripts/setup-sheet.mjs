import { google } from 'googleapis';

const headers = ['Order ID', 'Date & Time', 'Customer Name', 'Phone Number', 'Email Address', 'Exact Location', 'Product Name', 'Quantity', 'Price Per Piece', 'Total Price', 'Payment Method', 'Order Status', 'Notes'];
const auth = new google.auth.GoogleAuth({
  credentials: { client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });
const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID });
const tab = spreadsheet.data.sheets.find((sheet) => sheet.properties?.title === process.env.GOOGLE_SHEET_TAB_NAME);
if (!tab?.properties?.sheetId && tab?.properties?.sheetId !== 0) throw new Error(`Tab "${process.env.GOOGLE_SHEET_TAB_NAME}" was not found.`);
const sheetId = tab.properties.sheetId;
const firstRow = await sheets.spreadsheets.values.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: `'${process.env.GOOGLE_SHEET_TAB_NAME}'!A1:M1` });
if (!firstRow.data.values?.[0]?.length) await sheets.spreadsheets.values.update({ spreadsheetId: process.env.GOOGLE_SHEET_ID, range: `'${process.env.GOOGLE_SHEET_TAB_NAME}'!A1:M1`, valueInputOption: 'RAW', requestBody: { values: [headers] } });
await sheets.spreadsheets.batchUpdate({ spreadsheetId: process.env.GOOGLE_SHEET_ID, requestBody: { requests: [
  { repeatCell: { range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 13 }, cell: { userEnteredFormat: { backgroundColor: { red: .08, green: .09, blue: .1 }, textFormat: { foregroundColor: { red: .85, green: 1, blue: .25 }, bold: true }, horizontalAlignment: 'CENTER', verticalAlignment: 'MIDDLE' } }, fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)' } },
  { updateSheetProperties: { properties: { sheetId, gridProperties: { frozenRowCount: 1 } }, fields: 'gridProperties.frozenRowCount' } },
  { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, startColumnIndex: 0, endColumnIndex: 13 } } } },
  { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 13 }, properties: { pixelSize: 145 }, fields: 'pixelSize' } },
] } });
console.log('Google Sheet is connected and formatted.');
