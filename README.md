# GeoProcess Consulting Website

Multi-page GeoProcess Consulting website with HTML, CSS, JavaScript and a React-powered booking page.

## Zero-investment booking setup

The booking page is designed to use **Google Calendar Appointment Schedule** rather than a custom paid backend.

### One-time setup

1. Open Google Calendar using the Google account that will manage GeoProcess consultations.
2. Create an **Appointment schedule**.
3. Choose your consultation duration, working days and available hours.
4. Add questions you want customers to answer, such as Company, Phone/WhatsApp, Service Required and Project Details.
5. Under your booking page, open **Options → Sharing options → Website embed**.
6. Choose **Inline booking page** and copy Google's complete embed code.
7. Open `js/booking.js`.
8. Replace `PASTE_YOUR_GOOGLE_INLINE_BOOKING_EMBED_CODE_HERE` with the copied embed code.
9. Optionally replace `PASTE_YOUR_GOOGLE_BOOKING_URL_HERE` with the public booking-page URL so the page also shows an "Open Full Calendar" button.
10. Upload the website again.

The booking page will then display Google's live appointment interface. Customers choose an available time, submit their details and Google Calendar creates the appointment and confirmation. Google documents that appointment schedules block unavailable/busy times and add booked appointments to your calendar.

## Contact form

The contact/scoping form continues to use Web3Forms. Replace its placeholder access key with the real Web3Forms access key before deployment.

## Business email

The website uses `contact@geoprocessconsulting.site` for contact links. Your Zoho business mailbox can remain the receiving mailbox for project inquiries.

## Main pages

- `index.html` — Home
- `about.html` — About
- `services.html` — Services
- `projects.html` — Projects
- `videos.html` — Video gallery
- `contact.html` — Contact / project inquiry
- `booking.html` — Google Calendar consultation booking

## Front-end technologies

- HTML5
- CSS3
- JavaScript
- React 19 via browser ESM import
- Google Calendar Appointment Schedule for live booking
- Web3Forms for project/contact inquiries
