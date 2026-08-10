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
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxZ3BjdnVod2Z2eWh2eG9rcHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNDQwMzAsImV4cCI6MjEwMTkyMDAzMH0.SpLJjOe6MM4flM0eTXAbdWT95NQSUVfwj4CBmx1SeTg'   // <-- plak hier de anon / publishable key uit Supabase → Settings → API
};
