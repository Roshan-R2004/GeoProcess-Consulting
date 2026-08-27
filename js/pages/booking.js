/* =========================================================
   GeoProcess Consulting — Contact Page
   Single owner for:
   1. Web3Forms project enquiry submission
   2. Email launcher dropdown
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------------------------------------------------------
     PROJECT ENQUIRY — ONE SUBMISSION HANDLER
     --------------------------------------------------------- */

  const form = document.querySelector(".enquiry-panel form");
  const status = document.getElementById("enquiryStatus");

  let submitting = false;

  if (form) {
    form.addEventListener("submit", async function (event) {
      // Never allow the browser to navigate to Web3Forms.
      event.preventDefault();

      // Stop accidental double-clicks and duplicate requests.
      if (submitting) return;

      // Let the browser handle normal required-field validation.
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      submitting = true;

      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton
        ? submitButton.textContent
        : "Send Project Enquiry →";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.setAttribute("aria-busy", "true");
        submitButton.textContent = "Sending…";
      }

      showStatus("", "hidden");

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json"
          }
        });

        let result = null;

        try {
          result = await response.json();
        } catch (_) {
          // Keep the generic failure message below.
        }

        if (!response.ok || !result || result.success !== true) {
          throw new Error(
            result && result.message
              ? result.message
              : "Submission failed"
          );
        }

        // SUCCESS — stay on contact.html.
        showStatus(
          "✓ Your enquiry was submitted successfully. We will get back to you soon.",
          "success"
        );

        form.reset();

      } catch (error) {
        console.error("Web3Forms submission error:", error);

        // FAILURE — stay on contact.html.
        showStatus(
          "✕ Your enquiry could not be submitted. Please try again or contact us directly.",
          "error"
        );

      } finally {
        submitting = false;

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.removeAttribute("aria-busy");
          submitButton.textContent = originalText;
        }
      }
    });
  }

  function showStatus(message, type) {
    if (!status) return;

    if (type === "hidden") {
      status.style.display = "none";
      status.textContent = "";
      status.removeAttribute("data-status");
      return;
    }

    status.style.display = "block";
    status.setAttribute("data-status", type);
    status.textContent = message;

    if (type === "success") {
      status.style.background = "#eef9f0";
      status.style.border = "1px solid #bce3c2";
      status.style.color = "#235f2d";
    } else {
      status.style.background = "#fff1f1";
      status.style.border = "1px solid #f0b8b8";
      status.style.color = "#9b2c2c";
    }
  }

  /* ---------------------------------------------------------
     EMAIL LAUNCHER — ONE OWNER
     --------------------------------------------------------- */

  const launcher = document.querySelector(".email-launcher");
  if (!launcher) return;

  const toggle = launcher.querySelector(".email-menu-button");
  if (!toggle) return;

  const email = "contact@geoprocessconsulting.site";
  const subject = "Project Enquiry - GeoProcess Consulting";
  const body =
    "Hello GeoProcess Consulting,\n\n" +
    "I would like to discuss a project with your team.\n\n" +
    "Project details:\n";

  function closeEmailMenu() {
    launcher.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openEmailClient(client) {
    const enc = encodeURIComponent;
    let url = "95433ffc-cbaa-4f23-9a5e-ce3a34da2779";

    if (client === "gmail") {
      url =
        "https://mail.google.com/mail/?view=cm&fs=1&to=" +
        enc(email) +
        "&su=" +
        enc(subject) +
        "&body=" +
        enc(body);

      window.open(url, "_blank", "noopener,noreferrer");

    } else if (client === "outlook") {
      url =
        "https://outlook.office.com/mail/deeplink/compose?to=" +
        enc(email) +
        "&subject=" +
        enc(subject) +
        "&body=" +
        enc(body);

      window.open(url, "_blank", "noopener,noreferrer");

    } else {
      window.location.href =
        "mailto:" +
        email +
        "?subject=" +
        enc(subject) +
        "&body=" +
        enc(body);
    }

    closeEmailMenu();
  }

  toggle.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = launcher.classList.contains("open");

    if (isOpen) {
      closeEmailMenu();
    } else {
      launcher.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });

  launcher.querySelectorAll("[data-email-client]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      openEmailClient(button.dataset.emailClient);
    });
  });

  document.addEventListener("click", function (event) {
    if (!launcher.contains(event.target)) {
      closeEmailMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeEmailMenu();
    }
  });
});
