import puppeteer from "puppeteer";
import server from "http-server";
import path from "path";

(async () => {
  const server = server.createServer({
    root: path.join(process.cwd(), "dist"),
  });

  server.listen(8080, "0.0.0.0", async function () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle0" });
    await page.emulateMediaType("screen");
    await page.pdf({
      path: "cv.pdf",
      margin: { top: "10px", right: "5px", bottom: "10px", left: "5px" },
      printBackground: true,
      format: "A4",
    });
    await browser.close();
    server.close();
  });
})();
