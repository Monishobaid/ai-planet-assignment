export interface Challenge {
    id: number;
    title: string;
    status: "Upcoming" | "Active" | "Past";
    image: string;
    startsIn?: { days: number; hours: number; mins: number };
    endsIn?: { days: number; hours: number; mins: number };
    startDate: Date;
    endDate: Date | null;
    level: "Easy" | "Medium" | "Hard";
  }
  