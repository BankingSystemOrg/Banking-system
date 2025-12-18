import { cn, formatAmount } from "@/lib/utils";

import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

export const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === "greeting" && (
          <span className="text-bankGradient"> {user}</span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export const PageHeader = ({
  topTitle,
  bottomDescription,
  topDescription,
  bottomTitle,
  connectBank,
}: PageHeaderProps) => {
  return (
    <header className="flex flex-col">
      <h1 className="text-30 font-semibold text-gray-900">{topTitle}</h1>
      <p
        className={cn("text-16 py-2 font-normal text-gray-600", {
          "pb-8": connectBank,
        })}
      >
        {topDescription}
      </p>
      <div
        className={cn("flex flex-col gap-1 pt-8", {
          "border-t border-gray-200 pb-5 pt-6": connectBank,
        })}
      >
        <h2 className="text-18 font-semibold text-gray-900">{bottomTitle}</h2>
        <p className="text-16 font-normal text-gray-600">{bottomDescription}</p>
      </div>
    </header>
  );
};

export const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotlaBalanceBoxProps) => {
  // Ensure totalCurrentBalance is a number
  const balance = typeof totalCurrentBalance === 'number' ? totalCurrentBalance : 
                  typeof totalCurrentBalance === 'string' ? parseFloat(totalCurrentBalance) || 0 : 0;

  // Format the amount
  const formattedBalance = formatAmount(balance);

  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="header-2">Bank Accounts: {totalBanks}</h2>

        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balance</p>

          <div className="total-balance-amount">
            {formattedBalance}
          </div>
        </div>
      </div>
    </section>
  );
};
