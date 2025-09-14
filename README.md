# World Clock – React & TypeScript

Detta är en individuell inlämningsuppgift i TypeScript/React som visar lokal tid för olika städer runt om i världen, med både analog och digital klocka. Projektet använder React Hooks, TypeScript och React Router.

---

## Applikationsstruktur

### Komponenter

- `App.tsx` – Hanterar routing mellan `Home` och `CityDetail`.
- `Home.tsx` – Visar förvalda städer, favoritlistor och egna städer.  
- `CityDetail.tsx` – Visar analog och digital klocka för en vald stad.  
- `Clock.tsx` – Analog klocka med visare, återanvändbar komponent.

### Funktioner/logik utanför komponenter

- Typning och interfaces finns i `types.ts` för återanvändning.  
- LocalStorage-logik är delvis inuti `Home.tsx` men delad mellan funktioner för att hålla komponenten ren.  

### Typer och interfaces

```ts
export interface Timezone {
  value: string
  abbr: string
  offset: number
  isdst: boolean
  text: string
  utc: string[]
}
