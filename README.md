Spuštění:
Nastavení .env.local:
API_URL=https://your-api-url
API_KEY=your-secret-api-key

Spuštění (vývoj):
npm install
npm run dev

Aplikace poběží na:
http://localhost:3000

Produkční režim (správné chování cache):
npm run build
npm run start



Admin login (API key):
Login:
Přihlášení probíhá na /admin/login
Po odeslání formuláře se uloží:
localStorage.setItem("isAdmin", "true");
Uživatel je přesměrován do /admin
Neprobíhá reálné ověření – jde o jednoduché demo řešení



API komunikace:
Všechny requesty na backend obsahují API key:
headers: {
  "x-api-key": process.env.API_KEY
}
API key je uložen pouze na serveru (.env.local)




SSR (Server-Side Rendering):
Použito u:
/device/[id]
/person/[id]
/room/[id]
/ticket/[id]
všechny admin detail stránky = zobrazují konkrétní záznam
data musí být vždy aktuální
nelze spoléhat jen na statickou cache
potřeba vždy aktuálních dat podle ID




ISR (Incremental Static Regeneration) =rychlé načítání díky cache, data se automaticky obnovují po změně (revalidateTag):
Použito u:

/ (landing page – dashboard) = zobrazuje počty entit (osoby, místnosti, zařízení, tickety), není nutné mít absolutně aktuální data při každém requestu

/device
/person
/room
/ticket
== seznamy se často čtou, ale méně často mění
chceme:
výkon (cache)
ale zároveň aktuální data po CRUD operacích

/admin =zobrazují agregovaná data (počty), není nutná 100% aktuálnost při každém načtení

všechny admin seznamy = podobná logika jako u public seznamů
admin často provádí změny → potřeba revalidace
ISR + revalidateTag zajistí aktuálnost




CSR (Client-Side Rendering):
Použito pouze u:
formuláře (create / update) = práce se stavem (useState),validace inputů, interaktivní chování (submit, reset)

/admin/login = práce se stavem (inputy, formuláře), interaktivita na klientovi, práce s localStorage




use cache:
Použito ve funkcích:
getDevices
getPersons
getRooms
getTickets
getDevice, getPerson, getRoom, getTicket 
=
cachování odpovědí z API, zrychlení načítání





cacheTag:
Použito pro označení dat:
devices
persons
rooms
tickets
device-[id], person-[id], ...
=
možnost cílené invalidace cache





cacheLife:
Použito ve všech get funkcích:
cacheLife({ revalidate: 300, expire: 3600 });
= 
automatická obnova dat, určení životnosti cache




revalidateTag:
Použito v server actions:
createDevice, editDevice, deleteDevice
createPerson, editPerson, deletePerson
createRoom, editRoom, deleteRoom
createTicket, editTicket, deleteTicket
=
po změně dat se invaliduje cache, zajištění aktuálních dat na stránkách