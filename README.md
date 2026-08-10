# Nieuwsbrief-bouwer — NBC & Green Village

De online bouwer voor de maandelijkse nieuwsbrief. Blokken kiezen, teksten
typen, foto's uploaden — en met één klik de complete HTML voor Mailchimp.
Eén bouwer, twee merken.

| Merk | Link |
|---|---|
| NBC | https://digitaldedication.github.io/nbcnieuwsbriefbouwer/?merk=nbc |
| Green Village | https://digitaldedication.github.io/nbcnieuwsbriefbouwer/?merk=gv |

Open je hem [zonder merk](https://digitaldedication.github.io/nbcnieuwsbriefbouwer/),
dan vraagt hij eerst voor welk merk je bouwt en onthoudt die keuze. Wisselen kan
altijd via de merknaam in de balk.

Iedereen met de link kan hem gebruiken; er is niets te installeren. Opgeslagen
nieuwsbrieven staan in Supabase en zijn dus vanaf elke computer bereikbaar —
per merk gescheiden, dus je ziet alleen de nieuwsbrieven van het merk waarin je
werkt.

## Zo werkt het

1. **Blokken kiezen.** Klik links op een blok. Start met `A Webversie-balk` en
   `B Header`, eindig met `R Donkere footer`. Beide merken hebben dezelfde
   blokken op dezelfde letters, elk in de eigen huisstijl.
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

Hetzelfde geldt voor de merkfonts: staan die in het mail-sjabloon (Green Village
doet dat), dan krijgen ze bij het exporteren ook hun volledige webadres.

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
index.html                 de bouwer — merkloos
merken/nbc.js              blokken, fonts, kleuren en mail-sjabloon van NBC
merken/gv.js               idem voor Green Village
config.js                  Supabase-URL + publieke sleutel
images/                    NBC: logo, social-iconen, placeholders
images/gv/                 Green Village: idem
fonts/                     Pockota (NBC) + TT Ramillas/TT Wellingtons (GV)
sjabloon/                  handgemaakt blokkensjabloon + eerdere edities
docs/supabase-setup.html   handleiding database + fotomap
CLAUDE.md                  merkregels, werkwijze, maandproces
```

## Aanpassen

De bouwer is één HTML-bestand zonder buildstap. Bewerk `index.html`, push, en de
site is binnen een minuut bij.

**`index.html` bevat niets merkspecifieks.** Blokken, fonts, kleuren en het
mail-sjabloon staan in `merken/nbc.js` en `merken/gv.js`. Een functie erbij hoort
dus in `index.html` — dan werkt hij meteen voor beide merken. Een blok erbij
hoort in de merkmodule: een item aan `blocks` toevoegen en de letter in
`coreLetters` of `varLetters` zetten.

Een derde merk toevoegen: kopieer een merkmodule, pas de waarden aan, zet er een
`<script src="merken/<id>.js">`-regel bij in `index.html` en voeg een kaart toe
aan het kiesscherm.

## Merkregels

Kort samengevat — de volledige set staat in [`CLAUDE.md`](CLAUDE.md):

| | NBC | Green Village |
|---|---|---|
| Koppen | Pockota, fallback Georgia | TT Ramillas in **kapitalen**, fallback Times New Roman |
| Bodytekst | Area Normal → Helvetica/Arial | TT Wellingtons → Helvetica Neue/Arial |
| Accent | petrol `#229d96`, goud `#f6a304` | sage `#71755d`, terracotta `#d24e1f` |
| Vlakken | zand `#f2e6da`, lichte tint `#e9f5f4` | khaki `#e3ddc4`, lichte sage `#d7d9cf` |
| Hoeken | kaarten afgerond | kaarten **vierkant** (harde regel) |
| Knoppen | pill, inkt `#0e0e0e`, nooit geel | pill, inkt `#0e0d07` |

Voor beide geldt: koppen zijn live tekst en nooit een afbeelding, zodat de mail
leesbaar blijft als beelden geblokkeerd worden. Breedte 600px, mobiel stapelt
onder 620px.
