# 📋 Appwrite Transaction Collection Attributes Setup

## Required Attributes for Transaction Collection

Go to your **Appwrite Console** → **Database** → **Your Transaction Collection** → **Attributes** and add these attributes:

### 1. **name**
- **Type**: `String`
- **Size**: `255`
- **Required**: ✅ Yes
- **Array**: ❌ No
- **Description**: Transaction name/description (e.g., "Starbucks Coffee", "Salary Deposit")

### 2. **amount**
- **Type**: `Double` (or `Integer` if you prefer cents)
- **Required**: ✅ Yes
- **Array**: ❌ No
- **Description**: Transaction amount (positive for credits, negative for debits)

### 3. **channel**
- **Type**: `String`
- **Size**: `50`
- **Required**: ✅ Yes
- **Array**: ❌ No
- **Description**: Payment channel (e.g., "online", "in store", "other")
- **Example Values**: `"online"`, `"in store"`, `"other"`

### 4. **category**
- **Type**: `String`
- **Size**: `100`
- **Required**: ✅ Yes
- **Array**: ❌ No
- **Description**: Transaction category
- **Example Values**: `"Food and Drink"`, `"Travel"`, `"Transfer"`, `"Shopping"`, `"Entertainment"`

### 5. **senderBankId**
- **Type**: `String`
- **Size**: `255`
- **Required**: ❌ No (Optional - can be empty string for incoming transfers)
- **Array**: ❌ No
- **Description**: Appwrite bank document ID for the sender (empty string if incoming)

### 6. **receiverBankId**
- **Type**: `String`
- **Size**: `255`
- **Required**: ❌ No (Optional - can be empty string for outgoing transfers)
- **Array**: ❌ No
- **Description**: Appwrite bank document ID for the receiver (empty string if outgoing)

### 7. **type** (Optional but Recommended)
- **Type**: `String`
- **Size**: `20`
- **Required**: ❌ No
- **Array**: ❌ No
- **Description**: Transaction type
- **Example Values**: `"debit"`, `"credit"`

---

## Quick Setup Steps:

1. **Open Appwrite Console**
   - Go to your project
   - Navigate to **Database** → **Your Transaction Collection**

2. **Add Each Attribute**
   - Click **"Create Attribute"**
   - Enter the attribute name (exactly as listed above)
   - Select the type and settings
   - Click **"Create"**

3. **Verify All Attributes**
   - Make sure you have all 7 attributes listed above
   - Double-check spelling (especially `senderBankId`, `receiverBankId`)

4. **Test Transaction Creation**
   - Try using the demo data seeder on the home page
   - Transactions should save successfully!

---

## Important Notes:

- ⚠️ **Attribute names are case-sensitive** - use exactly: `name`, `amount`, `channel`, `category`, `senderBankId`, `receiverBankId`, `type`
- 💰 **Amount** can be positive (credits/deposits) or negative (debits/withdrawals)
- 🔄 **senderBankId** and **receiverBankId** can be empty strings (`""`) for one-way transactions
- 📊 **channel** and **category** are used for filtering and display in the UI
- 🔍 These attributes are queried by `senderBankId` and `receiverBankId` to find transactions for a specific bank account

---

## Example Transaction Data:

```json
{
  "name": "Starbucks Coffee",
  "amount": -5.50,
  "channel": "online",
  "category": "Food and Drink",
  "senderBankId": "bank-doc-id-123",
  "receiverBankId": "",
  "type": "debit"
}
```

```json
{
  "name": "Salary Deposit",
  "amount": 3500.00,
  "channel": "other",
  "category": "Transfer",
  "senderBankId": "",
  "receiverBankId": "bank-doc-id-123",
  "type": "credit"
}
```

---

## After Adding Attributes:

Once you've added all attributes, try:
1. Using the demo data seeder on the home page
2. Creating a payment transfer
3. Viewing transaction history

Everything should work now! 🎉

