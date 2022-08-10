import { useMemo } from "react";
import Link from "next/link";

interface PageProps {
  value: number;
  selected?: boolean;
  elementPath: string;
}

interface Pagination {
  paginationItems: PaginationItem[];
  elementPath: string;
}

type PaginationItem =
  | {
      type: "page";
      value: number;
      selected: boolean;
    }
  | {
      type: "non-page";
    };

const PageItem = ({ value, selected = false, elementPath }: PageProps) => {
  const liClassNames = `w-14 h-14 rounded-md ${
    selected ? "bg-blue-800" : "bg-gray-200"
  } ${selected ? "text-white" : "text-black"} `;

  const pageElement = selected ? (
    <span className="text-lg flex w-full h-full justify-center text-xl items-center">
      {value}
    </span>
  ) : (
    <Link href={`${elementPath}${value}`}>
      <a className="text-lg flex w-full h-full justify-center text-xl items-center">
        {value}
      </a>
    </Link>
  );
  return <li className={liClassNames}>{pageElement}</li>;
};

const NonPageItem = () => {
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

const setPageItemWithCurrent =
  (current: number) =>
  (value: number): PaginationItem => {
    return {
      type: "page",
      value,
      selected: value === current,
    };
  };

const setNonPageItem = (): PaginationItem => {
  return {
    type: "non-page",
  };
};

const getPaginationItems = (
  allPages: number[],
  currentPage: number
): PaginationItem[] => {
  const displayedItems = 7;
  const setPageItem = setPageItemWithCurrent(currentPage);
  const total = allPages.length;
  if (total === 1) {
    return [setPageItem(getFirst(allPages))];
  }
  if (total <= displayedItems) {
    return allPages.map((page) => setPageItem(page));
  }
  if (currentPage <= 3) {
    const firstFive = [...getFirstFive(allPages)].map((page) =>
      setPageItem(page)
    );
    return [...firstFive, setNonPageItem(), setPageItem(getLast(allPages))];
  }
  if (total - currentPage <= 2) {
    const lastFive = [...getLastFive(allPages)].map((page) =>
      setPageItem(page)
    );
    return [setPageItem(getFirst(allPages)), setNonPageItem(), ...lastFive];
  }
  const middleThree = [...getMiddleThree(allPages, currentPage)].map((page) =>
    setPageItem(page)
  );
  return [
    setPageItem(getFirst(allPages)),
    setNonPageItem(),
    ...middleThree,
    setNonPageItem(),
    setPageItem(getLast(allPages)),
  ];
};

const renderPaginationItems = ({
  paginationItems,
  elementPath,
}: Pagination) => {
  return paginationItems.map((page, idx) =>
    page.type === "page" ? (
      <PageItem
        key={`page-${idx}`}
        value={page.value}
        selected={page.selected}
        elementPath={elementPath}
      />
    ) : (
      <NonPageItem key={`non-page-${idx}`} />
    )
  );
};

interface PaginationProps {
  totalPages: number;
  current: string;
  elementPath: string;
}

export const Pagination = ({
  current = "1",
  totalPages,
  elementPath,
}: PaginationProps) => {
  const allPages = useMemo(
    () => new Array(totalPages).fill(null).map((_, i) => i + 1),
    [totalPages]
  );
  const currentPage = parseInt(current);
  const paginationItems = getPaginationItems(allPages, currentPage);

  return (
    <nav className="py-4">
      <ul className="flex gap-3">
        {renderPaginationItems({ paginationItems, elementPath })}
      </ul>
    </nav>
  );
};
