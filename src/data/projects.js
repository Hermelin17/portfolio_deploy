const projects = [
  {
    id: 1,
    title: "Real-time gaussian splatter (WIP)",
    description:
      "Master thesis at Voysys. Implementation of a real-time gaussian splatter algorithm in C++ using OpenGL and CUDA.",
    tags: ["C++", "OpenGL", "CUDA", "Python"],
    color: "#b85f33",
    link: "#",
    images: [
      { src: "/Images/GS/splat.png", caption: "Final splat" },
      { src: "/Images/GS/pc.png", caption: "Point cloud visualization" },
      { src: "/Images/GS/video.webm", caption: "Video showing the algorithm in action" },
    ],
  },
  {
    id: 2,
    title: "Spellsword adventure",
    description: "A 3D first person rougelike game where you play as Warrior, Ranger or Mage and your goal is to survive as long as possible developed in Unity. Third place finalist in LiU game awards 2025.",
    tags: ["Unity", "C#", "Game Design"],
    color: "#316b35",
    link: "https://www.youtube.com/watch?v=FMvPy1sN9X8",
    images: [
      { src: "/Images/SSA/Gameplay.png", caption: "In game gameplay" },
      { src: "/Images/SSA/Upgrade.png", caption: "Player leveling up" },
      { src: "/Images/SSA/Warrior.png", caption: "Warrior class" },
      { src: "/Images/SSA/Ranger.png", caption: "Ranger class" },
      { src: "/Images/SSA/Mage.png", caption: "Mage class" },
    ],
  },
  {
    id: 3,
    title: "React website for card game",
    description:
      "A React website for a card game where you can create your own decks and play against other players. Developed in React and Node.js.",
    tags: ["React", "Node.js", "Firebase"],
    color: "#2a3b91",
    link: "https://github.com/TeoHedelin/Card-Game",
    images: [
      { src: "/Images/Awebb/Start.png", caption: "Start page with dynamic background of unlocked cards" },
      { src: "/Images/Awebb/samling.png", caption: "Page to see collected cards and unlock new cards" },
      { src: "/Images/Awebb/profil.png", caption: "Profile page with user information" },
    ],
  },
  {
    id: 4,
    title: "React component for credit card input",
    description:
      "A React component for credit card input. Developed in React and Node.js.",
    tags: ["React", "Node.js"],
    color: "#7d2a91",
    link: "https://github.com/TeoHedelin/Credit-Card-Input",
    images: [
      { src: "/Images/kort/start.png", caption: "Empty form", tall: true },
      { src: "/Images/kort/input.png", caption: "Filled card information, logo in top right corner changes depending on card manufacturer", tall: true },
      { src: "/Images/kort/flip.mov", caption: "Credit card flipping animation", tall: true },
    ],
  },
  {
    id: 5,
    title: "Information visualization project",
    description:
      "Visualization of star wars characters and their interactions.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "#b0ad4a",
    link: "https://github.com/TeoHedelin/Credit-Card-Input",
    images: [
      { src: "/Images/starwars/anakin.png", caption: "Hovering over Anakin node shows information about the character" },
      { src: "/Images/starwars/AniObi.png", caption: "Hovering over the line between Anakin and Obi-Wan shows the number of interactions between the characters" },
      { src: "/Images/starwars/starwarsmov.mov", caption: "Video showing the nodes interacting with each other" },
    ],
  },
];

export default projects;
