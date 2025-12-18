import { Doughnut } from 'react-chartjs-2';
import DoughnutChart from './DoughnutChart';
import { formatAmount } from '@/lib/utils';

const TotalBalanceBox = ({
    accounts = [],
    totalBanks = 0,
    totalCurrentBalance = 0,
}: TotlaBalanceBoxProps) => {
  // Ensure totalCurrentBalance is a number
  const balance = typeof totalCurrentBalance === 'number' ? totalCurrentBalance : 
                  typeof totalCurrentBalance === 'string' ? parseFloat(totalCurrentBalance) || 0 : 0;

  // Format the amount
  const formattedBalance = formatAmount(balance);

  return (
    <section className='total-balance'>
        <div className='total-balance-chart'>
            <DoughnutChart accounts={accounts} />
        </div>
        <div className='flex flex-col gap-6'>
            <h2 className='header-2'>Bank Accounts: {totalBanks}</h2>
            <div className='flex flex-col gap-2'>
                <p className='total-balance-label'>Total Current Balance</p>
                <div className='total-balance-amount' style={{ color: '#101828', fontSize: '24px', fontWeight: 600 }}>
                    {formattedBalance}
                </div>
                {/* Temporary debug - remove after confirming it works */}
                <div style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>
                  DEBUG: balance={balance}, formatted={formattedBalance}
                </div>
            </div>
        </div>
    </section>
  )
}

export default TotalBalanceBox