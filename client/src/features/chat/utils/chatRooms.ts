interface ChatRoom {
  name: string;
  id: number;
}

const chatRooms: ChatRoom[] = [
  { name: "General", id: 1 },
  { name: "Tech Talk", id: 2 },
  { name: "Sports", id: 3 },
  { name: "Random", id: 4 },
];

export default chatRooms;
