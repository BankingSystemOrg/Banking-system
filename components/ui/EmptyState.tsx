"use client";

type EmptyStateProps = {
  user: any;
};

const EmptyState = ({ user }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h2 className="text-24 font-semibold text-gray-900">Connect Your Bank Account</h2>
      <p className="text-16 font-normal text-gray-600 text-center max-w-md">
        Get started by connecting your bank account to view your transactions and manage your finances.
      </p>
      <p className="text-14 text-gray-500 text-center">
        Use the "Connect bank" button in the right sidebar to get started.
      </p>
    </div>
  );
};

export default EmptyState;

