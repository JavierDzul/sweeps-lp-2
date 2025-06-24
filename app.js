// hubspot-submit.js
(function () {
  const formId = 'SpinUSA'; 
  const portalId = '45590864'; 
  const hubspotFormId = '9756c090-b32f-4bc8-b80a-475020f14cd9'; 
  const redirectUrl = 'https://wisekapital.scaletrk.com/click?o=358&a=159&sub_id1=DRCT&sub_id2={source_id}&sub_id3={click_id}'; // 🔁 Redirect after success

  window.addEventListener("load", function () {
    const form = document.getElementById(formId);
    if (!form) {
      console.warn("[hubspot-submit.js] Form not found");
      return;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const firstname = form.querySelector('input[name="firstname"]')?.value.trim();
      const email = form.querySelector('input[name="email"]')?.value.trim();

      if (!firstname || !email) {
        alert("Please fill in all fields.");
        return;
      }

      const payload = {
        fields: [
          { name: "firstname", value: firstname },
          { name: "email", value: email }
        ],
        context: {
          pageUri: window.location.href,
          pageName: document.title
        }
      };

      fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${hubspotFormId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(res => {
        if (res.ok) {
          window.location.href = redirectUrl;
        } else {
          return res.text().then(text => {
            throw new Error(`[hubspot-submit.js] HubSpot error: ${text}`);
          });
        }
      })
      .catch(err => {
        console.error("[hubspot-submit.js] Submission failed:", err);
        alert("Something went wrong. Please try again later.");
      });
    });
  });
})();
