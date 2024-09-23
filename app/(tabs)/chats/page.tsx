import Link from "next/link"; // next/link import 추가
import db from "@/lib/db";
import getSession from "@/lib/session";

async function getChatRooms() {
  const session = await getSession();
  if (!session) {
    throw new Error("You must be logged in to view chat rooms.");
  }

  const chatRooms = await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: session.id,
        },
      },
    },
  });

  return chatRooms;
}

interface ChatRoom {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export default async function ChatList() {
  const chatRooms = await getChatRooms(); // await 추가
  return (
    <div>
      <h1>Chat Rooms</h1>
      <ul>
        {chatRooms.map((room: ChatRoom) => (
          <div key={room.id}>
            {/* Link 컴포넌트를 사용하여 클릭 시 리다이렉트 */}
            <Link href={`/chats/${room.id}`}>
              <span style={{ cursor: "pointer", color: "white" }}>
                {"room number >>>"} {room.id}
              </span>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
