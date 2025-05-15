import axios from "axios";
import type { SurveyResponse, ApiResponse } from "../types/SurveyResponse";
const API_URL = `${process.env.API_URL}/api/v1`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitSurveyResponse = async (
  surveyResponse: SurveyResponse
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>("/survey_responses", {
      survey_response: surveyResponse,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as ApiResponse;
    }
    throw new Error("An unexpected error occurred");
  }
};

// Get aggregate statistics
export const getAggregateStats = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get("/survey_responses");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};
