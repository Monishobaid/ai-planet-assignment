import React, { useState } from 'react';

interface Challenge {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string;
  level: string;
}

export const AddChallengeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [level, setLevel] = useState('Easy');

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
    const newChallenge: Challenge = {
      id: Date.now().toString(),
      name,
      startDate,
      endDate,
      description,
      image,
      level,
    };

    const storedChallenges = localStorage.getItem('challenges');
    const challenges: Challenge[] = storedChallenges ? JSON.parse(storedChallenges) : [];
    challenges.push(newChallenge);

    localStorage.setItem('challenges', JSON.stringify(challenges));

    // Reset the form
    setName('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setImage('');
    setLevel('Easy');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Challenge Details</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div>
          <label>Challenge Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
          {image && <img src={image} alt="Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
        </div>
        <div>
          <label>Level Type</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <button type="submit">Create Challenge</button>
      </form>
    </div>
  );
};

export default AddChallengeForm;
