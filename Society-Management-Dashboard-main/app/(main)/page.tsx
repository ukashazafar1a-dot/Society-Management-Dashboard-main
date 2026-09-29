"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AppAreaChat from "@/components/AppAreaChart";
import AppBarChat from "@/components/AppBarChat";
import AppPieChart from "@/components/AppPieChart";
import CartList from "@/components/CartList";
import TodoList from "@/components/TodoList";
import { dashboardService } from "@/lib/api";

type DashboardApiResponse = {
  residents?: number;
  communities?: number;
  complaints?: number;
  formSubmissions?: number;
  societyNews?: Array<{ id?: number; title?: string; description?: string; content?: string; body?: string }>;
  incidentAnalytics?: Array<{
    date?: string;
    value?: {
      open?: number;
      inProgress?: number;
      resolved?: number;
      closed?: number;
    };
  }>;
};

const Page = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = document.cookie.includes("token=");

    if (!token) {
      router.replace("/auth");
      return;
    }

    let active = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.get({ currentDate: new Date().toISOString() });
        if (active) {
          setDashboardData(response as DashboardApiResponse);
        }
      } catch (err: any) {
        if (active) {
          setError(err?.message || "Failed to load dashboard");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, [router]);

  const chartData = (dashboardData?.incidentAnalytics ?? []).map((item) => ({
    month: item.date || "",
    open: item.value?.open || 0,
    resolved: item.value?.resolved || 0,
  }));

  const metrics = {
    residents: dashboardData?.residents || 0,
    communities: dashboardData?.communities || 0,
    complaints: dashboardData?.complaints || 0,
    formSubmissions: dashboardData?.formSubmissions || 0,
  };

  const newsItems = (dashboardData?.societyNews ?? []).map((item, index) => ({
    id: item.id || index + 1,
    title: item.title || item.description || "Community update",
    badge: "Community",
    count: index + 1,
  }));

  if (loading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChat data={chartData} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <TodoList news={dashboardData?.societyNews} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart stats={metrics} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CartList title="Latest News" items={newsItems} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChat />
      </div>
    </div>
  );
};

export default Page;