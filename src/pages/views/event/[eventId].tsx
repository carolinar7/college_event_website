import { useRouter } from "next/router";
import Nav from "~/components/common/nav";

const Event = () => {
  const router = useRouter();

  console.log(router.query?.eventId);

  return <Nav />;
}

export default Event;