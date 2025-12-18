'use client';
import React, { useEffect } from 'react'

const AnimatedCounter = ({amount} : {amount : number}) => {
  // Ensure amount is a valid number
  const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;

  // Format amount for display
  const formattedAmount = safeAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Debug log in browser console
  useEffect(() => {
    console.log('AnimatedCounter rendered - amount:', amount, 'safeAmount:', safeAmount, 'formattedAmount:', formattedAmount);
  }, [amount, safeAmount, formattedAmount]);

  // Always show the amount directly with the correct CSS class
  return (
    <div className='total-balance-amount' style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
      ${formattedAmount}
    </div>
  )
}

export default AnimatedCounter