export type Event = {
  id: string;
  name: string;
  sport?: {
    name: string;
  };
  maxParticipants: number;
  participants: Participants[];
  userId?: Participant;
  organizer: Organizer;
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

export type Organizer = {
  id: string;
  pseudo: string;
  profilePicture: string;
};

export type CreateEventFormData = {
  name: string;
  description: string;
  sportId: number | null;
  maxParticipants: string;
  location: string;
  isPrivate: boolean;
  startAt: Date | null;
  image: string;
};
