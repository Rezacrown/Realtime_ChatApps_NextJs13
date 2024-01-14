"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";

interface iAppProps {
  data: {
    User: {
      // id: string | null;
      email: string | null;
      image: string | null;
      name: string | null;
    };
    message: string;
  }[];
}

export default function ChatComponent2({ data }: iAppProps) {
  // State untuk menyimpan data komentar
  const [totalComments, setTotalComments] = useState(data);

  // get user session
  const session = useSession();

  // Ref untuk elemen paling bawah
  const messageEndRef = useRef<HTMLInputElement>(null);

  // Saat mount, subscribe ke Pusher channel
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: (process.env.PUSHER_CLUSTER as string) ?? "ap1",
    });

    // subscribe ke chanel pusher nya
    const channel = pusher.subscribe("chat");

    // binding data chanel pada event "hello"
    channel.bind("hello", (data: any) => {
      // Update state comments saat ada data baru
      const parsedComment = JSON.parse(data.message);
      setTotalComments((prev) => [...prev, parsedComment]);
      // setTotalComments(totalComments.push(parsedComment) as typeof data);
    });

    // Unsubscribe saat unmount agar nanti tidak duplikat message
    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  // Fungsi scroll ke bawah
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll ke bawah saat comments bertambah
  useEffect(() => {
    scrollToBottom();
  }, [totalComments]);

  // Render comments
  return (
    // <div className="p-6 flex-grow max-h-screen overflow-y-auto py-32">
    //   <div className="flex flex-col gap-4">
    //     {totalComments.map((message, index) => (
    //       <>
    //         <div key={index} className="">
    //           {message.User.email == session.data?.user?.email && (
    //             <>
    //               <div className="flex items-center">
    //                 <Image
    //                   src={message.User.image as string}
    //                   alt="Profile image of user"
    //                   className="w-12 h-12 object-cover rounded-lg mr-4"
    //                   width={50}
    //                   height={50}
    //                 />
    //                 <div className="rounded-lg bg-white p-4 shadow-md self-start">
    //                   {message.message}
    //                 </div>
    //               </div>
    //               <p className="font-light text-sm text-gray-600">
    //                 {message.User.name}
    //               </p>
    //             </>
    //           )}

    //           {message.User.email != session.data?.user?.email && (
    //             <>
    //               <div className="flex items-center justify-self-end">
    //                 <Image
    //                   src={message.User.image as string}
    //                   alt="Profile image of user"
    //                   className="w-12 h-12 object-cover rounded-lg mr-4"
    //                   width={50}
    //                   height={50}
    //                 />
    //                 <div className="rounded-lg bg-white p-4 shadow-md self-start">
    //                   {message.message}
    //                 </div>
    //               </div>
    //               <p className="font-light text-sm text-gray-600">
    //                 {message.User.name}
    //               </p>
    //             </>
    //           )}
    //         </div>
    //       </>
    //     ))}
    //     <div ref={messageEndRef}></div>
    //   </div>
    // </div>
    <>
      <div className="p-6 flex-grow max-h-screen overflow-y-auto py-32">
        <div className="flex flex-col gap-4">
          {totalComments.map((message, index) => (
            <>
              <div
                key={index}
                className={`flex items-center ${
                  message.User.email == session.data?.user?.email
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <Image
                  src={message.User.image as string}
                  alt="Profile image of user"
                  className={`w-12 h-12 object-cover rounded-lg mr-4 ${
                    message.User.email == session.data?.user?.email
                      ? "rounded-full bg-blue-500"
                      : "rounded-full bg-gray-200"
                  }`}
                  width={50}
                  height={50}
                />
                <div
                  className={`rounded-lg bg-white p-4 shadow-md ${
                    message.User.email == session.data?.user?.email
                      ? "bg-blue-200"
                      : ""
                  }`}
                >
                  {message.message}
                </div>
              </div>
              <div
                className={`flex items-center ${
                  message.User.email == session.data?.user?.email
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <p className={`font-light text-sm text-gray-600 `}>
                  {message.User.name}
                </p>
              </div>
            </>
          ))}
          <div ref={messageEndRef}></div>
        </div>
      </div>
    </>
  );
}
