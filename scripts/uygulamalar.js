// ==========================================
// UYGULAMA 1: NOT HESAPLAMA SİSTEMİ
// ==========================================
function hesaplaNot() {
    const adSoyad = document.getElementById("adSoyad").value.trim();
    const vizeStr = document.getElementById("vizeNotu").value.trim();
    const finalStr = document.getElementById("finalNotu").value.trim();
    const sonucBox = document.getElementById("notSonuc");
    const sonucOzet = document.getElementById("notOzet");
    const sonucDetay = document.getElementById("notDetay");

    // Basit validasyon
    if (!adSoyad || !vizeStr || !finalStr) {
        gosterSonuc(sonucBox, sonucOzet, sonucDetay, "Hata!", "Lütfen tüm alanları doldurunuz.", "danger");
        return;
    }

    const vize = parseFloat(vizeStr);
    const final = parseFloat(finalStr);

    if (isNaN(vize) || isNaN(final) || vize < 0 || vize > 100 || final < 0 || final > 100) {
        gosterSonuc(sonucBox, sonucOzet, sonucDetay, "Hatalı Giriş!", "Lütfen 0 ile 100 arasında geçerli notlar giriniz.", "danger");
        return;
    }

    // Ortalama hesabı: Vize %40, Final %60
    const ortalama = (vize * 0.4) + (final * 0.6);
    let harfNotu = "";
    
    // Harf notu hesaplama (Örnek standart tablo)
    if (ortalama >= 90) harfNotu = "AA";
    else if (ortalama >= 85) harfNotu = "BA";
    else if (ortalama >= 80) harfNotu = "BB";
    else if (ortalama >= 75) harfNotu = "CB";
    else if (ortalama >= 70) harfNotu = "CC";
    else if (ortalama >= 65) harfNotu = "DC";
    else if (ortalama >= 60) harfNotu = "DD";
    else if (ortalama >= 50) harfNotu = "FD";
    else harfNotu = "FF";

    // Geçti/Kaldı durumu
    if (ortalama >= 50) {
        gosterSonuc(
            sonucBox, sonucOzet, sonucDetay, 
            "Tebrikler, Geçtiniz! 🎉", 
            `Sayın <b>${adSoyad}</b>,<br>Ortalamanız: <b>${ortalama.toFixed(2)}</b><br>Harf Notunuz: <b>${harfNotu}</b>`, 
            "success"
        );
    } else {
        gosterSonuc(
            sonucBox, sonucOzet, sonucDetay, 
            "Maalesef, Kaldınız. 😢", 
            `Sayın <b>${adSoyad}</b>,<br>Ortalamanız: <b>${ortalama.toFixed(2)}</b><br>Harf Notunuz: <b>${harfNotu}</b>`, 
            "danger"
        );
    }
}

function gosterSonuc(kutu, baslikEl, detayEl, baslikMetni, detayMetni, tip) {
    kutu.style.display = "block";
    kutu.className = "result-box " + tip;
    baslikEl.innerHTML = baslikMetni;
    detayEl.innerHTML = detayMetni;
}

// ==========================================
// UYGULAMA 2: BİRİM DÖNÜŞTÜRÜCÜ
// ==========================================

const birimler = {
    uzunluk: [
        { id: "m", ad: "Metre" },
        { id: "km", ad: "Kilometre" },
        { id: "mi", ad: "Mil" }
    ],
    sicaklik: [
        { id: "c", ad: "Celsius" },
        { id: "f", ad: "Fahrenheit" },
        { id: "k", ad: "Kelvin" }
    ]
};

function turDegisti() {
    const tip = document.getElementById("donusumTipi").value;
    const kaynak = document.getElementById("birimKaynak");
    const hedef = document.getElementById("birimHedef");

    kaynak.innerHTML = "";
    hedef.innerHTML = "";

    birimler[tip].forEach(b => {
        kaynak.add(new Option(b.ad, b.id));
        hedef.add(new Option(b.ad, b.id));
    });
    
    // Hedef birimin varsayılan olarak 2. seçenek olması
    if (hedef.options.length > 1) {
        hedef.selectedIndex = 1;
    }
}

function hesaplaDonusum() {
    const degerStr = document.getElementById("girisDegeri").value.replace(',', '.');
    const deger = parseFloat(degerStr);
    const kaynak = document.getElementById("birimKaynak").value;
    const hedef = document.getElementById("birimHedef").value;
    const sonucBox = document.getElementById("donusumSonuc");
    const sonucDetay = document.getElementById("donusumDetay");

    if (isNaN(deger)) {
        sonucBox.style.display = "block";
        sonucBox.className = "result-box danger";
        sonucDetay.innerHTML = "Lütfen dönüştürmek için geçerli bir sayı giriniz.";
        return;
    }

    if (kaynak === hedef) {
        sonucBox.style.display = "block";
        sonucBox.className = "result-box info";
        sonucDetay.innerHTML = `<b>${deger}</b> girdiğiniz birim ile aynı.`;
        return;
    }

    let sonuc = 0;
    const tip = document.getElementById("donusumTipi").value;

    if (tip === "uzunluk") {
        // Hepsini önce metreye çevir
        let metre = deger;
        if (kaynak === "km") metre = deger * 1000;
        if (kaynak === "mi") metre = deger * 1609.34;

        // Metreden hedefe çevir
        if (hedef === "m") sonuc = metre;
        if (hedef === "km") sonuc = metre / 1000;
        if (hedef === "mi") sonuc = metre / 1609.34;

    } else if (tip === "sicaklik") {
        // Hepsini önce Celsius'a çevir
        let celsius = deger;
        if (kaynak === "f") celsius = (deger - 32) * 5/9;
        if (kaynak === "k") celsius = deger - 273.15;

        // Celsius'tan hedefe çevir
        if (hedef === "c") sonuc = celsius;
        if (hedef === "f") sonuc = (celsius * 9/5) + 32;
        if (hedef === "k") sonuc = celsius + 273.15;
    }

    // Formatlama ve Gösterme
    sonucBox.style.display = "block";
    sonucBox.className = "result-box success";
    sonucDetay.innerHTML = `<b>${deger}</b> biriminden dönüştürüldü: <br><span style="font-size:1.5rem; font-weight:bold; color:#166534;">${sonuc.toFixed(4).replace(/\.?0+$/, '')}</span>`;
}

// Sayfa yüklendiğinde birimleri doldur
window.onload = function() {
    turDegisti();
};
