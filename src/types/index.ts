export interface User {
  id: string;
  name: string;
  aadhaarNumber: string;
  phoneNumber: string;
  hasVoted: boolean;
  voteId?: string;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  symbol: string;
  votes: number;
  color: string;
}

export interface Vote {
  id: string;
  userId: string;
  candidateId: string;
  timestamp: Date;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (aadhaarNumber: string, otp: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<boolean>;
}