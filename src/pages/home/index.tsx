import Head from "next/head";
import { Inter } from "next/font/google";
import { Container, Heading, Subheading } from "./styles";
import Image from "next/image";
import Button from "@/components/button/Button";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/lists");
  };

  return (
    <>
      <Head>
        <title>TODO Maker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Heading>Welcome!</Heading>
        <Subheading>You don&apos;t have any list created yet!</Subheading>
        <Image
          src="/images/list-person.png"
          alt="list-person"
          layout="responsive"
          width={800}
          height={600}
        />
        <Button type="button" onClick={handleClick}>
          Create your first list!
        </Button>
      </Container>
    </>
  );
}
