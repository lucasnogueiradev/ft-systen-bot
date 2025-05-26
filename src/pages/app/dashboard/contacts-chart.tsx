import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
} from "recharts";
import colors from "tailwindcss/colors";
const data = [
  { date: "10/11", contacs: 10 },
  { date: "11/11", contacs: 6 },
  { date: "12/11", contacs: 3 },
  { date: "13/11", contacs: 10 },
  { date: "14/11", contacs: 5 },
  { date: "15/11", contacs: 7 },
  { date: "16/11", contacs: 9 },
];
export const ContactsChart = () => {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="text-base font-medium">
          <CardTitle className="text-muted-foreground ">
            Relátorios de promoções geradas
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Relátorios diário do período
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis dataKey="date" stroke="#888" width={20} dy={16} />
            <YAxis
              stroke="#888"
              // tickLine={false}
              width={20}
            />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="contacs"
              stroke={colors.green["400"]}
            ></Line>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
