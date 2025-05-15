import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SurveyStatsCard from "../SurveyStatsCard";
import { getAggregateStats } from "../../services/api";

jest.mock("../../services/api");

describe("SurveyStatsCard", () => {
  it("renders the initial view correctly", () => {
    render(<SurveyStatsCard />);

    expect(
      screen.getByText(/View anonymous aggregate statistics/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /View Statistics/i })
    ).toBeInTheDocument();
  });

  it("fetches and displays statistics when the button is clicked", async () => {
    (getAggregateStats as jest.Mock).mockResolvedValue({
      data: {
        total_responses: 100,
        average_stress_level: 3.5,
      },
    });
    render(<SurveyStatsCard />);

    fireEvent.click(screen.getByRole("button", { name: /View Statistics/i }));

    await waitFor(() => {
      expect(screen.getByText(/Total Responses/i)).toBeInTheDocument();
      expect(screen.getByText(/100/i)).toBeInTheDocument();
      expect(screen.getByText(/Average Stress Level/i)).toBeInTheDocument();
      expect(screen.getByText(/3.50\/5/i)).toBeInTheDocument();
    });
  });

  it("shows the initial form when fetching statistics fails", async () => {
    (getAggregateStats as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch statistics")
    );

    render(<SurveyStatsCard />);

    fireEvent.click(screen.getByRole("button", { name: /View Statistics/i }));

    await waitFor(() => {
      expect(screen.getByText(/View Statistics/i)).toBeInTheDocument();
    });
  });

  it("shows No data avaiable when there are no data", async () => {
    (getAggregateStats as jest.Mock).mockResolvedValue({
      data: {
        total_responses: 0,
        average_stress_level: 0,
      },
    });

    render(<SurveyStatsCard />);

    fireEvent.click(screen.getByRole("button", { name: /View Statistics/i }));

    await waitFor(() => {
      expect(screen.getByText(/No data available/i)).toBeInTheDocument();
    });
  });
  it("hides statistics when the button is clicked again", async () => {
    (getAggregateStats as jest.Mock).mockResolvedValue({
      data: {
        total_responses: 100,
        average_stress_level: 3.5,
      },
    });

    render(<SurveyStatsCard />);

    fireEvent.click(screen.getByRole("button", { name: /View Statistics/i }));

    await waitFor(() => {
      expect(screen.getByText(/Total Responses/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Hide Statistics/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/View anonymous aggregate statistics/i)
      ).toBeInTheDocument();
    });
  });
});
