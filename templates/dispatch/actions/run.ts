import { runScript } from "@agentnative-fork/core/scripts";
import { dispatchActions } from "@agentnative-fork/dispatch/actions";

runScript({
  packageActions: dispatchActions,
  packageActionLabel: "Dispatch package actions",
});
