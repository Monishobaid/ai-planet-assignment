import { Challenge } from "../types";
import image1 from "/src/assets/cardimage/Group 1000002466.png";
import image2 from "/src/assets/cardimage/Group 1000002766.png";
import image3 from "/src/assets/cardimage/Group 1000002767.png";
import image4 from "/src/assets/cardimage/Group 1000002771.png";
import image5 from "/src/assets/cardimage/Group 1000002772.png";
import image6 from "/src/assets/cardimage/Group 1000002773.png";
import NoteBook from "../assets/icons/carbon_notebook-reference.svg";
import ChallengeSvg from "../assets/icons/Robot.svg";
import Community from "../assets/icons/Vector.svg";
import Recognition from "../assets/icons/IdentificationCard.svg";

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Data Science Bootcamp - Graded Datathon",
    image: image1,
    description:
      "This is a graded datathon for the Data Science Bootcamp participants.",
    startDate: "2024-09-10",
    endDate: "2024-09-12",
    level: "Medium",
  },
  {
    id: 2,
    title: "Data Sprint 72 - Butterfly Identification",
    image: image2,
    description: "Identify the class to which each butterfly belongs to",
    startDate: "2024-09-09",
    endDate: "2024-09-10",
    level: "Hard",
  },
  {
    id: 3,
    title: "Data Sprint 71 - Weather Recognition",
    image: image3,
    description: "Identify the weather conditions from the given images",
    startDate: "2024-09-02",
    endDate: "2024-09-07",
    level: "Easy",
  },
  {
    id: 4,
    title: "Data Sprint 71 - Weather Recognition",
    image: image4,
    description: "Identify the weather conditions from the given images",
    startDate: "2024-09-02",
    endDate: "2024-09-07",
    level: "Easy",
  },
  {
    id: 5,
    title: "Data Sprint 71 - Weather Recognition",
    image: image5,
    description: "Identify the weather conditions from the given images",
    startDate: "2024-09-02",
    endDate: "2024-09-07",
    level: "Easy",
  },
  {
    id: 6,
    title: "Data Sprint 71 - Weather Recognition",
    image: image6,
    description: "Identify the weather conditions from the given images",
    startDate: "2024-09-02",
    endDate: "2024-09-07",
    level: "Easy",
  },
];

export const reasons = [
  {
    icon: NoteBook,
    title: "Prove your skills",
    description:
      "Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.",
  },
  {
    icon: ChallengeSvg,
    title: "Learn from community",
    description:
      "One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them.",
  },
  {
    icon: Community,
    title: "Challenge yourself",
    description:
      "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.",
  },
  {
    icon: Recognition,
    title: "Earn recognition",
    description:
      "You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.",
  },
];
