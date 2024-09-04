export interface Challenge {
    id: number;
    title: string;
    image: string;
    endsIn?: { days: number; hours: number; mins: number };
    startDate: Date;
    endDate: Date | null;
    level: "Easy" | "Medium" | "Hard";
  }
  