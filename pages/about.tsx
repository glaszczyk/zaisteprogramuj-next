import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Head from "next/head";
import { Main } from "../components/Main";

const About = () => {
  return (
    <div>
      <Head>
        <title>About us</title>
      </Head>
      <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
        <Header />
        <Main>
          <p>Hello world!</p>
        </Main>
        <Footer />
      </div>
    </div>
  );
};

export default About;
