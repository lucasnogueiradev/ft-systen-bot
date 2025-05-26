import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const data = [
  { date: "10/11", menssage: 10 },
  { date: "11/11", menssage: 15 },
  { date: "12/11", menssage: 20 },
  { date: "13/11", menssage: 25 },
];
const COLORS = ["#4ade80", "#22c55e", "#ef4444", "#eab308"];

interface PropsChartsPie {
  name: string;
  value: number;
}

export const MessagesChart = () => {
  const renderCustomLabel = ({ name, value }: PropsChartsPie) =>
    `Data: ${name} Qtd: ${value}`;
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-muted-foreground ">
            Relátorios promoções mais geradas
          </CardTitle>
          {/* <CardDescription className="text-xs text-muted-foreground">
            Relátorios diário do período
          </CardDescription> */}
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={data}
              dataKey="menssage"
              nameKey="date"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#7b7a8b"
              label={renderCustomLabel}
              innerRadius={64}
              strokeWidth={2}
            />
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="stroke-background hover:opacity-80"
              />
            ))}
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
