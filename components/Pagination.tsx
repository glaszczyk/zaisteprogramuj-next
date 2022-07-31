interface PageProps {
  value: number;
  selected?: boolean;
  renderType: PageRenderType;
  onClick: (page: number) => void;
}

interface GetPagination {
  allPages: number[];
  currentPage: number;
  renderType: PageRenderType;
  onClick: (page: number) => void;
}

type PageItem =
  | {
      type: "page";
      value: number;
      selected: boolean;
    }
  | {
      type: "non-page";
    };

const Page = ({ value, selected = false, renderType, onClick }: PageProps) => {
  const liClassNames = `w-14 h-14  ${
    selected ? "bg-blue-800" : "bg-gray-200"
  } ${selected ? "text-white" : "text-black"} rounded-md`;

  const pageElement =
    renderType === "csr" ? (
      <button
        className="text-lg flex w-full h-full justify-center text-xl items-center"
        onClick={(event) => onClick(parseInt(event.currentTarget.innerText))}
      >
        {value}
      </button>
    ) : (
      <a
        className="text-lg flex w-full h-full justify-center text-xl items-center"
        href="#"
      >
        {value}
      </a>
    );

  return <li className={liClassNames}>{pageElement}</li>;
};

const NonPage = () => {
  return (
    <li className="w-14 h-14">
      <span className="text-lg flex w-full h-full justify-center text-xl items-center">
        ...
      </span>
    </li>
  );
};

const getFirst = <T,>(arr: T[]) => arr[0];
const getLast = <T,>(arr: T[]) => arr[arr.length - 1];
const getFirstFive = <T,>(arr: T[]) => [...arr.slice(0, 5)];
const getMiddleThree = <T,>(arr: T[], nonZeroCurrent: number) => [
  ...arr.slice(nonZeroCurrent - 2, nonZeroCurrent + 1),
];
const getLastFive = <T,>(arr: T[]) => [...arr.slice(-5)];

const setPageItem = (args: { value: number; current: number }): PageItem => {
  return {
    type: "page",
    value: args.value,
    selected: args.value === args.current,
  };
};

const setNonPageItem = (): PageItem => {
  return {
    type: "non-page",
  };
};

const paginate = (allPages: number[], currentPage: number): PageItem[] => {
  const displayedItems = 7;
  const total = allPages.length;
  if (total === 1) {
    return [setPageItem({ value: getFirst(allPages), current: 1 })];
  }
  if (total <= displayedItems) {
    return allPages.map((page) =>
      setPageItem({ value: page, current: currentPage })
    );
  }
  if (currentPage <= 3) {
    const firstFive = [...getFirstFive(allPages)].map((page) =>
      setPageItem({ value: page, current: currentPage })
    );
    return [
      ...firstFive,
      setNonPageItem(),
      setPageItem({
        value: getLast(allPages),
        current: currentPage,
      }),
    ];
  }
  if (total - currentPage <= 2) {
    const lastFive = [...getLastFive(allPages)].map((page) =>
      setPageItem({ value: page, current: currentPage })
    );
    return [
      setPageItem({
        value: getFirst(allPages),
        current: currentPage,
      }),
      setNonPageItem(),
      ...lastFive,
    ];
  }
  const middleThree = [...getMiddleThree(allPages, currentPage)].map((page) =>
    setPageItem({ value: page, current: currentPage })
  );
  return [
    setPageItem({
      value: getFirst(allPages),
      current: currentPage,
    }),
    setNonPageItem(),
    ...middleThree,
    setNonPageItem(),
    setPageItem({
      value: getLast(allPages),
      current: currentPage,
    }),
  ];
};

const getPagination = ({
  allPages,
  currentPage,
  renderType,
  onClick,
}: GetPagination) => {
  const pagination = paginate(allPages, currentPage);
  return pagination.map((page, idx) =>
    page.type === "page" ? (
      <Page
        key={`page-${idx}`}
        value={page.value}
        selected={page.selected}
        onClick={onClick}
        renderType={renderType}
      />
    ) : (
      <NonPage key={`non-page-${idx}`} />
    )
  );
};

type PageRenderType = "csr" | "ssg";

interface PaginationProps {
  totalPages: number;
  current: number;
  renderType: PageRenderType;
  onClick: (page: number) => void;
}

export const Pagination = ({
  current,
  totalPages,
  renderType,
  onClick = () => null,
}: PaginationProps) => {
  const allPages = new Array(totalPages).fill(null).map((_, i) => i + 1);
  return (
    <nav className="py-4">
      <ul className="flex gap-3">
        {getPagination({ allPages, currentPage: current, renderType, onClick })}
      </ul>
    </nav>
  );
};
