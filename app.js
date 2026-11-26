'use strict';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const AVATARS = [
  { id: 'moon', emoji: '🌙', label: 'Ay' }, { id: 'fox', emoji: '🦊', label: 'Tilki' },
  { id: 'panda', emoji: '🐼', label: 'Panda' }, { id: 'tiger', emoji: '🐯', label: 'Kaplan' },
  { id: 'frog', emoji: '🐸', label: 'Kurbağa' }, { id: 'koala', emoji: '🐨', label: 'Koala' },
  { id: 'lion', emoji: '🦁', label: 'Aslan' }, { id: 'penguin', emoji: '🐧', label: 'Penguen' }
];
const LESSONS = {
  TYT: ['Türkçe', 'Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Tarih', 'Coğrafya', 'Felsefe', 'Din Kültürü ve Ahlak Bilgisi', 'Geometri'],
  AYT: ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türk Dili ve Edebiyatı', 'Tarih-1', 'Coğrafya-1', 'Tarih-2', 'Coğrafya-2', 'Felsefe Grubu', 'Din Kültürü ve Ahlak Bilgisi', 'Geometri', 'Sosyal Bilimler-1', 'YDT']
};
const GEOMETRY_TOPICS = ['Doğruda ve Üçgende Açılar', 'Üçgenler', 'Üçgende Alan', 'Çokgenler ve Dörtgenler', 'Çember ve Daire', 'Analitik Geometri', 'Katı Cisimler'];
const YDT_TOPICS = ['Kelime Bilgisi', 'Dil Bilgisi', 'Cümle Tamamlama', 'Anlamca Yakın Cümle', 'Çeviri', 'Paragraf Tamamlama', 'Diyalog Tamamlama', 'Anlam Bütünlüğünü Bozan Cümle', 'Okuma Parçaları'];
const EXAM_GROUPS = {
  TYT: [
    { id: 'turkce', title: 'Türkçe', subjects: [
      { id: 'turkce', title: 'Türkçe', topics: ['Sözcükte Anlam', 'Cümlede Anlam', 'Paragraf', 'Ses Bilgisi', 'Yazım Kuralları', 'Noktalama İşaretleri', 'Sözcükte Yapı', 'Sözcük Türleri', 'Fiiller', 'Fiilimsi', 'Cümlenin Ögeleri', 'Cümle Türleri', 'Anlatım Bozukluğu'] }
    ] },
    { id: 'matematik', title: 'Temel Matematik', subjects: [
      { id: 'matematik', title: 'Matematik', topics: ['Temel Kavramlar', 'Sayı Basamakları', 'Bölme ve Bölünebilme', 'EBOB ve EKOK', 'Rasyonel Sayılar', 'Basit Eşitsizlikler', 'Mutlak Değer', 'Üslü Sayılar', 'Köklü Sayılar', 'Çarpanlara Ayırma', 'Oran ve Orantı', 'Denklem Çözme', 'Problemler', 'Kümeler', 'Mantık', 'Fonksiyonlar', 'Permütasyon ve Kombinasyon', 'Olasılık', 'Veri ve İstatistik'] }
    ] },
    { id: 'geometri', title: 'Geometri', subjects: [
      { id: 'geometri', title: 'Geometri', topics: GEOMETRY_TOPICS }
    ] },
    { id: 'fen', title: 'Fen Bilimleri', subjects: [
      { id: 'fizik', title: 'Fizik', topics: ['Fizik Bilimine Giriş', 'Madde ve Özellikleri', 'Hareket ve Kuvvet', 'İş, Güç ve Enerji', 'Isı, Sıcaklık ve Genleşme', 'Basınç ve Kaldırma Kuvveti', 'Elektrostatik', 'Elektrik Akımı ve Devreler', 'Mıknatıslar', 'Dalgalar', 'Optik'] },
      { id: 'kimya', title: 'Kimya', topics: ['Kimya Bilimi', 'Atom ve Periyodik Sistem', 'Kimyasal Türler Arası Etkileşimler', 'Maddenin Hâlleri', 'Doğa ve Kimya', 'Kimyanın Temel Kanunları', 'Kimyasal Hesaplamalar', 'Karışımlar', 'Asitler, Bazlar ve Tuzlar', 'Kimya Her Yerde'] },
      { id: 'biyoloji', title: 'Biyoloji', topics: ['Yaşam Bilimi Biyoloji', 'Hücre', 'Canlılar Dünyası', 'Hücre Bölünmeleri', 'Kalıtım', 'Ekosistem Ekolojisi', 'Canlıların Sınıflandırılması', 'Hücre ve Organeller', 'Canlıların Temel Bileşenleri'] }
    ] },
    { id: 'sosyal', title: 'Sosyal Bilimler', subjects: [
      { id: 'tarih', title: 'Tarih', topics: ['Tarih Bilimi', 'İlk Uygarlıklar', 'İlk ve Orta Çağlarda Türk Dünyası', 'İslam Medeniyetinin Doğuşu', 'Türklerin İslamiyet’i Kabulü', 'Türkiye Tarihi', 'Beylikten Devlete Osmanlı', 'Dünya Gücü Osmanlı', 'Değişim Çağında Dünya ve Osmanlı', 'Millî Mücadele', 'Atatürkçülük ve Türk İnkılabı'] },
      { id: 'cografya', title: 'Coğrafya', topics: ['Doğa ve İnsan', 'Coğrafi Konum', 'Harita Bilgisi', 'Dünya’nın Şekli ve Hareketleri', 'İklim Bilgisi', 'Yerin Şekillenmesi', 'Su, Toprak ve Bitkiler', 'Nüfus ve Yerleşme', 'Ekonomik Faaliyetler', 'Bölgeler', 'Doğal Afetler'] },
      { id: 'felsefe', title: 'Felsefe', topics: ['Felsefeye Giriş', 'Bilgi Felsefesi', 'Varlık Felsefesi', 'Bilim Felsefesi', 'Ahlak Felsefesi', 'Din Felsefesi', 'Siyaset Felsefesi', 'Sanat Felsefesi'] },
      { id: 'din', title: 'Din Kültürü ve Ahlak Bilgisi', topics: ['Bilgi ve İnanç', 'Din ve İslam', 'İslam ve İbadet', 'Gençlik ve Değerler', 'Gönül Coğrafyamız', 'Allah-İnsan İlişkisi', 'Hz. Muhammed ve Gençlik', 'Ahlaki Tutum ve Davranışlar'] }
    ] }
  ],
  AYT: [
    { id: 'matematik', title: 'Matematik', subjects: [
      { id: 'matematik', title: 'Matematik', topics: ['Fonksiyonlar', 'Polinomlar', 'İkinci Dereceden Denklemler', 'Karmaşık Sayılar', 'Parabol', 'Eşitsizlikler', 'Permütasyon, Kombinasyon ve Binom', 'Olasılık', 'Trigonometri', 'Logaritma', 'Diziler', 'Limit ve Süreklilik', 'Türev', 'İntegral'] }
    ] },
    { id: 'geometri', title: 'Geometri', subjects: [
      { id: 'geometri', title: 'Geometri', topics: GEOMETRY_TOPICS }
    ] },
    { id: 'fen', title: 'Fen Bilimleri', subjects: [
      { id: 'fizik', title: 'Fizik', topics: ['Vektörler', 'Kuvvet, Tork ve Denge', 'Kütle Merkezi', 'Basit Makineler', 'Hareket', 'Newton’ın Hareket Yasaları', 'İş, Güç ve Enerji', 'Atışlar', 'İtme ve Momentum', 'Elektrik Alan ve Potansiyel', 'Manyetizma ve Elektromanyetik İndüksiyon', 'Çembersel Hareket', 'Basit Harmonik Hareket', 'Dalga Mekaniği', 'Atom Fiziği ve Radyoaktivite'] },
      { id: 'kimya', title: 'Kimya', topics: ['Modern Atom Teorisi', 'Gazlar', 'Sıvı Çözeltiler', 'Kimyasal Tepkimelerde Enerji', 'Tepkime Hızları', 'Kimyasal Denge', 'Asit-Baz Dengesi', 'Çözünürlük Dengesi', 'Kimya ve Elektrik', 'Organik Kimya'] },
      { id: 'biyoloji', title: 'Biyoloji', topics: ['İnsan Fizyolojisi', 'Sinir Sistemi', 'Endokrin Sistem', 'Duyu Organları', 'Destek ve Hareket Sistemi', 'Sindirim Sistemi', 'Dolaşım ve Bağışıklık', 'Solunum Sistemi', 'Üriner Sistem', 'Üreme Sistemi ve Embriyonik Gelişim', 'Komünite ve Popülasyon Ekolojisi', 'Genden Proteine', 'Canlılarda Enerji Dönüşümleri', 'Bitki Biyolojisi'] }
    ] },
    { id: 'edebiyat', title: 'Türk Dili ve Edebiyatı', subjects: [
      { id: 'edebiyat', title: 'Türk Dili ve Edebiyatı', topics: ['Şiir Bilgisi', 'Edebî Sanatlar', 'İslamiyet Öncesi Türk Edebiyatı', 'Halk Edebiyatı', 'Divan Edebiyatı', 'Tanzimat Edebiyatı', 'Servetifünun ve Fecriati', 'Millî Edebiyat', 'Cumhuriyet Dönemi Edebiyatı', 'Roman ve Hikâye', 'Tiyatro', 'Öğretici Metinler', 'Edebî Akımlar'] }
    ] },
    { id: 'sosyal-1', title: 'Sosyal Bilimler-1', subjects: [
      { id: 'tarih-1', title: 'Tarih-1', topics: ['Tarih ve Zaman', 'İnsanlığın İlk Dönemleri', 'Orta Çağ’da Dünya', 'İlk ve Orta Çağlarda Türk Dünyası', 'İslam Medeniyetinin Doğuşu', 'Türklerin İslamiyet’i Kabulü ve İlk Türk-İslam Devletleri', 'Yerleşme ve Devletleşme Sürecinde Selçuklu Türkiyesi', 'Beylikten Devlete Osmanlı', 'Dünya Gücü Osmanlı', 'Değişen Dünya Dengeleri Karşısında Osmanlı', 'Millî Mücadele', 'Atatürkçülük ve Türk İnkılabı'] },
      { id: 'cografya-1', title: 'Coğrafya-1', topics: ['Ekosistem', 'Nüfus Politikaları ve Şehirler', 'Ekonomik Faaliyetler ve Gelişmişlik', 'Türkiye’de Ekonomi', 'Doğal Kaynaklar ve Çevre', 'Küresel Ortam: Bölgeler ve Ülkeler', 'Ülkeler Arası Etkileşim', 'Çevre Sorunları ve Toplum', 'Doğal Afetler'] }
    ] },
    { id: 'sosyal-2', title: 'Sosyal Bilimler-2', subjects: [
      { id: 'tarih-2', title: 'Tarih-2', topics: ['Tarih Bilimi', 'İlk Uygarlıklar', 'Türk ve İslam Devletleri', 'Osmanlı Tarihi', 'Avrupa Tarihi', '20. Yüzyılda Dünya', 'Millî Mücadele', 'Atatürkçülük ve Türk İnkılabı'] },
      { id: 'cografya-2', title: 'Coğrafya-2', topics: ['Ekosistem', 'Nüfus ve Yerleşme', 'Ekonomik Faaliyetler', 'Türkiye’de Bölgeler', 'Ülkeler ve Bölgeler', 'Çevre Sorunları', 'Doğal Afetler'] },
      { id: 'felsefe-grubu', title: 'Felsefe Grubu', topics: ['Psikolojiye Giriş', 'Öğrenme ve Bellek', 'Sosyal Psikoloji', 'Sosyolojiye Giriş', 'Toplumsal Yapı ve Değişme', 'Mantığa Giriş', 'Klasik Mantık', 'Sembolik Mantık'] },
      { id: 'din', title: 'Din Kültürü ve Ahlak Bilgisi', topics: ['Dünya ve Ahiret', 'Kur’an’a Göre Hz. Muhammed', 'İslam Düşüncesinde Yorumlar', 'Din ve Laiklik', 'İslam ve Bilim', 'Anadolu’da İslam', 'İslam Düşüncesinde Tasavvufi Yorumlar'] }
    ] },
    { id: 'ydt', title: 'YDT', subjects: [
      { id: 'ydt-ingilizce', title: 'İngilizce', topics: YDT_TOPICS },
      { id: 'ydt-almanca', title: 'Almanca', topics: YDT_TOPICS },
      { id: 'ydt-fransizca', title: 'Fransızca', topics: YDT_TOPICS },
      { id: 'ydt-rusca', title: 'Rusça', topics: YDT_TOPICS },
      { id: 'ydt-arapca', title: 'Arapça', topics: YDT_TOPICS }
    ] }
  ]
};
const BLOCKED_USERNAME_TERMS = ['amk', 'aq', 'aminakoyim', 'orospu', 'siktir', 'sikiyim', 'sikmek', 'yarak', 'yarrak', 'pic', 'ibne', 'pezevenk', 'kahpe', 'fuck', 'shit', 'bitch', 'asshole'];
const app = {
  client: null, user: null, profile: null, role: null, isPrimaryAdmin: false,
  adminTab: 'overview', toastTimer: null, activeExam: null, activeCourseGroup: null,
  activeCourseMenu: null, returnToCourseTopics: false,
  db: { users: [], feedback: [], announcements: [], audit: [], settings: { registrations_open: true, maintenance: false, maintenance_message: '' } }
};

