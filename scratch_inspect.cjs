const https = require('https');

https.get('https://ieeemapcon.org/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log("HTML length:", data.length);
    const imgMatches = data.match(/<img[^>]+>/gi) || [];
    console.log("Images found:", imgMatches.slice(0, 15));
    const sectionMatches = data.match(/<section[^>]+>/gi) || [];
    console.log("Sections found:", sectionMatches.slice(0, 10));
    // search for deeksha or similar
    const deeksha = data.match(/[^<>\n]*deeksha[^<>\n]*/gi);
    console.log("Deeksha matches:", deeksha);
    const owlMatches = data.match(/class=["'][^"']*(owl|swiper|slick|carousel|slider)[^"']*["']/gi);
    console.log("Carousel classes:", owlMatches);
  });
}).on('error', err => console.error(err));
