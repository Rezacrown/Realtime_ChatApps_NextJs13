"use client";

import { useRef, useState } from "react";
import { postData } from "../../action";

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleForm = async (formData: FormData) => {
    try {
      setIsLoading(true);
      await postData(formData).then(() => {
        setIsLoading(false);
        formRef.current?.reset();
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <form
      action={handleForm}
      ref={formRef}
      className="p-6 fixed bottom-0 left-0 w-full bg-white"
    >
      <div className="flex">
        <input
          type="text"
          name="message"
          required
          placeholder="Type your message..."
          className="flex-grow py-2 px-4 outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full"
        >
          {isLoading ? "Loading..." : "Send"}
        </button>
      </div>
    </form>
  );
}