const legal = {
  kvkk: { title: 'KVKK Aydınlatma Metni', html: '<p>Bu metin taslaktır. Siteyi işleten kişi/kurum, hangi verileri hangi amaçla işlediğini, ne kadar süre sakladığını ve başvuru iletişim yolunu gerçek kullanıma geçmeden önce açıklamalıdır.</p><p>Bu sürümde kayıt için ad, soyad, kullanıcı adı ve e-posta; hesap işlemleri için parola; profil için ders ilerlemesi; geri bildirim gönderirsen mesaj ve isteğe bağlı yanıt e-postası kullanılabilir. Parola Supabase Auth tarafından yönetilir ve uygulama tablolarına yazılmaz.</p><p class="legal-note">Bu örnek hukuki metin değildir. Canlı siteye uygun metin hazırlanmalıdır.</p>' },
  terms: { title: 'Kullanım Koşulları', html: '<p>Bu uygulama YKS hazırlığı için bir başlangıç arayüzüdür. TYT, AYT ve liderlik alanları henüz hazırlık aşamasındadır.</p><p>Bu örnek metin, gerçek hizmet koşullarının ve site sahibinin iletişim bilgilerinin yerine geçmez.</p>' },
  privacy: { title: 'Gizlilik ve Çerez Politikası', html: '<p>Bu sürümde hesap ve uygulama verileri ortak veritabanında saklanır. Supabase Auth oturum bilgisini tarayıcıda saklayabilir. Canlı siteye geçmeden önce barındırma, veri saklama süresi ve iletişim bilgileri açıklanmalıdır.</p><p>Bu örnek politika, gerçek hizmete göre düzenlenmelidir.</p>' }
};

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const date = (value) => value ? new Intl.DateTimeFormat('tr-TR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—';
const now = () => new Date().toISOString();
const progressKey = (area, index) => `${area.toLowerCase()}_${index}`;
const emptyProgress = () => Object.fromEntries(Object.entries(LESSONS).flatMap(([area, items]) => items.map((_, index) => [progressKey(area, index), 0])));
const normalizeUsername = (value) => String(value || '').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/ı/g, 'i').replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e').replace(/4/g, 'a').replace(/5/g, 's').replace(/7/g, 't').replace(/[^a-z0-9]/g, '');
const inappropriateUsername = (value) => BLOCKED_USERNAME_TERMS.some((term) => normalizeUsername(value).includes(term));
const avatarFor = (id) => AVATARS.find((item) => item.id === id) || AVATARS[0];
const isConfigured = () => window.YKS_CONFIG?.supabaseUrl?.startsWith('https://') && window.YKS_CONFIG?.publishableKey && !window.YKS_CONFIG.publishableKey.includes('PASTE_');

