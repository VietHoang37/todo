import Head from "next/head";
import { Container, Heading, Text } from "../../styles/Home.Styled";
import Image from "next/image";
import Button from "@/components/button/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>TASKFLOW</title>
        <meta
          name="description"
          content="Taskflow allows the user to create a simple task management."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Heading>Next-Gen To-Do Application</Heading>
        <Text>
          Experience a new standard in convenience and functionality, as you
          effortlessly create, update, and delete tasks.
        </Text>
        <Image
          src="/images/list-person.png"
          alt="list-person"
          layout="responsive"
          width={800}
          height={600}
        />
        <Link href="/lists" passHref>
          <Button type="button">Welcome!</Button>
        </Link>
      </Container>
    </>
  );
}
