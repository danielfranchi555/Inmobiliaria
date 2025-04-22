"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.JWT_KEY;
const key = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  role: string;
  expiresAt: string;
  name?: string;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(user: {
  userId: string;
  role: string;
  expiresAt: Date;
  name?: string;
}) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({
    userId: user.userId,
    role: user.role,
    name: user.name,
    expiresAt: user.expiresAt.toString(), // 👈 usá el que viene del parámetro
  });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function verifySession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: Number(session.userId) };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/auth/login");
}

type SessionData = {
  userId: string;
  role: "ADMIN" | "USER";
  name?: string;
};

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;

  if (!cookie) return null;

  const session = (await decrypt(cookie)) as Partial<SessionData>;

  if (!session?.userId || !session?.role) {
    return null;
  }

  return {
    userId: session.userId,
    role: session.role,
    name: session.name,
  };
}
