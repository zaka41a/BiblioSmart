# 📚 BiblioSmart - User Guide

**Version**: Beta 1.0
**Audience**: Librarians and administrators
**Reading time**: 15 minutes

---

## 🎯 Welcome to BiblioSmart!

BiblioSmart is your digital assistant for managing your modern library:
- 📖 Online catalog accessible 24/7
- 🔍 Fast and smart search
- 📊 Real-time statistics
- 👥 Simple reader management
- 📱 Accessible on mobile and desktop

---

## 🚀 Quick Start (5 minutes)

### 1️⃣ First Login

**URL**: https://bibliosmart.app

1. Click on **"Login"**
2. Enter your email and temporary password
3. You will be prompted to change your password
4. Choose a secure password (min. 8 characters)

✅ **You're logged in!**

### 2️⃣ Discover the Interface

**As an Administrator**, you will see:

```
┌─────────────────────────────────────────────┐
│  BiblioSmart          🔍 Search        👤   │
├─────────────────────────────────────────────┤
│                                             │
│  📊 Dashboard                               │
│  ├─ Books in library: 456                  │
│  ├─ Active readers: 124                    │
│  ├─ Current loans: 89                      │
│  └─ New this week: 12                      │
│                                             │
│  🔥 Quick Actions                           │
│  [+ Add a book]  [📋 View loans]           │
│                                             │
└─────────────────────────────────────────────┘

Side menu:
📊 Dashboard
📚 Book Management
👥 User Management
📈 Analytics
⚙️  Settings
```

### 3️⃣ Your First Action: Add a Book

1. Click on **"Book Management"** in the menu
2. Click on **"+ Add a book"**
3. Fill in the information:
   ```
   Title*:        Clean Code
   Author*:       Robert C. Martin
   ISBN:          978-0132350884
   Category*:     Programming
   Year:          2008
   Price:         29.99 (optional)
   Description:   A guide to...
   Cover URL:     https://... (optional)
   ```
4. Click on **"Save"**

🎉 **Your first book is added!**

---

## 📖 Book Management

### Adding Books

**Method 1: One by one** (for getting started)
- Button "+ Add a book"
- Fill in the form
- Save

**Method 2: Bulk import** (recommended)
- Prepare a CSV file with your books
- CSV format:
  ```csv
  title,author,isbn,category,year,price,description,coverUrl
  "1984","George Orwell","9780451524935","Fiction",1949,15.99,"Dystopia...","https://..."
  "The Little Prince","Antoine de Saint-Exupéry","9782070408504","Youth",1943,12.99,"Tale...","https://..."
  ```
- Go to **Settings > Import**
- Upload your CSV
- Review and confirm

### Editing a Book

1. Go to **"Book Management"**
2. Search for the book to edit
3. Click on **✏️ Edit**
4. Change the information
5. **Save**

### Deleting a Book

1. Find the book
2. Click on **🗑️ Delete**
3. Confirm the action

⚠️ **Warning**: Cannot delete a book currently on loan!

### Managing Availability

**Mark a book as unavailable**:
- Useful if the book is lost, damaged, or being repaired
- In the book details: **Toggle "Available"**

**Make available again**:
- Same process, reactivate "Available"

---

## 👥 User Management

### User Types

**Administrator** (you):
- Manages books
- Manages readers
- Views statistics
- Configures the library

**Reader**:
- Browses the catalog
- Borrows books (if configured)
- Views their history
- Receives notifications

### Invite a Colleague Administrator

1. Go to **"User Management"**
2. Click on **"+ Invite a user"**
3. Fill in:
   ```
   Email:     colleague@library.com
   Name:      Mary Smith
   Role:      Administrator
   ```
4. Send the invitation

Your colleague will receive an email with their access!

### Add a Reader

**Option 1: Free registration**
- Readers can register themselves via the website
- You validate their account (if configured)

**Option 2: Manual invitation**
- Same process as above
- Choose the role "Reader"

### View Active Readers

1. **User Management**
2. Filter by:
   - Role (Reader/Admin)
   - Status (Active/Inactive)
   - Last login

### Suspend a Reader

In case of repeated delays or abuse:
1. Find the user
2. Click on **"Actions"** → **"Suspend"**
3. The reader can no longer borrow (but can browse)

---

## 📊 Dashboard & Statistics

### Overview

Your dashboard displays:

**Main Metrics**:
- 📚 **Total books**: Number of books in your catalog
- 👥 **Active readers**: Readers who logged in this month
- 📖 **Current loans**: Books currently on loan
- 🔄 **Expected returns**: Books to be returned this week

