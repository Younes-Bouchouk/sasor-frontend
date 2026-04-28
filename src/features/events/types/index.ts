export type Event = {
  id: string;
  name: string;
  sport: {
    name: string;
  };
  maxParticipants: number;
  participants: any[];
  startAt: string;
  location: string;
  description: string;
  image: string;
};
