import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Pagination } from "../../components/Pagination";
import { ProductListItem } from "../../components/Product";
import { Header } from "../../components/Header";
import { Main } from "../../components/Main";
import { Footer } from "../../components/Footer";

const PRODUCTS_API_URL = "https://naszsklep-api.vercel.app/api/products";

const getSingleProduct = async (count: number) => {
  const response = await fetch(
    `${PRODUCTS_API_URL}?take=1&offset=${count - 1}`
  );
  return await response.json();
};

const ListIdPage = ({
  data,
  totalPages,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { listId } = router.query;

  if (!data || typeof listId !== "string") {
    return <p>Coś nie załadowało się poprawnie...</p>;
  }
  return (
    <div>
      <Head>
        <title>Products via CSR</title>
      </Head>
      <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
        <Header />
        <Main>
          <div className="flex flex-col">
            <Pagination
              totalPages={totalPages}
              current={listId}
              renderType="ssg"
            />
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.map((product) => (
                <li key={product.id}>
                  <ProductListItem
                    data={{
                      id: product.id,
                      title: product.title,
                      thumbnailAlt: product.title,
                      thumbnailUrl: product.image,
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Main>
        <Footer />
      </div>
    </div>
  );
};

export default ListIdPage;

export const getStaticPaths = async () => {
  const prerenderedPagesCount = 3;
  const allPages = new Array(prerenderedPagesCount)
    .fill(null)
    .map((_, i) => i + 1);
  const paths = allPages.map((page) => ({
    params: {
      listId: `${page}`,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

const countTotalItems = async (total: number, step: number) => {
  const product = await getSingleProduct(total + step);
  const isMore = product.length !== 0;
  let result = total;

  if (step > 1) {
    if (isMore) {
      total = total + step;
    } else {
      step = Math.ceil(step / 2);
    }
    result = await countTotalItems(total, step);
  }
  return result;
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  const productsPerPage = 25;
  let totalItems = 0;
  let step = 1024;

  const itemsCount = (await countTotalItems(totalItems, step)) || 1;
  const pages = Math.ceil(itemsCount / productsPerPage);
  if (!params?.listId) {
    return {
      props: {},
      notFound: true,
    };
  }
  const offset = (parseInt(params.listId) - 1) * productsPerPage;
  const productsUrl = `${PRODUCTS_API_URL}?take=${productsPerPage}&offset=${offset}`;
  const response = await fetch(`${productsUrl}`);
  const data: ProductsApiResponse[] = await response.json();
  return {
    props: { data, totalPages: pages },
  };
};

interface ProductsApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  longDescription: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;
