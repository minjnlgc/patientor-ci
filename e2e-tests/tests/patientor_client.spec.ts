import { test, expect } from "@playwright/test";
import { describe } from "node:test";

describe("patientor client homepage", () => {
  test("homepage has home, patient list, and add new patient", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("HOME")).toBeVisible();
    await expect(page.getByText("ADD NEW PATIENT")).toBeVisible();
    await expect(page.getByText("Patient list")).toBeVisible();
  });

  test("should show modal to add a new patient", async ({ page }) => {
    await page.goto("/");
    // Click the button to add a new patient
    await page.getByText("ADD NEW PATIENT").click();
    // Check that the new patient form is visible
    await expect(page.getByText("Add a new patient")).toBeVisible();
  });
});

describe("patientor client patient page", () => {
  test("should show the patient details", async ({ page }) => {
    await page.goto("/");
    await page.getByText("Dana Scully").click();
    await expect(page.getByText("ssh: 050174-432N")).toBeVisible();
    await expect(
      page.getByText("occupation: Forensic Pathologist")
    ).toBeVisible();
    await expect(page.getByText("entires")).toBeVisible();
    await expect(page.getByText("ADD NEW ENTRY")).toBeVisible();
  });

  test("should show entry options when click add new entry", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByText("Dana Scully").click();
    await page.getByText("ADD NEW ENTRY").click();

    await expect(page.getByText("HealthCheck")).toBeVisible();
    await expect(page.getByText("Hospital")).toBeVisible();
    await expect(page.getByText("Occupational Health Check")).toBeVisible();
  });

  test("should go home when you click home", async ({ page }) => {
    await page.goto("/");
    await page.getByText("Dana Scully").click();
    await page.getByText("HOME").click();

    await expect(page.getByText("Patient list")).toBeVisible();
  });
});
