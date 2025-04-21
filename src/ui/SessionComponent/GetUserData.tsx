import { getUserData } from "@/app/auth/actions";
import { decrypt } from "@/app/auth/sessionActions";
import { cookies } from "next/headers";
import React from "react";

export async function GetUserData() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  console.log(cookie);

  const session = await decrypt(cookie);
  const id = session?.userId;

  const { message, success, user } = await getUserData(id as string);

  if (!user || success === false) {
    return <div>{message}</div>;
  }

  return (
    <div>
      <p>name: {user.name}</p>
    </div>
  );
}
