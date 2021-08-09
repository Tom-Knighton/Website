import { useState } from "react";
import { ReportOption, ReportType, UserReport } from "../types/Report";

export default function ReportModal({
  reporterUUID,
  reportType,
  reportId,
  onCancel,
  onReport,
}: {
  reporterUUID: string;
  reportType: ReportType;
  reportId: string;
  onCancel?: () => void;
  onReport?: () => void;
}) {
  const reportOptions: ReportOption[] = [
    {
      reportName: "Illegal Content",
      reportDescription:
        "Child pornography, solicitations of minors, threats of school shootings or criminal activity.",
    },
    {
      reportName: "Violates Gary Portal Policy",
      reportDescription:
        "Content which violates a specific clause of the Gary Portal Policy.",
    },
    {
      reportName: "Harasssment",
      reportDescription:
        "Threats, stalking, bullying, sharing of personal information, impersonation etc.",
    },
    {
      reportName: "Spam or Phishing Links",
      reportDescription:
        "Fake, malicious or illegal links or attachments, including links to external locations designed to share such links or attachments.",
    },
    {
      reportName: "NSFW Content",
      reportDescription:
        "Unwanted pornography or other adult content, or such content in a public feed or chat.",
    },
    {
      reportName: "Breaks Gary Portal",
      reportDescription:
        "Content which interferes with or breaks the correct functions of Gary Portal. (Please note specific bug reports can be submitted from the Profile Page)",
    },
  ];

  const [selectedReport, setSelectedReport] = useState("");

  function onChangeReportType(name: string) {
    setSelectedReport(name);
  }

  function sendReport() {
    switch (reportType) {
      case ReportType.Profile:
        fetch(`/api/makeReport?type=profile&uuidToReport=${reportId}&reportedByUUID=${reporterUUID}&reason=${selectedReport}`);
        break;
      case ReportType.ChatMessage:
        fetch(`/api/makeReport?type=chatmessage&uuidToReport=${reportId}&reportedByUUID=${reporterUUID}&reason=${selectedReport}`);
        break;
      case ReportType.Feed:
        fetch(`/api/makeReport?type=feed&uuidToReport=${reportId}&reportedByUUID=${reporterUUID}&reason=${selectedReport}`);
        break;
      case ReportType.FeedComment:
        fetch(`/api/makeReport?type=feedcomment&uuidToReport=${reportId}&reportedByUUID=${reporterUUID}&reason=${selectedReport}`);
        break;
    }
    onReport();
  }

  return (
    <div className="max-h-50vh overflow-y-scroll">
      <h1 className="font-bold text-2xl">What is it you're reporting?</h1>
      {reportOptions.map((reportOption) => (
        <div
          className="flex flex-row border-b-2 pt-1 pb-1"
          key={reportOption.reportName}
        >
          <input
            className="m-auto"
            type="radio"
            onChange={() => {
              onChangeReportType(reportOption.reportName);
            }}
            checked={selectedReport === reportOption.reportName}
          />
          <div
            className="flex flex-col ml-3 flex-1"
            onClick={() => {
              onChangeReportType(reportOption.reportName);
            }}
          >
            <p className="font-bold">{reportOption.reportName}</p>
            <p>{reportOption.reportDescription}</p>
          </div>
        </div>
      ))}
      <span className="text-sm font-light">
        Reports are sent directly to administrators of Gary Portal - the user
        responsible for the content you are reporting can not see that you have
        made a report. Creating false reports may result in a suspension of
        reporting abilities or a temporary ban. Thanks for keeping things safe
        and sound!
      </span>
      <div className="flex flex-col md:flex-row gap-3 md:gap-10 ">
        <button
          className="bg-blue-500 p-2 rounded-md flex-1"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className={`bg-red-500 p-2 rounded-md flex-1 ${
            selectedReport !== ""
              ? "text-white"
              : "disabled bg-opacity-10 text-gray-800 dark:text-gray-600 text-opacity-20 disabled cursor-not-allowed"
          }`}
          onClick={() => {
            if (selectedReport !== "") {
              sendReport();
            }
          }}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}
