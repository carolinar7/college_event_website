import { useRouter } from "next/router";
import Nav from "~/components/common/nav";

const RSO = () => {
  const router = useRouter();

  console.log(router.query?.rsoId);

  return <Nav />;
}

export default RSO;