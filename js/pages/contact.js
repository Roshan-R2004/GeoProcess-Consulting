document.addEventListener("DOMContentLoaded", function () {
            // Form submission logic
            const form = document.querySelector('form[action="https://api.web3forms.com/submit"]');
            const status = document.getElementById("enquiryStatus");

            if (form && status) {
                form.addEventListener("submit", async function (event) {
                    event.preventDefault();

                    const submitButton = form.querySelector('button[type="submit"]');
                    const originalText = submitButton ? submitButton.textContent : "";

                    if (submitButton) {
                        submitButton.disabled = true;
                        submitButton.textContent = "Sending...";
                    }

                    status.style.display = "none";
                    status.textContent = "";

                    try {
                        const response = await fetch("https://api.web3forms.com/submit", {
                            method: "POST",
                            body: new FormData(form),
                            headers: { "Accept": "application/json" }
                        });

                        const result = await response.json();

                        if (!response.ok || !result.success) {
                            throw new Error(result.message || "Submission failed");
                        }

                        status.style.display = "block";
                        status.style.background = "#eef9f0";
                        status.style.border = "1px solid #bce3c2";
                        status.style.color = "#235f2d";
                        status.textContent = "✓ Your enquiry was submitted successfully. We will get back to you soon.";
                        form.reset();
                    } catch (error) {
                        status.style.display = "block";
                        status.style.background = "#fff1f1";
                        status.style.border = "1px solid #f0b8b8";
                        status.style.color = "#9b2c2c";
                        status.textContent = "✕ Your enquiry could not be submitted. Please try again or contact us directly.";
                    } finally {
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.textContent = originalText;
                        }
                    }
                });
            }

            // SMART EMAIL DROPDOWN TOGGLE & ACTIONS
            const dropdownBtn = document.getElementById("emailDropdownBtn");
            const emailMenu = document.getElementById("emailMenu");
            const copyEmailAction = document.getElementById("copyEmailAction");

            if (dropdownBtn && emailMenu) {
                // Toggle menu on click
                dropdownBtn.addEventListener("click", function (e) {
                    e.stopPropagation();
                    emailMenu.classList.toggle("show");
                });

                // Close menu when clicking anywhere else outside
                document.addEventListener("click", function (e) {
                    if (!dropdownBtn.contains(e.target) && !emailMenu.contains(e.target)) {
                        emailMenu.classList.remove("show");
                    }
                });

                // Copy to Clipboard Action
                if (copyEmailAction) {
                    copyEmailAction.addEventListener("click", function (e) {
                        e.stopPropagation();
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText("contact@geoprocessconsulting.site");
                        }

                        copyEmailAction.innerHTML = "<span>✓</span> Copied to clipboard!";
                        setTimeout(function () {
                            copyEmailAction.innerHTML = "<span>📋</span> Copy Email Address";
                            emailMenu.classList.remove("show");
                        }, 1800);
                    });
                }
            }
        });

document.addEventListener("DOMContentLoaded", function () {
            // Form submission logic
            const form = document.querySelector('form[action="https://api.web3forms.com/submit"]');
            const status = document.getElementById("enquiryStatus");

            if (form && status) {
                form.addEventListener("submit", async function (event) {
                    event.preventDefault();

                    const submitButton = form.querySelector('button[type="submit"]');
                    const originalText = submitButton ? submitButton.textContent : "";

                    if (submitButton) {
                        submitButton.disabled = true;
                        submitButton.textContent = "Sending...";
                    }

                    status.style.display = "none";
                    status.textContent = "";

                    try {
                        const response = await fetch("https://api.web3forms.com/submit", {
                            method: "POST",
                            body: new FormData(form),
                            headers: { "Accept": "application/json" }
                        });

                        const result = await response.json();

                        if (!response.ok || !result.success) {
                            throw new Error(result.message || "Submission failed");
                        }

                        status.style.display = "block";
                        status.style.background = "#eef9f0";
                        status.style.border = "1px solid #bce3c2";
                        status.style.color = "#235f2d";
                        status.textContent = "✓ Your enquiry was submitted successfully. We will get back to you soon.";
                        form.reset();
                    } catch (error) {
                        status.style.display = "block";
                        status.style.background = "#fff1f1";
                        status.style.border = "1px solid #f0b8b8";
                        status.style.color = "#9b2c2c";
                        status.textContent = "✕ Your enquiry could not be submitted. Please try again or contact us directly.";
                    } finally {
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.textContent = originalText;
                        }
                    }
                });
            }

            // SMART EMAIL DROPDOWN TOGGLE & ACTIONS
            const dropdownBtn = document.getElementById("emailDropdownBtn");
            const emailMenu = document.getElementById("emailMenu");
            const copyEmailAction = document.getElementById("copyEmailAction");

            if (dropdownBtn && emailMenu) {
                // Toggle menu on click
                dropdownBtn.addEventListener("click", function (e) {
                    e.stopPropagation();
                    emailMenu.classList.toggle("show");
                });

                // Close menu when clicking anywhere else outside
                document.addEventListener("click", function (e) {
                    if (!dropdownBtn.contains(e.target) && !emailMenu.contains(e.target)) {
                        emailMenu.classList.remove("show");
                    }
                });

                // Copy to Clipboard Action
                if (copyEmailAction) {
                    copyEmailAction.addEventListener("click", function (e) {
                        e.stopPropagation();
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText("contact@geoprocessconsulting.site");
                        }

                        copyEmailAction.innerHTML = "<span>✓</span> Copied to clipboard!";
                        setTimeout(function () {
                            copyEmailAction.innerHTML = "<span>📋</span> Copy Email Address";
                            emailMenu.classList.remove("show");
                        }, 1800);
                    });
                }
            }
        });

document.addEventListener("DOMContentLoaded", function () {
            const launcher = document.querySelector(".email-launcher");
            if (!launcher) return;
            const toggle = launcher.querySelector(".email-menu-button");
            const email = "contact@geoprocessconsulting.site";
            const subject = "Project Enquiry - GeoProcess Consulting";
            const body = "Hello GeoProcess Consulting,\n\nI would like to discuss a project with your team.\n\nProject details:\n";
            function openClient(client) {
                const enc = v => encodeURIComponent(v);
                let url;
                if (client === "gmail") {
                    url = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(email)}&su=${enc(subject)}&body=${enc(body)}`;
                    window.open(url, "_blank", "noopener");
                } else if (client === "outlook") {
                    url = `https://outlook.office.com/mail/deeplink/compose?to=${enc(email)}&subject=${enc(subject)}&body=${enc(body)}`;
                    window.open(url, "_blank", "noopener");
                } else {
                    window.location.href = `mailto:${email}?subject=${enc(subject)}&body=${enc(body)}`;
                }
                close();
            }
            function close() { launcher.classList.remove("open"); toggle.setAttribute("aria-expanded", "false") }
            toggle.addEventListener("click", function (e) { e.stopPropagation(); const open = launcher.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(open)) });
            launcher.querySelectorAll("[data-email-client]").forEach(btn => btn.addEventListener("click", function () { openClient(btn.dataset.emailClient) }));
            document.addEventListener("click", function (e) { if (!launcher.contains(e.target)) close() });
            document.addEventListener("keydown", function (e) { if (e.key === "Escape") close() });
        });
