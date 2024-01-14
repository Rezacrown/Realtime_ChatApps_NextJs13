import { getServerSession } from "next-auth";
import { authOptions } from "../config/auth";
import { redirect } from "next/navigation";
import Form from "../components/Form";
import { prisma } from "../config//db";
import ChatComponent from "../components/Chat";

async function getData() {
  const data = await prisma.message.findMany({
    select: {
      message: true,
      id: true,
      User: {
        select: {
          // id: true,
          email: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 50,
  });

  return data;
}

// Add
export const dynamic = "force-dynamic";

export default async function Chathomepage() {
  const session = await getServerSession(authOptions);
  const data = await getData();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <div className="h-screen bg-gray-200 flex flex-col">
        <ChatComponent
          data={
            data as {
              User: {
                email: string | null;
                image: string | null;
                name: string | null;
              };
              message: string;
            }[]
          }
        />
        <Form />
      </div>
    </>
  );
}
