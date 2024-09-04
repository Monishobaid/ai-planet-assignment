import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Challenge } from "../../types";

const AddChallengeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the challenge ID from the URL
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [level, setLevel] = useState<"Easy" | "Medium" | "Hard">("Easy");

  useEffect(() => {
    if (id) {
      const storedChallenges = localStorage.getItem("challenges");
      if (storedChallenges) {
        const challengesData: Challenge[] = JSON.parse(storedChallenges);
        const selectedChallenge = challengesData.find(
          (challenge) => challenge.id === Number(id)
        );
        if (selectedChallenge) {
          setTitle(selectedChallenge.title);
          setStartDate(selectedChallenge.startDate);
          setEndDate(selectedChallenge.endDate);
          setDescription(selectedChallenge.description);
          setImage(selectedChallenge.image);
          setLevel(selectedChallenge.level);
        }
      }
    }
  }, [id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const updatedChallenge: Challenge = {
      id: Number(id),
      title,
      startDate,
      endDate,
      description,
      image,
      level,
    };

    const storedChallenges = localStorage.getItem("challenges");
    let challenges: Challenge[] = storedChallenges
      ? JSON.parse(storedChallenges)
      : [];

    if (id) {
      // Update existing challenge
      challenges = challenges.map((challenge) =>
        challenge.id === updatedChallenge.id ? updatedChallenge : challenge
      );
    } else {
      // Add new challenge
      challenges.push(updatedChallenge);
    }

    localStorage.setItem("challenges", JSON.stringify(challenges));
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {id ? "Edit Challenge" : "Add Challenge"}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Challenge Name
          </label>
          <input
            type="text"
            id="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={4}
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>
        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700"
          >
            Difficulty Level
          </label>
          <select
            id="level"
            value={level}
            onChange={(e) =>
              setLevel(e.target.value as "Easy" | "Medium" | "Hard")
            }
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {id ? "Update Challenge" : "Add Challenge"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddChallengeForm;