**Charts**:
- 📈 Loan trends (last 30 days)
- 📊 Top 10 most borrowed categories
- 👑 Top 5 most popular books

### Advanced Analytics

To go further (Menu **Analytics**):

**Categories**:
- Which category is most borrowed?
- Which category has the most books?
- Trends by month

**Readers**:
- Most active readers
- New readers per month
- Retention rate

**Books**:
- Books never borrowed (to promote!)
- Most popular books (order duplicates?)
- Average loan duration

💡 **Tip**: Export data as CSV for external analysis (Excel)

---

## 🔍 Search & Catalog

### Simple Search

The search bar at the top:
```
🔍 Search for a book, author, ISBN...
```

**Examples**:
- "Orwell" → Finds all books by George Orwell
- "1984" → Finds the book "1984" and others with 1984 in the title
- "978-0451524935" → Search by ISBN

### Advanced Filters

On the **Catalog** page:

**Filter by**:
- 📂 Category (Fiction, Science, Youth...)
- 🗓️ Publication year
- 💰 Price (Free / Paid)
- ✅ Availability (Available / On loan)

**Sort by**:
- Date added (Most recent)
- Title (A-Z)
- Author (A-Z)
- Popularity (Most borrowed)

### Detailed Book View

Click on a book to see:
- 🖼️ Cover
- 📖 Title, Author, ISBN
- 📝 Full description
- ⭐ Number of loans
- 👥 Readers who borrowed it
- 📅 Loan history

---

## ⚙️ Library Settings

### General Information

**Settings > Organization**:
- Your library name
- Address
- Contact email
- Phone

### Subscription Management

**Settings > Subscription**:

View:
- Current plan (Trial / Basic / Pro)
- Period end date
- Usage (books/limit, users/limit)

Actions:
- Update plan
- Manage payment (Stripe)
- View billing history

### Notifications

**Settings > Notifications**:

Configure:
- Reminder email for upcoming returns (3 days before)
- Overdue email
- New book email
- Newsletter frequency

### Integrations

**Settings > Integrations**:

Connect:
- EmailJS (for email notifications)
- Google Analytics (for tracking)
- External API (if needed)

---

## 💡 Common Use Cases

### Scenario 1: A Reader Wants to Borrow

**If physical loan system**:
1. The reader asks you for the book
2. You search for the book in BiblioSmart
3. You mark the book as "On loan" (toggle Available)
4. The reader leaves with the physical book
5. BiblioSmart sends an automatic reminder before the return date

**If digital system** (PDF):
1. The reader purchases access (if paid)
2. BiblioSmart unlocks the PDF
3. The reader can read online or download

### Scenario 2: Book Return

1. The reader returns the physical book to you
2. You search for the book in BiblioSmart
3. You mark it as "Available"
4. The reader can see the book in their history

### Scenario 3: Initial Catalog Import

**You have 500+ books to import**:

1. **Create the CSV**:
   - Open Excel/Google Sheets
   - Columns: title, author, isbn, category, year
   - Fill in line by line

2. **Save as CSV**:
   - File > Save as
   - Format: CSV (UTF-8)

3. **Import into BiblioSmart**:
   - Settings > Import
   - Choose the file
   - Map columns (if different)
   - Review data
   - Import

4. **Verification**:
   - View books in the catalog
   - Correct any errors

### Scenario 4: End of Month - Analysis

**Each end of month**:

1. Go to **Analytics**
2. Select period: "This month"
3. Note:
   - Number of loans
   - New readers
   - Popular categories
4. Export report (PDF/CSV)
5. Identify trends:
   - Need for new books in a category?
   - Campaign to promote an underutilized category?

---

## 📱 Mobile Usage

BiblioSmart works perfectly on smartphones and tablets!

**Mobile navigation**:
```
☰ Hamburger menu (top left)
├─ Dashboard
├─ Catalog
├─ Book Management
├─ User Management
└─ Settings
```

**Advantages**:
- Add a book directly from your smartphone (photo of the cover)
- Mark a return while you're at the desk
- Check stats on the go

---

## ⌨️ Keyboard Shortcuts (Desktop)

**Navigation**:
- `Ctrl + K` : Open quick search
- `Ctrl + /` : Show shortcuts
- `Esc` : Close modals

**Actions**:
- `Ctrl + N` : New book (on Books page)
- `Ctrl + E` : Edit (when a book is selected)
- `Ctrl + S` : Save (in forms)

---

## 🆘 Help & Support

### In Case of Problem

**1. Check the FAQ**:
https://bibliosmart.app/faq

Frequent questions:
- How to reset my password?
- How to delete a reader?
- How to export my data?
- Can I cancel my subscription?

