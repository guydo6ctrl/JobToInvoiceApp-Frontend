import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../services/api";
import { greeting } from "../utilities/greeting";
import StatCard from "../components/HomePageComponents/StatCard";
import QuickAction from "../components/HomePageComponents/QuickAction";

import RecentInvoices from "../components/HomePageComponents/RecentInvoices";
import { fmt } from "../utilities/homeCurrencyFormat";
import RecentQuotes from "../components/HomePageComponents/RecentQuotes";
import HomeAlerts from "../components/HomePageComponents/HomeAlerts";
import {
  AlertInterface,
  DashboardStats,
  RecentInvoice,
  RecentQuote,
} from "../Interfaces/homeInterfaces";
import CompanyBanner from "../components/HomePageComponents/CompanyBanner";
import useCompany from "../hooks/useCompany";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [invoices, setInvoices] = useState<RecentInvoice[]>([]);
  const [quotes, setQuotes] = useState<RecentQuote[]>([]);
  const { data } = useCompany();
  const [alerts, setAlerts] = useState<AlertInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, invoicesRes, quotesRes, alertsRes] = await Promise.all(
          [
            api.get("/dashboard/stats/"),
            api.get("/invoices/?limit=5&ordering=-date_created"),
            api.get("/quotes/?limit=5&ordering=-date_created"),
            api.get("/dashboard/alerts/"),
            api.get("company/details"),
          ],
        );
        setStats(statsRes.data);
        setInvoices(invoicesRes.data.results ?? invoicesRes.data);
        setQuotes(quotesRes.data.results ?? quotesRes.data);
        setAlerts(alertsRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="60vh">
        <Spinner size="lg" color="blue.500" />
      </Box>
    );

  return (
    <>
      {data.length === 0 && <CompanyBanner />}
      <VStack align="stretch" gap={6} w="100%" pb={8}>
        {/* ── Page header ── */}
        <HStack justify="space-between" align="flex-end">
          <Box>
            <Text fontSize="13px" color="gray.400" fontWeight="500" mb={1}>
              {greeting()}
            </Text>
            <Heading size="lg" color="gray.800" fontWeight="800">
              Dashboard
            </Heading>
          </Box>
          <Text fontSize="11px" color="gray.400">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
        </HStack>
        {/* ── Stat cards ── */}
        <SimpleGrid columns={{ base: 2, md: 2, lg: 4 }} gap={3}>
          <StatCard
            label="Outstanding"
            value={fmt(stats?.outstanding_amount ?? 0)}
            sub="awaiting payment"
            accent
          />
          <StatCard
            label="Overdue"
            value={fmt(stats?.overdue_amount ?? 0)}
            sub={`${stats?.overdue_count ?? 0} invoice${(stats?.overdue_count ?? 0) !== 1 ? "s" : ""}`}
            alert={(stats?.overdue_count ?? 0) > 0}
          />
          <StatCard
            label="Open Quotes"
            value={String(stats?.open_quotes ?? 0)}
            sub="awaiting response"
          />
          <StatCard
            label="Active Jobs"
            value={String(stats?.active_jobs ?? 0)}
            sub="in progress"
          />
        </SimpleGrid>
        <HomeAlerts alerts={alerts} />
        {/* ── Quick actions ── */}
        <Box>
          <Text
            fontSize="10px"
            fontWeight="700"
            letterSpacing="1.5px"
            textTransform="uppercase"
            color="gray.400"
            mb={3}
          >
            Quick Actions
          </Text>
          <HStack gap={3}>
            <QuickAction label="New Client" icon="👤" to="/clients" />
            <QuickAction label="New Quote" icon="📋" to="/quotes" />
            <QuickAction label="New Job" icon="🔧" to="/jobs" />
            <QuickAction label="New Invoice" icon="🧾" to="/invoices" />
          </HStack>
        </Box>
        {/* ── Recent invoices + quotes ── */}
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={4}>
          <GridItem>
            <RecentInvoices data={invoices} />
          </GridItem>
          <GridItem>
            <RecentQuotes data={quotes} />
          </GridItem>
        </Grid>
      </VStack>
    </>
  );
};

export default Dashboard;
