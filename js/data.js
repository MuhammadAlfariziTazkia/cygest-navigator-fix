/* =========================================================================
   Cygest · Patient Navigator — CONTENT
   Seluruh konten klinis diambil dari:
   "Patient_Navigator_Tool__Individualized_LPS_with_Cygest_-_Reps_Detailing_Guide.docx"
   Ubah teks / angka / gambar di file ini saja — layout otomatis menyesuaikan.

   Foto profil: isi field `photo` dengan path gambar, mis. "assets/profiles/works.jpg".
   Bila kosong (null), tampil ilustrasi bawaan.
   ========================================================================= */

const FIG = (file, caption) => ({ src: `assets/evidence/${file}`, caption });

/* --- Figures dari docx -------------------------------------------------- */
const F = {
  portal:      FIG('uterine-portal-system.png',      'Transvaginal progesterone — "uterine first-pass" portal system (Cicinelli & de Ziegler, 1999)'),
  pkRoutes:    FIG('pk-route-comparison.png',        'Profil farmakokinetik progesterone: IM, SC, oral vs. vaginal pessary'),
  endoTissue:  FIG('endometrial-tissue-level.png',   'Kadar progesterone jaringan endometrium: intravaginal vs. intramuscular (Miles et al., 1994)'),
  pkGel:       FIG('pk-pessary-vs-gel.png',          'Konsentrasi plasma progesterone 24 jam: pessary vs. gel 90 mg (Duijkers et al., 2018)'),
  endo94:      FIG('endometrial-response-94.png',    'Respons endometrium sekretori adekuat & late secretory (Duijkers et al., 2018)'),
  pvcSummary:  FIG('pessary-vs-capsule-summary.png', 'Serum P4 & ongoing pregnancy rate: pessary 2×400 mg vs. capsule 4×200 mg (Fernandez Gomez et al., 2023)'),
  pvcOPR:      FIG('pessary-vs-capsule-opr.png',     'Pada dosis sama (800 mg/hari), pessary memberikan outcome lebih tinggi vs. capsule (Fernandez Gomez et al., 2023)'),
  rescue:      FIG('rectal-rescue-alsbjerg.png',     'Rectal Cyclogest 400 mg sebagai rescue LPS pada HRT-FET (Alsbjerg et al., ESHRE 2023 P-596)'),
  khroufAE:    FIG('khrouf-side-effects.png',        'Efek samping: rectal pessary vs. vaginal pessary vs. vaginal capsule (Khrouf et al., 2016)'),
  khroufOut:   FIG('khrouf-outcomes.png',            'Outcome klinis: rectal vs. vaginal pessary vs. vaginal capsule (Khrouf et al., 2016)'),
  baldini:     FIG('baldini-table.png',              '600 mg vs. 800 mg/hari progesterone vaginal pada 607 siklus FET (Baldini et al., 2023)'),
};

/* --- Kategori profil ---------------------------------------------------- */
/* Urutan mengikuti akronim S-A-V-E ("Which patient are you trying to SAVE?") */
const CATEGORIES = {
  S: { key: 'S', name: 'Sensitive & Smart',  desc: 'Toleransi, biaya, kenyamanan' },
  A: { key: 'A', name: 'Active Mum',         desc: 'Aktivitas & rutinitas padat' },
  V: { key: 'V', name: 'Vaginal Condition',  desc: 'Kondisi lokal vagina' },
  E: { key: 'E', name: 'Endocrine',          desc: 'Kadar hormon tidak optimal' },
};

/* --- Evidence yang dipakai berulang ------------------------------------ */
const EV_FIRST_PASS = (refs) => ({
  tab: 'First Uterine Pass',
  title: 'First Uterine Pass Effect',
  body: 'Pemberian Cygest secara vaginal atau rectal menghindari metabolisme hati secara langsung, sehingga bioavailabilitas lokal tinggi di rahim tercapai tanpa lonjakan metabolit sedatif sistemik yang menyebabkan kantuk.',
  refs,
  viz: { type: 'flow' },
  figs: [F.portal],
});

