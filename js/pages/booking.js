/* GeoProcess Consulting — booking flow */
const BOOKING_API_URL = (window.GEOPROCESS_BOOKING && window.GEOPROCESS_BOOKING.apiUrl) || "google-apps-script-exec-url";
let selectedBookingTime = null;
let currentRequestId = 0;

function showMessage(message, type) {
  const box = document.getElementById("booking-message");
  if (!box) return;
  box.textContent = message;
  box.className = "booking-message" + (type ? " " + type : "");
}

function getAvailability(date) {
  return new Promise((resolve, reject) => {
    const callbackName = "geoCallback_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
    const script = document.createElement("script");
    const timeout = setTimeout(() => { cleanup(); reject(new Error("Availability request timed out.")); }, 15000);
    function cleanup() { clearTimeout(timeout); delete window[callbackName]; script.remove(); }
    window[callbackName] = data => { cleanup(); resolve(data); };
    script.onerror = () => { cleanup(); reject(new Error("Google Calendar API connection failed.")); };
    script.src = BOOKING_API_URL + "?action=availability&date=" + encodeURIComponent(date) + "&callback=" + callbackName;
    document.body.appendChild(script);
  });
}

function updateSelectedSlot(date, time) {
  const box = document.getElementById("selected-slot");
  if (!box) return;
  if (!date || !time) {
    box.querySelector("strong").textContent = "No time selected";
    return;
  }
  const d = new Date(date + "T00:00:00");
  const dateLabel = d.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
  box.querySelector("strong").textContent = dateLabel + " · " + time + " · IST";
}

async function loadTimeSlots(date) {
  const container = document.getElementById("time-slots");
  if (!container) return;
  const requestId = ++currentRequestId;
  selectedBookingTime = null;
  updateSelectedSlot(null, null);
  container.innerHTML = "<p class=\"slot-loading\">Loading available times…</p>";
  try {
    const result = await getAvailability(date);
    if (requestId !== currentRequestId) return;
    if (!result || !result.success) {
      container.innerHTML = "<p>Unable to load available times. Please try again.</p>";
      return;
    }
    const available = (result.slots || []).filter(slot => slot.available === true);
    if (!available.length) {
      container.innerHTML = "<p>No available consultation times for this date.</p>";
      return;
    }
    container.innerHTML = "";
    available.forEach(slot => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "time-slot";
      button.textContent = slot.start + (slot.end ? " — " + slot.end : "");
      button.dataset.time = slot.start;
      button.addEventListener("click", () => {
        document.querySelectorAll(".time-slot").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedBookingTime = slot.start;
        updateSelectedSlot(date, selectedBookingTime);
        showMessage("", "");
      });
      container.appendChild(button);
    });
  } catch (error) {
    if (requestId !== currentRequestId) return;
    console.error(error);
    container.innerHTML = "<p>Unable to load available times. Check the booking API configuration and try again.</p>";
  }
}

async function submitBooking(event) {
  event.preventDefault();
  const date = document.getElementById("booking-date")?.value;
  const name = document.getElementById("customer-name")?.value.trim();
  const email = document.getElementById("customer-email")?.value.trim();
  const phone = document.getElementById("customer-phone")?.value.trim() || "";
  const company = document.getElementById("customer-company")?.value.trim() || "";
  const service = document.getElementById("customer-service")?.value || "";
  const details = document.getElementById("customer-details")?.value.trim() || "";
  const button = document.querySelector("#booking-form button[type='submit']");

  if (!date) return showMessage("Please select a date.", "error");
  if (!selectedBookingTime) return showMessage("Please select an available time slot.", "error");
  if (!name) return showMessage("Please enter your name.", "error");
  if (!email) return showMessage("Please enter your email.", "error");

  const payload = { name, email, phone, company, service, date, time: selectedBookingTime, details };
  if (button) { button.disabled = true; button.innerHTML = "Submitting Request… <span>↗</span>"; }
  showMessage("Submitting your booking request…", "loading");

  try {
    if (!BOOKING_API_URL || BOOKING_API_URL === "google-apps-script-exec-url") {
      throw new Error("Booking API is not configured.");
    }
    const response = await fetch(BOOKING_API_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!result || !result.success) throw new Error(result?.message || "Booking could not be completed.");
    showMessage("Request received! Your booking is pending review. You will receive an invitation email once confirmed.", "success");
    document.getElementById("booking-form")?.reset();
    selectedBookingTime = null;
    updateSelectedSlot(null, null);
    document.querySelectorAll(".time-slot").forEach(btn => btn.classList.remove("selected"));
    loadTimeSlots(date);
  } catch (error) {
    console.error(error);
    showMessage(error.message === "Booking API is not configured." ? "Booking calendar is not connected yet. Add your active Google Apps Script /exec URL in js/booking-config.js." : "Unable to submit the booking request. Please try again.", "error");
  } finally {
    if (button) { button.disabled = false; button.innerHTML = "Confirm Booking <span>↗</span>"; }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("booking-date");
  if (dateInput) {
    const now = new Date();
    dateInput.min = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");
    dateInput.addEventListener("change", () => dateInput.value ? loadTimeSlots(dateInput.value) : null);
  }
  document.getElementById("booking-form")?.addEventListener("submit", submitBooking);
});
