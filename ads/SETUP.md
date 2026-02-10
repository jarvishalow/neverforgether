# Meta Pixel Setup — neverforgether.co

## Prerequisites
- [ ] Mike creates Meta Business Manager account
- [ ] Create a Pixel in Events Manager → get the Pixel ID
- [ ] Replace `PIXEL_ID_HERE` in `pixel-snippet.js` with the real ID

## Installation

### Step 1: Add base pixel to `<head>`
Paste the contents of `pixel-snippet.js` (the base code block) inside `<head>` in your `index.html`, just before `</head>`:

```html
<head>
  <!-- ... existing tags ... -->
  <script>
    // Paste base pixel code from pixel-snippet.js here
  </script>
  <noscript>
    <img height="1" width="1" style="display:none"
         src="https://www.facebook.com/tr?id=PIXEL_ID_HERE&ev=PageView&noscript=1"/>
  </noscript>
</head>
```

### Step 2: Wire up the Lead event
On your waitlist form's submit handler, call `trackWaitlistSignup()`:

```js
document.getElementById('waitlist-form').addEventListener('submit', function(e) {
  trackWaitlistSignup();
});
```

### Step 3: Verify
1. Install the [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension
2. Visit neverforgether.co — should fire `PageView`
3. Submit the form — should fire `Lead`
4. Check Events Manager → Test Events to confirm

## Ad Campaign Setup
- Use the 4 variants in `valentine-ads.md`
- Objective: **Leads** (optimise for Lead event)
- Audience: Men 25-55, US, interests in relationships/gifts/luxury
- Placements: Facebook Feed, Instagram Feed, Instagram Stories
- Budget: TBD