const EV_PESSARY = (refs) => ({
  tab: 'Tanpa Aplikator',
  title: 'Preparasi Self-Lubricating Pessary Tanpa Aplikator',
  body: 'Bentuk pesari torpedo (torpedo-shaped) memudahkan insersi mandiri secara cepat, bersih, dan higienis tanpa aplikator plastik—cukup digunakan pagi hari sebelum bekerja dan malam hari sebelum tidur.',
  extra: 'Administrasi rektal yang mudah dan minimal discharge.',
  refs,
  viz: { type: 'schedule' },
  figs: [],
});

const EV_DUAL_ROUTE = (refs) => ({
  tab: 'Dual Route',
  title: 'Indikasi Ganda Resmi (Dual Route)',
  body: 'Cygest adalah satu-satunya sediaan pesari micronized progesterone yang diuji klinis dan memiliki izin edar resmi untuk rute vaginal maupun rectal.',
  refs,
  viz: { type: 'routes' },
  figs: [],
});

const EV_EQUIVALENT = (refs) => ({
  tab: 'Hasil Setara',
  title: 'Hasil Klinis Setara Rute Vaginal',
  body: 'Pleksus vena rektalis bawah dan tengah berhubungan erat dengan sirkulasi pelvis, menghasilkan bioavailabilitas rahim yang setara; uji klinis membuktikan angka kehamilan klinis (clinical pregnancy rate), angka implantasi, dan risiko keguguran setara antara rute rectal dan vaginal.',
  refs,
  viz: { type: 'equal', items: ['Clinical pregnancy rate', 'Implantation rate', 'Risiko keguguran'] },
  figs: [F.khroufOut],
});

/* --- Referensi ---------------------------------------------------------- */
const R = {
  cicinelli99:  'Cicinelli, E., & de Ziegler, D. (1999). "Transvaginal progesterone: evidence for a new functional \'portal system\' flowing from the vagina to the uterus." Human Reproduction Update.',
  cyclogest:    'Cyclogest Micronised Progesterone Products & Treatments.',
  labarta:      'Labarta E, Rodríguez C. Best Pract Res Clin Obstet Gynaecol. 2020;69:74-84.',
  tavaniotou:   'Tavaniotou A, et al. Hum Reprod Update. 2000;6(2):139-148.',
  lockwood:     'Lockwood G, et al. Fertil Steril. 2014:101(1):112-119.3.',
  baker:        'Baker VL, et al. Hum Reprod. 2014;29(10):2212-2220.',
  mesen:        'Mesen TB, Young SL. Obstet Gynecol Clin North Am. 2015;42(1):135-151.',
  cicinelliHRU: 'Cicinelli E, De Ziegler D. Hum Reprod Update. 1999;5:365-372.',
  miles:        'Miles, R. A., Paulson, R. J., Lobo, R. A., Press, M. F., Dahmoush, L., & Sauer, M. V. (1994).',
  duijkers:     'Dujikers IJM, et al. Hum Reprod. 2018;33(11):2131-2140.',
  fernandez:    'A Fernandez Gomez, et al. Hum Reprod 2023, Suppl 1; Vol 38 : P-550.',
  alsbjerg:     'B. Alsbjerg, et al. Hum Reprod 2023, Suppl 1; Vol 38 : P-596.',
  khrouf:       'Khrouf et al. Clinical Medicine Insights: Women\'s health 2016:9 43-47 doi: 10.4137/CMWH.S32156.',
  baldini:      'Baldini G.M., et al. European Review for Medical and Pharmacological Sciences 2023; 27: 2018-2026.',
};

