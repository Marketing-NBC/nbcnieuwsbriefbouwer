# NBC nieuwsbrief — projectgeheugen

Dit project maakt de **maandelijkse NBC-nieuwsbrief** voor Mailchimp. Lees dit eerst.

## Werkwijze (vast)
- **Niet from scratch.** `NBC mailing template.html` is de **blokkenbibliotheek** (de blanco basis). Elke editie wordt samengesteld door deze blokken te hergebruiken/herschikken — nooit opnieuw vanaf nul.
- **Per editie een eigen bestand**, bv. `Nieuwsbrief april.html`. De bibliotheek blijft blanco.
- **Koppen = live tekst.** Koppen staan in Pockota met een veilige fallback-stack: `'Pockota','Trebuchet MS',Verdana,Arial,sans-serif`. Geen afbeeldingen meer voor koppen — dit voorkomt dat de mail onleesbaar wordt als een mailclient (vooral bedrijfs-Outlook) afbeeldingen blokkeert. Trebuchet MS/Verdana zijn geometrisch en rond, het dichtst bij Pockota qua uitstraling, en overal geïnstalleerd.
- **Bodytekst = fallback.** Geen Area Normal-webfont in de mail; body draait op Helvetica/Arial — consistent voor élke ontvanger.
- **Levering:** map `mailchimp-export/` (HTML + `images/`) → zippen → in Mailchimp: Create → Email → Code your own → Import zip. Geen "bak"-stap meer nodig — het werkbestand ís al de importklare versie (alleen kopiëren).
- **Niet bedoeld om in Mailchimp te bewerken.** Aanpassingen lopen via het werkbestand hier; ik lever een nieuwe zip.

## Maandproces
1. Klant levert teksten + foto's (of een ruwe opzet) — of je collega levert een briefing via de Nieuwsbrief-bouwer.
2. Stel editie samen uit de standaardblokken, met een **frisse layout-variant** (zie variatieknoppen).
3. Plaats de foto's op de genummerde placeholders → werkbestand = meteen de importklare versie.
4. Kopieer naar `mailchimp-export/` → zip → klant importeert en verstuurt.

## Beeld-werkwijze (vast — genummerde placeholders)
- Bij elke nieuwe editie krijgt **elke afbeeldingsplek een zichtbaar nummer** in het werkbestand: een badge ① ② ③… linksboven op de placeholder.
- De klant levert foto's aan en zegt simpelweg **"foto 1 = …, foto 2 = …"**. Zo is er nooit twijfel over welke foto waar komt.
- Lever per editie ook een kort **fotolijstje**: nummer · waar het komt · aanbevolen formaat (hero ~1200px breed, kolom/ruimtefoto's ~530px breed, JPG/PNG). Te kleine foto's worden korrelig op retina.
- De nummer-badges zijn alleen voor de werkfase: **bij levering verdwijnen ze** (placeholder → echte foto).
- Helper: badge = absoluut gepositioneerde pill (petrol `#229d96`, witte Pockota-cijfers) in een `position:relative` wrapper rond de `<img>`. Strip alle `.ph-num`-elementen bij het bakken.

## Merk (bindend)
- **Fonts:** display = Pockota (live tekst, fallback `Trebuchet MS`/`Verdana`/`Arial`); body/UI = Area Normal → fallback Helvetica/Arial.
- **Kleuren:** petrol `#229d96`, goud-accent `#f6a304` (**nooit knopkleur**), zand `#f2e6da`, lichte tint `#e9f5f4`, cream `#f1f1ef`, donker `#050606`, body-tekst `#21282b` (nooit puur zwart), diep petrol `#165e5a`.
- **Knoppen:** pill; inkt `#0e0e0e` met witte tekst op licht, wit met inkt-tekst op teal/donker. Geen geel.
- **Toon:** Nederlands, informeel (je/jouw), warm, sentence-case koppen, lowercase eyebrows. Geen emoji.
- **Breedte:** 600px. Mobiel stapelt onder 620px.

## Footer-gegevens (vast)
NBC · Blokhoeve 1 · 3438 LC Nieuwegein · info@nbcevents.nl · +31 (0)30 - 602 69 00
Social: LinkedIn, Instagram, Facebook, YouTube. Merge-tags: `*|ARCHIVE|*`, `*|EMAIL|*`, `*|UPDATE_PROFILE|*`, `*|UNSUB|*`, `*|CURRENT_YEAR|*`, `*|MC:SUBJECT|*`.

## Blokkenbibliotheek (in `NBC mailing template.html`)
Header (logo + nav + gradient-lijn) · hero met beeld · genummerd artikel (zand) · foto + teal actiekaart · genummerd artikel met beeld · twee kolommen · kengetallen · citaat (lichte tint) · afsluit-CTA (teal) · donkere footer.
**Extra varianten:** typografische hero (zonder beeld) · sectiekop/scheiding · agenda/event-rij · drie kolommen tekst · beeld+tekst (beeld rechts) · highlight-strip (zand) · losse CTA-knop · losse afbeelding (volle breedte).

## Variatieknoppen (voor afwisseling, binnen de stijl)
- **Hero:** groot beeld + tweekleurige kop ↔ typografische hero zonder beeld.
- **Sectie-achtergronden** rouleren: wit / zand / teal / lichte tint (max 1–2 per mail).
- **Beeld:** 1 groot ↔ 2 naast elkaar ↔ beeld+tekst links/rechts.
- **Genummerd** (01/02/03) ↔ los.
- **Wisselend element:** citaat (lichte tint) / kengetallen / highlight-strip / agenda-rij.
- Elke maand een andere combinatie — herkenbaar NBC, nooit een kopie van vorige maand.

## Bestanden
- `index.html` — de online nieuwsbrief-bouwer (draait op GitHub Pages).
- `config.js` — Supabase-URL + publieke anon-key, geldt voor alle gebruikers.
- `sjabloon/nbc-mailing-template.html` — blanco blokkenbibliotheek (niet versturen).
- `sjabloon/nieuwsbrief-<maand>.html` — handgemaakt werkbestand per editie.
- `docs/supabase-setup.html` — eenmalige installatie van database + fotomap.
- `images/`, `fonts/` — assets. Alles waarnaar verwezen wordt moet hier staan;
  de Pages-deploy stopt als er iets ontbreekt.

## Route via de bouwer (standaard)
De bouwer draait op https://digitaldedication.github.io/nbcnieuwsbriefbouwer/ en
levert met **HTML voor Mailchimp** de complete mail in één klik. Afbeeldingen
krijgen daarbij automatisch hun volledige webadres: merkbeelden vanaf Pages,
geüploade foto's vanuit Supabase Storage. Plakken in *Code your own → Paste in
code* is genoeg — de zip-route is alleen nog een alternatief.
