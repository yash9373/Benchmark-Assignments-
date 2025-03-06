import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUsers } from "@/servises/useUsers";
import { useCompanies } from "@/servises/compniServises";
import { usePost } from "@/servises/postServises";

export default function Dashboard() {
  const { users, isLoading: usersLoading } = useUsers();
  const { companies, isLoading: companiesLoading } = useCompanies();
  const { posts, isLoading: postsLoading } = usePost();

  if (usersLoading || companiesLoading || postsLoading) {
    return <div>Loading...</div>;
  }

  // Transform company data for chart
  const companyData = companies.map((company) => ({
    name: company.name,
    marketCap: company.marketCap,
    employees: company.employeeCount,
  }));

  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Overview Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{users.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{companies.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{posts.length}</p>
        </CardContent>
      </Card>

      {/* Market Cap & Employees Bar Chart */}
      <Card className="col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Company Market Cap & Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={companyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="marketCap" fill="#3b82f6" name="Market Cap" />
              <Bar dataKey="employees" fill="#f43f5e" name="Employees" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
