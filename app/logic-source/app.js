// Ambil elemen dari form dan hasil
const form = document.getElementById("diagnosisForm");
const resultDiv = document.getElementById("result");

// Aturan dan Pengetahuan (Basis Pengetahuan)
const rules = [
  // AIDS (Stadium 4) - Semua gejala parah
  {
    conditions: {
      riskGroup: "tinggi",
      weightLoss: "parah",
      fever: "parah",
      infection: "parah",
      rash: "parah",
      headache: "parah",
      lymphNodes: "parah",
      chronicFatigue: "parah",
      mouthSores: "parah",
    },
    conclusion:
      "Anda berada pada tahap AIDS (Stadium 4). Gejala menunjukkan adanya infeksi berat dengan sistem kekebalan yang sangat lemah. Segera periksakan ke dokter untuk penanganan lebih lanjut.",
  },
  // HIV Stadium 3 - Gejala sedang hingga parah
  {
    conditions: {
      riskGroup: "tinggi",
      weightLoss: "sedang",
      fever: "sedang",
      infection: "sedang",
      rash: "sedang",
      headache: "sedang",
      lymphNodes: "sedang",
      chronicFatigue: "sedang",
      mouthSores: "ringan",
    },
    conclusion:
      "Anda berada pada tahap HIV Stadium 3. Beberapa gejala menunjukkan HIV telah berkembang dan membutuhkan penanganan medis segera.",
  },
  // HIV Stadium 2 - Gejala ringan
  {
    conditions: {
      riskGroup: "sedang",
      weightLoss: "ringan",
      fever: "ringan",
      rash: "ringan",
      infection: "ringan",
      headache: "ringan",
      lymphNodes: "ringan",
      chronicFatigue: "ringan",
      mouthSores: "tidak ada",
    },
    conclusion:
      "Anda berada pada tahap HIV Stadium 2. Gejala yang dialami menunjukkan tahap awal infeksi HIV, segera lakukan konsultasi ke dokter.",
  },
  // HIV Stadium 1 - Gejala sangat ringan
  {
    conditions: {
      riskGroup: "rendah",
      weightLoss: "tidak ada",
      fever: "ringan",
      rash: "tidak ada",
      infection: "tidak ada",
      headache: "tidak ada",
      lymphNodes: "tidak ada",
      chronicFatigue: "tidak ada",
      mouthSores: "tidak ada",
    },
    conclusion:
      "Anda mungkin berada pada tahap HIV Stadium 1. Gejala yang dialami sangat ringan dan kemungkinan berada pada tahap awal infeksi. Sebaiknya konsultasikan dengan dokter untuk memastikan kondisi Anda.",
  },
  // Tidak ada gejala HIV
  {
    conditions: {
      riskGroup: "tidak ada",
      weightLoss: "tidak ada",
      fever: "tidak ada",
      rash: "tidak ada",
      infection: "tidak ada",
      headache: "tidak ada",
      lymphNodes: "tidak ada",
      chronicFatigue: "tidak ada",
      mouthSores: "tidak ada",
    },
    conclusion:
      "Anda tidak menunjukkan gejala yang mengarah pada infeksi HIV. Namun, untuk lebih pastinya, lakukan tes HIV di fasilitas kesehatan terdekat jika Anda merasa khawatir.",
  },
  // Risiko tinggi dengan gejala ringan
  {
    conditions: {
      riskGroup: "tinggi",
      weightLoss: "ringan",
      fever: "ringan",
      rash: "tidak ada",
      infection: "tidak ada",
      headache: "ringan",
      lymphNodes: "ringan",
      chronicFatigue: "ringan",
      mouthSores: "tidak ada",
    },
    conclusion:
      "Anda memiliki risiko tinggi dan beberapa gejala ringan. Sebaiknya segera lakukan konsultasi ke dokter untuk pemeriksaan lebih lanjut dan pencegahan.",
  },
  // Risiko sedang dengan gejala sedang
  {
    conditions: {
      riskGroup: "sedang",
      weightLoss: "sedang",
      fever: "sedang",
      rash: "ringan",
      infection: "ringan",
      headache: "sedang",
      lymphNodes: "sedang",
      chronicFatigue: "sedang",
      mouthSores: "ringan",
    },
    conclusion:
      "Anda berada pada risiko sedang dengan beberapa gejala sedang. Ini menunjukkan kemungkinan perkembangan HIV, dan penting untuk segera berkonsultasi dengan dokter.",
  },
  // Risiko rendah tanpa gejala berat
  {
    conditions: {
      riskGroup: "rendah",
      weightLoss: "tidak ada",
      fever: "tidak ada",
      rash: "tidak ada",
      infection: "ringan",
      headache: "tidak ada",
      lymphNodes: "tidak ada",
      chronicFatigue: "ringan",
      mouthSores: "tidak ada",
    },
    conclusion:
      "Anda memiliki risiko rendah tanpa gejala berat. Meski begitu, tetap disarankan untuk melakukan pemeriksaan rutin agar kondisi kesehatan tetap terpantau.",
  },
];

// Fungsi untuk mencocokkan kondisi dengan aturan yang ada
function diagnose(conditions) {
  for (let rule of rules) {
    let match = true;
    for (let key in rule.conditions) {
      if (rule.conditions[key] !== conditions[key]) {
        match = false;
        break;
      }
    }
    if (match) {
      return rule.conclusion;
    }
  }
  return "Gejala tidak cocok dengan diagnosis yang tersedia.";
}

// Event listener untuk menangani submit form
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah form dari reload halaman

  // Ambil nilai dari setiap gejala
  const conditions = {
    riskGroup: document.getElementById("riskGroup").value,
    weightLoss: document.getElementById("weightLoss").value,
    fever: document.getElementById("fever").value,
    rash: document.getElementById("rash").value,
    infection: document.getElementById("infection").value,
    headache: document.getElementById("headache").value,
    lymphNodes: document.getElementById("lymphNodes").value,
    chronicFatigue: document.getElementById("chronicFatigue").value,
    mouthSores: document.getElementById("mouthSores").value,
  };

  // Lakukan diagnosis berdasarkan gejala
  const diagnosis = diagnose(conditions);

  // Tampilkan hasil diagnosis
  resultDiv.classList.remove("d-none", "alert-success", "alert-danger");
  resultDiv.classList.add("alert");

  if (diagnosis.includes("AIDS")) {
    resultDiv.classList.add("alert-danger");
  } else {
    resultDiv.classList.add("alert-warning");
  }

  resultDiv.innerHTML = diagnosis;
});
