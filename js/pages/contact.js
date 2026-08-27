/* =========================================================
   GeoProcess Consulting — Contact Page
   Single owner for Web3Forms + email launcher behavior.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('form[action=""]');
  const status = document.getElementById("enquiryStatus");
  let submitting = false;

  /* ---------------------------------------------------------
     CONTACT FORM — ONE Web3Forms SUBMISSION
     --------------------------------------------------------- */
  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      // Prevent accidental double-click / duplicate requests.
      if (submitting) return;
      submitting = true;

      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton ? submitButton.textContent : "";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending…";
      }

      if (status) {
        status.style.display = "none";
        status.textContent = "";
      }

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        const result = await response.json();

        if (!response.ok || !result || result.success !== true) {
          throw new Error(result?.message || "Submission failed");
        }

        if (status) {
          status.style.display = "block";
          status.style.background = "#eef9f0";
          status.style.border = "1px solid #bce3c2";
          status.style.color = "#235f2d";
          status.textContent = "✓ Your enquiry was submitted successfully. We will get back to you soon.";
        }

        form.reset();
      } catch (error) {
        console.error("Web3Forms submission error:", error);
        if (status) {
          status.style.display = "block";
          status.style.background = "#fff1f1";
          status.style.border = "1px solid #f0b8b8";
          status.style.color = "#9b2c2c";
          status.textContent = "✕ Your enquiry could not be submitted. Please try again or contact us directly.";
        }
      } finally {
        submitting = false;
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      }
    });
  }

  /* ---------------------------------------------------------
     EMAIL LAUNCHER — ONE OWNER
     --------------------------------------------------------- */
  const launcher = document.querySelector(".email-launcher");
  if (!launcher) return;

  const toggle = launcher.querySelector(".email-menu-button");
  const email = "contact@geoprocessconsulting.site";
  const subject = "Project Enquiry - GeoProcess Consulting";
  const body = "Hello GeoProcess Consulting,\n\nI would like to discuss a project with your team.\n\nProject details:\n";

  if (!toggle) return;

  function close() {
    launcher.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openClient(client) {
    const enc = encodeURIComponent;
    let url;

    if (client === "gmail") {
      url = "https://mail.google.com/mail/?view=cm&fs=1&to=" + enc(email) +
        "&su=" + enc(subject) + "&body=" + enc(body);
      window.open(url, "_blank", "noopener");
    } else if (client === "outlook") {
      url = "https://outlook.office.com/mail/deeplink/compose?to=" + enc(email) +
        "&subject=" + enc(subject) + "&body=" + enc(body);
      window.open(url, "_blank", "noopener");
    } else {
      window.location.href = "mailto:" + email + "?subject=" + enc(subject) + "&body=" + enc(body);
    }

    close();
  }

  toggle.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    const open = !launcher.classList.contains("open");
    launcher.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  launcher.querySelectorAll("[data-email-client]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      openClient(button.dataset.emailClient);
    });
  });

  document.addEventListener("click", function (event) {
    if (!launcher.contains(event.target)) close();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") close();
  });
});
