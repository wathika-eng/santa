# Publishing parish information

The public page reads its English/Kiswahili copy and verified records from [`src/data/parishContent.ts`](src/data/parishContent.ts). Its event, notice, Jumuia, and leadership arrays are intentionally empty because no current official roster, calendar, or notices were found. The old Santa Rita API and payment details must not be used for Kiambu.

Before adding a record, have an authorised parish representative confirm the details and permission to publish. Supply both `en` and `sw` text for each localized field. Events require a valid ISO `startsAt` date/time with an explicit timezone offset (for example `2026-10-01T10:00:00+03:00`); the site then shows a **Save reminder** calendar download. Notices use `general`, `wedding`, or `bereavement` and an ISO `publishedAt` date. Take extra care with personal information in wedding and bereavement notices.

Each Jumuia record needs its name, service area, chairperson, and secretary. Each parish leader needs a role and confirmed name. Remove outdated records promptly. Keep payment identifiers hidden until the parish supplies an authenticated channel and approves the exact wording; do not paste account numbers into a frontend source file merely to blur them with CSS, because that still publishes the numbers in the page bundle.

The verified parish identity and postal address come from the [Archdiocese of Nairobi's Kiambu Deanery directory](https://archdioceseofnairobi.org/?page_id=4674). No physical address, Mass timetable, phone, email, bank account, or mobile-money number is asserted by this site yet.