document.addEventListener('touchmove', (event) => {
  if (event.touches.length > 1) event.preventDefault();
}, { passive: false });
for (const eventName of ['gesturestart', 'gesturechange', 'gestureend']) {
  document.addEventListener(eventName, (event) => event.preventDefault(), { passive: false });
}

function showToast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(app.toastTimer);
  app.toastTimer = setTimeout(() => el.classList.remove('show'), 3600);
}
function showOverlay(id) { $('#' + id).hidden = false; document.body.dataset.modal = 'open'; }
function closeOverlays() { $$('.overlay').forEach((overlay) => { overlay.hidden = true; }); delete document.body.dataset.modal; }
function openLegal(key) {
  const item = legal[key];
  if (!item) return;
  app.returnToAuth = !$('#authOverlay').hidden;
  $('#legalTitle').textContent = item.title;
  $('#legalCopy').innerHTML = item.html;
  showOverlay('legalOverlay');
}
function closeLegal() {
  $('#legalOverlay').hidden = true;
  if (app.returnToAuth) $('#authOverlay').hidden = false;
  else delete document.body.dataset.modal;
  app.returnToAuth = false;
}
function isAdmin() { return app.role === 'admin'; }
function isPrimaryAdmin() { return app.isPrimaryAdmin; }
function profileRecord() { return app.profile; }
function ensureProfile(record) {
  if (!record) return;
  if (!AVATARS.some((item) => item.id === record.avatar_id)) record.avatar_id = 'moon';
  record.progress = { ...emptyProgress(), ...(record.progress || {}) };
}
function showDrawer() {
  $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden', 'false');
  $('#menuButton').setAttribute('aria-expanded', 'true'); $('#menuButton').setAttribute('aria-label', 'Menüyü kapat'); $('#scrim').hidden = false;
}
function hideDrawer() {
  $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden', 'true');
  $('#menuButton').setAttribute('aria-expanded', 'false'); $('#menuButton').setAttribute('aria-label', 'Menüyü aç'); $('#scrim').hidden = true;
}
function closeComing() {
  if (app.returnToCourseTopics && app.activeCourseMenu) {
    const course = app.activeCourseMenu;
    app.returnToCourseTopics = false;
    openCourseTopics(course);
    return;
  }
  $('#comingView').classList.remove('show');
  $('#comingView').setAttribute('aria-hidden', 'true');
  app.activeCourseMenu = null;
  app.returnToCourseTopics = false;
}
function openComing(name, returnToCourseTopics = false) {
  const feedback = name === 'Şikayet ve Önerileriniz';
  hideDrawer();
  app.returnToCourseTopics = returnToCourseTopics;
  $('#courseTopicChoices').hidden = true;
  $('#comingLabel').textContent = feedback ? 'GERİ BİLDİRİM' : name.toLocaleUpperCase('tr-TR');
  $('#comingTitle').textContent = feedback ? name : 'Çok Yakında...';
  $('#comingDescription').textContent = feedback ? 'Şikayetini, önerini veya yaşadığın sorunu bize ilet.' : `${name} bölümü için hazırlıklarımız devam ediyor.`;
  $('#comingSoon').hidden = feedback; $('#feedbackForm').hidden = !feedback;
  $('#comingView').classList.add('show'); $('#comingView').setAttribute('aria-hidden', 'false');
}
function openCourseTopics(course) {
  if (!course) return;
  hideDrawer();
  app.activeCourseMenu = course;
  app.returnToCourseTopics = false;
  $('#comingLabel').textContent = `${app.activeExam || 'YKS'} · KONU SEÇİMİ`;
  $('#comingTitle').textContent = course.title;
  $('#comingDescription').textContent = 'Çalışmak istediğin konu başlığını seç.';
  $('#comingSoon').hidden = true;
  $('#feedbackForm').hidden = true;
  $('#courseTopicChoices').innerHTML = course.topics.map((topic) => `<button class="course-topic-choice" type="button" data-topic-choice="${esc(topic)}" data-course-title="${esc(course.title)}"><span>${esc(topic)}</span><span aria-hidden="true">›</span></button>`).join('');
  $('#courseTopicChoices').hidden = false;
  $('#comingView').classList.add('show');
  $('#comingView').setAttribute('aria-hidden', 'false');
}
function renderExamPanel() {
  const exam = app.activeExam;
  $('.landing').classList.toggle('exam-open', !!exam);
  for (const name of ['TYT', 'AYT']) {
    const tile = $(`#examTile${name}`);
    const active = name === exam;
    tile.classList.toggle('active', active);
    tile.querySelector('.side').classList.toggle('active', active);
    tile.querySelector('.side').setAttribute('aria-expanded', String(active));
    $(`#examContent${name}`).hidden = !active;
  }
  $$('[data-exam-toggle]').forEach((button) => button.classList.toggle('active', button.dataset.examToggle === exam));
  if (!exam || !EXAM_GROUPS[exam]) return;
  $(`#examGroups${exam}`).innerHTML = EXAM_GROUPS[exam].map((group) => {
    const open = app.activeCourseGroup === group.id;
    const subjects = group.subjects.map((course) => `<article class="exam-subject-card"><button class="exam-course-open" type="button" data-course-key="${esc(`${group.id}:${course.id}`)}"><span>${esc(course.title)}</span><span class="exam-course-arrow" aria-hidden="true">↗</span></button></article>`).join('');
    return `<section class="exam-group"><button class="exam-group-toggle" type="button" data-course-group="${esc(group.id)}" aria-expanded="${open}"><span>${esc(group.title)}</span><span class="exam-chevron" aria-hidden="true">⌄</span></button><div class="exam-group-content" ${open ? '' : 'hidden'}><div class="exam-subject-list">${subjects}</div></div></section>`;
  }).join('');
}
function animateExamTile(element, beforeRect) {
  if (!element || !beforeRect || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const afterRect = element.getBoundingClientRect();
  const dx = beforeRect.left - afterRect.left;
  const dy = beforeRect.top - afterRect.top;
  if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
  element.animate([
    { transform: `translate(${dx}px, ${dy}px)` },
    { transform: 'translate(0, 0)' }
  ], { duration: 460, easing: 'cubic-bezier(.2,.75,.25,1)' });
}
function closeExamPanel() {
  const activeTile = app.activeExam ? $(`#examTile${app.activeExam} .side`) : null;
  const beforeRect = activeTile?.getBoundingClientRect();
  app.activeExam = null;
  app.activeCourseGroup = null;
  renderExamPanel();
  if (activeTile) requestAnimationFrame(() => animateExamTile(activeTile, beforeRect));
}
function setActiveExam(exam, toggleIfCurrent = true) {
  if (!EXAM_GROUPS[exam]) return;
  if (app.activeExam === exam) {
    if (toggleIfCurrent) closeExamPanel();
    return;
  }
  const selectedTile = $(`#examTile${exam} .side`);
  const beforeRect = selectedTile?.getBoundingClientRect();
  app.activeExam = exam;
  app.activeCourseGroup = null;
  renderExamPanel();
  if (selectedTile) requestAnimationFrame(() => animateExamTile(selectedTile, beforeRect));
}
function setAuthTab(tab) {
  const register = tab === 'register';
  $$('[data-tab]').forEach((button) => button.classList.toggle('active', button.dataset.tab === tab));
  $('#loginForm').hidden = register; $('#registerForm').hidden = !register;
  $('#authTitle').textContent = register ? 'Yolculuğuna başla.' : 'Hesabına giriş yap.';
  $('#authKicker').textContent = register ? 'İLK ADIMINI AT' : 'YENİDEN MERHABA';
  $('#loginMessage').textContent = ''; $('#registerMessage').textContent = '';
  if (register && !app.db.settings.registrations_open) { setAuthTab('login'); showToast('Kayıtlar şu anda kapalı.'); }
}
function openAuth(tab = 'login') { $('#accountPop').hidden = true; showOverlay('authOverlay'); setAuthTab(tab); }

function updateHeader() {
  $('#accountButton').textContent = app.profile?.username || 'Giriş Yap';
  $('#adminOpen').hidden = !isAdmin();
  $('#profileOpen').hidden = !app.user || isAdmin();
  $('#adminProfileOpen').hidden = !isAdmin();
  $('#adminTabs [data-admin-tab="security"]').hidden = !isPrimaryAdmin();
  $('#logout').hidden = !app.user;
  $$('[data-auth]').forEach((el) => { el.hidden = !!app.user; });
  const maintenance = !!app.db.settings.maintenance;
  if (maintenance && !isAdmin()) { $('#maintenance').hidden = false; $('#maintenanceMessage').textContent = app.db.settings.maintenance_message || 'Site bakımda. Lütfen daha sonra tekrar deneyin.'; }
  else $('#maintenance').hidden = true;
  const announcement = app.db.announcements[0];
  $('#announcement').hidden = !announcement || maintenance;
  $('#announcement').textContent = announcement ? `DUYURU · ${announcement.title} — ${announcement.message}` : '';
}
function refresh() { updateHeader(); if (!$('#adminOverlay').hidden) renderAdmin(); }

async function loadState() {
  if (!app.client) return;
  const [publicStateResult, authResult] = await Promise.all([
    app.client.rpc('get_public_site_state'),
    app.client.auth.getUser()
  ]);
  if (publicStateResult.error) throw publicStateResult.error;
  if (authResult.error) throw authResult.error;
  const publicState = publicStateResult.data || {};
  app.db.settings = publicState.settings || { registrations_open: true, maintenance: false, maintenance_message: '' };
  app.db.announcements = publicState.announcements || [];
  app.user = authResult.data.user || null;
  app.profile = null; app.role = null; app.isPrimaryAdmin = false;
  app.db.users = []; app.db.feedback = []; app.db.audit = [];
  if (app.user) {
    let [profileResult, roleResult] = await Promise.all([
      app.client.from('profiles').select('id,username,first_name,last_name,avatar_id,progress,active,created_at').eq('id', app.user.id).maybeSingle(),
      app.client.from('user_roles').select('role,is_primary_admin').eq('user_id', app.user.id).maybeSingle()
    ]);
    let profileStatus = null;
    if (profileResult.error) throw profileResult.error;
    if (!profileResult.data) {
      const { data, error: profileRepairError } = await app.client.rpc('ensure_current_profile');
      if (profileRepairError) throw profileRepairError;
      profileStatus = data;
      if (profileStatus === 'ready') {
        [profileResult, roleResult] = await Promise.all([
          app.client.from('profiles').select('id,username,first_name,last_name,avatar_id,progress,active,created_at').eq('id', app.user.id).maybeSingle(),
          app.client.from('user_roles').select('role,is_primary_admin').eq('user_id', app.user.id).maybeSingle()
        ]);
        if (profileResult.error) throw profileResult.error;
      }
    }
    if (profileStatus === 'inactive' || profileResult.data?.active === false) {
      await app.client.auth.signOut();
      app.user = null;
      showToast('Bu hesap şu anda etkin değil.');
    } else if (!profileResult.data) {
      throw new Error('Hesap profili bulunamadı. Biraz sonra tekrar giriş yap.');
    } else {
      app.profile = profileResult.data;
      ensureProfile(app.profile);
      app.role = roleResult.data?.role || 'user';
      app.isPrimaryAdmin = !!roleResult.data?.is_primary_admin;
    }
  }
  if (isAdmin()) {
    const [usersResult, feedbackResult, auditResult] = await Promise.all([
      app.client.rpc('admin_list_users'),
      app.client.from('feedback').select('id,user_id,username,category,subject,email,message,status,created_at').order('created_at', { ascending: false }).limit(300),
      app.client.from('audit_log').select('id,actor,action,detail,created_at').order('created_at', { ascending: false }).limit(300)
    ]);
    if (usersResult.error) throw usersResult.error;
    if (feedbackResult.error) throw feedbackResult.error;
    if (auditResult.error) throw auditResult.error;
    app.db.users = usersResult.data || [];
    app.db.feedback = feedbackResult.data || [];
    app.db.audit = auditResult.data || [];
  }
  refresh();
}

// Keep the public announcement banner and maintenance screen in sync across
// visitors who already have the page open. Supabase RLS allows public reads
// for these two shared tables.
async function refreshPublicContent() {
  if (!app.client) return;
  const { data, error } = await app.client.rpc('get_public_site_state');
  if (error) return;
  app.db.settings = data?.settings || { registrations_open: true, maintenance: false, maintenance_message: '' };
  app.db.announcements = data?.announcements || [];
  updateHeader();
  if (isAdmin() && !$('#adminOverlay').hidden && app.adminTab === 'settings') renderAdmin();
}

function renderProfile() {
  const record = profileRecord();
  if (!record) return;
  ensureProfile(record);
  const title = isAdmin() ? 'Admin Profilim' : 'Profilim';
  $('#profileTitle').textContent = title;
  const avatar = avatarFor(record.avatar_id);
  const fullName = [record.first_name, record.last_name].filter(Boolean).join(' ') || 'YKS Öğrencisi';
  const avatarOptions = AVATARS.map((item) => `<button type="button" class="avatar-option ${item.id === record.avatar_id ? 'active' : ''}" data-avatar-option="${item.id}" aria-label="${esc(item.label)} avatarını seç" title="${esc(item.label)}">${item.emoji}</button>`).join('');
  const rows = Object.entries(LESSONS).flatMap(([area, items]) => items.map((lesson, index) => {
    const key = progressKey(area, index);
    const value = Math.max(0, Math.min(100, Number(record.progress[key]) || 0));
    return { area, lesson, key, value };
  }));
  const average = Math.round(rows.reduce((sum, item) => sum + item.value, 0) / rows.length);
  const weakest = [...rows].sort((a, b) => a.value - b.value)[0];
  const hasProgress = rows.some((item) => item.value > 0);
  const advice = weakest.value < 40 ? 'Bu derse küçük ve düzenli çalışmalar ekle.' : weakest.value < 75 ? 'Temel ilerlemen oluşuyor; soru çözümünü artır.' : 'İlerlemen güçlü. Deneme ve tekrarlarla kalıcılaştır.';
  const analysis = hasProgress
    ? `<div class="analysis-card"><span class="analysis-kicker">OTOMATİK DERS ANALİZİ</span><h3>${average}% genel ilerleme</h3><p>En çok tekrar gerektiren dersin <strong>${esc(weakest.area + ' ' + weakest.lesson)}</strong> (%${weakest.value}).</p><p class="analysis-advice">${advice}</p></div>`
    : '<div class="analysis-card"><span class="analysis-kicker">OTOMATİK DERS ANALİZİ</span><h3>İlerlemeni ekledikçe analiz oluşur.</h3><p>Ders ilerleme oranları girildiğinde güçlü ve tekrar gerektiren derslerin burada özetlenir.</p></div>';
  const groups = Object.entries(LESSONS).map(([area, items]) => `<section class="progress-group"><h4>${area} Dersleri</h4>${items.map((lesson, index) => {
    const key = progressKey(area, index), value = Math.max(0, Math.min(100, Number(record.progress[key]) || 0));
    return `<div class="progress-row"><div class="progress-line"><span>${esc(lesson)}</span><output>${value}%</output></div><div class="progress-track"><i class="progress-fill" style="width:${value}%"></i></div><input class="progress-control" type="range" min="0" max="100" step="5" value="${value}" data-profile-progress="${key}" aria-label="${area} ${esc(lesson)} ilerleme oranı"></div>`;
  }).join('')}</section>`).join('');
  $('#profileContent').innerHTML = `<div class="profile-head"><div class="profile-avatar" aria-hidden="true">${avatar.emoji}</div><div><h3>${esc(fullName)}</h3><p class="public-handle">@${esc(record.username)}</p><p>Bu kullanıcı adı herkese görünür.</p></div></div><h3 class="profile-section-title">Profil fotoğrafı</h3><div class="avatar-grid" role="group" aria-label="Sabit profil avatarları">${avatarOptions}</div><p class="avatar-help">Yalnızca hazır avatarlar kullanılabilir; cihazdan fotoğraf yükleme kapalıdır.</p>${analysis}<h3 class="profile-section-title">Ders ilerlemelerim</h3><div class="progress-groups">${groups}</div><p class="progress-note">İlerleme oranlarını ders çalıştıkça kaydırıcıdan güncelleyebilirsin. TYT ve AYT dersleri ayrı ayrı saklanır; analiz bu oranlardan otomatik hesaplanır.</p>`;
}

function openProfile() {
  hideDrawer();
  if (!app.user) { showToast('Profilini görmek için giriş yap.'); return openAuth('login'); }
  renderProfile(); showOverlay('profileOverlay');
}
function openAdmin() {
  if (!isAdmin()) { showToast('Yönetici girişi gerekli.'); return; }
  $('#accountPop').hidden = true; app.adminTab = 'overview'; showOverlay('adminOverlay'); renderAdmin();
}
function renderAdmin() {
  if (!isAdmin()) return;
  $$('[data-admin-tab]').forEach((button) => button.classList.toggle('active', button.dataset.adminTab === app.adminTab));
  const panel = $('#adminPanel'), db = app.db;
  const userRows = db.users.map((user) => `<article class="admin-row"><div class="admin-row-head"><strong>${esc(user.first_name)} ${esc(user.last_name)} · @${esc(user.username)}</strong><span>${user.role === 'admin' ? 'Yönetici · ' : ''}${user.active ? 'Aktif' : 'Kapalı'}</span></div><small>${esc(user.email)} · ${date(user.created_at)}</small><div class="actions"><button class="small-btn" data-user-toggle="${esc(user.id)}">${user.active ? 'Askıya al' : 'Etkinleştir'}</button>${isPrimaryAdmin() ? `<button class="small-btn" data-user-role="${esc(user.id)}">${user.role === 'admin' ? 'Yetkiyi kaldır' : 'Yönetici yap'}</button>` : ''}</div></article>`).join('');
  const feedbackRows = db.feedback.map((item) => `<article class="feedback-row"><div class="admin-row-head"><strong>${esc(item.category)} · ${esc(item.username || 'Misafir')}</strong><span>${esc(item.status)}</span></div><small class="feedback-meta">${date(item.created_at)} · ${item.email ? `Yanıt e-postası: ${esc(item.email)}` : 'E-posta paylaşılmadı'}</small><p><strong>${esc(item.subject || 'Konu belirtilmedi')}</strong></p><p>${esc(item.message)}</p><div class="actions"><select data-feedback-status="${esc(item.id)}" aria-label="Durum"><option ${item.status === 'Yeni' ? 'selected' : ''}>Yeni</option><option ${item.status === 'İnceleniyor' ? 'selected' : ''}>İnceleniyor</option><option ${item.status === 'Çözüldü' ? 'selected' : ''}>Çözüldü</option></select></div></article>`).join('');
  const announcementRows = db.announcements.map((item) => `<article class="announcement-row"><div class="admin-row-head"><strong>${esc(item.title)}</strong><button class="small-btn danger" data-ann-delete="${esc(item.id)}">Sil</button></div><small>${date(item.created_at)} · ${esc(item.author)}</small><p>${esc(item.message)}</p></article>`).join('');
  if (app.adminTab === 'overview') {
    panel.innerHTML = `<div class="stats"><div class="stat"><span>Üyeler</span><strong>${db.users.length}</strong></div><div class="stat"><span>Aktif üyeler</span><strong>${db.users.filter((user) => user.active).length}</strong></div><div class="stat"><span>Açık geri bildirim</span><strong>${db.feedback.filter((item) => item.status !== 'Çözüldü').length}</strong></div><div class="stat"><span>Duyurular</span><strong>${db.announcements.length}</strong></div></div><h3>Son işlemler</h3>${db.audit.slice(0, 8).map((item) => `<article class="audit-row"><strong>${esc(item.action)}</strong><small>${esc(item.actor)} · ${esc(item.detail)} · ${date(item.created_at)}</small></article>`).join('') || '<p class="empty">Henüz işlem yok.</p>'}`;
  } else if (app.adminTab === 'users') {
    panel.innerHTML = `<h3>Kayıtlı üyeler</h3><div class="actions"><input class="search" id="userSearch" type="search" placeholder="Ad, kullanıcı adı veya e-posta ara"><button class="small-btn" id="userCsv">CSV indir</button></div><div id="userRows">${userRows || '<p class="empty">Henüz üye yok.</p>'}</div>`;
  } else if (app.adminTab === 'feedback') {
    panel.innerHTML = `<h3>Şikayet ve öneriler</h3>${feedbackRows || '<p class="empty">Henüz geri bildirim yok.</p>'}`;
  } else if (app.adminTab === 'announcements') {
    panel.innerHTML = `<h3>Duyuru yayınla</h3><form class="admin-form" id="announcementForm"><label>Başlık<input name="title" required minlength="3" maxlength="100"></label><label>Metin<textarea name="message" required minlength="3" maxlength="1000" rows="3"></textarea></label><button class="submit">Duyuruyu yayınla →</button></form><h3>Yayındaki duyurular</h3>${announcementRows || '<p class="empty">Duyuru bulunmuyor.</p>'}`;
  } else if (app.adminTab === 'settings') {
    panel.innerHTML = `<h3>Site ayarları</h3><label class="setting"><span><strong>Yeni kayıtları kabul et</strong><small>Kapatıldığında yeni üye kaydı engellenir.</small></span><input type="checkbox" data-setting="registrations_open" ${db.settings.registrations_open ? 'checked' : ''}></label><label class="setting"><span><strong>Bakım modu</strong><small>Yönetici dışındaki ziyaretçilere bakım ekranı gösterilir.</small></span><input type="checkbox" data-setting="maintenance" ${db.settings.maintenance ? 'checked' : ''}></label><form class="admin-form" id="maintenanceForm"><label>Bakım mesajı<input name="message" maxlength="300" value="${esc(db.settings.maintenance_message || '')}"></label><button class="small-btn">Mesajı kaydet</button></form>`;
  } else if (app.adminTab === 'security' && isPrimaryAdmin()) {
    panel.innerHTML = `<h3>Yönetici kullanıcı adı</h3><form class="admin-form" id="adminUsernameForm"><label>Yeni kullanıcı adı<input name="username" required minlength="3" maxlength="24" value="${esc(app.profile?.username || '')}" autocomplete="username"></label><button class="submit">Kullanıcı adını güncelle →</button></form><h3>Yönetici şifresini değiştir</h3><form class="admin-form" id="passwordForm"><label>Yeni şifre<input name="next" type="password" required minlength="10" autocomplete="new-password"></label><button class="submit">Şifreyi güncelle →</button></form><p class="fine">Şifre Supabase Auth tarafından yönetilir. Yönetici yetkisi veritabanında tutulur.</p>`;
  } else {
    panel.innerHTML = `<h3>Son işlemler</h3>${db.audit.map((item) => `<article class="audit-row"><strong>${esc(item.action)}</strong><small>${esc(item.actor)} · ${esc(item.detail)} · ${date(item.created_at)}</small></article>`).join('') || '<p class="empty">Henüz işlem yok.</p>'}`;
  }
}

async function requireClient() {
  if (!app.client) throw new Error('Bağlantı ayarı eksik. config.js dosyasına Supabase URL ve publishable key eklenmeli.');
  return app.client;
}
function showFormError(formId, message) {
  const target = { loginForm: '#loginMessage', registerForm: '#registerMessage' }[formId];
  if (target) $(target).textContent = message;
  else showToast(message);
}
function normalizeError(error) {
  const message = error?.message || 'Bir hata oluştu. Tekrar deneyebilirsin.';
  if (/duplicate key|already registered|already exists/i.test(message)) return 'Bu e-posta veya kullanıcı adı zaten kullanılıyor.';
  if (/invalid login credentials/i.test(message)) return 'E-posta veya şifre hatalı.';
  if (/email not confirmed/i.test(message)) return 'Önce e-posta adresine gelen doğrulama bağlantısına tıkla.';
  return message;
}

document.addEventListener('click', async (event) => {
  const target = event.target;
  if (!target.closest('#drawer') && !target.closest('#menuButton')) hideDrawer();
  if (!target.closest('#accountPop') && !target.closest('#accountButton')) $('#accountPop').hidden = true;
  const authButton = target.closest('[data-auth]');
  if (authButton) { openAuth(authButton.dataset.auth); return; }
  if (target.closest('#accountButton')) { $('#accountPop').hidden = !$('#accountPop').hidden; return; }
  if (target.closest('#drawerClose,#scrim')) { hideDrawer(); return; }
  if (target.closest('[data-profile],#profileOpen,#adminProfileOpen')) { openProfile(); return; }
  const avatarChoice = target.closest('[data-avatar-option]');
  if (avatarChoice) {
    try {
      const record = profileRecord();
      const { error } = await app.client.from('profiles').update({ avatar_id: avatarChoice.dataset.avatarOption }).eq('id', app.user.id);
      if (error) throw error;
      record.avatar_id = avatarChoice.dataset.avatarOption; renderProfile();
    } catch (error) { showToast(normalizeError(error)); }
    return;
  }
  const examToggle = target.closest('[data-exam-toggle]');
  if (examToggle) {
    setActiveExam(examToggle.dataset.examToggle);
    return;
  }
  const topicChoice = target.closest('[data-topic-choice]');
  if (topicChoice) {
    openComing(`${topicChoice.dataset.courseTitle} · ${topicChoice.dataset.topicChoice}`, true);
    return;
  }
  const courseButton = target.closest('[data-course-key]');
  if (courseButton) {
    const [groupId, courseId] = courseButton.dataset.courseKey.split(':');
    const group = EXAM_GROUPS[app.activeExam]?.find((item) => item.id === groupId);
    const course = group?.subjects.find((item) => item.id === courseId);
    openCourseTopics(course);
    return;
  }
  const courseGroup = target.closest('[data-course-group]');
  if (courseGroup) {
    app.activeCourseGroup = app.activeCourseGroup === courseGroup.dataset.courseGroup ? null : courseGroup.dataset.courseGroup;
    renderExamPanel();
    return;
  }
  const coming = target.closest('[data-coming]');
  if (coming) { openComing(coming.dataset.coming); return; }
  if (target.closest('#viewBack,[data-view-close]')) { closeComing(); return; }
  if (target.closest('[data-close]')) { if (target.closest('#legalOverlay')) closeLegal(); else closeOverlays(); return; }
  const legalLink = target.closest('[data-legal]');
  if (legalLink) { event.preventDefault(); openLegal(legalLink.dataset.legal); return; }
  const tab = target.closest('[data-tab]');
  if (tab) { setAuthTab(tab.dataset.tab); return; }
  if (target.closest('#adminOpen')) { openAdmin(); return; }
  if (target.closest('#logout')) {
    const { error } = await app.client.auth.signOut();
    if (error) showToast(normalizeError(error));
    $('#accountPop').hidden = true; closeOverlays(); return;
  }
  const adminTab = target.closest('[data-admin-tab]');
  if (adminTab) { app.adminTab = adminTab.dataset.adminTab; renderAdmin(); return; }
  const toggle = target.closest('[data-user-toggle]');
  if (toggle) {
    try {
      const user = app.db.users.find((item) => item.id === toggle.dataset.userToggle);
      const { error } = await app.client.rpc('admin_set_user_active', { target_user: user.id, new_active: !user.active });
      if (error) throw error;
      await loadState(); showToast(user.active ? 'Hesap askıya alındı.' : 'Hesap yeniden etkinleştirildi.');
    } catch (error) { showToast(normalizeError(error)); }
    return;
  }
  const roleChange = target.closest('[data-user-role]');
  if (roleChange) {
    const user = app.db.users.find((item) => item.id === roleChange.dataset.userRole);
    if (!user || !isPrimaryAdmin()) return;
    try {
      const { error } = await app.client.rpc('admin_set_user_role', { target_user: user.id, new_role: user.role === 'admin' ? 'user' : 'admin' });
      if (error) throw error;
      await loadState(); showToast(user.role === 'admin' ? 'Yönetici yetkisi kaldırıldı.' : 'Yönetici yetkisi verildi.');
    } catch (error) { showToast(normalizeError(error)); }
    return;
  }
  const announcementDelete = target.closest('[data-ann-delete]');
  if (announcementDelete) {
    try {
      const { error } = await app.client.from('announcements').delete().eq('id', announcementDelete.dataset.annDelete);
      if (error) throw error;
      await loadState(); renderAdmin();
    } catch (error) { showToast(normalizeError(error)); }
    return;
  }
  if (target.closest('#userCsv')) {
    const rows = [['Kullanıcı adı', 'Ad', 'Soyad', 'E-posta', 'Kayıt tarihi', 'Durum'], ...app.db.users.map((user) => [user.username, user.first_name, user.last_name, user.email, date(user.created_at), user.active ? 'Aktif' : 'Kapalı'])];
    const quote = (value) => '"' + String(value ?? '').replace(/"/g, '""') + '"';
    const blob = new Blob(['\ufeff' + rows.map((row) => row.map(quote).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'yks-kullanicilar.csv'; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }
});

document.addEventListener('change', async (event) => {
  const progress = event.target.closest('[data-profile-progress]');
  if (progress) {
    try {
      const record = profileRecord(); ensureProfile(record);
      const value = Math.max(0, Math.min(100, Number(progress.value) || 0));
      const nextProgress = { ...record.progress, [progress.dataset.profileProgress]: value };
      const { error } = await app.client.from('profiles').update({ progress: nextProgress }).eq('id', app.user.id);
      if (error) throw error;
      record.progress = nextProgress; progress.value = value;
      const row = progress.closest('.progress-row'); row.querySelector('output').value = `${value}%`; row.querySelector('.progress-fill').style.width = `${value}%`;
      renderProfile();
    } catch (error) { showToast(normalizeError(error)); }
    return;
  }
  const status = event.target.closest('[data-feedback-status]');
  if (status) {
    try {
      const { error } = await app.client.rpc('admin_set_feedback_status', { target_feedback: status.dataset.feedbackStatus, new_status: status.value });
      if (error) throw error;
      await loadState(); renderAdmin();
    } catch (error) { showToast(normalizeError(error)); }
    return;
  }
  const setting = event.target.closest('[data-setting]');
  if (setting) {
    try {
      const { error } = await app.client.from('site_settings').update({ [setting.dataset.setting]: setting.checked }).eq('id', 1);
      if (error) throw error;
      await loadState();
    } catch (error) { showToast(normalizeError(error)); }
  }
});

document.addEventListener('input', (event) => {
  if (event.target.id === 'userSearch') {
    const query = event.target.value.toLocaleLowerCase('tr-TR');
    $$('#userRows .admin-row').forEach((row) => { row.hidden = !row.textContent.toLocaleLowerCase('tr-TR').includes(query); });
  }
});

document.addEventListener('submit', async (event) => {
  const form = event.target;
  if (!['loginForm', 'registerForm', 'feedbackForm', 'announcementForm', 'maintenanceForm', 'passwordForm', 'adminUsernameForm'].includes(form.id)) return;
  event.preventDefault();
  try {
    const client = await requireClient();
    if (form.id === 'loginForm') {
      const data = new FormData(form), email = String(data.get('identity')).trim().toLowerCase(), password = String(data.get('password'));
      if (!email.includes('@')) throw new Error('Giriş için e-posta adresini kullan.');
      const { error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      $('#loginMessage').textContent = ''; closeOverlays(); return;
    }
    if (form.id === 'registerForm') {
      if (!app.db.settings.registrations_open) throw new Error('Kayıtlar şu anda kapalı.');
      const data = new FormData(form), username = String(data.get('username')).trim(), email = String(data.get('email')).trim().toLowerCase(), password = String(data.get('password'));
      if (username.length < 3 || username.length > 24 || !/^[\p{L}\p{N}_.-]+$/u.test(username)) throw new Error('Kullanıcı adı 3–24 karakter olmalı; harf, rakam, nokta, tire ve alt çizgi kullan.');
      if (inappropriateUsername(username)) throw new Error('Küfür veya argo içeren kullanıcı adı seçemezsin.');
      if (password.length < 10) throw new Error('Şifre en az 10 karakter olmalı.');
      const { data: result, error } = await client.auth.signUp({ email, password, options: { data: { username, first_name: String(data.get('firstName')).trim(), last_name: String(data.get('lastName')).trim(), marketing_consent: data.has('marketingConsent') } } });
      if (error) throw error;
      form.reset();
      if (result.session) { closeOverlays(); showToast('Hesabın oluşturuldu. Hoş geldin!'); }
      else { $('#registerMessage').textContent = 'Hesabını doğrulamak için e-postana gönderilen bağlantıya tıkla.'; }
      return;
    }
    if (form.id === 'feedbackForm') {
      const data = new FormData(form), message = String(data.get('message')).trim(), subject = String(data.get('subject')).trim();
      if (subject.length < 3 || message.length < 10) throw new Error('Konu en az 3, mesaj en az 10 karakter olmalı.');
      const { error } = await client.from('feedback').insert({ user_id: app.user?.id || null, username: app.profile?.username || null, category: String(data.get('category')), subject, email: String(data.get('email')).trim().toLowerCase() || null, message });
      if (error) throw error;
      form.reset(); closeComing(); showToast('Görüşün için teşekkürler.'); return;
    }
    if (form.id === 'announcementForm') {
      const data = new FormData(form), title = String(data.get('title')).trim(), message = String(data.get('message')).trim();
      const { error } = await client.from('announcements').insert({ title, message, author: app.profile?.username || 'Yönetici' });
      if (error) throw error;
      await loadState(); renderAdmin(); showToast('Duyuru yayınlandı.'); return;
    }
    if (form.id === 'maintenanceForm') {
      const message = String(new FormData(form).get('message')).trim() || 'Site bakımda. Lütfen daha sonra tekrar deneyin.';
      const { error } = await client.from('site_settings').update({ maintenance_message: message }).eq('id', 1);
      if (error) throw error;
      await loadState(); showToast('Bakım mesajı güncellendi.'); return;
    }
    if (form.id === 'adminUsernameForm') {
      const username = String(new FormData(form).get('username')).trim();
      if (!isPrimaryAdmin()) throw new Error('Bu işlem ana yönetici hesabına özeldir.');
      if (username.length < 3 || username.length > 24 || !/^[\p{L}\p{N}_.-]+$/u.test(username) || inappropriateUsername(username)) throw new Error('Geçerli bir kullanıcı adı gir.');
      const { error } = await client.from('profiles').update({ username }).eq('id', app.user.id);
      if (error) throw error;
      await loadState(); renderAdmin(); showToast('Yönetici kullanıcı adı güncellendi.'); return;
    }
    if (form.id === 'passwordForm') {
      const password = String(new FormData(form).get('next'));
      if (password.length < 10) throw new Error('Yeni şifre en az 10 karakter olmalı.');
      const { error } = await client.auth.updateUser({ password });
      if (error) throw error;
      form.reset(); showToast('Şifre güncellendi.');
    }
  } catch (error) { showFormError(form.id, normalizeError(error)); }
});

$$('.overlay').forEach((overlay) => overlay.addEventListener('click', (event) => {
  if (event.target !== overlay) return;
  if (overlay.id === 'legalOverlay') closeLegal(); else closeOverlays();
}));
$('#comingView').addEventListener('click', (event) => { if (event.target === $('#comingView')) closeComing(); });
$('#menuButton').addEventListener('click', () => $('#drawer').classList.contains('open') ? hideDrawer() : showDrawer());
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { hideDrawer(); closeComing(); closeExamPanel(); closeLegal(); closeOverlays(); $('#accountPop').hidden = true; }
});

async function startApp() {
  if (!isConfigured() || !window.supabase?.createClient) {
    updateHeader();
    showToast('Önce config.js dosyasına Supabase proje URL ve publishable key eklenmeli.');
    return;
  }
  app.client = window.supabase.createClient(window.YKS_CONFIG.supabaseUrl, window.YKS_CONFIG.publishableKey);
  app.client.auth.onAuthStateChange((event, session) => {
    app.user = session?.user || null;
    if (event === 'INITIAL_SESSION') return;
    setTimeout(() => loadState().catch((error) => showToast(normalizeError(error))), 0);
  });
  setInterval(() => {
    if (document.visibilityState === 'visible') refreshPublicContent().catch(() => {});
  }, 15000);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refreshPublicContent().catch(() => {});
  });
  try { await loadState(); }
  catch (error) { updateHeader(); showToast(normalizeError(error)); }
}
startApp();
