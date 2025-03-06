import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import api from "@/servises/api";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const [usersRes, companiesRes, postsRes] = await Promise.all([
        api.get("/users"),
        api.get("/companies"),
        api.get("/posts"),
      ]);
      return {
        totalUsers: usersRes.data.length,
        totalCompanies: companiesRes.data.length,
        totalPosts: postsRes.data.length,
        userGrowth: usersRes.data
          .slice(0, 10)
          .map((u: any, i: number) => ({ month: `M${i + 1}`, users: u.id })),
        postActivity: postsRes.data
          .slice(0, 10)
          .map((p: any, i: number) => ({ month: `M${i + 1}`, posts: p.id })),
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 p-6 md:grid-cols-3">
      {/* Stats Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {data?.totalUsers}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Companies</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {data?.totalCompanies}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Posts</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {data?.totalPosts}
        </CardContent>
      </Card>

      {/* Graphs */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data?.userGrowth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Post Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.postActivity}>
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="posts" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
