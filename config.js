/* ============================================================
   NBC nieuwsbrief-bouwer — cloud-instellingen
   ============================================================

   Deze waarden gelden voor iedereen die de bouwer opent. Zo hoeft
   niemand meer zelf een sleutel te plakken: de nieuwsbrieven-
   geschiedenis werkt direct, op elke computer.

   De `key` hieronder is de PUBLIEKE anon-key van Supabase. Die hoort
   in de browser thuis — hij staat in elke Supabase-webapp en geeft
   alleen toegang tot wat je RLS-policies toestaan. Zet hier nooit de
   `service_role`-key neer; die geeft volledige toegang.

   Vul de key één keer in, commit en push. Klaar.
   Handleiding: docs/supabase-setup.html
   ============================================================ */

window.NBC_CONFIG = {
  url: 'https://uqgpcvuhwfvyhvxokptn.supabase.co',
  key: ''   // <-- plak hier de anon / publishable key uit Supabase → Settings → API
};
