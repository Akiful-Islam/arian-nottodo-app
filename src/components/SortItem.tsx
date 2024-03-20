import React from "react";
import { Label } from "@/components/ui/label";
import { Filter } from "@/lib/data/types";
import {
  ArrowDown01Icon,
  ArrowDownAZIcon,
  ArrowUp01Icon,
  ArrowUpAZIcon,
  ArrowUpDownIcon,
} from "lucide-react";

type Props = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  iconType: "01" | "AZ";
  label: string;
  sortType: "added" | "dueDate" | "title";
};

const SortItem: React.FC<Props> = ({
  filter,
  setFilter,
  iconType,
  label,
  sortType,
}) => {
  return (
    <div
      className="flex justify-between hover:bg-primary-foreground hover:text-primary rounded-md transition-all duration-150 ease-out cursor-pointer"
      onClick={() => {
        setFilter({
          ...filter,
          sort: {
            by: sortType,
            direction:
              filter.sort.by === sortType
                ? filter.sort.direction === "asc"
                  ? "desc"
                  : "asc"
                : "asc",
          },
        });
      }}
    >
      <Label htmlFor="added-sort" className="text-sm cursor-pointer">
        {label}
      </Label>
      {filter.sort.by === sortType ? (
        filter.sort.direction === "asc" ? (
          iconType === "AZ" ? (
            <ArrowDownAZIcon className="p-[3px]" />
          ) : (
            <ArrowDown01Icon className="p-[3px]" />
          )
        ) : iconType === "AZ" ? (
          <ArrowUpAZIcon className="p-[3px]" />
        ) : (
          <ArrowUp01Icon className="p-[3px]" />
        )
      ) : (
        <ArrowUpDownIcon className="p-[5px]" />
      )}
    </div>
  );
};

export default SortItem;
