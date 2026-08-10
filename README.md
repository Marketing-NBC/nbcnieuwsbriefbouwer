# NBC nieuwsbrief-bouwer

De online bouwer voor de maandelijkse NBC-nieuwsbrief. Blokken kiezen, teksten
typen, foto's uploaden — en met één klik de complete HTML voor Mailchimp.

**Open de bouwer:** https://digitaldedication.github.io/nbcnieuwsbriefbouwer/

Iedereen met de link kan hem gebruiken; er is niets te installeren. Opgeslagen
nieuwsbrieven staan in Supabase en zijn dus vanaf elke computer bereikbaar.

## Zo werkt het

1. **Blokken kiezen.** Klik links op een blok (A–T). Start met `A Webversie-balk`
   en `B Header`, eindig met `R Donkere footer`.
2. **Teksten typen.** Klik direct in een kop of alinea en typ.
3. **Foto's plaatsen.** Klik op een fotoplek op **Foto**, kies je foto, snijd
   bij. De foto wordt meteen online gezet.
4. **Afbeeldingen klikbaar maken.** Klik op **Link** bij een afbeelding en vul
   in waar hij naartoe moet, net als bij een knop. Dat kan bij *elke* afbeelding
   in elk blok — ook het logo en de social-iconen. Bij die kleine beelden
   verschijnen de knopjes als je er met de muis overheen gaat. Leeg laten haalt
   de link er weer af.
5. **Ongedaan maken.** **Ctrl+Z** (Mac: **Cmd+Z**) draait je laatste stap terug,
   **Ctrl+Shift+Z** of **Ctrl+Y** voert hem opnieuw uit. Kan ook met de pijltjes
   in de balk. Werkt voor blokken én voor getypte tekst.
6. **Opslaan.** Geef de nieuwsbrief bovenin een naam. Vanaf dan wordt elke
   wijziging automatisch bewaard.
7. **Exporteren.** Klik **HTML voor Mailchimp** → **HTML kopiëren**. In
   Mailchimp: *Create → Email → Code your own → Paste in code*, plakken, klaar.

## Waarom de afbeeldingen het nu altijd doen

Een e-mail kan geen bestanden "meesturen" — elke afbeelding moet een eigen
webadres hebben. Er zijn twee soorten:

| Soort | Waar het vandaan komt |
|---|---|
| Vaste merkafbeeldingen (logo, social-iconen) | Deze repo, via GitHub Pages |
| Foto's die je zelf uploadt | Supabase Storage |

Omdat de bouwer op GitHub Pages draait, heeft élke afbeelding in `images/`
automatisch een vast, publiek adres. Bij het exporteren rekent de bouwer alle
adressen om naar dat volledige adres, dus de geplakte HTML werkt direct — er
kan geen afbeelding meer "kwijtraken".

Een deploy stopt automatisch als er een afbeelding of font ontbreekt waarnaar
verwezen wordt (zie `.github/workflows/pages.yml`).

## Eenmalig instellen

### 1. GitHub Pages aanzetten

**Settings → Pages → Build and deployment → Source: GitHub Actions.**

Daarna deployt elke push naar `main` automatisch.

### 2. Supabase-sleutel invullen

De opslag van nieuwsbrieven loopt via Supabase. Zet de publieke sleutel één keer
in [`config.js`](config.js):

```js
window.NBC_CONFIG = {
  url: 'https://uqgpcvuhwfvyhvxokptn.supabase.co',
  key: 'eyJhbGciOi...'   // anon / publishable key
};
```

Die sleutel vind je in Supabase onder **Settings → API → anon public**. Commit
en push, en het werkt voor iedereen.

> De anon-key hoort in de browser thuis — hij staat in elke Supabase-webapp en
> geeft alleen toegang tot wat je RLS-policies toestaan. Zet er nooit de
> `service_role`-key neer.

Database en fotomap opzetten: zie [`docs/supabase-setup.html`](docs/supabase-setup.html).

## Wat staat waar

```
index.html                 de bouwer zelf
config.js                  Supabase-URL + publieke sleutel
images/                    logo, social-iconen, placeholders, foto's
fonts/                     Pockota (merkfont, alleen voor de koppen)
sjabloon/                  handgemaakt blokkensjabloon + eerdere edities
docs/supabase-setup.html   handleiding database + fotomap
CLAUDE.md                  merkregels, werkwijze, maandproces
```

## Aanpassen

De bouwer is één HTML-bestand zonder buildstap. Bewerk `index.html`, push naar
`main`, en de site is binnen een minuut bij.

De blokkenbibliotheek staat als `BLOCKS`-array bovenaan het `<script>`-blok.
Een blok toevoegen betekent: een item aan die array toevoegen en de letter in
`coreLetters` of `varLetters` zetten.

## Merkregels

Kort samengevat — de volledige set staat in [`CLAUDE.md`](CLAUDE.md):

- **Kleuren:** petrol `#229d96`, goud `#f6a304` (nooit knopkleur), zand
  `#f2e6da`, donker `#050606`, bodytekst `#21282b`.
- **Knoppen:** pill-vorm, inkt `#0e0e0e` met witte tekst op licht, wit met
  inkt-tekst op teal. Geen geel.
- **Koppen** staan in Pockota met Georgia als enige fallback — live tekst, geen
  afbeeldingen, zodat de mail leesbaar blijft als beelden geblokkeerd zijn.
- **Bodytekst** draait bewust op Helvetica/Arial, ook in de bouwer: wat je ziet
  is wat de ontvanger ziet.
- **Breedte** 600px, mobiel stapelt onder 620px.