/* --- 9 Profil pasien ---------------------------------------------------- */
const PROFILES = [
  {
    id: 'works-9-5', cat: 'A', name: 'Works 9–5', icon: 'work', photo: null,
    hook: 'Kantuk siang akibat oral P4',
    recognize: [
      'Oral progesterone memicu kantuk berat di siang hari (daytime drowsiness) yang mengganggu produktivitas kerja.',
      'Efek sedatif dari penggunaan oral progesterone dapat berisiko terhadap keamanan berkendara.',
    ],
    need: 'Mendukung keberhasilan siklus tanpa mengganggu rutinitas kerja. Dibutuhkan LPS yang bebas kantuk dan mudah digunakan ketika bekerja.',
    headline: "LPS that minimizes daytime sleepiness — needle-free & routine-friendly",
    tags: ['Bebas kantuk', 'Needle-free', 'Routine-friendly'],
    regimen: 'Cygest 400 mg BID', regimenNote: 'dua kali sehari',
    route: { vaginal: true, rectal: true, text: 'Vaginal atau rectal' },
    fit: 'Dukungan non-oral dan bebas jarum suntik untuk mendukung aktivitas harian pasien.',
    evidence: [
      EV_FIRST_PASS([1]),
      EV_PESSARY([2]),
      {
        tab: 'Stabil 24 Jam',
        title: 'Kadar Serum Stabil 24 Jam',
        body: 'Rute vaginal memberikan profil farmakokinetik yang stabil dan konsisten sepanjang hari tanpa fluktuasi tajam yang mengganggu aktivitas.',
        refs: [3, 4, 5, 6, 7, 8],
        viz: { type: 'stats', items: [
          { value: 24, suffix: ' jam', label: 'Profil serum stabil & konsisten' },
          { text: 'Tanpa', label: 'fluktuasi tajam yang mengganggu aktivitas' },
        ] },
        figs: [F.pkRoutes],
      },
    ],
    refs: [R.cicinelli99, R.cyclogest, R.labarta, R.tavaniotou, R.lockwood, R.baker, R.mesen, R.cicinelliHRU],
  },
  {
    id: 'travels', cat: 'A', name: 'Travels Frequently', icon: 'travel', photo: null,
    hook: 'Sulit menyuntik saat transit',
    recognize: [
      'Efek sedatif dari penggunaan oral progesterone dapat berisiko terhadap keamanan berkendara.',
      'Kesulitan menemukan fasilitas yang bersih dan steril untuk menyuntik saat transit.',
    ],
    need: 'LPS yang tidak menyebabkan kantuk saat berkendara, mudah dibawa dan dipakai ketika bepergian.',
    headline: "Non-sedating, needle-free LPS that travels with her",
    tags: ['Minim kantuk', 'Travel-friendly', 'Needle-free'],
    regimen: 'Cygest 400 mg BID', regimenNote: 'dua kali sehari',
    route: { vaginal: true, rectal: true, text: 'Vaginal atau rectal' },
    fit: 'Minim efek samping kantuk, mudah dibawa dan digunakan saat bepergian (terutama dengan administrasi rectal), bebas dari persiapan jarum suntik.',
    evidence: [
      EV_FIRST_PASS([1]),
      EV_PESSARY([2]),
    ],
    refs: [R.cicinelli99, R.cyclogest],
  },
  {
    id: 'injection-fear', cat: 'A', name: 'Injection Fear', icon: 'needle', photo: null,
    hook: 'Needle phobia & nyeri suntik',
    recognize: [
      'Ketakutan mendalam terhadap jarum suntik (needle phobia) memicu stres psikologis berat pasca-embryo transfer.',
      'Suntikan subcutaneous (SC) harian sering meninggalkan rasa nyeri, hematoma, memar, dan pengerasan kulit perut.',
    ],
    need: 'Regimen LPS yang 100% bebas jarum suntik dan bebas rasa nyeri tanpa mengorbankan angka keberhasilan kehamilan.',
    headline: "100% needle-free LPS — without compromising success",
    tags: ['100% needle-free', 'Non-invasif', 'Tenang'],
    regimen: 'Cygest 400 mg BID', regimenNote: 'dua kali sehari',
    route: { vaginal: true, rectal: true, text: 'Vaginal atau rectal' },
    fit: 'Bebas jarum suntik, tidak invasif, dan memberikan ketenangan psikologis bagi pasien.',
    evidence: [
      {
        tab: 'Endometrium Level',
        title: 'Vaginal progesterone memberikan kadar progesterone yang memadai di endometrium',
        body: 'Konsentrasi progesterone lokal di jaringan endometrium 10 kali lipat lebih tinggi dibandingkan rute injeksi sistemik.',
        refs: [1, 2, 3, 4, 5, 6, 7],
        viz: { type: 'stats', items: [
          { value: 10, suffix: '×', label: 'Kadar P4 jaringan endometrium vs. injeksi sistemik' },
        ] },
        figs: [F.endoTissue],
      },
      {
        tab: 'Serum P4 Level',
        title: 'Vaginal progesterone memberikan kadar progesterone yang memadai di serum',
        body: 'Konsentrasi P4 konsisten di atas 10 ng/mL selama 18 jam.',
        refs: [1, 2, 3, 4, 5, 6, 7],
        viz: { type: 'stats', items: [
          { prefix: '>', value: 10, suffix: ' ng/mL', label: 'Konsentrasi serum P4' },
          { value: 18, suffix: ' jam', label: 'Durasi konsisten di atas ambang' },
        ] },
        figs: [F.pkRoutes],
      },
    ],
    refs: [R.miles, R.labarta, R.tavaniotou, R.lockwood, R.baker, R.mesen, R.cicinelliHRU],
  },
  {
    id: 'gastritis', cat: 'S', name: 'Gastritis', icon: 'stomach', photo: null,
    hook: 'Mual & muntah dari rute oral',
    recognize: [
      'Efek mual akibat rute oral sering memicu muntah setelah minum obat.',
      'Muntah menyebabkan dosis hormon yang terserap menjadi tidak terprediksi.',
    ],
    need: 'Rute LPS yang memotong jalur saluran pencernaan dan liver guna meminimalisir efek samping mual atau muntah.',
    headline: "LPS that bypasses the gut & liver to minimize nausea",
    tags: ['Bypass GI & liver', 'Minim mual', 'Dosis terprediksi'],
    regimen: 'Cygest 400 mg BID', regimenNote: 'dua kali sehari',
    route: { vaginal: true, rectal: true, text: 'Vaginal or rectal route' },
    fit: 'Minimal efek mual muntah yang banyak terjadi karena konsumsi oral progesterone.',
    evidence: [
      EV_FIRST_PASS([1]),
    ],
    refs: [R.cicinelli99],
  },
  {
    id: 'cost-conscious', cat: 'S', name: 'Cost-Conscious', icon: 'wallet', photo: null,
    hook: 'Beban biaya terapi 10–12 minggu',
    recognize: [
      'High Financial Strain: Obat penunjang seperti injeksi SC harian atau gel vaginal selama 10–12 minggu menjadi beban finansial yang memberatkan.',
      'Risk of Treatment Interruption: Tekanan ekonomi meningkatkan risiko pasien mengurangi dosis sendiri (rationing) atau menghentikan terapi lebih cepat, yang berisiko memicu keguguran.',
    ],
    need: 'LPS yang efisien secara biaya (cost-efficient) dan terjangkau, namun tetap memberikan live birth rate yang maksimal.',
    headline: "Cost-efficient LPS with optimal dose & high pregnancy rate",
    tags: ['Cost-efficient', 'Dosis optimal', 'Live birth maksimal'],
    regimen: 'Cygest 400 mg BID', regimenNote: 'total dosis 800 mg/hari',
    route: { vaginal: true, rectal: true, text: 'Vaginal atau rectal' },
    fit: 'Efisiensi dosis optimal 400 mg dengan angka kehamilan yang tinggi serta harga yang kompetitif.',
    evidence: [
      {
        tab: 'Unggul vs. Gel',
        title: 'Serum level unggul dengan biaya harian yang lebih rendah vs. Gel',
        body: 'Dosis 400 mg BID Cygest menghasilkan konsentrasi plasma progesterone dua kali lipat lebih tinggi dibandingkan gel vaginal 90 mg QD, serta menginduksi transformasi sekretori endometrium adekuat pada 94% siklus.',
        refs: [1],
        viz: { type: 'stats', items: [
          { value: 2, suffix: '×', label: 'Konsentrasi plasma P4 vs. gel vaginal 90 mg QD' },
          { value: 94, suffix: '%', label: 'Transformasi sekretori endometrium adekuat' },
        ] },
        figs: [F.pkGel, F.endo94],
      },
      {
        tab: 'Tanpa Rescue',
        title: 'Menghindarkan Biaya Rescue Therapy',
        body: 'Dosis efektif minimum yang optimal dari Cygest 400 mg BID mempertahankan kadar serum target (>10 ng/mL), sehingga menghindarkan pasien dari biaya tambahan suntikan penyelamatan (rescue SC) atau pembatalan siklus.',
        refs: [2],
        viz: { type: 'bars', title: 'Serum P4 pada hari ET (ng/mL)', unit: '', decimals: 2, note: 'p<0.01', items: [
          { label: 'Pessary 2×400 mg', value: 17.69, hi: true },
          { label: 'Capsule 4×200 mg', value: 11.95 },
        ], threshold: { value: 10, label: 'Target >10 ng/mL' } },
        figs: [F.pvcSummary],
      },
      {
        tab: 'Rescue Rectal',
        title: 'Rescue therapy rectal: biaya harian lebih rendah vs. SC injeksi',
        body: 'Rescue Therapy menggunakan rectal progesterone dapat menyelamatkan angka keberhasilan dengan biaya harian yang lebih rendah vs. SC injeksi.',
        refs: [3],
        viz: { type: 'bars', title: 'Ongoing pregnancy rate, minggu ke-12 (%)', unit: '%', decimals: 0, items: [
          { label: 'Rectal Cygest rescue (2+2)', value: 46, hi: true },
          { label: 'Standard group', value: 45 },
        ] },
        figs: [F.rescue],
      },
    ],
    refs: [R.duijkers, R.fernandez, R.alsbjerg],
  },
  {
    id: 'leakage', cat: 'S', name: 'Leakage Issue', icon: 'drop', photo: null,
    hook: 'Residu lengket & iritasi',
    recognize: [
      'Kapsul lunak atau gel vaginal menyisakan residu lengket dan becek (vaginal leakage).',
      'Kelembapan konstan memicu iritasi perineum, gatal (pruritus), dan rasa tidak higienis.',
    ],
    need: 'Sediaan dengan residu vaginal minimal (low-discharge) atau alternatif rute 100% bebas discharge.',
    headline: "Low-discharge LPS with a discharge-free rectal option",
    tags: ['Low-discharge', 'Higienis', 'Opsi rectal'],
    regimen: 'Cygest 400 mg BID', regimenNote: 'dua kali sehari',
    route: { vaginal: true, rectal: true, primary: 'rectal', text: 'Rectal (bebas discharge) ATAU vaginal (minim residu vs. kapsul vagina)' },
    fit: 'Menjaga kenyamanan dan kebersihan area kewanitaan pasien.',
    evidence: [
      {
        tab: 'Eksipien Hard Fat',
        title: 'Eksipien Hard Fat Khusus',
        body: 'Cygest menggunakan eksipien lemak keras semi-sintetis (semi-synthetic glycerides) yang meleleh secara presisi pada suhu tubuh dan terabsorpsi tuntas, menghasilkan angka keluhan cairan keluar (discharge) yang signifikan lebih rendah dibanding kapsul gelatin lunak.',
        refs: [1],
        viz: { type: 'bars', title: 'Keluhan vaginal discharge (%)', unit: '%', decimals: 1, note: 'p=0.01', lowerBetter: true, items: [
          { label: 'Cygest pessary (vaginal)', value: 32.4, hi: true },
          { label: 'Kapsul gelatin lunak', value: 45.0 },
        ] },
        figs: [F.khroufAE],
      },
      {
        tab: 'Opsi Rute Rectal',
        title: 'Opsi Rute Rectal',
        body: 'Untuk pasien yang sangat terganggu dengan residu basah, penggunaan Cygest secara rectal memberikan angka kebocoran vaginal 0% tanpa mengurangi penyerapan uterine, dengan angka implantasi dan kehamilan yang setara.',
        refs: [1],
        viz: { type: 'stats', items: [
          { value: 0, suffix: '%', label: 'Kebocoran vaginal via rute rectal' },
          { text: 'Setara', label: 'Angka implantasi & kehamilan' },
        ] },
        figs: [F.khroufOut],
      },
    ],
    refs: [R.khrouf],
  },
  {
    id: 'infection', cat: 'V', name: 'Infection', icon: 'microbe', photo: null,
    hook: 'Infeksi vagina aktif',
    recognize: [
      'Infeksi aktif (seperti kandidiasis atau vaginosis) membuat dinding vagina meradang, bengkak, dan perih.',
      'Memasukkan obat atau aplikator vaginal memicu sensasi nyeri.',
      'Keputihan patologis dan perubahan pH dapat mengganggu absorpsi progesterone vaginal.',
    ],
    need: 'Rute pemberian LPS non-vaginal selama masa pengobatan infeksi lokal tanpa mengurangi efektivitas LPS.',
    headline: "Non-vaginal LPS while the infection is treated",
    tags: ['Rute rectal', 'Terapi infeksi tuntas', 'LPS tetap jalan'],
    regimen: 'Cygest 400 mg BID', regimenNote: 'melalui rute rectal',
    route: { vaginal: false, rectal: true, primary: 'rectal', text: 'Rectal route' },
    fit: 'Memungkinkan terapi infeksi vagina berjalan tuntas tanpa menghentikan asupan progesterone ke uterus.',
    evidence: [
      EV_DUAL_ROUTE([1]),
      EV_EQUIVALENT([2]),
      {
        tab: 'Minim Nyeri',
        title: 'Minimum Nyeri Perineum',
        body: 'Penggunaan via rectal menurunkan angka iritasi perineal secara signifikan, menjadikannya solusi nyaman saat liang vagina mengalami radang akut.',
        refs: [2],
        viz: { type: 'bars', title: 'Iritasi perineal (%)', unit: '%', decimals: 1, note: 'p<0.05', lowerBetter: true, items: [
          { label: 'Rectal', value: 2.2, hi: true },
          { label: 'Vaginal', value: 21.3 },
        ] },
        figs: [F.khroufAE],
      },
    ],
    refs: [R.cyclogest, R.khrouf],
  },
  {
    id: 'bleeding', cat: 'V', name: 'Bleeding', icon: 'bleed', photo: null,
    hook: 'Flek / threatened miscarriage',
    recognize: [
      'Flek atau perdarahan awal kehamilan (threatened miscarriage) memicu kepanikan luar biasa.',
      'Pasien sangat cemas obat vaginal akan terbilas keluar (washout) oleh aliran darah.',
    ],
    need: 'Rute penghantaran LPS yang penyerapannya tidak terganggu oleh aliran darah vagina dan terbukti secara uji klinis kuat mampu menyelamatkan kehamilan.',
    headline: "LPS whose absorption isn't washed out by bleeding",
    tags: ['Bebas washout', 'Rute fleksibel', 'Terbukti klinis'],
    regimen: 'Cygest 400 mg BID', regimenNote: '800 mg/hari',
    route: { vaginal: true, rectal: true, primary: 'rectal', switch: true, text: 'Rectal selama perdarahan aktif, dapat dialihkan kembali ke vaginal setelah perdarahan berhenti' },
    fit: 'Absorpsi bebas risiko terbilas darah.',
    evidence: [
      EV_DUAL_ROUTE([1]),
      EV_EQUIVALENT([2]),
    ],
    refs: [R.cyclogest, R.khrouf],
  },
  {
    id: 'low-p4', cat: 'E', name: 'Low P4', icon: 'lowp4', photo: null,
    hook: 'Serum P4 < 10 ng/mL saat transfer',
    recognize: [
      'Implantation Failure: Kadar progesterone serum <10 ng/mL pada hari transfer embrio beku (FET) berkorelasi langsung dengan kegagalan implantasi, kehamilan biokimia, dan keguguran dini.',
      'Inadequate Endometrium: Dosis standar progesterone yang rendah (seperti gel 90 mg QD atau kapsul 600 mg/hari) sering kali gagal memicu diferensiasi sekretori endometrium fase akhir yang esensial untuk reseptivitas embrio.',
    ],
    need: 'Regimen LPS dengan bioavailabilitas dan dosis optimal yang mampu melampaui ambang batas terapeutik kritis (>10 ng/mL) pada hari transfer.',
    headline: "LPS that reliably clears the >10 ng/mL threshold",
    tags: ['>10 ng/mL', 'Dosis optimal 800 mg', 'Window of implantation'],
    regimen: 'Cygest 400 mg BID', regimenNote: 'total dosis 800 mg/hari',
    route: { vaginal: true, rectal: true, text: 'Vaginal atau rectal' },
    fit: 'Menghasilkan kadar serum dan jaringan endometrium yang optimal untuk memaksimalkan jendela implantasi (window of implantation).',
    evidence: [
      {
        tab: '800 vs 600 mg',
        title: 'Kadar Serum & Kehamilan Lebih Tinggi',
        body: 'Baldini et al. (2023) mengevaluasi dosis progesterone transvaginal pada 607 siklus FET dan membuktikan bahwa dosis 800 mg/hari (400 mg BID) menghasilkan kadar serum yang signifikan lebih tinggi dibandingkan dosis 600 mg/hari, yang menghasilkan peningkatan bermakna pada ongoing pregnancy rate.',
        refs: [1],
        viz: { type: 'multi', groups: [
          { title: 'Serum P4 hari transfer (ng/mL)', unit: '', decimals: 2, note: 'p=0.0002', items: [
            { label: '800 mg/hari (400 mg BID)', value: 14.00, hi: true, sub: '±6.18' },
            { label: '600 mg/hari', value: 12.22, sub: '±5.39' },
          ] },
          { title: 'Ongoing pregnancy rate (%)', unit: '%', decimals: 1, note: 'p=0.0467', items: [
            { label: '800 mg/hari (400 mg BID)', value: 35.9, hi: true },
            { label: '600 mg/hari', value: 28.1 },
          ] },
        ] },
        figs: [F.baldini],
      },
      {
        tab: 'Pesari vs. Kapsul',
        title: 'Superioritas Pesari vs. Kapsul',
        body: 'Pada dosis yang sama (800 mg/hari), pesari micronized progesterone menghasilkan ongoing pregnancy rate yang signifikan lebih tinggi dibandingkan kapsul lunak, membuktikan keunggulan absorpsi sediaan pesari.',
        refs: [2],
        viz: { type: 'bars', title: 'Ongoing pregnancy rate (%)', unit: '%', decimals: 1, note: 'p=0.024', items: [
          { label: 'Pesari 2×400 mg', value: 59.7, hi: true },
          { label: 'Kapsul lunak 4×200 mg', value: 48.3 },
        ] },
        figs: [F.pvcOPR],
      },
      {
        tab: 'Endometrium 94%',
        title: 'Transformasi Endometrium Fase Akhir (94%)',
        body: 'Dosis 400 mg BID pesari menghasilkan konsentrasi plasma minimal dua kali lipat dibanding gel 90 mg QD dan menginduksi respons endometrium sekretori lanjut (late secretory state) secara optimal pada 94% subjek.',
        refs: [3],
        viz: { type: 'stats', items: [
          { value: 94, suffix: '%', label: 'Respons endometrium sekretori optimal' },
          { prefix: '≥', value: 2, suffix: '×', label: 'Konsentrasi plasma vs. gel 90 mg QD' },
        ] },
        figs: [F.pkGel, F.endo94],
      },
      {
        tab: 'Rescue Rectal',
        title: 'Terapi Penyelamatan Rectal (Rescue Therapy)',
        body: 'Alsbjerg et al. (2023) membuktikan bahwa penambahan Cygest 400 mg BID per rectal efektif menyelamatkan siklus dengan kadar progesterone rendah (<35 nmol/L) tanpa memerlukan suntikan subcutaneous tambahan, menghasilkan angka kehamilan yang tetap tinggi.',
        refs: [4],
        viz: { type: 'bars', title: 'Ongoing pregnancy rate, minggu ke-12 (%)', unit: '%', decimals: 0, items: [
          { label: 'Rectal Cygest rescue (2+2)', value: 46, hi: true },
          { label: 'Standard group', value: 45 },
        ] },
        figs: [F.rescue],
      },
    ],
    refs: [R.baldini, R.fernandez, R.duijkers, R.alsbjerg],
  },
];

/* Grid, switcher & navigasi mengikuti urutan S-A-V-E (stable sort: urutan dalam kategori tetap) */
const CAT_ORDER = Object.keys(CATEGORIES);
PROFILES.sort((a, b) => CAT_ORDER.indexOf(a.cat) - CAT_ORDER.indexOf(b.cat));

window.NAV_DATA = { CATEGORIES, PROFILES };
