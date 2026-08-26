import React from "https://esm.sh/react@19.2.0";
import {createRoot} from "https://esm.sh/react-dom@19.2.0/client";

const CONFIG = window.GEOPROCESS_BOOKING || {};
const bookingUrl = CONFIG.bookingUrl || "";
const embedCode = CONFIG.embedCode || "";
const isConfigured = embedCode && !embedCode.includes("PASTE_YOUR_GOOGLE_INLINE_BOOKING_EMBED_CODE_HERE");

function BookingApp(){
  return <div className="booking-shell">
    <aside className="booking-info">
      <span className="eyebrow">Online consultation</span>
      <h2 style={{marginTop:10,fontSize:"2.3rem"}}>Book a project discussion.</h2>
      <p>
        Choose a convenient consultation time directly from the GeoProcess Consulting
        booking calendar. Your selected slot is handled by Google Calendar.
      </p>
      <div className="booking-points">
        <div className="booking-point"><b>01</b><div><strong>Choose a date</strong><span>See the available consultation days.</span></div></div>
        <div className="booking-point"><b>02</b><div><strong>Select a time</strong><span>Only available slots can be selected.</span></div></div>
        <div className="booking-point"><b>03</b><div><strong>Confirm booking</strong><span>Google Calendar handles the appointment confirmation.</span></div></div>
      </div>
      <div className="booking-note">
        <strong>Need a project quote instead?</strong>
        <span>Use our contact form for detailed project requirements, scope and quotation requests.</span>
        <a className="btn btn-ghost" href="contact.html">Project Inquiry →</a>
      </div>
    </aside>

    <section className="booking-card booking-calendar-card">
      {isConfigured ? <>
        <div className="booking-calendar-head">
          <div>
            <span className="eyebrow">Live availability</span>
            <h3>GeoProcess Consulting Calendar</h3>
            <p>Select an available date and time below.</p>
          </div>
          {bookingUrl && !bookingUrl.includes("PASTE_YOUR_GOOGLE_BOOKING_URL_HERE") &&
            <a className="btn btn-ghost" href={bookingUrl} target="_blank" rel="noopener noreferrer">Open Full Calendar ↗</a>}
        </div>
        <div className="google-calendar-frame" dangerouslySetInnerHTML={{__html: embedCode}} />
      </> : <SetupMessage />}
    </section>
  </div>
}

function SetupMessage(){
  return <div className="booking-setup">
    <div className="setup-icon">01</div>
    <span className="eyebrow">One-time setup</span>
    <h3>Connect Google Calendar</h3>
    <p>
      The website is ready for a real booking calendar. Create the Google Calendar
      Appointment Schedule, choose <strong>Inline booking page</strong>, and paste Google's
      official embed code into <code>js/booking.js</code>.
    </p>
    <div className="setup-steps">
      <div><b>1</b><span>Open Google Calendar.</span></div>
      <div><b>2</b><span>Create → Appointment schedule.</span></div>
      <div><b>3</b><span>Set your consultation duration and working hours.</span></div>
      <div><b>4</b><span>Choose Website embed → Inline booking page.</span></div>
      <div><b>5</b><span>Copy Google's embed code and paste it into <code>js/booking.js</code>.</span></div>
    </div>
    <a className="btn btn-primary" href="https://calendar.google.com/calendar/u/0/r" target="_blank" rel="noopener noreferrer">Open Google Calendar ↗</a>
  </div>
}

const mount=document.getElementById("booking-root");
if(mount) createRoot(mount).render(<BookingApp/>);
