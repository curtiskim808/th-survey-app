import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SurveyForm from "../SurveyForm";
import "@testing-library/jest-dom";
import { submitSurveyResponse } from "../../services/api";

jest.mock("../../services/api");

describe("SurveyForm", () => {
  it("renders the form fields correctly", () => {
    render(<SurveyForm />);

    expect(
      screen.getByLabelText(/How are you feeling today?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Rate your stress level \(1-5\)/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Any comments?/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Submit Survey/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when required fields are empty", async () => {
    render(<SurveyForm />);

    fireEvent.click(screen.getByRole("button", { name: /Submit Survey/i }));

    await waitFor(() => {
      expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
    });
  });

  it("submits the form successfully", async () => {
    (submitSurveyResponse as jest.Mock).mockResolvedValue({ data: true });

    render(<SurveyForm />);

    fireEvent.change(screen.getByLabelText(/How are you feeling today?/i), {
      target: { value: "Good" },
    });
    fireEvent.change(screen.getByLabelText(/Rate your stress level \(1-5\)/i), {
      target: { value: 3 },
    });
    fireEvent.change(screen.getByLabelText(/Any comments?/i), {
      target: { value: "No comments" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit Survey/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Your survey has been submitted successfully!/i)
      ).toBeInTheDocument();
    });
  });

  it("shows an error message when submission fails", async () => {
    (submitSurveyResponse as jest.Mock).mockRejectedValue(
      new Error("Submission failed")
    );

    render(<SurveyForm />);

    fireEvent.change(screen.getByLabelText(/How are you feeling today?/i), {
      target: { value: "Good" },
    });
    fireEvent.change(screen.getByLabelText(/Rate your stress level \(1-5\)/i), {
      target: { value: 3 },
    });
    fireEvent.change(screen.getByLabelText(/Any comments?/i), {
      target: { value: "No comments" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit Survey/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to submit the form. Please try again./i)
      ).toBeInTheDocument();
    });
  });
});
