export type InputData = {
  year: number;
  date: string;
  text: string[];
};

const mockToday = new Date().toLocaleString("lv", {
  day: "numeric",
  month: "long",
});

const mockInputData: InputData[] = [
  {
    year: 2020,
    date: "19. janvāris",
    text: [`Sun is shining.`, `Cheap blackberries in the market.`],
  },
  {
    year: 2020,
    date: "18. janvāris",
    text: [`Kiddo behaves very nicely.`],
  },
  {
    year: 2020,
    date: "15. janvāris",
    text: [`Zalando!`, `Interview is already scheduled.`],
  },
  {
    year: 2018,
    date: mockToday,
    text: [`Nice workout.`, `Kiddo gave parents some time.`],
  },
  {
    year: 2020,
    date: mockToday,
    text: [`Testing l10n āēīūņšļčž.`],
  },
];

export async function readGoogleDoc(): Promise<InputData[]> {
  return mockInputData;
}
