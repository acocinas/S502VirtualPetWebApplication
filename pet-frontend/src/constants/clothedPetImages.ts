import conejoCasual from '../assets/pets/conejo_casual.png';
import conejoSport from '../assets/pets/conejo_sport.png';
import pollitoCasual from '../assets/pets/pollito_casual.png';
import pollitoSport from '../assets/pets/pollito_sport.png';

export const clothedPetImages: Record<string, Record<string, string>> = {
  FRONTEND: {
    SOCIAL_ZONE: conejoCasual,
    WORKSPACE: conejoCasual,
    WELLNESS_ZONE: conejoSport,
  },
  BACKEND: {
    SOCIAL_ZONE: pollitoCasual,
    WORKSPACE: pollitoCasual,
    WELLNESS_ZONE: pollitoSport,
  },
};

