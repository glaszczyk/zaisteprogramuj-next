import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto">
      <Header />
      <main className="flex-grow px-2 py-2">Treść</main>
      <Footer />
    </div>
  );
};

export default Home;
