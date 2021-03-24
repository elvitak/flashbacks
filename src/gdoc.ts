export type InputData = {
  year: number;
  date: string;
  text: string[];
};

// const mockToday = new Date().toLocaleString("lv", {
//   day: "numeric",
//   month: "long",
// });

// const mockInputData: InputData[] = [
//   {
//     year: 2020,
//     date: "19. janvāris",
//     text: [`Sun is shining.`, `Cheap blackberries in the market.`],
//   },
//   {
//     year: 2020,
//     date: "18. janvāris",
//     text: [`Kiddo behaves very nicely.`],
//   },
//   {
//     year: 2020,
//     date: "15. janvāris",
//     text: [`Zalando!`, `Interview is already scheduled.`],
//   },
//   {
//     year: 2018,
//     date: mockToday,
//     text: [`Nice workout.`, `Kiddo gave parents some time.`],
//   },
//   {
//     year: 2020,
//     date: mockToday,
//     text: [`Testing l10n āēīūņšļčž.`],
//   },
// ];

export async function readGoogleDoc(documentId: string): Promise<InputData[]> {
  const response = await gapi.client.docs.documents.get({
    documentId: documentId,
  });
  const contents = response.result.body!.content!;
  const result: InputData[] = [];
  for (let i = 0; i < contents.length; i++) {
    const content = contents[i];
    if (!content.paragraph?.bullet || !content.paragraph?.elements) {
      continue;
    }

    if (content.paragraph.bullet.nestingLevel) {
      // console.log("Text:");
      const text = content.paragraph.elements[0];
      result[result.length - 1].text.push(text.textRun!.content!);
      // console.log(text);
    } else {
      //console.log("Date:");
      const dateString = content.paragraph.elements[0];
      //console.log(dateString);
      const year = parseInt(dateString.textRun?.content?.slice(0, 4)!);
      const date = dateString.textRun?.content?.slice(11)!.trim()!;

      result.push({ year: year, date: date, text: [] });
    }
  }
  console.log(result);
  return result;
}
