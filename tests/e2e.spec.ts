import { expect, test } from "@playwright/test";

const pages = [
  { route: "/", key: "home" },
  { route: "/testimonials/", key: "testimonials" },
  { route: "/asseenontv/", key: "tv" },
  { route: "/ecards/", key: "ecards" },
  { route: "/livewebcam/", key: "webcam" },
] as const;

const viewports = [
  { width: 1920, height: 1080 },
  { width: 1440, height: 900 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 320, height: 720 },
] as const;

for (const viewport of viewports) {
  for (const route of pages) {
    test(`${route.key} at ${viewport.width}x${viewport.height}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(route.route);
      await expect(page.locator(".retro-site")).toBeVisible();
      const banner = page.locator(".retro-banner-picture img");
      await expect(banner).toBeVisible();
      await expect(page.locator(".header-portrait")).toHaveCount(0);
      await expect(page.locator(".retro-announcement")).toHaveCount(0);
      const bannerMetrics = await banner.evaluate((image) => {
        const img = image as HTMLImageElement;
        const box = img.getBoundingClientRect();
        return {
          width: box.width,
          height: box.height,
          loadedWidth: img.naturalWidth,
          loadedHeight: img.naturalHeight,
          currentSrc: img.currentSrc,
          fit: getComputedStyle(img).objectFit,
        };
      });
      expect(bannerMetrics.loadedWidth).toBeGreaterThan(0);
      expect(bannerMetrics.fit).toBe("contain");
      const expectedRatio = 1200 / 220;
      expect(Math.abs(bannerMetrics.width / bannerMetrics.height - expectedRatio)).toBeLessThan(0.03);
      expect(bannerMetrics.currentSrc).toContain("better-call-prabowo-desktop.avif");
      const alignment = await page.evaluate(() => {
        const container = document.querySelector(".retro-site")!.getBoundingClientRect();
        const header = document.querySelector(".retro-banner-header")!.getBoundingClientRect();
        const picture = document.querySelector(".retro-banner-picture")!.getBoundingClientRect();
        const img = document.querySelector(".retro-banner-picture img")!.getBoundingClientRect();
        return {
          containerWidth: container.width,
          headerWidth: header.width,
          pictureWidth: picture.width,
          imageWidth: img.width,
          imageHeight: img.height,
          horizontalGapLeft: Math.abs(header.left - img.left),
          horizontalGapRight: Math.abs(header.right - img.right),
          verticalGapTop: Math.abs(header.top - img.top),
          verticalGapBottom: Math.abs(header.bottom - img.bottom),
        };
      });
      expect(alignment.headerWidth).toBeCloseTo(alignment.containerWidth, 1);
      expect(alignment.pictureWidth).toBeCloseTo(alignment.headerWidth, 1);
      expect(alignment.imageWidth).toBeCloseTo(alignment.headerWidth, 1);
      expect(alignment.horizontalGapLeft).toBeLessThan(2);
      expect(alignment.horizontalGapRight).toBeLessThan(2);
      expect(alignment.verticalGapTop).toBeLessThan(2);
      expect(alignment.verticalGapBottom).toBeLessThan(2);
      await expect(page.locator(".retro-banner-cta")).toHaveAttribute("href", "#konten");
      await expect(page.locator("astro-dev-toolbar")).toHaveCount(0);
      await expect(page.locator("main h1")).toBeVisible();
      await expect(page.locator(".nav-links a")).toHaveCount(5);
      await expect(page.locator('a[href*="bettercallsaul.amc.com"]')).toHaveCount(1);
      const active = page.locator('.nav-links a[aria-current="page"]');
      await expect(active).toHaveCount(1);

      const metrics = await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: document.documentElement.scrollWidth,
        canvas: document.querySelector(".retro-site")?.getBoundingClientRect().width ?? 0,
      }));
      expect(metrics.document, "Page must not scroll horizontally").toBeLessThanOrEqual(metrics.viewport + 2);
      expect(metrics.canvas).toBeGreaterThan(0);
      expect(metrics.canvas).toBeLessThanOrEqual(960);
      if (viewport.width >= 960) expect(metrics.canvas).toBeGreaterThanOrEqual(959);

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(100);
      await page.evaluate(() => window.scrollTo(0, 0));
      const broken = await page.evaluate(() =>
        Array.from(document.images)
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.getAttribute("src"))
      );
      expect(broken, "Images that finished loading must not be broken").toEqual([]);
      expect(errors, "There should be no uncaught client JS errors").toEqual([]);

      await expect.poll(async () => page.locator("astro-island[ssr]").count()).toBe(0);
      const artwork = await page.locator(".retro-site img").evaluateAll((images) => {
        const srcCounts = new Map<string, number>();
        const cropped: string[] = [];
        for (const image of images as HTMLImageElement[]) {
          const src = new URL(image.currentSrc || image.src, location.href).pathname;
          srcCounts.set(src, (srcCounts.get(src) ?? 0) + 1);
          if (getComputedStyle(image).objectFit === "cover") cropped.push(src);
        }
        return {
          repeated: Array.from(srcCounts.entries()).filter(([, count]) => count > 1),
          cropped,
        };
      });
      expect(artwork.repeated, "Each page uses each photo at most once").toEqual([]);
      expect(artwork.cropped, "Photos should display complete frames rather than cover-cropping").toEqual([]);
      await expect(page.locator("body")).not.toContainText(/parodi/i);

      await page.screenshot({
        path: `test-results/screenshots/${route.key}-${viewport.width}x${viewport.height}.png`,
        fullPage: true,
        animations: "disabled",
      });
    });
  }
}

test("news panel alignment, readable layout, and authentic crest image", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const emblem = page.locator(".message-emblem img");
    await expect(emblem).toBeVisible();
    await expect(emblem).toHaveAttribute("alt", /Cap Kepresidenan/);
    await expect.poll(() => emblem.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(page.locator(".message-disclaimer")).toContainText("Bukan situs resmi");
    const metrics = await page.evaluate(() => {
      const selectors = [
        ".retro-welcome h2",
        ".retro-ad-tile strong",
        ".retro-ad-collage .ad-billboard-heading",
        ".retro-ad-tile small",
        ".retro-message h2",
        ".retro-message .message-copy p",
      ];
      const overflow = selectors.flatMap((selector) =>
        Array.from(document.querySelectorAll(selector)).flatMap((item) => {
          const element = item as HTMLElement;
          const x = element.scrollWidth > element.clientWidth + 3;
          const y = element.scrollHeight > element.clientHeight + 3;
          return x || y ? [`${selector} (${element.scrollWidth}/${element.clientWidth}, ${element.scrollHeight}/${element.clientHeight})`] : [];
        })
      );
      const section = document.querySelector(".retro-message")!.getBoundingClientRect();
      const emblem = document.querySelector(".message-emblem")!.getBoundingClientRect();
      const title = document.querySelector(".message-copy h2")!.getBoundingClientRect();
      return {
        overflow,
        sectionCenter: section.left + section.width / 2,
        emblemCenter: emblem.left + emblem.width / 2,
        titleCenter: title.left + title.width / 2,
        imageCount: document.querySelectorAll(".retro-site img").length,
      };
    });
    expect(metrics.overflow, `No clipped headlines at ${viewport.width}px`).toEqual([]);
    expect(Math.abs(metrics.sectionCenter - metrics.emblemCenter)).toBeLessThan(4);
    expect(Math.abs(metrics.sectionCenter - metrics.titleCenter)).toBeLessThan(4);
    expect(metrics.imageCount).toBeGreaterThanOrEqual(7);
  }
});

test("homepage reproduces four consultation thumbnails and opens source media", async ({ page }) => {
  await page.goto("/");
  await expect.poll(() => page.locator(".media-tiles").evaluate((node) => node.closest("astro-island")?.hasAttribute("ssr") ?? true)).toBe(false);
  const choices = page.locator(".media-tiles .media-thumbnail");
  await expect(choices).toHaveCount(4);
  await expect(page.locator(".media-tiles .media-gallery-promo")).toBeVisible();
  const geometry = await page.evaluate(() => ({
    columns: getComputedStyle(document.querySelector(".media-tiles .media-thumbnails")!).gridTemplateColumns.trim().split(/\s+/).length,
    galleryWidth: document.querySelector(".media-tiles")?.getBoundingClientRect().width ?? 0,
  }));
  expect(geometry.columns).toBe(2);
  expect(geometry.galleryWidth).toBeGreaterThan(400);
  await choices.nth(1).click();
  const modal = page.locator(".media-dialog");
  await expect(modal).toBeVisible();
  await expect(modal.locator(".media-dialog-header strong")).toHaveText("KTT G20!");
  await expect(modal.locator("iframe")).toHaveAttribute("src", /youtube-nocookie\.com\/embed/);
  await page.getByRole("button", { name: "Tutup pemutar" }).click();
  await expect(modal).not.toBeVisible();
  await expect(modal.locator("iframe")).toHaveCount(0);
  await choices.nth(3).click();
  await expect(modal.locator(".media-dialog-image")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(modal).not.toBeVisible();
});

test("TV gallery retains selectable video player", async ({ page }) => {
  await page.goto("/asseenontv/");
  await expect.poll(() => page.locator(".media-showcase").evaluate((node) => node.closest("astro-island")?.hasAttribute("ssr") ?? true)).toBe(false);
  const choices = page.locator(".showcase-selector-item");
  await expect(choices).toHaveCount(3);
  await choices.nth(1).click();
  await expect(choices.nth(1)).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: /putar video arsip/i }).click();
  await expect(page.locator(".showcase-video-embed")).toHaveAttribute("src", /youtube-nocookie\.com\/embed/);
  await choices.nth(2).click();
  await expect(page.locator(".showcase-video-embed")).toHaveCount(0);
});

test("navigation, fictional testimony and source attribution", async ({ page }) => {
  await page.goto("/");
  await page.locator('.nav-links a[href*="testimonials"]').click();
  await expect(page).toHaveURL(/\/testimonials\/$/);
  await page.locator(".testimonial-tile summary").first().click();
  await expect(page.locator(".testimonial-tile").first().locator(".testimonial-story")).toBeVisible();
  await expect(page.locator("main")).toContainText("FIKTIF");
});

test("e-card preview updates without submitting email", async ({ page }) => {
  await page.goto("/ecards/");
  await expect.poll(() => page.locator(".ecards-studio").evaluate((node) => node.closest("astro-island")?.hasAttribute("ssr") ?? true)).toBe(false);
  await page.getByRole("button", { name: /SELAMAT PAGI!/i }).click();
  await expect(page.locator(".ecard-preview > strong")).toHaveText("SELAMAT PAGI!");
  await page.locator("#ecard-from").fill("Penggemar");
  await page.locator("#ecard-message").fill("Halo dari Bali!");
  await expect(page.locator(".ecard-preview")).toContainText("Halo dari Bali!");
  await expect(page.locator(".ecard-preview")).toContainText("Penggemar");
  await page.getByRole("button", { name: /SALIN TEKS KARTU/i }).click();
  await expect(page.locator('[role="status"]')).not.toBeEmpty();
});

test("webcam clearly marked simulation and camera selection", async ({ page }) => {
  await page.goto("/livewebcam/");
  await expect.poll(() => page.locator(".webcam-studio").evaluate((node) => node.closest("astro-island")?.hasAttribute("ssr") ?? true)).toBe(false);
  await expect(page.locator(".camera-overlay")).toContainText("BUKAN SIARAN LANGSUNG");
  await page.getByRole("button", { name: /CAM 02/i }).click();
  await expect(page.locator(".camera-choice").nth(1)).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".webcam-caption").first()).toContainText("Gedung Putih");
});

test("header artwork contains no duplicated right-cap silhouette", async ({ page }) => {
  await page.goto("/");
  const pixels = await page.locator(".retro-banner-picture img").evaluate((image) => {
    const img = image as HTMLImageElement;
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const sample = (x: number, y: number) =>
      Array.from(ctx.getImageData(x, y, 1, 1).data).slice(0, 3);
    return {
      leftOfHat: sample(995, 15),
      rightOfHat: sample(1125, 12),
    };
  });
  for (const [location, rgb] of Object.entries(pixels)) {
    expect(rgb[0], `${location}: clean orange-red header stripe`).toBeGreaterThan(180);
    expect(rgb[1], `${location}: no black ghost or yellow copied from photo`).toBeLessThan(135);
    expect(rgb[2], `${location}: preserve red/orange palette`).toBeLessThan(85);
  }
});

test("full banner remains intact on both sides of the responsive breakpoint", async ({ page }) => {
  for (const width of [599, 600, 601, 820, 821, 960]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto("/");
    const metrics = await page.locator(".retro-banner-picture img").evaluate((node) => {
      const img = node as HTMLImageElement;
      const banner = img.getBoundingClientRect();
      const header = img.closest("header")!.getBoundingClientRect();
      return {
        source: img.currentSrc,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        width: banner.width,
        height: banner.height,
        left: banner.left - header.left,
        right: header.right - banner.right,
        top: banner.top - header.top,
        bottom: header.bottom - banner.bottom,
      };
    });
    expect(metrics.source).toContain("better-call-prabowo-desktop.avif");
    expect(metrics.naturalWidth).toBe(1200);
    expect(metrics.naturalHeight).toBe(220);
    expect(Math.abs(metrics.width / metrics.height - 1200 / 220)).toBeLessThan(0.02);
    for (const gap of [metrics.left, metrics.right, metrics.top, metrics.bottom]) {
      expect(Math.abs(gap), `Banner must meet header edges at ${width}px`).toBeLessThan(2);
    }
  }
});
