# Developer Onboarding & Access Checklist

> Required access and setup guide for developers working on the Afterlife project

---

## Table of Contents

- [Required Access](#required-access)
- [Optional Access](#optional-access)
- [Local Development Setup](#local-development-setup)
- [Credentials & Documentation](#credentials--documentation)
- [Onboarding Steps](#onboarding-steps)
- [Important Guidelines](#important-guidelines)

---

## Required Access

Before starting development, the developer needs access to the following systems:

### 1. GitHub Repository

- [ ] Repository read/write access
- [ ] Understanding of branch protection rules
- [ ] Ability to create pull requests
- [ ] Familiarity with commit conventions

**What Developer Needs:**
- GitHub account username
- SSH key setup for git operations
- Understanding of the branching strategy

**Repository Details:**
- **URL:** (Add GitHub repository URL)
- **Main Branch:** `main`
- **Development Branch:** (Specify if using develop branch)

---

### 2. Vercel Account & Project Access

- [ ] Added to Vercel team/project
- [ ] Deployment access
- [ ] Build logs and analytics access
- [ ] Environment variables access (if any)

**What Developer Needs:**
- Vercel account (can sign up with GitHub)
- Project name and team details
- Understanding of deployment workflow

**Vercel Details:**
- **Project Name:** (Add Vercel project name)
- **Team/Organization:** (Add team name)
- **Deployment URL:** https://after-life.asia
- **Auto-deploy:** Yes (from main branch)

**Key Features:**
- Automatic deployments on push to main
- Preview deployments for PRs
- Vercel Speed Insights enabled
- Build logs accessible to all team members

---

### 3. Domain Management

- [ ] DNS configuration access
- [ ] SSL certificate management
- [ ] Domain registrar access

**What Developer Needs:**
- Domain registrar login credentials
- DNS provider access (if different from registrar)
- Understanding of current DNS setup

**Domain Details:**
- **Domain:** after-life.asia
- **Registrar:** GoDaddy
- **DNS Provider:** Current setup is functional
- **Current Setup:**
  - A records pointing to Vercel
  - SSL via Vercel (automatic)

**For Additional Details:**
- Contact: @BhanaviShukla

**Common Tasks:**
- Verify DNS records are correctly pointing to Vercel
- Renew SSL certificates (usually automatic via Vercel)
- Update DNS if needed for new services

---

### 4. SonarCloud Access

- [ ] Project access for code quality monitoring
- [ ] Ability to view quality gates
- [ ] Access to code analysis reports
- [ ] Understanding of quality standards

**What Developer Needs:**
- SonarCloud account (can sign up with GitHub)
- Organization and project access

**SonarCloud Details:**

For access to the following information, contact @BhanaviShukla:

- [ ] **Organization name** - Request from @BhanaviShukla
- [ ] **Project Key** - Request from @BhanaviShukla
- [ ] **Project URL** - Request from @BhanaviShukla
- [ ] **Access granted to your account** - Request from @BhanaviShukla

**Key Metrics:**
- Code quality gate status
- Security vulnerabilities
- Code smells and technical debt
- Test coverage (when implemented)

---

## Optional Access

The following access may be needed depending on the work assigned:

### 5. Google Cloud Platform (Future)

**Only needed if implementing email capture to Google Sheets**

- [ ] GCP project access
- [ ] Service account creation rights
- [ ] Google Sheets API enabled
- [ ] OAuth credentials (if needed)

**What Will Be Needed:**
- Google Cloud Console access
- Service account JSON key
- Google Sheet ID for email storage
- API quotas understanding

**Setup Steps (when required):**
1. Create GCP project or get access to existing one
2. Enable Google Sheets API
3. Create service account with appropriate permissions
4. Share target Google Sheet with service account email
5. Download service account JSON key
6. Store credentials securely (environment variables)

---

### 6. Design Assets & Tools

- [ ] Figma access (if applicable)
- [ ] Brand guidelines document
- [ ] Illustration source files
- [ ] Design system documentation

**What Developer Needs:**
- Figma account and project access
- Export permissions for assets
- Understanding of design token system

**Asset Details:**
- **Design Tool:** (Specify - Figma, Sketch, etc.)
- **Project Link:** (Add link if applicable)
- **Brand Colors:** See FEATURES.md Design System section
- **Typography:** Custom Google Fonts (see code)

---

## Local Development Setup

### Prerequisites

Ensure the following are installed on your machine:

- [ ] **Node.js 18+** (LTS version recommended)
- [ ] **npm** or **yarn** (npm comes with Node.js)
- [ ] **Git** with SSH keys configured
- [ ] **Code Editor** (VS Code recommended)
- [ ] **Modern Browser** (Chrome, Firefox, Safari, or Edge)

### Installation Steps

```bash
# 1. Clone the repository
git clone [REPOSITORY_URL]
cd afterlife

# 2. Install dependencies
npm install
# or
yarn install

# 3. Run development server
npm run dev
# or
yarn dev

# 4. Open browser
# Navigate to http://localhost:3000
```

### Verify Setup

- [ ] Dev server starts without errors
- [ ] Application loads at localhost:3000
- [ ] No console errors in browser
- [ ] Can navigate through the will creation flow
- [ ] Session storage works (data persists on refresh)

### Build & Production Test

```bash
# Build for production
npm run build

# Start production server
npm run start

# Test production build locally
# Navigate to http://localhost:3000
```

---

## Credentials & Documentation

**Store all credentials in a secure password manager (1Password, LastPass, Bitwarden, etc.)**

### Credential Checklist

Create entries for:

1. **GitHub Repository**
   - Repository URL
   - Access level
   - Branch strategy notes

2. **Vercel**
   - Team/organization name
   - Project name
   - Login method (GitHub OAuth, email, etc.)
   - Dashboard URL

3. **Domain Registrar**
   - Registrar: GoDaddy
   - Login URL
   - Username/email
   - Password
   - Two-factor authentication backup codes
   - Domain: after-life.asia
   - For access: Contact @BhanaviShukla

4. **SonarCloud**
   - For all details, contact @BhanaviShukla:
     - Organization name
     - Project key
     - Login method
     - Dashboard URL

5. **Google Cloud (when needed)**
   - Project ID
   - Service account details
   - API keys (stored as environment variables)

### Documentation Links

- **Main Documentation:** [FEATURES.md](FEATURES.md) - Complete feature list and architecture
- **Production Site:** https://after-life.asia
- **Repository:** (Add GitHub URL)
- **Vercel Dashboard:** (Add Vercel dashboard URL)
- **SonarCloud Project:** (Add SonarCloud URL)

---

## Onboarding Steps

### Week 1: Setup & Familiarization

#### Day 1-2: Access & Environment

- [ ] Request all required access (GitHub, Vercel, Domain, SonarCloud)
- [ ] Set up local development environment
- [ ] Clone repository and install dependencies
- [ ] Run dev server successfully
- [ ] Verify production build works

#### Day 3-4: Code Exploration

- [ ] Read [FEATURES.md](FEATURES.md) thoroughly
- [ ] Understand the architecture (JAMstack, client-side only)
- [ ] Review the Tech Stack section
- [ ] Explore the codebase structure:
  - `/src/app` - Next.js App Router pages
  - `/src/views` - Page-level components
  - `/src/components/ui` - UI component library
  - `/src/appState` - State management
  - `/public` - Static assets and will templates

#### Day 5: Test User Journey

- [ ] Complete the entire will creation flow manually
- [ ] Test all features:
  - User profile entry
  - Children & guardians
  - Pets & caretakers
  - Assets & distribution
  - Funeral rites
  - Executor appointment
  - Dashboard review
- [ ] Attempt to download a will (note: template is incomplete)
- [ ] Verify session storage behavior
- [ ] Test on mobile and desktop

### Week 2: Start Contributing

- [ ] Review open issues or assigned tasks
- [ ] Understand current priority: **Will Template Mustache Integration**
- [ ] Set up task tracking (if using)
- [ ] Make first small contribution (fix typo, update comment, etc.)
- [ ] Create first pull request
- [ ] Get familiar with code review process

---

## Important Guidelines

### Critical Architecture Rules

1. **No Backend Without Approval**
   - This is a client-side only application
   - All data stays in browser sessionStorage
   - Do not add API routes without explicit approval
   - Privacy-first approach is intentional

2. **Session Storage Only**
   - No localStorage (session storage only)
   - Data is temporary (lost on tab close)
   - This is intentional for security/privacy
   - Do not implement cloud storage without approval

3. **No Authentication System**
   - Users are anonymous
   - No user accounts or login system
   - Do not add authentication unless explicitly requested

4. **Pure JavaScript**
   - No TypeScript in this project
   - Keep with existing patterns
   - Do not convert to TypeScript without approval

### Development Best Practices

1. **Branch Strategy**
   - Create feature branches from `main`
   - Use descriptive branch names: `feature/will-template-mustache`
   - Keep PRs focused and small when possible

2. **Commit Messages**
   - Write clear, descriptive commit messages
   - Follow existing commit style in git log
   - Reference issue numbers if applicable

3. **Code Style**
   - Follow existing code patterns
   - Use existing UI components when possible
   - Keep consistent indentation and formatting
   - Run linter before committing

4. **Testing**
   - Manual testing is currently the standard
   - Test all user journeys after changes
   - Test on multiple browsers (Chrome, Safari, Firefox)
   - Test mobile and desktop viewports

5. **Pull Requests**
   - Provide clear description of changes
   - Include screenshots for UI changes
   - Request review from team lead
   - Address review comments promptly

### Prohibited Actions

❌ **Do NOT:**
- Add backend/database without approval
- Use localStorage (use sessionStorage only)
- Add payment systems without approval
- Implement authentication without approval
- Convert to TypeScript without approval
- Add external analytics beyond Vercel
- Remove or modify security features
- Change the privacy-first architecture
- Deploy to production without approval
- Modify DNS or domain settings without approval

✅ **Do:**
- Follow existing patterns and architecture
- Ask questions when unsure
- Test thoroughly before submitting PR
- Keep privacy-first approach
- Document your code
- Keep PRs focused and reviewable
- Communicate blockers early

---

## Getting Help

### Communication Channels

- **Project Lead:** @BhanaviShukla
- **Domain/Access Questions:** Contact @BhanaviShukla
- **Code Questions:** (Add Slack channel / Email)
- **Access Issues:** Contact @BhanaviShukla
- **Urgent Issues:** (Add emergency contact if applicable)

### Common Issues & Solutions

**Issue:** `npm install` fails
- **Solution:** Ensure Node.js 18+ is installed, clear npm cache: `npm cache clean --force`

**Issue:** Port 3000 already in use
- **Solution:** Kill the process or use different port: `PORT=3001 npm run dev`

**Issue:** Changes not reflecting in browser
- **Solution:** Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

**Issue:** Session storage not working
- **Solution:** Check browser privacy settings, ensure cookies/storage not blocked

**Issue:** Cannot access Vercel/SonarCloud
- **Solution:** Contact project lead to verify access was granted

---

## Next Steps After Onboarding

Once you've completed the onboarding checklist:

1. **Review Priority Tasks:** Check [FEATURES.md](FEATURES.md) Priority Recommendations section
2. **Critical Task:** Will Template Mustache Integration (12-20 hours)
3. **Assigned Work:** Check with project lead for your specific assignments
4. **Ask Questions:** Don't hesitate to ask for clarification
5. **Start Small:** Consider starting with smaller TODOs before tackling critical path

---

## Checklist Summary

### Required Before Starting

- [ ] GitHub repository access
- [ ] Vercel project access
- [ ] Domain management access (if needed)
- [ ] SonarCloud access
- [ ] Local environment set up successfully
- [ ] Read FEATURES.md completely
- [ ] Completed test user journey
- [ ] Understand privacy-first architecture
- [ ] Know what NOT to do (prohibited actions)
- [ ] Have emergency contacts

### Optional But Helpful

- [ ] GCP access (for future email capture)
- [ ] Design tool access
- [ ] Password manager set up with credentials
- [ ] Communication channels joined
- [ ] First PR created and merged

---

_Last Updated: 2025-11-03_
_Onboarding Document Version: 1.0_

**Questions?** Contact the project lead or refer to [FEATURES.md](FEATURES.md) for technical details.
