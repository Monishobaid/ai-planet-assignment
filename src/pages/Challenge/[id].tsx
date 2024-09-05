import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import { Challenge } from "../../types";

const ChallengeOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = React.useState<Challenge | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedChallenges = localStorage.getItem("challenges");
    if (storedChallenges) {
      const challengesData: Challenge[] = JSON.parse(storedChallenges);
      const selectedChallenge = challengesData.find(
        (challenge) => challenge.id === Number(id)
      );
      setChallenge(selectedChallenge || null);
    }
  }, [id]);

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  const handleEditClick = () => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = () => {
    const storedChallenges = localStorage.getItem("challenges");
    if (storedChallenges) {
      let challengesData: Challenge[] = JSON.parse(storedChallenges);
      challengesData = challengesData.filter(
        (challenge) => challenge.id !== Number(id)
      );
      localStorage.setItem("challenges", JSON.stringify(challengesData));
      navigate("/");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-yellow-200 text-black p-2 rounded mb-4 inline-block">
          <Clock className="inline-block mr-2" size={16} />
          Starts on{" "}
          {new Date(challenge.startDate).toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}{" "}
          (India Standard Time)
        </div>

        <h1 className="text-4xl font-bold mb-4">{challenge?.title}</h1>

        <p className="mb-4">{challenge?.description}</p>

        <span className="bg-white text-black px-3 py-1 rounded-full text-sm">
          {challenge.level}
        </span>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">{challenge?.description}</p>
        </div>

        <div className="mt-8 flex justify-end">
          {challenge.status !== "Past" && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded mr-2"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
          <button
            className="border border-red-500 text-red-500 px-4 py-2 rounded"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChallengeOverview;
