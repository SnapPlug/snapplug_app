# GEO-SEO Audit Report — snapplug.app
**Date:** 2026-03-13 | **Tool:** geo-seo-claude

---

## Overall GEO Score: 42 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| AI Citability & Visibility | 25% | 49 | 12.2 |
| Brand Authority Signals | 20% | 12 | 2.4 |
| Content Quality / E-E-A-T | 20% | 30 | 6.0 |
| Technical Foundations | 15% | 74 | 11.1 |
| Structured Data | 10% | 42 | 4.2 |
| Platform Optimization | 10% | 59 | 5.9 |
| **Total** | | | **41.8 / 100** |

---

## Platform Scores

| Platform | Score | Status |
|---|---|---|
| Claude (Anthropic) | 72 | Best — needs author entity |
| ChatGPT / OpenAI | 68 | Needs expanded llms.txt + sameAs |
| Google AI Overviews | 62 | Needs HowTo schema (now added) + price range |
| Perplexity AI | 55 | Needs external citations + case study pages |
| Naver AI / HyperCLOVA X | 38 | **Critical gap** — zero Naver ecosystem presence |

---

## Changes Applied (This Session)

### ✅ robots.txt — Added 4 missing AI crawlers
- Added: `Gemini-Fetcher`, `Meta-ExternalAgent`, `Applebot-Extended`, `Bytespider`
- Crawler coverage: 10 → 14 crawlers

### ✅ llms.txt — Fixed & Expanded
- Fixed: 5 → 6 AI team members (added Theo - AI 개발 책임자)
- Added: service differentiation vs Zapier/Make.com
- Added: 6 specific case study metrics with client names
- Added: process steps detail

### ✅ layout.tsx — Schema Fixes (7 changes)
1. `Organization.logo`: `string` → `ImageObject` (Google Knowledge Panel eligible)
2. `Organization.contactType`: `"Customer Service"` → `"customer service"` (Schema.org spec)
3. `Organization.sameAs`: removed empty `[]` (noise)
4. `WebSite`: removed broken `SearchAction` (no search function exists)
5. `WebSite`: added `inLanguage: "ko-KR"`
6. `Service.offers`: added `priceRange: "초기 구축 200~500만원 / 월 유지비 20~50만원"`
7. Added `Theo` to aiTeamServiceSchemas (6th AI team member)
8. **New: VideoObject schema** for workspace-demo.mp4
9. **New: HowTo schema** for 4-step onboarding (Google AI Overview trigger)

### ✅ sitemap.ts — Fixed lastModified
- Changed `new Date()` (every build = false change signal) → static dates

### ✅ WorkspaceDemo.tsx — Video preload fix
- `preload="auto"` → `preload="metadata"` (stops eager 1.9MB download)

### ✅ Scenarios.tsx — SSR fix
- `dynamic(..., { ssr: false })` → `dynamic(...)` (scenario cards now SSR'd)
- **Impact:** 10 customer case studies with quotes, metrics, client names now crawlable

---

## Remaining Issues (Require Manual Action)

### P0 — Critical

**1. Canonical / Redirect Mismatch**
- `snapplug.app` → 307 redirect → `www.snapplug.app`
- But canonical tag points to `snapplug.app`
- **Fix:** In Vercel Dashboard → Domains → change redirect to 301, OR remove www redirect and serve from apex
- **Impact:** Link equity fragmentation, confuses crawlers

**2. Naver Ecosystem (Critical for Korean audience)**
- Zero Naver Blog presence
- No Naver Search Advisor (웹마스터도구) verification
- HyperCLOVA X draws primarily from Naver ecosystem for Korean queries
- **Fix:**
  - Register at https://searchadvisor.naver.com
  - Create Naver Blog: target queries "AI 자동화 도입 방법", "스몰비즈니스 AI 팀원"
  - Add verification code to `layout.tsx` verification object

### P1 — High Priority

**3. Brand Authority (Score: 12/100)**
- Zero external mentions (Reddit, Brunch, Velog, GeekNews)
- No Crunchbase/LinkedIn company page
- No press coverage
- **Fix:** Publish 1 article on Brunch.co.kr or Velog.io with SnapPlug attribution
- **Fix:** Create Crunchbase company profile (free, indexed by AI engines)
- **Fix:** Pitch to 요즘IT (yozm.wishket.com) or GeekNews (news.hada.io)

**4. E-E-A-T — No Author/Founder Identity**
- No founder bio, no LinkedIn, no Person schema
- `public/Jason Jeong.jpeg` exists but unused in schema
- **Fix:** Add `/about` page with founder bio + Person schema
- **Fix:** Add business registration number (사업자등록번호) to footer

**5. Sub-page Metadata Missing**
- `/ai-diagnosis` and `/contacts` use default layout.tsx metadata
- Both pages are `'use client'` — need server component wrapper to export metadata
- **Fix:** Refactor page files to export `generateMetadata` from server component wrapper

**6. Google Search Console Not Verified**
- `verification.google` commented out in layout.tsx
- **Fix:** Add GSC verification code

### P2 — Medium Priority

**7. Organization.sameAs Empty**
- Add Instagram, LinkedIn, KakaoTalk channel URLs once registered
- **Fix:** Populate `sameAs` array in organizationSchema

**8. No Case Study Pages**
- 10 scenario cards are rich content but exist only on homepage
- **Fix:** Create `/case-studies/[id]` pages — each becomes a citable URL for Perplexity

**9. Privacy Policy on Notion**
- `elegant-sand-f36.notion.site` — third-party domain reduces trust
- **Fix:** Migrate to `/privacy` and `/terms` on snapplug.app

**10. Missing FAQ Questions**
- Add: "AI 자동화 도입 기간은?", "어떤 업종에 효과적인가요?", "AI 팀원 vs 직원 채용 비교"
- Each is a high-intent query SnapPlug could own in AI search

---

## Score Projection After Fixes

| Phase | Actions | Estimated Score |
|---|---|---|
| Current (before this session) | Baseline | ~38/100 |
| After this session | Code fixes applied | ~48/100 |
| After P0 fixes | Canonical + Naver registration | ~56/100 |
| After P1 fixes | Brand authority + author page + GSC | ~65/100 |
| After P2 fixes | Case study pages + social profiles | ~72/100 |
