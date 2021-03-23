import React from "react";
import { GapiLoader } from "./GapiLoader";

function Main() {
  return <GapiLoader />;
}

export default Main;

/**
 * Prints the title of a sample doc:
 * https://docs.google.com/document/d/195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE/edit
 */
// async function printDocTitle(): Promise<string> {
//   const response = await gapi.client.docs.documents.get({
//     documentId: "195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE",
//   });
//   return response.result.title || "Undefined title...";
// }
