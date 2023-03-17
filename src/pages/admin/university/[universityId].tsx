import { useRouter } from "next/router";
import Nav from "~/components/nav";

const University = () => {
  const router = useRouter();

  console.log(router.query?.universityId);

  return <Nav />;
}

export default University;