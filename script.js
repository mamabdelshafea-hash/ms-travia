const LANG = document.documentElement.lang === "en" ? "en" : "ar";
const ASSET_ROOT = LANG === "en" ? "../" : "";

const WHATSAPP_NUMBER = "249127454000";
const BOOKING_EMAIL = "Traviatraveloffical@gmail.com";
// Free form-to-email service: the first request sends an activation email to BOOKING_EMAIL.
const BOOKING_ENDPOINT = `https://formsubmit.co/ajax/${BOOKING_EMAIL}`;

const destinations = [
  { ar: "الهند", en: "India", flag: "🇮🇳", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80" },
  { ar: "الصين", en: "China", flag: "🇨🇳", image: "images/china.jpg", position: "center 52%" },
  { ar: "تركيا", en: "Turkey", flag: "🇹🇷", image: "images/turkey.jpg", position: "center 42%" },
  { ar: "ماليزيا", en: "Malaysia", flag: "🇲🇾", image: "images/malaysia.jpg", position: "center 18%" },
  { ar: "رواندا", en: "Rwanda", flag: "🇷🇼", image: "images/rwanda.webp", position: "center 72%" },
  { ar: "أوغندا", en: "Uganda", flag: "🇺🇬", image: "images/uganda.jpg", position: "center 12%" },
  { ar: "روسيا", en: "Russia", flag: "🇷🇺", image: "images/russia.webp", position: "center 42%" },
  { ar: "إثيوبيا", en: "Ethiopia", flag: "🇪🇹", image: "images/ethiopia.jpg", position: "center 28%" },
  { ar: "تنزانيا", en: "Tanzania", flag: "🇹🇿", image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80" },
  { ar: "المالديف", en: "Maldives", flag: "🇲🇻", image: "images/maldives.jpg", position: "center 45%" },
  { ar: "تايلاند", en: "Thailand", flag: "🇹🇭", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80" },
  { ar: "إندونيسيا", en: "Indonesia", flag: "🇮🇩", image: "images/indonesia.jpg", position: "center 38%" },
  { ar: "سيشل", en: "Seychelles", flag: "🇸🇨", image: "images/seychelles.jpg", position: "center 18%" },
  { ar: "موريشيوس", en: "Mauritius", flag: "🇲🇺", image: "images/mauritius.jpg", position: "center 55%" },
  { ar: "الإمارات", en: "UAE", flag: "🇦🇪", image: "images/uae.jpg", position: "center 50%" },
  { ar: "المملكة العربية السعودية", en: "Saudi Arabia", flag: "🇸🇦", image: "images/makkah.jpg", position: "center 65%" },
];

const TEXT = {
  ar: {
    intro: "مرحباً فريق ترافيا، أود طلب خدمة جديدة.",
    subject: (service) => `طلب حجز جديد - ${service}`,
    labels: {
      name: "الاسم",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      service: "نوع الخدمة",
      destination: "الوجهة",
      travellers: "عدد المسافرين",
      date: "تاريخ السفر",
      details: "ملاحظات",
    },
    notSet: "غير محدد",
    noNotes: "لا توجد ملاحظات إضافية",
    sending: "جارٍ إرسال طلبك...",
    success: (name) => `شكرًا ${name}، وصل طلبك إلى بريدنا الإلكتروني وسنتواصل معك قريبًا. اضغط "إرسال" في واتساب لتصلنا رسالتك هناك أيضًا.`,
    failed: "تعذّر إرسال الطلب إلى البريد الإلكتروني الآن. أرسله عبر واتساب أو البريد:",
    whatsappLink: "فتح واتساب",
    emailLink: "إرسال بالبريد",
  },
  en: {
    intro: "Hello Travia team, I would like to request a new service.",
    subject: (service) => `New booking request - ${service}`,
    labels: {
      name: "Name",
      phone: "Phone",
      email: "Email",
      service: "Service",
      destination: "Destination",
      travellers: "Travellers",
      date: "Travel date",
      details: "Notes",
    },
    notSet: "Not specified",
    noNotes: "No additional notes",
    sending: "Sending your request...",
    success: (name) => `Thank you ${name}, your request has reached our email and we will contact you soon. Tap "Send" in WhatsApp so your message reaches us there too.`,
    failed: "We couldn't email your request right now. Please send it by WhatsApp or email:",
    whatsappLink: "Open WhatsApp",
    emailLink: "Send by email",
  },
};

// ISO country codes: all UN member states plus Palestine and Vatican City.
const COUNTRY_CODES = (
  "AF AL DZ AD AO AG AR AM AU AT AZ BS BH BD BB BY BE BZ BJ BT BO BA BW BR BN BG BF BI CV KH CM CA CF TD CL CN CO KM CG CD " +
  "CR CI HR CU CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FJ FI FR GA GM GE DE GH GR GD GT GN GW GY HT VA HN HU IS IN ID IR " +
  "IQ IE IL IT JM JP JO KZ KE KI KW KG LA LV LB LS LR LY LI LT LU MG MW MY MV ML MT MH MR MU MX FM MD MC MN ME MA MZ MM NA " +
  "NR NP NL NZ NI NE NG KP MK NO OM PK PW PS PA PG PY PE PH PL PT QA RO RU RW KN LC VC WS SM ST SA SN RS SC SL SG SK SI SB " +
  "SO ZA KR SS ES LK SD SR SE CH SY TJ TZ TH TL TG TO TT TN TR TM TV UG UA AE GB US UY UZ VU VE VN YE ZM ZW"
).split(" ");

// The agency's featured destinations, shown first.
const POPULAR_COUNTRY_CODES = ["SA", "AE", "EG", "TR", "IN", "MY", "CN", "RU", "ET", "RW", "UG", "TZ", "MV", "TH", "ID", "SC", "MU"];

const COUNTRY_GROUPS = {
  ar: { popular: "الوجهات الشائعة", all: "جميع الدول" },
  en: { popular: "Popular destinations", all: "All countries" },
};

function setupCountrySelect() {
  const select = document.querySelector("[data-country-select]");
  if (!select) return;

  let regionNames = null;
  try {
    regionNames = new Intl.DisplayNames([LANG], { type: "region" });
  } catch (error) {
    regionNames = null;
  }
  const nameOf = (code) => (regionNames && regionNames.of(code)) || code;

  const addGroup = (label, codes) => {
    const group = document.createElement("optgroup");
    group.label = label;
    codes.forEach((code) => {
      const name = nameOf(code);
      group.append(new Option(name, name));
    });
    select.append(group);
  };

  const sorted = [...COUNTRY_CODES].sort((a, b) => nameOf(a).localeCompare(nameOf(b), LANG));
  addGroup(COUNTRY_GROUPS[LANG].popular, POPULAR_COUNTRY_CODES);
  addGroup(COUNTRY_GROUPS[LANG].all, sorted);
}

function assetUrl(path) {
  return /^https?:/.test(path) ? path : ASSET_ROOT + path;
}

function renderDestinations() {
  const grid = document.getElementById("countryGrid");
  if (!grid) return;

  grid.innerHTML = destinations
    .map(
      (country) => `
        <div class="destination-item" style="background-image: linear-gradient(180deg, rgba(7, 30, 51, 0.0), rgba(7, 30, 51, 0.75)), url('${assetUrl(country.image)}');${country.position ? ` background-position: ${country.position};` : ""}">
          <span>${country.flag} ${country[LANG]}</span>
        </div>
      `
    )
    .join("");
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function showFormMessage(box, state, text, links = []) {
  if (!box) return;
  box.className = `form-message visible${state ? ` is-${state}` : ""}`;
  box.textContent = text;
  links.forEach(({ href, label }) => {
    box.append(" ");
    const a = document.createElement("a");
    a.href = href;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.textContent = label;
    box.append(a);
  });
}

function setupBookingForm() {
  const form = document.querySelector(".booking-form");
  if (!form) return;

  const box = form.querySelector(".form-message");
  const submit = form.querySelector('button[type="submit"]');
  const t = TEXT[LANG];

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const raw = Object.fromEntries(new FormData(form));
    const data = {
      name: (raw.name || "").trim(),
      phone: (raw.phone || "").trim(),
      email: (raw.email || "").trim(),
      service: raw.service || "",
      destination: (raw.destination || "").trim() || t.notSet,
      travellers: raw.travellers || "1",
      date: raw.date || t.notSet,
      details: (raw.details || "").trim() || t.noNotes,
    };

    const fields = ["name", "phone", "email", "service", "destination", "travellers", "date", "details"]
      .filter((key) => key !== "email" || data.email);
    const lines = fields.map((key) => `${t.labels[key]}: ${data[key]}`);

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent([t.intro, ...lines].join("\n"))}`;
    const mailUrl = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(t.subject(data.service))}&body=${encodeURIComponent([t.intro, "", ...lines].join("\n"))}`;
    const fallbackLinks = [
      { href: whatsappUrl, label: t.whatsappLink },
      { href: mailUrl, label: t.emailLink },
    ];

    // Open WhatsApp straight away (inside the click) so browsers don't block it.
    window.open(whatsappUrl, "_blank", "noopener");

    submit.disabled = true;
    showFormMessage(box, "pending", t.sending);

    const payload = { _subject: t.subject(data.service), _template: "table", _captcha: "false" };
    fields.forEach((key) => {
      payload[t.labels[key]] = data[key];
    });
    if (data.email) payload._replyto = data.email;

    try {
      const response = await fetch(BOOKING_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || String(result.success) === "false") {
        throw new Error(result.message || `HTTP ${response.status}`);
      }
      showFormMessage(box, "", t.success(data.name), [{ href: whatsappUrl, label: t.whatsappLink }]);
      form.reset();
    } catch (error) {
      console.error("Booking email failed:", error);
      showFormMessage(box, "error", t.failed, fallbackLinks);
    } finally {
      submit.disabled = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderDestinations();
  setupCountrySelect();
  setupNav();
  setupBookingForm();

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
