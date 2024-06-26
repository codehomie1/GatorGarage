// Purpose: To store the team members' data.
// Team members' data includes their name, role, bio, and image.
// The image path is stored in a constant variable for easy access.
// The teamData object is exported to be used in other files.


const teamInfo = [
   {
      id:1,
      name: "Utku Tarhan",
      role: "Team Lead",
      bio: "Utku is a student in San Francisco State University, majoring in Computer Science. Utku is focused developing projects in Swift, C and Python. Utku spends his free time listening to music, playing computer games and watching movies. He is extremely excited about emerging technologies and new fields in tech industry.",
      type: '.png'
   },
  {
      id:2,
      name: "Akram Alraeeini",
      role: "GitHub Master",
      bio: "Akram is a senior CS student at San Francisco State University. He's passionate about software development, UX design," + 
      "and AI. In his free time, Akram likes reading books and watching European Soccer.",
      type: '.png'
   },
    {
      id:3,
      name: "Mohammed Mohamed",
      role: "Frontend Lead",
      bio: "Mohammed is a senior Computer Science major at SFSU. He enjoys software development, problem solving and teamwork." +
      " In his free time you can find him playing sports, going to the gym, or hanging out with family and friends.",
      type: '.jpg'
    },
    {
      id:4,
      name: "Jacob Gerales",
      role: "Backend Lead",
      bio: "Jacob is a senior at San Francisco State University majoring in computer science. He has an interest in Cybersecurity and hopes to pursue it professionally, whether that be in military service or for a private company. Jacob likes to go to the gym and discover new music in his spare time.",
      type: '.jpg'
   },
   {
      id:5,
      name: "Eliza Ouyang",
      role: "Backend Support",
      bio: "Eliza is a student at San Francisco State University majoring in computer science. She enjoys art and playing games in her free time.",
      type: '.jpg'
   },
   {
      id:6,
      name: "Cesar A. Herrera",
      role: "Frontend Support",
      bio: 'Cesar is a student at San Francisco State University, majoring in computer science. He devotes his time to academic endeavors while also valuing his family. With a strong interest in fitness and health, he emphasizes the importance of well-being, believing "What is the point of having it all when you don\'t have health." Post-graduation from SFSU, he plans to pursue further studies in artificial intelligence.',
      type: '.jpg'
   },
];

module.exports = teamInfo;

