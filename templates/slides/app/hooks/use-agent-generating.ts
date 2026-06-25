import { useCallback } from "react";
import { useAgentChatGenerating } from "@agentnative-fork/core/client";

/**
 * Tracks whether an agent chat submission is in progress.
 * Wraps @agentnative-fork/core's useAgentChatGenerating hook.
 */
export function useAgentGenerating() {
  const [generating, send] = useAgentChatGenerating();

  const submit = useCallback(
    (message: string, context: string) => {
      send({ message, context, submit: true });
    },
    [send],
  );

  return { generating, submit };
}
