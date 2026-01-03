const params = new URLSearchParams(window.location.search);
const id = params.get("service") || services[0].id;

const service = services.find(s => s.id === id);

if (!service) {
  document.body.innerHTML = "<h2 style='text-align:center;padding:100px'>Service Not Found</h2>";
  throw new Error("Service not found");
}

/* ================= PAGE + BREADCRUMB ================= */
document.getElementById("pageTitle").innerText = service.title;
document.getElementById("breadcrumbTitle").innerText = service.title;
document.getElementById("breadcrumbCurrent").innerText = service.title;

/* ================= MAIN CONTENT ================= */
document.getElementById("projectTitle").innerText = service.title;

document.getElementById("introText1").innerText = service.description[0] || "";
document.getElementById("introText2").innerText = service.description[1] || "";
document.getElementById("introText3").innerText = service.description[2] || "";

document.getElementById("mainImage").src = service.image;
document.getElementById("mainImage").alt = service.title;

if (service.video) {
  document.getElementById("videoLink").href = service.video;
} else {
  document.getElementById("videoLink").style.display = "none";
}

/* ================= SIDEBAR SERVICES ================= */
const sidebar = document.getElementById("sidebarServices");
sidebar.innerHTML = "";

(service.points || []).forEach(s => {
  sidebar.innerHTML += `
    <li class="${s.id === id ? "active" : ""}">
        ${s} <i class="fas fa-angle-right"></i>
    </li>
  `;
});

/* ================= SERVICES / POINTS ================= */
const servicesList = document.getElementById("servicesList");
servicesList.innerHTML = "";

(service.points || []).forEach(p => {
  servicesList.innerHTML += `
    <li class="item">
      <i class="fas fa-check"></i>
      <h4>${p}</h4>
    </li>
  `;
});

/* ================= EXPERIENCE ================= */
const experienceList = document.getElementById("experienceList");
experienceList.innerHTML = "";

(service.experience || []).forEach(e => {
  experienceList.innerHTML += `
    <li class="item">
      <i class="fas fa-check"></i>
      <h4>${e}</h4>
    </li>
  `;
});

/* ================= FAQs ================= */
const faqList = document.getElementById("faqList");
faqList.innerHTML = "";

(service.faqs || []).forEach((f, i) => {
  faqList.innerHTML += `
    <div class="faq-box">
      <button class="btn btn-primary click" type="button"
        data-bs-toggle="collapse"
        data-bs-target="#faq-${i}">
        ${f.q} <i class="fas fa-angle-right"></i>
      </button>
      <div class="collapse ${i === 0 ? "show" : ""}" id="faq-${i}">
        <div class="card card-body about-text">
          ${f.a}
        </div>
      </div>
    </div>
  `;
});

/* ================= BLOGS ================= */
const blogList = document.getElementById("blogList");
blogList.innerHTML = "";

(service.blogs || []).forEach(b => {
  blogList.innerHTML += `
    <div class="col-md-12 col-lg-6">
      <div class="blog-item">
        <div class="img-box">
          <img class="img-fluid" src="${b.image}" alt="${b.title}">
        </div>
        <div class="text-box">
          <h5>${b.title}</h5>
          <span class="blog-date">${b.date}</span>
          <p>${b.excerpt || ""}</p>
        </div>
      </div>
    </div>
  `;
});

/* ================= FEATURES ================= */
const featureList = document.getElementById("featureList");
featureList.innerHTML = "";

(service.features || []).forEach(f => {
  featureList.innerHTML += `
    <div class="col-sm-6">
      <div class="item">
        <i class="${f.icon}"></i>
        <div class="content-box">
          <h5>${f.title}</h5>
          <p>${f.text}</p>
        </div>
      </div>
    </div>
  `;
});

document.addEventListener("DOMContentLoaded", () => {
  const loadPartial = (id, file) => {
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${file}`);
        }
        return response.text();
      })
      .then(html => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      })
      .catch(err => console.error(err));
  };

  loadPartial("header", "partials/header.html");
  loadPartial("footer", "partials/footer.html");
});
