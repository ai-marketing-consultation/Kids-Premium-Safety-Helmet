# Kids Premium Safety Helmet — COD funnel

## Stack and order flow

This is a Next.js 14 App Router project styled entirely with Tailwind CSS. The landing page passes the selected quantity and current offer price to `/checkout`. Checkout sends a JSON `POST` request to server-only `/api/order`. The API validates the request, creates an order ID, appends a row to Google Sheets, then sends the business notification and customer confirmation through SMTP. It returns success only after all three operations complete, after which the customer is redirected to `/thank-you`.

Private credentials are only read in `app/api/order/route.ts`; no credential is shipped to a browser. `EMAIL_SERVICE_API_KEY` is included in `.env.example` for providers that need it, but the current reliable implementation uses SMTP. For Gmail SMTP, use an App Password rather than your usual Google password.

## Local setup

1. Install dependencies: `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Fill every Google Sheets and SMTP value described below.
4. Run `npm run dev`, then open `http://localhost:3000`.
5. For production validation, run `npm run build`.

## Google Sheets setup

1. Create a Google Spreadsheet and name its first tab `Sheet 1`, or choose another name and set `GOOGLE_SHEET_TAB_NAME` to the exact name.
2. Add this header row, in this exact order:

   `Order ID | Date & Time | Customer Name | Phone Number | Email Address | Exact Location | Product Name | Quantity | Price Per Piece | Total Price | Payment Method | Order Status | Notes`

3. Copy the spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`.
4. In Google Cloud, enable the **Google Sheets API**, create a service account, create a JSON key, and copy its `client_email` and `private_key` into the environment variables below.
5. Click **Share** on the spreadsheet and give the service account email **Editor** permission.
6. Select the `Order Status` column in Sheets, use **Data → Data validation → Dropdown**, and add: `New Order`, `Order Confirmed`, `Order Ongoing`, `Delivered`, and `Cancelled`.
7. Use **Data → Create a filter** on the header row to sort and filter orders by date or status.

Google environment values:

```env
GOOGLE_SHEET_ID=your_spreadsheet_id
GOOGLE_SHEET_TAB_NAME=Sheet 1
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
# Keep quotes; use literal \n characters when pasting a one-line private key.
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## Email setup

The app uses Nodemailer SMTP. Gmail is supported through `smtp.gmail.com`, port `587`, with a Google App Password. The `EMAIL_FROM` address must normally be an address your SMTP provider allows you to send as.

```env
BUSINESS_EMAIL=urbanride.2083@gmail.com
EMAIL_FROM=urbanride.2083@gmail.com
BRAND_NAME=Kids Premium Safety Helmet
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=urbanride.2083@gmail.com
SMTP_PASS=your_16_character_google_app_password
```

## Testing orders

First use a private/test spreadsheet and an email inbox you can access. Submit an order from `/checkout`; verify the success screen, a new sheet row, the business email, and the customer email. Missing/inaccurate environment variables deliberately cause the API to return an error and keep the customer on checkout. Check the server terminal/Vercel function logs for detailed operational errors.

## Vercel deployment

1. Push this project to GitHub and import it in Vercel, or deploy using the Vercel CLI.
2. Add every value from `.env.example` in **Project Settings → Environment Variables** (Production and Preview as appropriate). Never commit `.env.local`.
3. Set `NEXT_PUBLIC_SITE_URL` and `FRONTEND_URL` to the deployed `https://...` URL.
4. Deploy, submit a real test order, and check the Vercel function logs if it fails.

`FRONTEND_URL` is reserved for a future cross-origin frontend. This project uses same-origin Next.js API routes, so browser CORS is not opened unnecessarily.
