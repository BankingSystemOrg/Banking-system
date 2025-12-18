# 📋 Appwrite Bank Collection Attributes Setup

## Required Attributes for Bank Collection

Go to your **Appwrite Console** → **Database** → **Your Bank Collection** → **Attributes** and add these attributes:

### 1. **accessToken**
- **Type**: `String`
- **Size**: `255` (or larger if needed)
- **Required**: ✅ Yes
- **Array**: ❌ No
- **Description**: Plaid access token for the bank account

### 2. **userId** (You already have this ✅)
- **Type**: `String`
- **Size**: `255`
- **Required**: ✅ Yes
- **Array**: ❌ No
- **Description**: User ID who owns this bank account

### 3. **accountId**
- **Type**: `String`
- **Size**: `255`
- **Required**: ✅ Yes
- **Array**: ❌ No
- **Description**: Plaid account ID

### 4. **bankId**
- **Type**: `String`
- **Size**: `255`
- **Required**: ✅ Yes
- **Array**: ❌ No
- **Description**: Plaid item/bank ID

### 5. **fundingSourceUrl**
- **Type**: `String`
- **Size**: `500` (URLs can be long)
- **Required**: ❌ No (Optional)
- **Array**: ❌ No
- **Description**: Dwolla funding source URL (for transfers)

### 6. **sharaebleId**
- **Type**: `String`
- **Size**: `255`
- **Required**: ❌ No (Optional)
- **Array**: ❌ No
- **Description**: Encrypted shareable account ID for transfers

---

## Quick Setup Steps:

1. **Open Appwrite Console**
   - Go to your project
   - Navigate to **Database** → **Your Bank Collection**

2. **Add Each Attribute**
   - Click **"Create Attribute"**
   - Enter the attribute name (exactly as listed above)
   - Select the type and settings
   - Click **"Create"**

3. **Verify All Attributes**
   - Make sure you have all 6 attributes listed above
   - Double-check spelling (especially `accessToken`, `fundingSourceUrl`, `sharaebleId`)

4. **Test Bank Connection**
   - Try connecting a bank again via Plaid
   - It should work now!

---

## Important Notes:

- ⚠️ **Attribute names are case-sensitive** - use exactly: `accessToken`, `userId`, `accountId`, `bankId`, `fundingSourceUrl`, `sharaebleId`
- ✅ `userId` is already there, so you only need to add the other 5
- 🔒 `accessToken` stores sensitive Plaid tokens - make sure your collection has proper permissions
- 📝 `fundingSourceUrl` and `sharaebleId` are optional but recommended for full functionality

---

## After Adding Attributes:

Once you've added all attributes, try connecting a bank again. The bank account should save successfully!

