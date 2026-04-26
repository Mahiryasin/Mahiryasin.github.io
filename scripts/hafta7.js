// ===== HAFTA 7 – JavaScript =====

/* ----------------------------------------
   1) TEMA DEĞİŞTİRME
   ---------------------------------------- */
function temaDegistir() {
    const body = document.getElementById("sayfa");
    const btn  = document.getElementById("temaBtn");

    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        btn.innerHTML = '<i class="bi bi-sun-fill me-1"></i>Aydınlık Mod';
        btn.classList.replace("btn-outline-warning", "btn-warning");
    } else {
        btn.innerHTML = '<i class="bi bi-moon-stars-fill me-1"></i>Karanlık Mod';
        btn.classList.replace("btn-warning", "btn-outline-warning");
    }
}

/* ----------------------------------------
   2) FORM DOĞRULAMA & ÖZET OLUŞTURMA
   ---------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
    const form        = document.getElementById("kayitFormu");
    const uyariAlani  = document.getElementById("uyariAlani");
    const uyariMesaji = document.getElementById("uyariMesaji");
    const sonucAlani  = document.getElementById("sonucAlani");

    form.addEventListener("submit", function (event) {
        // Sayfanın yenilenmesini engelle
        event.preventDefault();

        // Alanları al
        const adSoyad    = document.getElementById("adSoyad").value.trim();
        const email      = document.getElementById("email").value.trim();
        const telefon    = document.getElementById("telefon").value.trim();
        const katilimTuru = document.getElementById("katilimTuru").value;
        const etkinlik   = document.getElementById("etkinlikSec").value;
        const hakkinda   = document.getElementById("hakkinda").value.trim();
        const kvkk       = document.getElementById("kvkk").checked;

        // --- Boş alan kontrolü ---
        if (!adSoyad) {
            uyariGoster("Lütfen adınızı ve soyadınızı giriniz.");
            return;
        }
        if (!email) {
            uyariGoster("Lütfen geçerli bir e-posta adresi giriniz.");
            return;
        }
        if (!telefon) {
            uyariGoster("Lütfen telefon numaranızı giriniz.");
            return;
        }
        if (!katilimTuru) {
            uyariGoster("Lütfen katılım türünü seçiniz.");
            return;
        }
        if (!etkinlik) {
            uyariGoster("Lütfen katılmak istediğiniz etkinliği seçiniz.");
            return;
        }
        if (!kvkk) {
            uyariGoster("Devam edebilmek için KVKK metnini onaylamanız gerekmektedir.");
            return;
        }

        // --- Hata yoksa uyarıyı gizle ---
        uyariAlani.classList.add("d-none");

        // --- Başvuru özeti kartı oluştur ---
        const simdi = new Date().toLocaleString("tr-TR");
        const darkClass = document.getElementById("sayfa").classList.contains("dark-mode")
            ? "bg-dark text-light" : "bg-white";

        sonucAlani.style.display = "block";
        sonucAlani.innerHTML = `
            <div class="card sonuc-kart border-0 shadow-sm rounded-4 p-4 ${darkClass}">
                <div class="d-flex align-items-center mb-3">
                    <span class="badge bg-success fs-6 me-3 px-3 py-2 rounded-pill">
                        <i class="bi bi-check-circle-fill me-1"></i>Başvuru Alındı
                    </span>
                    <small class="text-muted">${simdi}</small>
                </div>
                <h3 class="h5 fw-bold mb-3"><i class="bi bi-clipboard-data me-2 text-primary"></i>Başvuru Özeti</h3>
                <div class="row g-2 small">
                    <div class="col-sm-6">
                        <div class="fw-semibold text-muted">Ad Soyad</div>
                        <div class="fs-6">${adSoyad}</div>
                    </div>
                    <div class="col-sm-6">
                        <div class="fw-semibold text-muted">E-posta</div>
                        <div class="fs-6">${email}</div>
                    </div>
                    <div class="col-sm-6">
                        <div class="fw-semibold text-muted">Telefon</div>
                        <div class="fs-6">${telefon}</div>
                    </div>
                    <div class="col-sm-6">
                        <div class="fw-semibold text-muted">Katılım Türü</div>
                        <div class="fs-6">${katilimTuru}</div>
                    </div>
                    <div class="col-12">
                        <div class="fw-semibold text-muted">Seçilen Etkinlik</div>
                        <div class="fs-6">${etkinlik}</div>
                    </div>
                    ${hakkinda ? `
                    <div class="col-12">
                        <div class="fw-semibold text-muted">Hakkında</div>
                        <div class="fs-6 fst-italic">${hakkinda}</div>
                    </div>` : ""}
                </div>
                <hr>
                <p class="mb-2 small text-success fw-semibold">
                    <i class="bi bi-envelope-check-fill me-1"></i>
                    Başvurunuz başarıyla alındı. Onay e-postası <strong>${email}</strong> adresine gönderilecektir.
                </p>
                <button class="btn btn-sm btn-outline-secondary rounded-pill mt-1" onclick="yeniBasvuru()">
                    <i class="bi bi-arrow-repeat me-1"></i>Yeni Başvuru Yap
                </button>
            </div>
        `;

        // Özet alana scroll
        sonucAlani.scrollIntoView({ behavior: "smooth", block: "start" });

        // Formu sıfırla
        form.reset();
    });
});

/* ----------------------------------------
   Yardımcı: Uyarı göster
   ---------------------------------------- */
function uyariGoster(mesaj) {
    const uyariAlani  = document.getElementById("uyariAlani");
    const uyariMesaji = document.getElementById("uyariMesaji");
    uyariMesaji.textContent = mesaj;
    uyariAlani.classList.remove("d-none");
    uyariAlani.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ----------------------------------------
   Yeni başvuru – sonuç alanını gizle
   ---------------------------------------- */
function yeniBasvuru() {
    const sonucAlani = document.getElementById("sonucAlani");
    sonucAlani.style.display = "none";
    document.getElementById("form-bolumu").scrollIntoView({ behavior: "smooth" });
}
