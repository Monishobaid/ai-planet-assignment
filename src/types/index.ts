export interface Challenge {
    id: number;
    title: string;
    image: string;
    description: string;
    startDate: string;
    endDate: string;
    level: "Easy" | "Medium" | "Hard";
  }
  