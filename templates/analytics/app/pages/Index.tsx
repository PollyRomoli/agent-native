import { useEffect } from "react";
import { useNavigate } from "react-router";
import { callAction } from "@agentnative-fork/core/client";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    void callAction("ensure-demo-dashboards", {}).catch((err) => {
      console.warn("[analytics] demo dashboard install failed", err);
    });
    navigate("/ask", { replace: true });
  }, [navigate]);

  return null;
}
