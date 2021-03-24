export type InputData = {
  year: number;
  date: string;
  text: string[];
};

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
      const text = content.paragraph.elements[0];
      result[result.length - 1].text.push(text.textRun!.content!);
    } else {
      const dateString = content.paragraph.elements[0];
      const year = parseInt(dateString.textRun?.content?.slice(0, 4)!);
      const date = dateString.textRun?.content?.slice(11)!.trim()!;

      result.push({ year: year, date: date, text: [] });
    }
  }
  console.log(result);
  return result;
}
