export type Event = {
  id: string;
  name: string;
  sport: {
    name: string;
  };
  maxParticipants: number;
  participants: {
    participant: Participant;
  }[];
  startAt: string;
  location: string;
  description: string;
  image: string;
};

export type Participant = {
  id: string;
  pseudo: string;
  sexe: string;
  biography: string;
  birthday: string;
  email: string;
  profilePicture?: string;
};

export type Participants = {
  participant: Participant;
};
