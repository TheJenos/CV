import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'

(async () => {

  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Open URL in current page
  await page.goto("http://127.0.0.1:5173/", { waitUntil: 'networkidle0' }); 

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

// Downlaod the PDF
  const pdf = await page.pdf({
    path: 'result.pdf',
    margin: { top: '10px', right: '5px', bottom: '10px', left: '5px' },
    printBackground: true,
    format: 'A4',
  });

  // Close the browser instance
  await browser.close();
})();