**2. Video Tutorials**:
https://bibliosmart.app/videos

Short videos (2-5 min):
- Quick start
- Add 100 books in 10 minutes
- Configure notifications
- Read statistics

**3. Contact Support**:

**Email**: support@bibliosmart.app
**Response**: < 4 hours (business days)

**Slack** (Beta testers): #beta-support
**Response**: Real-time

**In your email, specify**:
- Your name and organization
- The problem encountered
- Screenshots (if applicable)
- Browser used (Chrome, Safari, etc.)

---

## ✅ Checklist: My First Days

### Day 1: Initial Setup
- [ ] First successful login
- [ ] Password changed
- [ ] Interface tour (15 min)
- [ ] First book added manually

### Day 2-3: Catalog Import
- [ ] Create CSV of your catalog
- [ ] Import CSV into BiblioSmart
- [ ] Verify imported books
- [ ] Correct any errors

### Day 4-5: Configuration
- [ ] Invite your admin colleagues
- [ ] Configure library information
- [ ] Set up email notifications
- [ ] Test reader registration

### Week 2: Daily Usage
- [ ] Mark loans/returns
- [ ] Add new books
- [ ] Check statistics
- [ ] Explore analytics

### Week 3-4: Optimization
- [ ] Analyze books never borrowed
- [ ] Identify popular categories
- [ ] Train other team members
- [ ] Promote catalog to readers

---

## 💰 Plans & Limits

### Your Current Plan

Check in **Settings > Subscription**:

**TRIAL Plan** (Beta testers):
- ✅ Unlimited books
- ✅ Unlimited users
- ✅ All features
- ✅ Priority support
- ⏰ Duration: Beta + 3 months free

**After the free period**:

**Basic Plan - $29/month**:
- 1,000 books max
- 3 administrators
- 10 GB storage
- Email support

**Pro Plan - $79/month** (Recommended):
- Unlimited books
- 10 administrators
- 50 GB storage
- Priority support
- Advanced analytics

### What happens if I exceed the limits?

**Soft Limits** (Warning):
- Email at 80% of limit
- Email at 95% of limit

**Hard Limits** (Blocking):
- Cannot add more books
- Invitation to upgrade to higher plan

---

## 🔐 Security & Privacy

### Your Data is Secure

✅ **Encryption**: HTTPS everywhere (SSL 256-bit)
✅ **Authentication**: JWT with bcrypt
✅ **Isolation**: Your data is isolated from other libraries
✅ **Backups**: Daily automatic backups
✅ **GDPR**: Full compliance (data hosted in Europe)

### Best Practices

**Password**:
- Minimum 8 characters
- Mix uppercase/lowercase/numbers
- Unique (don't reuse)
- Change every 6 months

**Account**:
- Never share your credentials
- Logout after use (shared computers)
- Report any suspicious activity

### Export Your Data

**At any time** (Settings > Export):
- Export your entire catalog (CSV)
- Export reader list
- Export loan history
- **Your data belongs to you!**

---

## 📞 Contact & Community

### Stay Connected

**Website**: https://bibliosmart.app
**Email**: contact@bibliosmart.app
**Twitter**: @BiblioSmartApp
**LinkedIn**: BiblioSmart

### Beta Testers Community

**Slack**: #beta-libraries
- Share your tips
- Ask questions
- Help others
- Get early news about updates

### Newsletter

Subscribe to receive:
- Product updates (1x/month)
- Library best practices
- Inspiring case studies
- Exclusive offers

---

## 🚀 Go Further

### Advanced Resources

**BiblioSmart Blog**:
- "10 tips to promote your catalog"
- "Analyze your data to better serve your readers"
- "Create engaging thematic collections"

**Monthly Webinars** (free):
- New feature demonstrations
- Q&A sessions
- Guest library experts

### Become an Ambassador

Love BiblioSmart?

**Ambassador Program**:
- Refer other libraries
- Get 1 month free per referral
- Special "Ambassador" badge
- Early access to new features

---

## 📝 Give Your Feedback

Your opinion matters! 💙

**Feedback Form** (5 min):
https://forms.bibliosmart.app/feedback

**What interests us?**:
- What you like ❤️
- What frustrates you 😤
- Bugs encountered 🐛
- Features you want ⭐

**Every feedback counts** to improve BiblioSmart!

---

## 🎉 Welcome to the BiblioSmart Community!

You now have all the keys to transform your library! 📚✨

**Need help?** Don't hesitate to contact us!

Happy managing,
The BiblioSmart Team 💙

---

**Guide updated**: December 2024
**Version**: Beta 1.0
**PDF available**: https://bibliosmart.app/guides/user-guide.pdf
