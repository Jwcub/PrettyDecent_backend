# Projektuppgift: Backend-baserad webbutveckling
Detta projekt är en examinationsuppgift i kursen *Backend-baserad webbutveckling* vid Mittuniversitet. Applikationen är en REST-API-server byggd med Node.js och Express.js, med en NoSQL-databasen MongoDB. 

## Funktioner och arkitektur
Applikationen använder npm-paketet `router` för att gruppera och dela upp rutter (routes) i separata filer. Detta har gjorts för att skapa en tydlig filstruktur som är lätt att underhålla. 

Som databas används **MongoDB** och koppling till databasen hanteras via **Mongoose**. Mongoose används även för att definiera databasens struktur och hantera validering. Innan data lagras i databasen bestäms datans format och visst innehåll kontrolleras, t.ex. mejl-adressens format samt datum för bordsbokning. Databasscheman återfinns i mappen `models`. 

Applikationens innehåller flera skyddade endpoints. För att skydda dessa används ett middleware (auth_tokens). Detta middleware kontrollerar att användaren har skickat med ett gitligt JSOn Web Token innan åkomst beviljas för att läsa eller skriva till de skyddade resuserna. 

## API Endpoints
Nedan visas en överblick av applikationens tillgängliga endpoints.

### Autentisering / Användare

| Metod         | Endpoint          | Beskrivning                   | Autentisering     |
| --------      | --------          | --------                      | --------          |
| POST          | /api/register     | Registrera en ny användare    | Kräver JWT        |
| POST          | /api/login        | Logga in användare            | Ingen             |

### Meny
| Metod         | Endpoint          | Beskrivning                   | Autentisering     |
| --------      | --------          | --------                      | --------          |
| POST          | /api/menu         | Lägg till mat/dryck i menyn   | Kräver JWT        |
| GET           | /api/menu         | Läs in meny                   | Ingen             |
| PUT           | /api/menu         | Ändra mat/dryck i menyn       | Kräver JWT        |
| DELETE        | /api/menu         | Ta bort mat/dryck i menyn     | Kräver JWT.       |

### Reservera bord
| Metod         | Endpoint          | Beskrivning                   | Autentisering     |
| --------      | --------          | --------                      | --------          |
| POST          | /api/reservation  | Skapa bordsbokning            | Ingen             |
| GET           | /api/reservation  | Läs in bordsbokningar         | Ingen             |
| PUT           | /api/reservation  | Ändra status för bordsbokning | Kräver JWT        |

### Meddelande
| Metod         | Endpoint          | Beskrivning                   | Autentisering     |
| --------      | --------          | --------                      | --------          |
| POST          | /api/message      | Skicka meddelande             | Ingen             |
| GET           | /api/message      | Läs in meddelanden.           | Kräver JWT        |
| PUT           | /api/message      | Ändra status för meddelande   | Kräver JWT        |


## Installation
Följ dessa steg för att köra projektet lokalt:
1. **Klona repot:**
``bash
git clone <https://github.com/Jwcub>
cd <PrettyDecent_backend>
2. **Installera beroenden:**
``bash
npm install
3. Skapa en .env-fil i rotmappen och lägg till dina konfigurationer.
4. Starta applikationen
``bash
npm start




