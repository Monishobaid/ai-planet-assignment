export interface Challenge {
    id: number;
    title: string;
    image: string;
    description: string;
    startDate: string;
    endDate: string;
    status?: "Upcoming" | "Active" | "Past";
    level: "Easy" | "Medium" | "Hard";
  }
  