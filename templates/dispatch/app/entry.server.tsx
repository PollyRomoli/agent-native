import { ServerRouter } from "react-router";
import {
  createDocumentRequestHandler,
  streamTimeout,
} from "@agentnative-fork/core/server/entry-server";

const handleDocumentRequest = createDocumentRequestHandler(ServerRouter);

export { streamTimeout };
export default handleDocumentRequest;
