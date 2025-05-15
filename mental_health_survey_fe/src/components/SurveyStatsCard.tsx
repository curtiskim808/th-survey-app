import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { getAggregateStats } from "../services/api";
import type { ApiResponse } from "../types/SurveyResponse";

interface Stats {
  total_responses: number;
  average_stress_level: number;
}

export default function SurveyStatsCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const response: ApiResponse = await getAggregateStats();
      if (!response.data) {
        throw new Error("Failed to fetch statistics");
      }
      setStats({
        total_responses: response.data.total_responses,
        average_stress_level: response.data.average_stress_level,
      });
      setShowStats(true);
    } catch (e) {
      console.log("Error fetching statistics:", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-8 py-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Survey Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          {!showStats ? (
            <div className="text-center">
              <p className="mb-4 text-m">
                View anonymous aggregate statistics from all survey responses.
              </p>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={fetchStats}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "View Statistics"}
              </button>
            </div>
          ) : stats && stats.average_stress_level > 0 ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Total Responses</h3>
                <p className="text-2xl font-bold">{stats.total_responses}</p>
              </div>
              <div>
                <h3 className="font-medium">Average Stress Level</h3>
                <p className="text-2xl font-bold">
                  {stats.average_stress_level.toFixed(2)}/5
                </p>
              </div>
              <button
                className="w-full bg-gray-200 text-black py-2 px-4 rounded-md"
                onClick={() => setShowStats(false)}
              >
                Hide Statistics
              </button>
            </div>
          ) : (
            <>
              <p>No data available</p>
              <button
                className="w-full bg-gray-200 text-black py-2 px-4 rounded-md"
                onClick={() => setShowStats(false)}
              >
                Hide Statistics
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
