import { Card, Row, Col } from "antd";
import { useEffect, useState } from "react";
import http from "../../../utils/http";
import Loader from "../loader";
import DailyTransactionChart from "../DailyTransactions";

const Report = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    http
      .get("/api/dashboard/report")
      .then((res) => setReport(res.data))
      .catch(console.error);
  }, []);

  if (!report) return <Loader />;

  const { summary, chart } = report;

  return (
    <div className="space-y-6">

      <Row gutter={[16, 16]}>

        <Col xs={24} md={12} lg={6}>
          <Card title="Transactions">
            <h1 className="text-3xl font-bold">
              {summary.totalTransaction}
            </h1>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card title="Income">
            <h1 className="text-3xl font-bold text-green-600">
              ₹ {summary.totalCredit}
            </h1>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card title="Expense">
            <h1 className="text-3xl font-bold text-red-600">
              ₹ {summary.totalDebit}
            </h1>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card title="Balance">
            <h1 className="text-3xl font-bold text-blue-600">
              ₹ {summary.balance}
            </h1>
          </Card>
        </Col>

      </Row>

      <DailyTransactionChart transactions={chart} />

    </div>
  );
};

export default Report;