/**
 * Mock User Data
 * Current logged-in user profile and their story participation
 */

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  totalUpvotes: number;
  totalDownvotes: number;
  totalComments: number;
  followersCount: number;
  followingCount: number;
  storiesCreated: number;
  storiesParticipated: number;
  joinedDate: string;
}

export interface UserStory {
  storyId: string;
  title: string;
  imageUrl: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  createdAt: string;
  isRoot: boolean; // true if it's a level 0 story
  depth: number;
}

export const currentUser: User = {
  id: "user-123",
  username: "creative_storyteller",
  displayName: "Alex Narratore",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
  bio: "Amante delle storie interattive e dei finali multipli 📖✨",
  totalUpvotes: 15420,
  totalDownvotes: 342,
  totalComments: 2847,
  followersCount: 8234,
  followingCount: 456,
  storiesCreated: 23,
  storiesParticipated: 47,
  joinedDate: "2024-03-15",
};

// Stories created by the current user (as root stories)
export const userCreatedStories: UserStory[] = [
  {
    storyId: "user-story-1",
    title: "La biblioteca dimenticata",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    upvotes: 3456,
    downvotes: 67,
    comments: 234,
    createdAt: "2024-11-01",
    isRoot: true,
    depth: 0,
  },
  {
    storyId: "user-story-2",
    title: "Il mistero del faro abbandonato",
    imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80",
    upvotes: 2891,
    downvotes: 45,
    comments: 178,
    createdAt: "2024-10-28",
    isRoot: true,
    depth: 0,
  },
  {
    storyId: "user-story-3",
    title: "Caffè a mezzanotte",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    upvotes: 1567,
    downvotes: 23,
    comments: 89,
    createdAt: "2024-10-25",
    isRoot: true,
    depth: 0,
  },
  {
    storyId: "user-story-4",
    title: "Il giardino delle statue viventi",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    upvotes: 4123,
    downvotes: 78,
    comments: 312,
    createdAt: "2024-10-20",
    isRoot: true,
    depth: 0,
  },
  {
    storyId: "user-story-5",
    title: "Treno per l'ignoto",
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80",
    upvotes: 2234,
    downvotes: 34,
    comments: 145,
    createdAt: "2024-10-15",
    isRoot: true,
    depth: 0,
  },
];

// Stories where user participated (created branches/continuations)
export const userParticipatedStories: UserStory[] = [
  {
    storyId: "villa-key",
    title: "Villa misteriosa → Branch: La chiave",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    upvotes: 1234,
    downvotes: 23,
    comments: 189,
    createdAt: "2024-11-05",
    isRoot: false,
    depth: 1,
  },
  {
    storyId: "neo-hack",
    title: "Neo City 2145 → Hackerare il sistema",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    upvotes: 892,
    downvotes: 15,
    comments: 67,
    createdAt: "2024-11-03",
    isRoot: false,
    depth: 1,
  },
  {
    storyId: "time-past",
    title: "Macchina del tempo → Viaggio nel passato",
    imageUrl: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=800&q=80",
    upvotes: 1456,
    downvotes: 34,
    comments: 123,
    createdAt: "2024-11-01",
    isRoot: false,
    depth: 1,
  },
  {
    storyId: "ocean-treasure",
    title: "Profondità marine → Tesoro nascosto",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    upvotes: 723,
    downvotes: 12,
    comments: 45,
    createdAt: "2024-10-30",
    isRoot: false,
    depth: 1,
  },
  {
    storyId: "magic-dark",
    title: "Accademia di magia → Magia oscura",
    imageUrl: "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=800&q=80",
    upvotes: 945,
    downvotes: 18,
    comments: 78,
    createdAt: "2024-10-28",
    isRoot: false,
    depth: 1,
  },
  {
    storyId: "user-branch-1",
    title: "Biblioteca dimenticata → Il libro proibito",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    upvotes: 567,
    downvotes: 9,
    comments: 34,
    createdAt: "2024-10-26",
    isRoot: false,
    depth: 2,
  },
];
