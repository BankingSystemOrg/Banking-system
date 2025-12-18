"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from './button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!user) return; // Prevent API call if user is not loaded yet

    const getLinkToken = async () => {
      try {
        // Ensure user has $id for createLinkToken
        const userForToken = {
          ...user,
          $id: user.$id || user.userId,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
        };
        console.log("🔑 Creating Plaid link token for user:", { $id: userForToken.$id, hasFirstName: !!userForToken.firstName });
        const data = await createLinkToken(userForToken);
        setToken(data?.linkToken || '');
      } catch (err) {
        console.error("❌ Error creating link token:", err);
      }
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    try {
      console.log("🔄 Exchanging Plaid public token...");
      console.log("User object:", { $id: user?.$id, userId: user?.userId, hasDwollaId: !!(user?.dwollaCustomerId || user?.dwollaCustomerid) });
      
      // Ensure user has $id for exchangePublicToken
      const userForExchange = {
        ...user,
        $id: user.$id || user.userId,
      };
      
      const result = await exchangePublicToken({ publicToken: public_token, user: userForExchange });
      if (result) {
        console.log("✅ Bank account connected successfully!");
        // Wait a bit for database to update
        await new Promise(resolve => setTimeout(resolve, 500));
        router.push('/');
        router.refresh(); // Refresh to show new account
      } else {
        alert("Failed to connect bank account. Please check console for details.");
      }
    } catch (err: any) {
      console.error("❌ Error exchanging token:", err);
      alert(`Failed to connect bank account: ${err?.message || "Unknown error"}. Please check console for details.`);
    }
  }, [user, router]);

  // Always create a valid config object (hooks must be called unconditionally)
  // Use empty string as token when not available - usePlaidLink will handle it
  const config: PlaidLinkOptions = useMemo(() => ({
    token: token || '',
    onSuccess,
  }), [token, onSuccess]);

  // Call usePlaidLink unconditionally (hooks must always be called in the same order)
  const { open, ready } = usePlaidLink(config);

  // Don't render if token is not available yet
  if (!token) return null;

  return (
    <>
      {variant === 'primary' ? (
        <Button onClick={() => open()} disabled={!ready || !token} className="plaidlink-primary">
          Connect bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button onClick={() => open()} variant="ghost" className="plaidlink-ghost" disabled={!ready || !token}>
          <Image src="/icons/connect-bank.svg" alt="connect bank" width={24} height={24} />
          <p className='hidden xl:block text-[16px] font-semibold text-black-2'>Connect bank</p>
        </Button>
      ) : (
        <Button onClick={() => open()} className="plaidlink-default" disabled={!ready || !token}>
          <Image src="/icons/connect-bank.svg" alt="connect bank" width={24} height={24} />
          <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
