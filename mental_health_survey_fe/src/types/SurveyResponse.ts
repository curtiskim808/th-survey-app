interface SurveyResponse {
  today_feeling: string;
  stress_level: number;
  comments: string;
}

interface ApiResponse {
  message: string;
  data?: {
    [x: string]: number;
    id: number;
  };
  errors?: string[];
}

export type { SurveyResponse, ApiResponse };
