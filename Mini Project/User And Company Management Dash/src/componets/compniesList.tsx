import React, { useReducer } from "react";
import { useCompanies } from "@/servises/compniServises";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FILTER_ACTIONS = {
  SET_EMPLOYEE_COUNT: "SET_EMPLOYEE_COUNT",
  SET_MARKET_CAP: "SET_MARKET_CAP",
};

interface FilterState {
  employeeCount: string;
  marketCap: string;
}

interface FilterAction {
  type: string;
  payload: string;
}

const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case FILTER_ACTIONS.SET_EMPLOYEE_COUNT:
      return { ...state, employeeCount: action.payload };
    case FILTER_ACTIONS.SET_MARKET_CAP:
      return { ...state, marketCap: action.payload };
    default:
      return state;
  }
};

export default function CompaniesList() {
  const { companies, isLoading, error } = useCompanies();

  const [filters, dispatch] = useReducer(filterReducer, {
    employeeCount: "all",
    marketCap: "all",
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40 text-lg">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-4">
        Error: {error.message}
      </div>
    );

  const filteredCompanies = companies.filter((company) => {
    const matchesEmployeeCount =
      filters.employeeCount === "all" ||
      company.employeeCount >= parseInt(filters.employeeCount);
    const matchesMarketCap =
      filters.marketCap === "all" ||
      company.marketCap >= parseInt(filters.marketCap);

    return matchesEmployeeCount && matchesMarketCap;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-md font-bold">Companies List</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="font-medium">Employees:</label>
            <Select
              onValueChange={(value) =>
                dispatch({
                  type: FILTER_ACTIONS.SET_EMPLOYEE_COUNT,
                  payload: value,
                })
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="100">100+</SelectItem>
                <SelectItem value="500">500+</SelectItem>
                <SelectItem value="1000">1000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-medium">Market Cap:</label>
            <Select
              onValueChange={(value) =>
                dispatch({
                  type: FILTER_ACTIONS.SET_MARKET_CAP,
                  payload: value,
                })
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="100000000">100M+</SelectItem>
                <SelectItem value="500000000">500M+</SelectItem>
                <SelectItem value="1000000000">1B+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCompanies.map((company) => (
          <Card
            key={company.id}
            className="p-4 shadow-sm hover:shadow-lg transition duration-200"
          >
            <CardHeader className="flex items-center space-x-5">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={`https://picsum.photos/100/100?random=${
                    company.id * 10
                  }`}
                  alt={company.name}
                />
              </Avatar>
              <CardTitle className="text-lg font-semibold">
                {company.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-gray-600 space-y-2">
              <p>
                <span className="font-medium">CEO:</span> {company.ceoName}
              </p>
              <div className="flex justify-between">
                <p>
                  <span className="font-medium">Employees:</span>{" "}
                  {company.employeeCount}
                </p>
                <p>
                  <span className="font-medium">Market Cap:</span> $
                  {company.marketCap.toLocaleString()}
                </p>
              </div>
              <p>
                <span className="font-medium">Location:</span> {company.address}
                , {company.country}
              </p>

              <div className="flex justify-between gap-2 mt-4">
                <a
                  href={`https://${company.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full">View Web</Button>
                </a>
                <Button className="">More Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
