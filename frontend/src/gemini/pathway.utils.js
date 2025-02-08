import { generatePathway } from './gemini.service';
import { formulatePrompt } from './prompt.utils';

const createPathway = async (userId, userDetails, additionalInfo, pathwayRequirements) => {
  const promptRequirements = {
    topic: pathwayRequirements.topic,
    duration: pathwayRequirements.duration,
    intervalsType: pathwayRequirements.intervalsType,
    preferredLearningMaterialType: pathwayRequirements.preferredLearningMaterialType,
    age: userDetails.age,
    gender: userDetails.gender,
    fieldOfStudy: userDetails.fieldOfStudy,
    degree: userDetails.degree,
    yearsOfExperience: userDetails.yearsOfExperience,
    location: userDetails.location,
    occupation: userDetails.occupation,
    languagesKnown: userDetails.languagesKnown,
    skills: additionalInfo.skills,
    hobbies: additionalInfo.hobbies,
    interests: additionalInfo.interests
  };
  const prompt = formulatePrompt(promptRequirements);
  const { pathwayId } = await generatePathway(userId, prompt);
  return { pathwayId };
};

export { createPathway };
