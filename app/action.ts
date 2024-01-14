"use server";

import { getServerSession } from "next-auth";
import { prisma } from "./config/db";
import { authOptions } from "./config/auth";
// import Pusher from 'pusher'

export async function postData(formData: FormData) {
  "use server";

  const Pusher = require("pusher"); // harus di import disini karena pusher itu berjalan di sisi server
  // import Pusher from 'pusher'

  const session = await getServerSession(authOptions);
  const message = formData.get("message"); // ambil data dari input message pada bagian component/Form/index.tsx

  // create new chat message data
  const data = await prisma.message.create({
    data: {
      message: message as string,
      email: session?.user?.email,
    },
    include: {
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  // initial pusher
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
  });

  // triger chanel & event pusher nya
  await pusher.trigger("chat", "hello", {
    message: `${JSON.stringify(data)}\n\n`,
  });
}
