import { useState } from 'react';
import axios from 'axios';

interface CatFact {
  fact: string;
}

interface DogImage {
  message: string;
}

type PetData = CatFact | DogImage;

const PetPal: React.FC = () => {
  const [petType, setPetType] = useState<string>('');
  const [petData, setPetData] = useState<PetData | null>(null);

  const fetchPetData = async () => {
    try {
      let apiUrl = '';
      if (petType === 'cat') {
        apiUrl = 'https://catfact.ninja/fact';
      } else if (petType === 'dog') {
        apiUrl = 'https://dog.ceo/api/breeds/image/random';
      }

      const response = await axios.get(apiUrl);
      setPetData(response.data);
    } catch (error) {
      console.error('Error fetching pet data', error);
    }
  };

  return (
    <div>
      <h1>PetPal</h1>
      <label>
        Select a pet:
        <select value={petType} onChange={(e) => setPetType(e.target.value)}>
          <option value="">Select</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
        </select>
      </label>
      <button onClick={fetchPetData}>Get Pet Info</button>

      {petData && (
        <div>
          {petType === 'cat' ? (
            <p>Cat Fact: {(petData as CatFact).fact}</p>
          ) : (
            <img src={(petData as DogImage).message} alt="Random Dog" />
          )}
        </div>
      )}
    </div>
  );
};

export default PetPal;
