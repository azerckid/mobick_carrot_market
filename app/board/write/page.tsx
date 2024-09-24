"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";

export default function AddStream() {
  return (
    <form className="p-5 flex flex-col gap-2">
      <Input name="title" required placeholder="write your text" />
      <Button text="write" />
    </form>
  );
}
