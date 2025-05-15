import "./App.css";
import SurveyForm from "./components/SurveyForm";
import SurveyStatsCard from "./components/SurveyStatsCard";

function App() {
  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-3xl font-bold text-center my-8">
        Mental Health Survey System
      </h1>
      <div className="grid">
        <div className="md:col-span-12">
          <SurveyForm />
        </div>

        <div className="md:col-span-12">
          <SurveyStatsCard />
        </div>
      </div>
    </div>
  );
}

export default App;
