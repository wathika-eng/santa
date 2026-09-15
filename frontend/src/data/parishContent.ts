export type LocalizedText = { en: string; sw: string };

export type ParishEvent = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  startsAt: string;
  location: LocalizedText;
};

export type ParishNotice = {
  id: string;
  category: 'general' | 'wedding' | 'bereavement';
  title: LocalizedText;
  body: LocalizedText;
  publishedAt: string;
};

export type Jumuia = {
  id: string;
  name: LocalizedText;
  area: LocalizedText;
  chairperson: string;
  secretary: string;
};

export type Leader = {
  id: string;
  role: LocalizedText;
  name: string;
};

// Publish these records only after the parish has confirmed them. The old
// Santa Rita backend contains unrelated Brazilian content, so it is not used.
export const parishEvents: ParishEvent[] = [];
export const parishNotices: ParishNotice[] = [];
export const jumuia: Jumuia[] = [];
export const parishLeaders: Leader[] = [];

export const copy = {
  en: {
    skip: 'Skip to main content',
    archdiocese: 'Archdiocese of Nairobi · Kiambu Deanery',
    parish: 'Sts. Peter & Paul',
    parishSuffix: 'Parish · Kiambu',
    readingsNav: 'Readings',
    nav: ['Home', 'Events', 'Notices', 'Jumuia', 'Leadership', 'Giving'],
    menu: 'Open menu',
    closeMenu: 'Close menu',
    eyebrow: 'Catholic Archdiocese of Nairobi · Kiambu',
    heroTitle: 'Sts. Peter & Paul Parish, Kiambu',
    heroBody: 'Welcome to our Catholic parish in Kiambu. Find today’s Mass readings and the information you need for parish life.',
    seeNotices: 'View parish notices',
    exploreCommunity: 'Explore our community',
    verifiedIdentity: 'Serving the Catholic community in Kiambu',
    heroFoot: 'Visitors and friends from around the world are welcome here.',
    noticeKicker: 'Parish bulletin',
    noticeTitle: 'Parish updates',
    noticeBody: 'Dates and notices are being confirmed by the parish office. Please check back for events, wedding banns, bereavement notices, and other parish announcements.',
    noticeStatus: 'Updates are being prepared',
    sectionEvents: 'Events',
    eventsTitle: 'Upcoming parish events',
    eventsBody: 'Upcoming Masses, celebrations, meetings, and community activities will be listed here when the parish confirms their dates.',
    noEvents: 'No verified upcoming events have been published yet.',
    eventsHelp: 'Check back for new dates. Each published event will include the time, location, and an option to save a reminder.',
    addReminder: 'Save reminder',
    sectionNotices: 'Notices',
    noticesTitle: 'Parish notices',
    noticesBody: 'Clear, respectful updates for parish life. Please rely on the parish office for the final details of any ceremony or service.',
    noticeTypes: [
      { title: 'Parish announcements', body: 'News, service changes, meetings, and practical reminders.', empty: 'No general announcement has been verified yet.' },
      { title: 'Wedding banns', body: 'Marriage announcements shared with the community.', empty: 'No wedding banns have been verified yet.' },
      { title: 'Bereavement notices', body: 'Prayerful remembrance and funeral information, shared with care.', empty: 'No bereavement notice has been verified yet.' },
    ],
    sectionJumuia: 'Life in community',
    jumuiaTitle: 'Find your Jumuia',
    jumuiaBody: 'Our Small Christian Communities (Jumuia) bring neighbours together for prayer, friendship, and support. A parish-verified directory of every Jumuia and its leaders will appear here.',
    directoryPending: 'Jumuia directory awaiting parish confirmation',
    directoryHelp: 'Ask at the parish office which Jumuia serves your neighbourhood. We will list its area, chairperson, and secretary after confirmation.',
    chairperson: 'Chairperson',
    secretary: 'Secretary',
    sectionLeadership: 'People who serve',
    leadershipTitle: 'Parish leadership',
    leadershipBody: 'Meet the clergy and lay leaders who guide parish life. Names and roles will be published after confirmation by the parish.',
    leadershipPending: 'Leadership roster awaiting parish confirmation',
    leadershipRoles: ['Parish priest', 'Parish pastoral council', 'Jumuia coordinators'],
    namePending: 'Name to be confirmed',
    sectionGiving: 'Giving',
    givingTitle: 'Support the parish',
    givingBody: 'Your generosity supports worship, community care, and parish work. Choose the purpose that fits your gift; obtain payment instructions directly from the parish office.',
    givingTypes: [
      { title: 'Donations', body: 'A gift for the parish and its wider mission.' },
      { title: 'Tithe', body: 'Regular giving in gratitude for God’s provision.' },
      { title: 'Sadaka / offertory', body: 'An offering made as part of worship.' },
      { title: 'Contributions', body: 'Support for a specific parish project or need.' },
    ],
    detailsTitle: 'Payment details are held until verified',
    detailsBody: 'Account and mobile-money numbers are not published here. Please ask the parish office for current, verified instructions before sending funds.',
    maskedLabel: 'Account / paybill',
    howToGive: 'How do I request giving details?',
    requestBody: 'Visit the parish office or speak to an authorised parish representative in person. Ask them to confirm the beneficiary name, number, and purpose before you pay. The same welcome applies if you are giving from outside Kenya; ask for a suitable international transfer option and currency guidance.',
    international: 'Giving from abroad? You are welcome.',
    internationalBody: 'The parish office can advise on a verified international method. No online checkout is available until parish payment details are confirmed.',
    locationLabel: 'Find us',
    locationTitle: 'Rooted in Kiambu. Open to all.',
    locationBody: 'Sts. Peter & Paul Parish is part of the Kiambu Deanery in the Catholic Archdiocese of Nairobi.',
    postal: 'Postal address',
    directorySource: 'View the Archdiocese parish directory',
    footerLead: 'Faith, friendship, and service in Kiambu.',
    footerLinks: 'Explore',
    footerInfo: 'Parish information',
    footerDisclaimer: 'Dates, leaders, community lists, and payment instructions are published only after parish verification.',
    copyright: 'Sts. Peter & Paul Parish, Kiambu',
  },
  sw: {
    skip: 'Ruka hadi maudhui makuu',
    archdiocese: 'Jimbo Kuu la Nairobi · Dekania ya Kiambu',
    parish: 'Watakatifu Petro na Paulo',
    parishSuffix: 'Parokia · Kiambu',
    readingsNav: 'Masomo',
    nav: ['Mwanzo', 'Matukio', 'Matangazo', 'Jumuia', 'Uongozi', 'Sadaka'],
    menu: 'Fungua menyu',
    closeMenu: 'Funga menyu',
    eyebrow: 'Jimbo Kuu Katoliki la Nairobi · Kiambu',
    heroTitle: 'Parokia ya Watakatifu Petro na Paulo, Kiambu',
    heroBody: 'Karibu katika parokia yetu ya Kikatoliki Kiambu. Pata masomo ya Misa ya leo na taarifa muhimu za maisha ya parokia.',
    seeNotices: 'Tazama matangazo',
    exploreCommunity: 'Jifahamishe kuhusu jumuia',
    verifiedIdentity: 'Tukihudumia waamini Wakatoliki Kiambu',
    heroFoot: 'Wageni na marafiki kutoka kote ulimwenguni mnakaribishwa.',
    noticeKicker: 'Taarifa za parokia',
    noticeTitle: 'Taarifa za parokia',
    noticeBody: 'Tarehe na matangazo yanathibitishwa na ofisi ya parokia. Rudi kuangalia matukio, matangazo ya ndoa, taarifa za misiba, na habari nyingine za parokia.',
    noticeStatus: 'Taarifa zinaandaliwa',
    sectionEvents: 'Matukio',
    eventsTitle: 'Matukio yajayo ya parokia',
    eventsBody: 'Misa, sherehe, mikutano, na shughuli za jumuia zitaorodheshwa hapa tarehe zitakapothibitishwa na parokia.',
    noEvents: 'Hakuna tukio lijalo lililothibitishwa na kuchapishwa bado.',
    eventsHelp: 'Rudi kuangalia tarehe mpya. Kila tukio litakuwa na saa, mahali, na njia ya kuhifadhi kikumbusho.',
    addReminder: 'Hifadhi kikumbusho',
    sectionNotices: 'Matangazo',
    noticesTitle: 'Matangazo ya parokia',
    noticesBody: 'Taarifa wazi na zenye heshima kuhusu maisha ya parokia. Tafadhali thibitisha maelezo ya mwisho ya sherehe au ibada na ofisi ya parokia.',
    noticeTypes: [
      { title: 'Matangazo ya parokia', body: 'Habari, mabadiliko ya ibada, mikutano, na vikumbusho.', empty: 'Hakuna tangazo la jumla lililothibitishwa bado.' },
      { title: 'Matangazo ya ndoa', body: 'Taarifa za ndoa zinazoshirikishwa na waamini.', empty: 'Hakuna tangazo la ndoa lililothibitishwa bado.' },
      { title: 'Taarifa za misiba', body: 'Kumbukumbu za maombi na taarifa za mazishi kwa heshima.', empty: 'Hakuna taarifa ya msiba iliyothibitishwa bado.' },
    ],
    sectionJumuia: 'Maisha ya pamoja',
    jumuiaTitle: 'Tafuta Jumuia yako',
    jumuiaBody: 'Jumuia Ndogo Ndogo za Kikristo huwaleta majirani pamoja kwa sala, urafiki, na msaada. Orodha ya Jumuia zote na viongozi wake itawekwa hapa baada ya kuthibitishwa na parokia.',
    directoryPending: 'Orodha ya Jumuia inasubiri uthibitisho wa parokia',
    directoryHelp: 'Uliza katika ofisi ya parokia ni Jumuia ipi inayohudumia eneo lako. Tutaorodhesha eneo, mwenyekiti, na katibu baada ya kuthibitishwa.',
    chairperson: 'Mwenyekiti',
    secretary: 'Katibu',
    sectionLeadership: 'Wanaotuhudumia',
    leadershipTitle: 'Uongozi wa parokia',
    leadershipBody: 'Wafahamu viongozi wa kiroho na walei wanaoongoza maisha ya parokia. Majina na majukumu yatachapishwa baada ya kuthibitishwa na parokia.',
    leadershipPending: 'Orodha ya viongozi inasubiri uthibitisho wa parokia',
    leadershipRoles: ['Padre wa parokia', 'Baraza la kichungaji la parokia', 'Waratibu wa Jumuia'],
    namePending: 'Jina litasasishwa baada ya uthibitisho',
    sectionGiving: 'Kutoa',
    givingTitle: 'Saidia parokia',
    givingBody: 'Ukarimu wako unasaidia ibada, huduma kwa jamii, na kazi za parokia. Chagua lengo la zawadi yako; pata maelekezo ya malipo moja kwa moja kutoka ofisi ya parokia.',
    givingTypes: [
      { title: 'Michango ya hiari', body: 'Zawadi kwa parokia na utume wake.' },
      { title: 'Zaka', body: 'Utoaji wa kawaida wa shukrani kwa Mungu.' },
      { title: 'Sadaka', body: 'Toleo linalotolewa wakati wa ibada.' },
      { title: 'Michango ya miradi', body: 'Msaada kwa mradi au hitaji maalumu la parokia.' },
    ],
    detailsTitle: 'Maelezo ya malipo yanasubiri uthibitisho',
    detailsBody: 'Namba za akaunti na malipo ya simu hazijachapishwa hapa. Tafadhali uliza ofisi ya parokia maelekezo sahihi ya sasa kabla ya kutuma pesa.',
    maskedLabel: 'Akaunti / namba ya malipo',
    howToGive: 'Nitapataje maelezo ya kutoa?',
    requestBody: 'Tembelea ofisi ya parokia au zungumza na mwakilishi aliyeidhinishwa wa parokia ana kwa ana. Hakikisha jina la mpokeaji, namba, na lengo la malipo kabla ya kutuma. Ukiwa nje ya Kenya, uliza njia salama ya kutuma fedha kimataifa na sarafu inayofaa.',
    international: 'Unatoa ukiwa nje ya nchi? Karibu.',
    internationalBody: 'Ofisi ya parokia inaweza kukuelekeza kuhusu njia ya kimataifa iliyothibitishwa. Malipo ya mtandaoni hayajapatikana hadi maelezo ya malipo ya parokia yathibitishwe.',
    locationLabel: 'Tupate',
    locationTitle: 'Tuko Kiambu. Wote mnakaribishwa.',
    locationBody: 'Parokia ya Watakatifu Petro na Paulo ni sehemu ya Dekania ya Kiambu katika Jimbo Kuu Katoliki la Nairobi.',
    postal: 'Anwani ya posta',
    directorySource: 'Tazama orodha ya parokia ya Jimbo Kuu',
    footerLead: 'Imani, urafiki, na huduma Kiambu.',
    footerLinks: 'Tembelea',
    footerInfo: 'Taarifa za parokia',
    footerDisclaimer: 'Tarehe, viongozi, orodha za Jumuia, na maelekezo ya malipo huchapishwa baada ya kuthibitishwa na parokia.',
    copyright: 'Parokia ya Watakatifu Petro na Paulo, Kiambu',
  },
} as const;
