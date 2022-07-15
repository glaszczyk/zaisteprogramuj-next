import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Best shop ever</title>
      </Head>
      <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
        <Header />
        <main className="flex-grow p-6 grid md:grid-cols-2 gap-6">
          <img src="https://picsum.photos/id/256/600/400" alt="" />
          <p>
            Maecenas dapibus egestas lacus a ornare. Proin iaculis, lacus id
            pellentesque rutrum, lectus orci ultrices purus, eu rutrum turpis
            dui nec nibh. Orci varius natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus. Integer molestie ipsum mauris, nec
            varius est cursus id. Integer ac velit sed elit euismod faucibus non
            sed arcu. Duis venenatis sollicitudin eros ut lacinia. In hac
            habitasse platea dictumst. Maecenas eget rhoncus nulla, a porta
            nibh. Fusce sed rutrum risus. Fusce erat arcu, pretium et sem
            ultricies, ultrices euismod lacus. Duis tempus magna in elit
            facilisis, ut convallis felis tincidunt.
          </p>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
