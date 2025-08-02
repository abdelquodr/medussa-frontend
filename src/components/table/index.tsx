import { DownloadIcon } from "../../assets/svgs";
import { cn } from "../../lib/utils";
import { Dictionary } from "@/types";
import { ArrowDown } from "lucide-react";
import * as React from "react";
import { Checkbox } from "../fragments";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type HEADER_TYPE = {
  name: string;
  hasSort: boolean;
  accessor: string;
};

interface ReusableTableProps {
  title?: string;
  headerList: HEADER_TYPE[];
  hasDownloadBtn?: boolean;
  handleExport?: () => void;
  hasCheck?: boolean;
  dataList: Dictionary[];
}

export default function ReusableTable({
  title,
  headerList,
  hasDownloadBtn,
  handleExport,
  hasCheck = false,
  dataList,
}: ReusableTableProps) {
  const [selectedRoles, setSelectedRoles] = React.useState<Set<string>>(
    new Set()
  );
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: "", direction: "asc" });

  const toggleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = React.useMemo(() => {
    return [...dataList].sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortConfig]);

  const toggleRole = (roleId: string) => {
    setSelectedRoles((current) => {
      const updated = new Set(current);
      if (updated.has(roleId)) {
        updated.delete(roleId);
      } else {
        updated.add(roleId);
      }
      return updated;
    });
  };

  console.log(sortedData);

  const toggleAll = () => {
    setSelectedRoles((current) =>
      current.size === dataList.length
        ? new Set()
        : new Set(dataList.map((role: Dictionary) => role._id))
    );
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex items-center justify-between mb-4",
          !title && hasDownloadBtn && "justify-end"
        )}
      >
        {title && (
          <h3 className="text-md font-normal text-clr_gray_600 tracking-wide lg:text-">
            {title}
          </h3>
        )}
        {hasDownloadBtn && (
          <Button
            variant="outline"
            size="sm"
            className="flex gap-2 font-normal text-gray-700"
            onClick={handleExport}
          >
            <DownloadIcon /> Download all
          </Button>
        )}
      </div>
      <div className="rounded-md border shadow-shadowTwo">
        <Table>
          <TableHeader>
            <TableRow>
              {hasCheck && (
                <TableHead className="w-12">
                  <Checkbox
                    isChecked={selectedRoles.size === dataList.length}
                    handleClick={toggleAll}
                    type="CHECK"
                    className="rounded-sm"
                  />
                </TableHead>
              )}
              {headerList?.map(({ name, hasSort, accessor }, idx) => (
                <TableHead
                  key={idx}
                  className="cursor-pointer"
                  onClick={() => hasSort && toggleSort(accessor)}
                >
                  <div className="flex items-center font-normal text-[.8rem]">
                    {name}
                    {hasSort && <ArrowDown className="ml-2 h-4 w-4" />}
                  </div>
                </TableHead>
              ))}
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {Object.values( */}
            {sortedData.map((data) => {
              return (
                <TableRow key={data._id} className="bg-white">
                  {hasCheck && (
                    <TableCell>
                      <Checkbox
                        isChecked={selectedRoles.has(data._id)}
                        handleClick={() => toggleRole(data._id)}
                        type="CHECK"
                        className="rounded-sm"
                      />
                    </TableCell>
                  )}
                  {Object.entries(data)
                    .filter(([key]) => {
                      return key !== "_id";
                    })
                    .map((item: Dictionary, index) => (
                      <TableCell
                        key={index}
                        className={`text-xs text-gray-600 ${
                          index === 0 ? "font-semibold" : ""
                        }`}
                      >
                        {item[1]}
                      </TableCell>
                    ))}
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <DownloadIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
