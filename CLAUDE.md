# Nieuwsbrief-bouwer — projectgeheugen

Dit project maakt de **maandelijkse nieuwsbrief** voor Mailchimp, voor twee
merken: **NBC** en **Green Village**. Lees dit eerst.

## Eén bouwer, twee merken (bindend)
- De bouwer (`index.html`) is **merkloos**. Alles wat per merk verschilt —
  blokken, fonts, kleuren, mail-sjabloon — staat in `merken/<merk>.js`.
- **Nooit forken.** Er komt geen tweede bouwer-bestand. Een verbetering hoort
  in `index.html` te landen en werkt daarmee meteen voor beide merken; iets
  merkspecifieks hoort in de merkmodule.
- Merk kiezen via `?merk=nbc` of `?merk=gv`; de keuze wordt onthouden en staat
  als chip in de balk. Zonder keuze verschijnt eerst het kiesscherm.
- Beide merken delen één Supabase-project. De kolom `merk` houdt de
  nieuwsbrieven uit elkaar, dus je ziet in elk merk alleen die van dat merk.
- Een merk toevoegen = `merken/<id>.js` maken, een `<script>`-regel in
  `index.html` erbij, en een kaart in het kiesscherm.

## Werkwijze (vast)
- **Niet from scratch.** De blokkenbibliotheek is de blanco basis: in de bouwer de `BLOCKS`-array, handmatig `sjabloon/nbc-mailing-template.html`. Elke editie wordt samengesteld door deze blokken te hergebruiken/herschikken — nooit opnieuw vanaf nul.
- **Per editie een eigen bestand** bij handwerk, bv. `sjabloon/nieuwsbrief-april.html`. De bibliotheek blijft blanco. Via de bouwer staat elke editie in Supabase onder een eigen naam.
- **Koppen = live tekst**, nooit als afbeelding. Dat voorkomt dat de mail onleesbaar wordt als een mailclient (vooral bedrijfs-Outlook) beelden blokkeert. Welk font en welke fallback per merk gelden staat in de merksecties hieronder.
- **Bodytekst leunt op de fallback.** Wat je in de bouwer ziet is wat de ontvanger krijgt; een merkfont op body is hooguit progressive enhancement.
- **Levering:** in de bouwer op **HTML voor Mailchimp** → **HTML kopiëren** → in Mailchimp: Create → Email → Code your own → Paste in code. De zip-route (**Zip met foto's** → Import zip) blijft als alternatief bestaan.
- **Niet bedoeld om in Mailchimp te bewerken.** Aanpassingen lopen via het werkbestand hier; ik lever een nieuwe zip.

## Maandproces
1. Klant levert teksten + foto's (of een ruwe opzet) — of je collega levert een briefing via de Nieuwsbrief-bouwer.
2. Stel editie samen uit de standaardblokken, met een **frisse layout-variant** (zie variatieknoppen).
3. Plaats de foto's op de genummerde placeholders → werkbestand = meteen de importklare versie.
4. Exporteer met **HTML voor Mailchimp** → klant plakt de code en verstuurt.

## Beeld-werkwijze (vast — genummerde placeholders)
- Bij elke nieuwe editie krijgt **elke afbeeldingsplek een zichtbaar nummer** in het werkbestand: een badge ① ② ③… linksboven op de placeholder.
- De klant levert foto's aan en zegt simpelweg **"foto 1 = …, foto 2 = …"**. Zo is er nooit twijfel over welke foto waar komt.
- Lever per editie ook een kort **fotolijstje**: nummer · waar het komt · aanbevolen formaat (hero ~1200px breed, kolom/ruimtefoto's ~530px breed, JPG/PNG). Te kleine foto's worden korrelig op retina.
- De nummer-badges zijn alleen voor de werkfase: **bij levering verdwijnen ze** (placeholder → echte foto).
- **Elke afbeelding kan klikbaar** — knop `Link` op de afbeelding, net als bij een knop. De afbeelding wordt dan in een `<a>` gezet. Dit geldt voor alle beelden in alle blokken, dus ook logo en social-iconen. Leeg laten haalt de link er weer af. Naast `https://` zijn ook `mailto:`, `tel:` en merge-tags als `*|ARCHIVE|*` toegestaan. Bij beelden smaller dan 200px verschijnen de knoppen pas bij hover, zodat het beeld herkenbaar blijft.
- **Ongedaan maken** met `Ctrl+Z` / `Cmd+Z`, opnieuw met `Ctrl+Shift+Z` of `Ctrl+Y`. De geschiedenis bewaart momentopnamen van de hele opzet (max 80) en dekt zowel blokken als getypte tekst. In invoervelden blijft de normale tekst-undo van de browser werken.
- Helper: badge = absoluut gepositioneerde pill in de merk-accentkleur, in een `position:relative` wrapper rond de `<img>`. De bouwer stript die wrapper en alle knoppen bij het exporteren.
- **Kolomfoto naast tekst is even hoog als de tekst** (genummerd artikel met beeld, beeld+tekst). De bouwer meet de tekstkolom en zet die hoogte op de foto (minimaal 150px); typ je meer regels, dan groeit de foto mee. De cropper snijdt daardoor meteen in de juiste verhouding. Bij het exporteren wordt een foto die nog een andere verhouding heeft echt bijgesneden (2x, naar Supabase Storage), zodat ook Outlook geen uitgerekt beeld krijgt.

## Voorvertoningstekst (vast)
- Boven de blokken staat in de bouwer het veld **Voorvertoningstekst**: de regel die de ontvanger in zijn inbox achter het onderwerp ziet. Hij gaat mee in de geëxporteerde HTML, in de verborgen `.mcnPreviewText`-div van het merksjabloon.
- **Leeg laten houdt de standaard van het merk aan.** Bij NBC is dat de merge-tag `*|MC_PREVIEW_TEXT|*`, zodat Mailchimp zijn eigen previewtekst gebruikt; bij Green Village de vaste zin uit het sjabloon. Staat er nog een merkstandaard als je exporteert, dan waarschuwt het exportvenster daarvoor.
- De onzichtbare vultekens (`&#847;&zwnj;`) achter de tekst blijven altijd staan. Zonder die tekens vult de inbox de rest van de previewregel met de eerste zichtbare tekst uit de mail, en dat is "Online lezen".
- **Richtlijn:** 35 tot 140 tekens. De teller in de bouwer zegt het als het te kort of te lang wordt.
- **Opslag:** de tekst hoort bij de nieuwsbrief, niet bij een blok, maar reist mee als veld `voorvertoning` op het eerste blok. Zo blijft `blokken` in Supabase een gewone lijst blokken en negeert een versie die het veld niet kent het simpelweg, in plaats van eroverheen te schrijven. Niet omzetten naar een eigen kolom zonder migratie.

## Ruimte tussen blokken (vast)
- De witruimte tussen twee blokken komt **altijd van de afstandsknop** (`↕ Afstand`) van het blok erbóven. Geen enkel blok heeft nog een vaste witstrook aan zijn bovenkant.
- Blok E had die wel — 40px wit boven het beeld — waardoor je na een ander blok twee keer ruimte telde. Die strook is uit de bibliotheek gehaald; opgeslagen nieuwsbrieven raken hem bij het openen alsnog kwijt.
- Een **gekleurd streepje** aan de bovenkant van een blok (de accentlijn van de footer) is opmaak, geen ruimte, en blijft dus staan. Zet nooit een vaste witte spacer-rij bovenin een blok terug.

## Controle bij het exporteren (vast)
- Het exportvenster meldt wat er nog open staat: lege fotoplekken, links die nog naar de voorbeeldbestemming wijzen, een merkstandaard in de voorvertoningstekst, een te grote mail en foto's die nog niet online staan.
- **Standaardlinks worden gemeten tegen de blokkenbibliotheek**, niet tegen een opgeslagen attribuut. Dat laatste ging mis: na opslaan en heropenen stond jouw eigen link in dat attribuut, dus werd élke link als "nog standaard" gemeld.
- In de meldingen en de briefing heet een link naar de tekst van de knop, of naar de `alt` van de afbeelding. De knoppen die de bouwer zelf over een foto legt (Foto, Link, het nummer) tellen niet mee in die tekst.
- `data-link-editable` en `data-default-href` zijn hulpmiddelen van de bouwer en worden bij het exporteren verwijderd — ze horen niet in de verstuurde mail.

## Outlook voor Windows (vast — geldt voor beide merken)
- **Knoppen en beelden hebben een Outlook-kopie** in een `<!--[if mso]>`-commentaar (VML-knop, losse `<img>`). Die kopie ziet de bouwer niet als tekst, dus hij loopt achter zodra je een knoptekst, link of foto aanpast. De export trekt hem automatisch gelijk met het echte element ernaast (tekst, link, breedte, foto, hoogte). Dit was de oorzaak van "Plan jouw zomerevent" bij een collega terwijl er "Reserveer een tafel" stond.
- **Webfonts staan in een `<!--[if !mso]><!-->`-blok.** Ziet Outlook een `@font-face`, dan negeert het de fallback-fonts en valt álles terug op Times New Roman. Buiten dat blok kiest Outlook netjes Times New Roman voor koppen en Arial voor bodytekst. De export controleert dit ook als vangnet.
- **Kapitalen worden echt kapitalen.** Outlook kent `text-transform` niet; tekst met `text-transform:uppercase` gaat daarom als hoofdletters de mail in (merge-tags blijven ongemoeid).

## Merk NBC (bindend)
- **Fonts:** display = Pockota (live tekst, fallback `Georgia`, dan `serif`); body/UI = Area Normal → fallback Helvetica/Arial. Nooit Georgia op bodytekst zetten.
- **Kleuren:** petrol `#229d96`, goud-accent `#f6a304` (**nooit knopkleur**), zand `#f2e6da`, lichte tint `#e9f5f4`, cream `#f1f1ef`, donker `#050606`, body-tekst `#21282b` (nooit puur zwart), diep petrol `#165e5a`.
- **Knoppen:** pill; inkt `#0e0e0e` met witte tekst op licht, wit met inkt-tekst op teal/donker. Geen geel.
- **Toon:** Nederlands, informeel (je/jouw), warm, sentence-case koppen, lowercase eyebrows. Geen emoji.
- **Breedte:** 600px. Mobiel stapelt onder 620px.

## Footer-gegevens NBC (vast)
NBC · Blokhoeve 1 · 3438 LC Nieuwegein · info@nbcevents.nl · +31 (0)30 - 602 69 00
Social: LinkedIn, Instagram, Facebook, YouTube. Merge-tags: `*|ARCHIVE|*`, `*|EMAIL|*`, `*|UPDATE_PROFILE|*`, `*|UNSUB|*`, `*|CURRENT_YEAR|*`, `*|MC:SUBJECT|*`.

## Merk Green Village (bindend — Huisstijlgids april 2026)
- **Fonts:** display/koppen = TT Ramillas Light, **altijd in kapitalen**, fallback `'Times New Roman',Georgia,serif`; body = TT Wellingtons, fallback Helvetica Neue/Arial. Anders dan bij NBC wordt het bodyfont hier **wél** geladen: de merkgids schrijft TT Wellingtons voor als progressive enhancement. De `@font-face`-regels staan in het mail-sjabloon in een `[if !mso]`-blok (zie Outlook hieronder) — niet terugzetten in de gewone `<style>`.
- **Kleuren:** sage `#71755d` (primair) · `#4b4e3e` (donker) · `#d7d9cf` (lichte tint) · terracotta `#d24e1f` (accent) · khaki `#e3ddc4` (zandvervanger) · body-tekst `#2f3a3e` · paper `#f1f1ef` · near-black `#0e0d07`.
- **Hoeken:** knoppen = pil; kaarten, afbeeldingen en badges = **vierkant (radius 0)**. Harde regel, anders dan NBC.
- **Knoppen:** inkt `#0e0d07` met crème tekst op licht; wit met inkt-tekst op sage/donker.
- **Toon:** Nederlands, informeel (je/jullie), warm, **koppen in kapitalen**, lowercase eyebrows. Geen emoji.
- **Breedte:** 600px. Mobiel stapelt onder 620px.

## Footer-gegevens Green Village (vast)
Green Village · Blokhoeve 7 · 3438 LC Nieuwegein · info@green-village.nl · 030 - 60 39 114
Social: LinkedIn, Instagram, Facebook. Zelfde merge-tags als NBC.

## Blokkenbibliotheek
Beide merken hebben dezelfde blokken op dezelfde letters, in hun eigen stijl:
webversie-balk · header (logo + nav + accentlijn) · hero met beeld · genummerd artikel · foto + actiekaart · genummerd artikel met beeld · twee kolommen · kengetallen · citaat · afsluit-CTA · donkere footer.
**Extra varianten:** typografische hero (zonder beeld) · sectiekop/scheiding · agenda/event-rij · drie kolommen tekst · beeld+tekst (beeld rechts) · highlight-strip · losse CTA-knop · losse afbeelding (volle breedte).
NBC heeft er één extra: **T · alleen tekst + CTA**.

## Variatieknoppen (voor afwisseling, binnen de stijl)
- **Hero:** groot beeld + tweekleurige kop ↔ typografische hero zonder beeld.
- **Sectie-achtergronden** rouleren binnen de merkkleuren (max 1–2 per mail).
- **Beeld:** 1 groot ↔ 2 naast elkaar ↔ beeld+tekst links/rechts.
- **Genummerd** (01/02/03) ↔ los.
- **Wisselend element:** citaat (lichte tint) / kengetallen / highlight-strip / agenda-rij.
- Elke maand een andere combinatie — herkenbaar voor het merk, nooit een kopie van vorige maand.

## Bestanden
- `index.html` — de merkloze bouwer (draait op GitHub Pages).
- `merken/nbc.js`, `merken/gv.js` — alles wat per merk verschilt.
- `config.js` — Supabase-URL + publieke anon-key, geldt voor alle gebruikers.
- `sjabloon/nbc-mailing-template.html` — blanco blokkenbibliotheek NBC (niet versturen).
- `sjabloon/nieuwsbrief-<maand>.html` — handgemaakt werkbestand per editie.
- `docs/supabase-setup.html` — eenmalige installatie van database + fotomap.
- `images/` (NBC), `images/gv/` (Green Village), `fonts/` — assets. Alles
  waarnaar verwezen wordt moet hier staan; de deploy stopt als er iets ontbreekt.

## Route via de bouwer (standaard)
De bouwer draait op https://digitaldedication.github.io/nbcnieuwsbriefbouwer/
(Green Village: voeg `?merk=gv` toe) en
levert met **HTML voor Mailchimp** de complete mail in één klik. Afbeeldingen
krijgen daarbij automatisch hun volledige webadres: merkbeelden vanaf Pages,
geüploade foto's vanuit Supabase Storage. Plakken in *Code your own → Paste in
code* is genoeg — de zip-route is alleen nog een alternatief.
