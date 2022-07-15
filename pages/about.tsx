import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Head from "next/head";

const About = () => {
  return (
    <div>
      <Head>
        <title>About us</title>
      </Head>
      <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
        <Header />
        <main className="flex-grow p-6 grid md:grid-cols-2 gap-6">
          <p>Hello world!</p>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default About;
