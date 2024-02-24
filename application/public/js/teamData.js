// Purpose: To store the team members' data.
// Team members' data includes their name, role, bio, and image.
// The image path is stored in a constant variable for easy access.
// The teamData object is exported to be used in other files.

const teamInfo = [
   {
      name: "Utku Tarhan",
      role: "Team Lead",
      bio: "Utku is a student in San Francisco State University, majoring in Computer Science. Utku is focused developing projects in Swift, C and Python. Utku spends his free time listening to music, playing computer games and watching movies. He is extremely excited about emerging technologies and new fields in tech industry.",
      image: "profile-utku.jpg"
   },
  {
      name: "Akram Alraeeini",
      role: "GitHub Master",
      bio: "Akram is a senior CS student at San Francisco State University. He's passionate about software development, UX design," + 
      "and AI. In his free time, Akram like reading books and watching European Soccer.",
      image: "profile-akram.jpg"
   },
    {
      name: "Mohammed Mohamed",
      role: "Frontend Lead",
      bio: "",
      image: "https://placehold.co/600x400"
    },
    {
      name: "Jacob Gerales",
      role: "Backend Lead",
      bio: "",
      image: "profile-mohammed.jpg"
    },
   {
      name: "Eliza Ouyang",
      role: "Backend Support",
      bio: "",
      image:  "profile-eliza.jpg"
   },
   {
      name: "Cesar A. Herrera",
      role: "Frontend Support",
      bio: 'Cesar is a student at San Francisco State University, majoring in computer science. He devotes his time to academic endeavors while also valuing his family. With a strong interest in fitness and health, he emphasizes the importance of well-being, believing "What is the point of having it all when you don\'t have health." Post-graduation from SFSU, he plans to pursue further studies in artificial intelligence.',
      image:"profile-cesar.jpg"
   },
];

export default teamInfo;

