/* 
Generate a {duration}-day learning pathway for {topic} tailored to a {age}-year-old {gender} {occupation} studying {fieldOfStudy} in {location}. The user prefers {preferredLearningMaterialType} for learning. The pathway should be structured with {intervalsType} intervals.

User Details:

Age: {age}
Gender: {gender}
Field of Study: {fieldOfStudy}
Degree: {degree}
Years of Experience: {yearsOfExperience}
Location: {location}
Occupation: {occupation}
Languages Known: {languagesKnown}
Learning Pathway Requirements:

Topic: {topic}
Duration: {duration}
Intervals Type: {intervalsType}
Preferred Learning Material Type: {preferredLearningMaterialType}
Additional Information:

Skills: {skills}
Hobbies: {hobbies}
Interests: {interests}

*/

const promptRequirementsKeys = [
  'topic',
  'duration',
  'intervalsType',
  'preferredLearningMaterialType',
  'age',
  'gender',
  'fieldOfStudy',
  'degree',
  'yearsOfExperience',
  'location',
  'occupation',
  'languagesKnown',
  'skills',
  'hobbies',
  'interests'
]

export const formulatePrompt = (
  promptRequirements
) => {
  const {
    topic,
    duration,
    intervalsType,
    preferredLearningMaterialType,
    age,
    gender,
    fieldOfStudy,
    degree,
    yearsOfExperience,
    location,
    occupation,
    languagesKnown,
    skills,
    hobbies,
    interests
  } = promptRequirements;
  
  for(let key of promptRequirementsKeys) {
    if(!promptRequirements[key]) {
      throw new Error(`Prompt requirement ${key} is missing`);
    }
  }

  const prompt = `
    Generate a ${duration}-days learning pathway for ${topic} tailored to a ${age}-year-old ${gender} ${occupation} studying ${fieldOfStudy} in ${location}. The user prefers ${preferredLearningMaterialType} for learning. The pathway should be structured with ${intervalsType} intervals.\n
    
    User Details:\n
    Age: ${age}\n
    Gender: ${gender}\n
    Field of Study: ${fieldOfStudy}\n
    Degree: ${degree}\n
    Years of Experience: ${yearsOfExperience}\n
    Location: ${location}\n
    Occupation: ${occupation}\n
    Languages Known: ${languagesKnown}\n

    Learning Pathway Requirements:\n
    Topic: ${topic}\n
    Duration: ${duration}\n
    Intervals Type: ${intervalsType}\n
    Preferred Learning Material Type: ${preferredLearningMaterialType}\n

    Additional Information:\n
    Skills: ${skills}\n
    Hobbies: ${hobbies}\n
    Interests: ${interests}\n
  `;

  return prompt;
}