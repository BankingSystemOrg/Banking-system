"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createTransfer } from "@/lib/actions/dwolla.actions";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { getBank, getBankByAccountId } from "@/lib/actions/user.actions";
import { decryptId } from "@/lib/utils";

import { BankDropdown } from "./bank/BankDropdown";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(4, "Amount is too short"),
  senderBank: z.string().min(4, "Please select a valid bank account"),
  sharableId: z.string().min(8, "Please select a valid sharable Id"),
});

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      senderBank: "",
      sharableId: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const receiverAccountId = decryptId(data.sharableId);
      const receiverBank = await getBankByAccountId({
        accountId: receiverAccountId,
      });
      const senderBank = await getBank({ documentId: data.senderBank });

      const transferParams = {
        sourceFundingSourceUrl: senderBank.fundingSourceUrl,
        destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
        amount: data.amount,
      };
      // create transfer
      const transfer = await createTransfer(transferParams);

      // create transfer transaction
      if (transfer) {
        const transaction = {
          name: data.name,
          amount: data.amount,
          senderId: senderBank.userId.$id,
          senderBankId: senderBank.$id,
          receiverId: receiverBank.userId.$id,
          receiverBankId: receiverBank.$id,
          email: data.email,
        };

        const newTransaction = await createTransaction(transaction);

        if (newTransaction) {
          form.reset();
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-0">
        {/* Source Bank Section */}
        <div className="space-y-6 pb-8 border-b border-gray-200">
          <div>
            <h3 className="text-18 font-semibold text-gray-900 mb-2">
              Source Account
            </h3>
            <p className="text-14 font-normal text-gray-600">
              Select the bank account you want to transfer funds from
            </p>
          </div>
          
          <FormField
            control={form.control}
            name="senderBank"
            render={() => (
              <FormItem>
                <FormLabel className="text-14 font-medium text-gray-700 mb-2">
                  Select Source Bank
                </FormLabel>
                <FormControl>
                  <BankDropdown
                    accounts={accounts}
                    setValue={form.setValue}
                    otherStyles="!w-full"
                  />
                </FormControl>
                <FormMessage className="text-12 text-red-500 mt-1" />
              </FormItem>
            )}
          />
        </div>

        {/* Transfer Note Section */}
        <div className="space-y-6 py-8 border-b border-gray-200">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-14 font-medium text-gray-700 mb-2">
                  Transfer Note <span className="text-gray-400 font-normal">(Optional)</span>
                </FormLabel>
                <FormDescription className="text-12 font-normal text-gray-600 mb-3">
                  Add any additional information or instructions related to this transfer
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Write a short note here..."
                    className="input-class min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-12 text-red-500 mt-1" />
              </FormItem>
            )}
          />
        </div>

        {/* Recipient Details Section */}
        <div className="space-y-6 py-8 border-b border-gray-200">
          <div>
            <h3 className="text-18 font-semibold text-gray-900 mb-2">
              Recipient Details
            </h3>
            <p className="text-14 font-normal text-gray-600">
              Enter the bank account details of the recipient
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-14 font-medium text-gray-700 mb-2">
                    Recipient&apos;s Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: johndoe@gmail.com"
                      className="input-class"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sharableId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-14 font-medium text-gray-700 mb-2">
                    Receiver&apos;s Plaid Sharable ID
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the public account number"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500 mt-1" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Amount Section */}
        <div className="space-y-6 py-8 border-b border-gray-200">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-14 font-medium text-gray-700 mb-2">
                  Transfer Amount
                </FormLabel>
                <FormDescription className="text-12 font-normal text-gray-600 mb-3">
                  Enter the amount you want to transfer
                </FormDescription>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-16 font-medium">
                      $
                    </span>
                    <Input
                      placeholder="0.00"
                      className="input-class pl-8"
                      type="number"
                      step="0.01"
                      min="0"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-12 text-red-500 mt-1" />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-8 pb-4">
          <Button 
            type="submit" 
            className="w-full md:w-auto min-w-[200px] payment-transfer_btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> 
                <span className="ml-2">Processing Transfer...</span>
              </>
            ) : (
              "Transfer Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentTransferForm;
