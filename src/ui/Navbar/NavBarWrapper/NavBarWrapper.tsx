import { getSession } from "@/app/auth/sessionActions";
import Navbar from "../Navbar";

export default async function NavbarWrapper() {
  const session = await getSession();

  return <Navbar session={session} />;
}
