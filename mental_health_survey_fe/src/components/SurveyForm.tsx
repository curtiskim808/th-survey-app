import { useState } from "react";
import { useForm, useWatch, type Control } from "react-hook-form";

import type { SurveyResponse, ApiResponse } from "../types/SurveyResponse";
import { submitSurveyResponse } from "../services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";

interface FormData {
  today_feeling: string;
  stress_rate: number;
  comments: string;
}

function StressLevelWatched({ control }: { control: Control<FormData> }) {
  const stressLevel = useWatch({
    control,
    name: "stress_rate",
    defaultValue: 3,
  });

  return (
    <div className="text-sm text-gray-500 mt-1">
      <span>Stress Level: {stressLevel}</span>
    </div>
  );
}

export default function SurveyForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const surveyResponse: SurveyResponse = {
        today_feeling: data.today_feeling,
        stress_level: data.stress_rate,
        comments: data.comments,
      };

      const response: ApiResponse = await submitSurveyResponse(surveyResponse);

      if (response.data) {
        setSubmitted(true);
      } else {
        setError("Failed to submit the form. Please try again.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError("Failed to submit the form. Please try again. " + err.message);
      } else {
        setError("Failed to submit the form. Please try again.");
      }
    }
  };

  if (submitted) {
    return (
      <div className="text-green-600 font-semibold text-2xl text-center">
        Your survey has been submitted successfully!
      </div>
    );
  }
  return (
    <div className="px-8 py-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Mental Health Survey</CardTitle>
          <CardDescription className="text-m text-gray-500">
            Please answer the following questions honestly. Your responses are
            anonymous and will be kept confidential.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error ? (
            <Alert className="mb-4 bg-red-50">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="today_feeling"
                className="block text-m font-medium bg-gray-100"
              >
                How are you feeling today?
              </label>
              <textarea
                id="today_feeling"
                {...register("today_feeling", {
                  required: "This field is required",
                })}
                className="mt-2 block w-full border-gray-200 border-5 rounded-md shadow-sm py-2 px-3"
              />
              {errors.today_feeling && (
                <p className="text-red-500 text-sm">
                  {errors.today_feeling.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="stress_rate"
                className="block text-m font-medium bg-gray-100"
              >
                Rate your stress level (1-5)
              </label>
              <StressLevelWatched control={control} />
              <input
                id="stress_rate"
                type="range"
                min={1}
                max={5}
                step={0.2}
                {...register("stress_rate", {
                  required: "This field is required",
                })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />

              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
              {errors.stress_rate && (
                <p className="text-red-500 text-sm">
                  {errors.stress_rate.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="comments"
                className="block text-m font-medium bg-gray-100"
              >
                Any comments?
              </label>
              <textarea
                id="comments"
                {...register("comments")}
                className="mt-2 block w-full border-gray-200 border-5 rounded-md shadow-sm py-2 px-3"
              />
              {errors.comments && (
                <p className="text-red-500 text-sm">
                  {errors.comments.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Submit Survey
            </button>
          </form>
        </CardContent>

        <CardFooter className="text-sm text-gray-500">
          <p>
            This information is collected for research purposes and to improve
            our mental health services. Your data is encrypted and stored
            securely.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
