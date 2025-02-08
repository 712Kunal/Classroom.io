import { useState, useEffect } from "react";
import { FaInstagram, FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaPhoneAlt, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import * as Accordion from '@radix-ui/react-accordion';


export function ProfileImageAndInfo({ user }) {
  return (
    <div className="sm:p-6 sm:rounded-lg sm:shadow-md sm:shadow-gray-300 sm:rounded-xl p-0 shadow-none lg:p-8 lg:rounded-2xl lg:shadow-xl lg:shadow-gray-500 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-center">
        <div className="flex justify-center items-center mb-4 sm:mb-0 sm:w-1/3">
          <div className="w-auto sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full sm:border-2 sm:border-gray-200 overflow-hidden flex justify-center items-center">
            <img
              src={user.avatar || '/defaultAvatar.png'}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="sm:w-2/3 sm:ml-6 text-center sm:text-left">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">{user.FullName}</h2>
          <p className="text-base font-medium text-gray-700 mt-1">{user.username}</p>
          <SocialLinks user={user} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white"> Bio</h3>
          <p className="mt-2 text-sm text-gray-600">{user.Bio}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact</h3>

          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/50 rounded-full hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-500 hover:to-pink-500 transition-all duration-300">
            <FaPhoneAlt className="w-5 h-5" />
            <span>{user.Contact_No}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/50 rounded-full hover:bg-gradient-to-r hover:from-teal-400 hover:via-green-500 hover:to-yellow-500 transition-all duration-300">
            <FaEnvelope className="w-5 h-5" />
            <span>{user.email}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
export function SocialLinks({ user }) {
  if (!user.SocialLinks) return null;

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4">
        {user.SocialLinks.LinkedIn && (
          <a
            href={user.SocialLinks.LinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/50 rounded-full hover:bg-transparent dark:hover:bg-transparent transition-colors duration-200 hover:shadow-md hover:shadow-blue-400/50 dark:hover:shadow-blue-600/50"
          >
            <FaLinkedin className="w-6 h-6" />
            <span className="hidden md:inline">LinkedIn</span>
          </a>
        )}
        {user.SocialLinks.Github && (
          <a
            href={user.SocialLinks.Github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/50 rounded-full hover:bg-transparent dark:hover:bg-transparent transition-colors duration-200 hover:shadow-md hover:shadow-gray-500/50 dark:hover:shadow-gray-700/50"
          >
            <FaGithub className="w-6 h-6" />
            <span className="hidden md:inline">GitHub</span>
          </a>
        )}
        {user.SocialLinks.Instagram && (
          <a
            href={user.SocialLinks.Instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/50 rounded-full hover:bg-transparent dark:hover:bg-transparent transition-colors duration-200 hover:shadow-md hover:shadow-pink-500/50 dark:hover:shadow-pink-700/50"
          >
            <FaInstagram className="w-6 h-6" />
            <span className="hidden md:inline">Instagram</span>
          </a>
        )}
        {user.SocialLinks.Twitter && (
          <a
            href={user.SocialLinks.Twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/50 rounded-full hover:bg-transparent dark:hover:bg-transparent transition-colors duration-200 hover:shadow-md hover:shadow-blue-400/50 dark:hover:shadow-blue-600/50"
          >
            <FaTwitter className="w-6 h-6" />
            <span className="hidden md:inline">Twitter</span>
          </a>
        )}
        {user.SocialLinks.Portfolio && (
          <a
            href={user.SocialLinks.Portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/50 rounded-full hover:bg-transparent dark:hover:bg-transparent transition-colors duration-200 hover:shadow-md hover:shadow-green-500/50 dark:hover:shadow-green-700/50"
          >
            <FaGlobe className="w-6 h-6" />
            <span className="hidden md:inline">Portfolio</span>
          </a>
        )}
      </div>
    </div>
  );
}


function BackgroundEducation({ user }) {
  const [open, setOpen] = useState({
    "field-of-study": false,
    degree: false,
    "years-of-experience": false,
    location: false,
    occupation: false,
  });

  const handleToggle = (item) => {
    setOpen((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const renderAccordionItem = (label, valueKey, colorClass, labelText) => {
    const value = user.Background[valueKey];
    return value ? (
      <Accordion.Item value={valueKey}>
        <Accordion.Header>
          <Accordion.Trigger
            className={`flex rounded-lg justify-between items-center w-full text-lg font-semibold p-4 border-b border-gray-300 dark:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50 dark:hover:shadow-indigo-700/50 hover:ring-4 hover:ring-${colorClass}/50 dark:hover:ring-${colorClass}-600/50 hover:ring-opacity-50`}
            onClick={() => handleToggle(valueKey)}
          >
            {label}
            <span className="ml-2">
              {open[valueKey] ? (
                <FaChevronUp size={20} />
              ) : (
                <FaChevronDown size={20} />
              )}
            </span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <div className="flex rounded-lg justify-between items-center p-4 text-lg text-gray-700 dark:text-white">
            <strong className="text-base font-medium text-gray-600 dark:text-gray-400">
              {labelText}:
            </strong>
            <span className="text-base">{value}</span>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    ) : null;
  };

  return (
    <Accordion.Root collapsible>
      {renderAccordionItem(
        "Academic Background",
        "Field_Of_Study",
        "indigo",
        "Field of Study"
      )}

      {renderAccordionItem("Qualifications", "Degree", "green", "Degree")}

      {renderAccordionItem(
        "Experience Level",
        "Years_Experience",
        "red",
        "Years of Experience"
      )}

      {renderAccordionItem("Location", "Location", "purple", "Location")}

      {renderAccordionItem("Occupation", "Occupation", "teal", "Occupation")}
    </Accordion.Root>
  );
}
// Achievements
export function Achievements({ user }) {
  return (
    <div className="sm:p-6 sm:rounded-lg sm:shadow-md sm:shadow-gray-300 sm:rounded-xl p-0 shadow-none lg:p-8 lg:rounded-2xl lg:shadow-xl lg:shadow-gray-500 transition-all duration-300 
    lg:hover:shadow-[10px_10px_20px_0px_rgba(0,0,0,0.3)] lg:hover:shadow-[10px_10px_20px_0px_rgba(0,0,0,0.5)] dark:lg:hover:shadow-[10px_10px_20px_0px_rgba(255,255,255,0.5)] dark:lg:hover:shadow-[10px_10px_20px_0px_rgba(255,255,255,0.7)]">
      <h3 className="text-xl font-semibold mb-6">Achievements</h3>
      <div className="flex items-center space-x-4 mb-6">
        <p className="text-lg text-gray-600"><strong>Points:🪙</strong> {user.pointsAwarded}</p>
      </div>

      <div className="mb-6">
        {user.badgesAwarded.length === 0 ? (
          <p className="text-lg text-gray-600 text-center">No badges awarded yet. Keep up the good work!</p>
        ) : (
          <div className="flex justify-center space-x-6 flex-wrap">
            {user.badgesAwarded.map((badge, index) => (
              <div
                key={badge}  
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-21 md:h-21 lg:w-22 lg:h-22 xl:w-25 xl:h-25 relative overflow-hidden transform transition duration-300 ease-in-out hover:scale-110 hover:rotate-6 mb-4"
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                }}
              >
                <img
                  src={badge}
                  alt={`badge-${index}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-transparent transition-all duration-300 opacity-0 hover:opacity-100 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.5)] hover:shadow-indigo-500/50 dark:hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.7)] dark:hover:shadow-purple-500/70">
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Skills
export function SkillsAndHobbies({ user }) {
  const [itemColors, setItemColors] = useState({
    skills: {},
    hobbies: {},
    interests: {},
  });

  const randomColor = () => {
    const colors = [
      'bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300',
      'bg-green-100', 'bg-green-200', 'bg-green-300',
      'bg-blue-100', 'bg-blue-200', 'bg-blue-300',
      'bg-purple-100', 'bg-purple-200', 'bg-purple-300',
      'bg-red-100', 'bg-red-200', 'bg-red-300',
      'bg-indigo-100', 'bg-indigo-200', 'bg-indigo-300'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const randomGradient = () => {
    const colors = [
      'from-yellow-100 via-yellow-300 to-yellow-500',
      'from-green-100 via-green-300 to-green-500',
      'from-blue-100 via-blue-300 to-blue-500',
      'from-purple-100 via-purple-300 to-purple-500',
      'from-red-100 via-red-300 to-red-500',
      'from-indigo-100 via-indigo-300 to-indigo-500',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getItemColor = (item, section) => {
    if (!itemColors[section][item]) {
      setItemColors((prevColors) => ({
        ...prevColors,
        [section]: {
          ...prevColors[section],
          [item]: randomColor(),
        },
      }));
    }
    return itemColors[section][item] || randomColor();
  };

  useEffect(() => {
    const initializeItemColors = () => {
      const newColors = {
        skills: {},
        hobbies: {},
        interests: {},
      };

      user.Background.Skills.forEach(skill => {
        newColors.skills[skill.text] = randomColor();
      });

      user.Background.Hobbies.forEach(hobby => {
        newColors.hobbies[hobby.text] = randomColor();
      });

      user.Background.Interests.forEach(interest => {
        newColors.interests[interest.text] = randomColor();
      });

      setItemColors(newColors);
    };

    initializeItemColors();
  }, [user.Background]);

  const getColorClass = (item, type) => {
    const baseClasses = "h-8 px-3 w-max flex gap-2 items-center rounded-full focus:text-white focus:bg-opacity-75 active:bg-opacity-90 dark:text-gray-300 dark:active:bg-gray-600";
    const colorMap = {
      skills: {
        JavaScript: "bg-yellow-200 text-yellow-700 hover:bg-yellow-400",
        Node: "bg-green-200 text-green-700 hover:bg-green-400",
        AI: "bg-indigo-200 text-indigo-700 hover:bg-indigo-400",
        Coding: "bg-blue-200 text-blue-700 hover:bg-blue-400",
        Reading: "bg-purple-200 text-purple-700 hover:bg-purple-400",
      },
      hobbies: {
        Reading: "bg-purple-200 text-purple-700 hover:bg-purple-400",
        Gaming: "bg-red-200 text-red-700 hover:bg-red-400",
        Sports: "bg-green-200 text-green-700 hover:bg-green-400",
      },
      interests: {
        Music: "bg-blue-200 text-blue-700 hover:bg-blue-400",
        Travel: "bg-orange-200 text-orange-700 hover:bg-orange-400",
        Art: "bg-pink-200 text-pink-700 hover:bg-pink-400",
      }
    };

    const category = type.toLowerCase();
    return `${colorMap[category]?.[item] || "bg-gray-200 text-gray-700 hover:bg-gray-400"} ${baseClasses}`;
  };

  return (
    <div className="sm:p-6 sm:rounded-lg sm:shadow-md sm:shadow-gray-300 sm:rounded-xl p-0 shadow-none lg:p-8 lg:rounded-2xl lg:shadow-xl lg:shadow-gray-500 transition-all duration-300 
    hover:shadow-none sm:hover:shadow-[0_4px_10px_0px_rgba(0,0,0,0.3)] sm:hover:shadow-[0_4px_10px_0px_rgba(0,0,0,0.5)]
    dark:sm:hover:shadow-[0_4px_10px_0px_rgba(255,255,255,0.5)] dark:sm:hover:shadow-[0_4px_10px_0px_rgba(255,255,255,0.7)]">
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills & Hobbies</h3>

      <div className={`mb-6 p-4 rounded-lg ${randomGradient()}`}>
        <p className="text-lg text-gray-600 mb-4"><strong>Skills:</strong></p>
        <div className="flex gap-6 flex-wrap">
          {user.Background.Skills.map((skill) => (
            <div
              key={skill.id}
              draggable="true"
              role="button"
              title="Hover chip"
              className={`${getItemColor(skill.text, "skills")} h-8 px-3 w-max flex gap-2 items-center dark:text-black rounded-full transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_15px_5px_rgba(0,0,0,0.2)] hover:shadow-indigo-500/50 dark:hover:shadow-purple-500/70`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                <path d="M12.293 4.293a1 1 0 0 1 1.414 1.414L7.707 11.707a1 1 0 0 1-1.414 0L3.293 8.707a1 1 0 0 1 1.414-1.414L7 9.586l5.293-5.293z" />
              </svg>
              <span className="block text-sm font-medium">{skill.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hobbies Section */}
      <div className="mb-6">
        <p className="text-lg text-gray-600 mb-4"><strong>Hobbies:</strong></p>
        <div className="flex gap-4 flex-wrap">
          {user.Background.Hobbies.map((hobby) => (
            <div
              key={hobby.id}
              draggable="true"
              role="button"
              title="Hover chip"
              className={`${getItemColor(hobby.text, "hobbies")} h-8 px-3 w-max flex gap-2 items-center dark:text-black rounded-full transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_15px_5px_rgba(0,0,0,0.2)] hover:shadow-indigo-500/50 dark:hover:shadow-purple-500/70`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                <path d="M8 12s3-2.27 5-4.428C14 5.657 11.623 4 8 4c-3.623 0-6 1.657-5 3.572C5 9.73 8 12 8 12z" />
              </svg>
              <span className="block text-sm font-medium">{hobby.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interests Section */}
      <div className="mb-6">
        <p className="text-lg text-gray-600 mb-4"><strong>Interests:</strong></p>
        <div className="flex gap-4 flex-wrap">
          {user.Background.Interests.map((interest) => (
            <div
              key={interest.id}
              draggable="true"
              role="button"
              title="Hover chip"
              className={`${getItemColor(interest.text, "interests")} h-8 px-3 w-max flex gap-2 items-center dark:text-black rounded-full transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_15px_5px_rgba(0,0,0,0.2)] hover:shadow-indigo-500/50 dark:hover:shadow-purple-500/70`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lightbulb" viewBox="0 0 16 16">
                <path d="M8 1a3 3 0 0 0-3 3c0 1.602.747 3.3 2.052 4.579a4.495 4.495 0 0 1-2.275 2.38C3.036 11.963 2 13.457 2 14h12c0-.543-1.036-2.037-2.802-2.441a4.495 4.495 0 0 1-2.275-2.38C10.253 7.3 11 5.602 11 4a3 3 0 0 0-3-3zM8 5a2 2 0 1 1 2-2 2 2 0 0 1-2 2z" />
              </svg>
              <span className="block text-sm font-medium">{interest.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// Profile (Main Component)

export default function Profile({ user }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {console.log(user)}
      <div className=" mt-10 grid gap-6 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
        <ProfileImageAndInfo user={user} />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <BackgroundEducation user={user} />

        <div className="container mx-auto sm:w-full lg:w-auto">
          <Achievements user={user} />
        </div>

        <div className="col-span-1 md:col-span-2">
          <SkillsAndHobbies user={user} />
        </div>
      </div>
    </div>
  );
}
