import { test, expect } from "@playwright/test";

test("homepage renders the official AI UNIVERSE–2028 conference identity", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/AI UNIVERSE–2028/);
  await expect(page.getByRole("heading", { name: "AI UNIVERSE–2028" })).toBeVisible();
  await expect(
    page
      .getByText(/Artificial Intelligence for Unified, Next-generation Intelligent & Verified Ecosystems/i)
      .first()
  ).toBeVisible();
  await expect(page.getByText(/Rajasthan International Centre, Jaipur/i).first()).toBeVisible();
  await expect(page.getByText("26–28 August 2028").first()).toBeVisible();
  await expect(page.locator(".hero-particle-canvas")).toBeVisible();
  await expect(page.locator(".hero-countdown-wrap")).toBeVisible();
  await expect(page.locator(".brand .brand-logo-img")).toBeVisible();
  await expect(page.locator(".site-footer .footer-logo-img")).toBeVisible();
});

test("main sections are present and navigation anchors resolve", async ({ page, isMobile }) => {
  await page.goto("/");
  for (const id of [
    "about",
    "tracks",
    "dates",
    "papers",
    "publication",
    "registration",
    "committee",
    "contact"
  ]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  if (!isMobile) {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Tracks", exact: true })
      .click();
    await expect(page).toHaveURL(/#tracks$/);
  }
});

test("track category filter updates displayed tracks across all 8 tracks", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".track-card")).toHaveCount(8);
  await page.getByRole("tab", { name: /AI, Data & Security/i }).click();
  await expect(page.locator(".track-card")).toHaveCount(3);
  await page.getByRole("tab", { name: /All Tracks/i }).click();
  await expect(page.locator(".track-card")).toHaveCount(8);
});

test("hero showcases auto-rotating AI photos and key dates live in dates section", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero .hero-dates-card")).toHaveCount(0);
  await expect(page.locator("#dates .dates-summary-card")).toBeVisible();
  await expect(page.locator("#dates .dates-summary-card li")).toHaveCount(6);
  const img = page.locator(".hero-3d-stage .showcase-3d-img");
  await expect(img).toBeVisible();
  const initialSrc = await img.getAttribute("src");
  await page.getByRole("button", { name: "Next conference visual" }).click();
  await expect(img).not.toHaveAttribute("src", initialSrc ?? "");
});

test("registration table displays Non-IEEE and IEEE INR charges", async ({ page }) => {
  await page.goto("/");
  const regSection = page.locator("#registration");
  await expect(regSection.getByText("₹9,000")).toBeVisible();
  await expect(regSection.getByText("₹7,500")).toBeVisible();
  await expect(regSection.getByText("₹5,000")).toBeVisible();
  await expect(regSection.getByText("₹12,000")).toBeVisible();
});

test("mobile navigation opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile-only interaction");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Tracks" }).click();
  await expect(page).toHaveURL(/#tracks$/);
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
});

test("page has no horizontal overflow", async ({ page }) => {
  await page.goto("/");
  const dimensions = await page.evaluate(() => ({
    body: document.body.scrollWidth,
    viewport: document.documentElement.clientWidth
  }));
  expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport + 1);
});
