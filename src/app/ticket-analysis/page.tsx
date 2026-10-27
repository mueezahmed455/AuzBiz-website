import type { Metadata } from "next";
import TicketAnalysisClient from "./TicketAnalysisClient";

export const metadata: Metadata = {
  title: "Fare comparison",
  description:
    "Compare indicative fare bands for your route, cabin and dates, then request the real fare from the AUZBIZ ticketing desk in Lahore. Sample data, not live airline inventory.",
};

export default function TicketAnalysisPage() {
  return <TicketAnalysisClient />;
}
