// =============================================================
// Meta (Facebook) Pixel — Never Forget Her
// Replace PIXEL_ID_HERE with your actual Pixel ID from Meta Business Manager
// =============================================================

// 1. Base Pixel Code — add to <head> of index.html
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', 'PIXEL_ID_HERE');
fbq('track', 'PageView');

// 2. Lead Event — call this when the waitlist form is submitted
function trackWaitlistSignup() {
  fbq('track', 'Lead', {
    content_name: 'Waitlist Signup',
    content_category: 'Valentine Campaign 2026'
  });
}

// 3. Attach to your form submission
// Example: document.getElementById('waitlist-form').addEventListener('submit', function(e) {
//   trackWaitlistSignup();
// });
