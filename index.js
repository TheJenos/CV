import puppeteer from "puppeteer";
import server from "http-server";
import path from "path";

(async () => {
  const serverObject = server.createServer({
    root: path.join(process.cwd(), "dist"),
  });

  serverObject.listen(8080, "0.0.0.0", async function () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle0" });
    await page.emulateMediaType("screen");
    await page.pdf({
      path: "dist/cv.pdf",
      margin: { top: "5px", right: "5px", bottom: "5px", left: "5px" },
      printBackground: true,
      format: "letter",
    });
    await browser.close();
    serverObject.close();
  });
})();
