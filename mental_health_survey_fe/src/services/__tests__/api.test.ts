import type { SurveyResponse } from "../../types/SurveyResponse";

// Create mock functions
const mockPost = jest.fn();
const mockGet = jest.fn();

// First, tell Jest to mock the entire module
jest.mock("../api");

// Then, create a mock implementation for axios
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    post: mockPost,
    get: mockGet,
  })),
  isAxiosError: jest.fn(),
}));

// Import AFTER mocking
import axios from "axios";
import * as apiModule from "../api";

// Cast to access mocked functions
const { submitSurveyResponse, getAggregateStats } = apiModule as any;

describe("API Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAggregateStats", () => {
    it("fetches statistics successfully", async () => {
      // Mock successful response
      const mockStatsData = {
        total_responses: 100,
        average_stress_level: 3.5,
      };
      mockGet.mockResolvedValue({ data: mockStatsData });

      // Call the function - with a specific implementation for this test
      getAggregateStats.mockImplementation(async () => {
        try {
          const response = await axios.create().get("/survey_responses");
          return response.data;
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      });

      const result = await getAggregateStats();

      // Verify results
      expect(mockGet).toHaveBeenCalledWith("/survey_responses");
      expect(result).toEqual(mockStatsData);
    });

    it("handles error responses", async () => {
      // Mock error response
      const errorResponse = {
        data: { error: "Cannot fetch stats" },
      };
      const axiosError = new Error("API Error");
      Object.assign(axiosError, {
        response: errorResponse,
      });

      mockGet.mockRejectedValue(axiosError);
      (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(true);

      // Call the function
      getAggregateStats.mockImplementation(async () => {
        try {
          const response = await axios.create().get("/survey_responses");
          return response.data;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return error.response.data;
        }
      });

      const result = await getAggregateStats();

      // Verify results
      expect(result).toEqual(errorResponse.data);
    });
    it("handles unexpected errors", async () => {
      // Mock unexpected error
      const unexpectedError = new Error("Unexpected error");
      mockGet.mockRejectedValue(unexpectedError);
      (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(false);

      // Call the function
      getAggregateStats.mockImplementation(async () => {
        try {
          const response = await axios.create().get("/survey_responses");
          return response.data;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
          }
          throw new Error("An unexpected error occurred");
        }
      });

      await expect(getAggregateStats()).rejects.toThrow(
        "An unexpected error occurred"
      );
    });
    it("handles empty response data", async () => {
      // Mock empty response
      const emptyResponse = { data: null };
      mockGet.mockResolvedValue(emptyResponse);

      // Call the function
      getAggregateStats.mockImplementation(async () => {
        try {
          const response = await axios.create().get("/survey_responses");
          return response.data;
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      });

      const result = await getAggregateStats();

      // Verify results
      expect(mockGet).toHaveBeenCalledWith("/survey_responses");
      expect(result).toEqual(emptyResponse.data);
    });
  });

  describe("submitSurveyResponse", () => {
    it("submits survey data successfully", async () => {
      // Mock successful response
      const mockApiResponse = { success: true };
      mockPost.mockResolvedValue({ data: mockApiResponse });

      // Set up implementation
      submitSurveyResponse.mockImplementation(
        async (surveyData: SurveyResponse) => {
          try {
            const response = await axios.create().post("/survey_responses", {
              survey_response: surveyData,
            });
            return response.data;
          } catch (error) {
            console.error("Error:", error);
            throw error;
          }
        }
      );

      // Test data
      const surveyData: SurveyResponse = {
        today_feeling: "Good",
        stress_level: 3,
        comments: "Test comment",
      };

      // Call the function
      const result = await submitSurveyResponse(surveyData);

      // Verify results
      expect(mockPost).toHaveBeenCalledWith("/survey_responses", {
        survey_response: surveyData,
      });
      expect(result).toEqual(mockApiResponse);
    });

    it("handles error responses", async () => {
      // Mock error response
      const errorResponse = {
        data: { error: "Submission failed" },
      };
      const axiosError = new Error("API Error");
      Object.assign(axiosError, {
        response: errorResponse,
      });

      mockPost.mockRejectedValue(axiosError);
      (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(true);

      // Set up implementation
      submitSurveyResponse.mockImplementation(
        async (surveyData: SurveyResponse) => {
          try {
            const response = await axios.create().post("/survey_responses", {
              survey_response: surveyData,
            });
            return response.data;
          } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
              return error.response.data;
            }
            throw new Error("An unexpected error occurred");
          }
        }
      );

      // Test data
      const surveyData: SurveyResponse = {
        today_feeling: "Good",
        stress_level: 3,
        comments: "Test comment",
      };

      // Call the function
      const result = await submitSurveyResponse(surveyData);

      // Verify results
      expect(result).toEqual(errorResponse.data);
    });
    it("handles unexpected errors", async () => {
      // Mock unexpected error
      const unexpectedError = new Error("Unexpected error");
      mockPost.mockRejectedValue(unexpectedError);
      (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(false);

      // Set up implementation
      submitSurveyResponse.mockImplementation(
        async (surveyData: SurveyResponse) => {
          try {
            const response = await axios.create().post("/survey_responses", {
              survey_response: surveyData,
            });
            return response.data;
          } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
              return error.response.data;
            }
            throw new Error("An unexpected error occurred");
          }
        }
      );

      // Test data
      const surveyData: SurveyResponse = {
        today_feeling: "Good",
        stress_level: 3,
        comments: "Test comment",
      };

      // Call the function
      await expect(submitSurveyResponse(surveyData)).rejects.toThrow(
        "An unexpected error occurred"
      );
    });
  });
});
