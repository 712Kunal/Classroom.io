// Profile.jsx
export default function Profile({ user }) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="flex items-center space-x-6 border-b pb-6">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-32 h-32 rounded-full border-2 border-gray-200"
          />
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">{user.FullName}</h2>
            <p className="text-sm text-gray-500">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
  
        {/* Bio and Contact */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <p className="text-lg text-gray-900"><strong>Contact No:</strong> {user.Contact_No}</p>
            <p className="text-lg text-gray-900"><strong>Bio:</strong> {user.Bio}</p>
          </div>
        </div>
  
        {/* Date of Birth and Gender */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <p className="text-lg text-gray-900"><strong>Date of Birth:</strong> {user.DOB}</p>
            <p className="text-lg text-gray-900"><strong>Gender:</strong> {user.Gender}</p>
          </div>
        </div>
  
        {/* Social Links */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">Social Links</h3>
            <ul className="list-disc pl-5 mt-2 text-gray-600">
              {user.SocialLinks.Instagram && <li><a href={user.SocialLinks.Instagram} target="_blank" className="text-blue-600">Instagram</a></li>}
              {user.SocialLinks.Github && <li><a href={user.SocialLinks.Github} target="_blank" className="text-gray-700">GitHub</a></li>}
              {user.SocialLinks.LinkedIn && <li><a href={user.SocialLinks.LinkedIn} target="_blank" className="text-blue-700">LinkedIn</a></li>}
              {user.SocialLinks.Twitter && <li><a href={user.SocialLinks.Twitter} target="_blank" className="text-blue-500">Twitter</a></li>}
              {user.SocialLinks.Portfolio && <li><a href={user.SocialLinks.Portfolio} target="_blank" className="text-gray-900">Portfolio</a></li>}
            </ul>
          </div>
        </div>
  
        {/* Background Information */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">Background</h3>
            <p className="text-lg text-gray-900"><strong>Field of Study:</strong> {user.Background.Field_Of_Study}</p>
            <p className="text-lg text-gray-900"><strong>Degree:</strong> {user.Background.Degree}</p>
            <p className="text-lg text-gray-900"><strong>Years of Experience:</strong> {user.Background.Years_Experience}</p>
            <p className="text-lg text-gray-900"><strong>Location:</strong> {user.Background.Location}</p>
            <p className="text-lg text-gray-900"><strong>Occupation:</strong> {user.Background.Occupation}</p>
            <p className="text-lg text-gray-900"><strong>Languages Known:</strong> {user.Background.LanguagesKnown.join(', ')}</p>
            <p className="text-lg text-gray-900"><strong>Preferred Learning Style:</strong> {user.Background.preferredLearningStyle.join(', ')}</p>
            <p className="text-lg text-gray-900"><strong>Skills:</strong> {user.Background.Skills.join(', ')}</p>
            <p className="text-lg text-gray-900"><strong>Hobbies:</strong> {user.Background.Hobbies.join(', ')}</p>
            <p className="text-lg text-gray-900"><strong>Interests:</strong> {user.Background.Interests.join(', ')}</p>
          </div>
        </div>
  
        {/* Achievements (Points and Badges) */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">Achievements</h3>
            <p className="text-lg text-gray-900"><strong>Points Awarded:</strong> {user.pointsAwarded}</p>
            <p className="text-lg text-gray-900"><strong>Badges Awarded:</strong> {user.badgesAwarded.join(', ')}</p>
            <p className="text-lg text-gray-900"><strong>Badge Dates:</strong> {user.badgesAwardedDates.join(', ')}</p>
          </div>
        </div>
      </div>
    );
  }
  