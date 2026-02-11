addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  try {
    const data = await request.json()
    const email = (data.email || '').trim().toLowerCase()
    
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const tier = data.tier || 'unknown'
    const timestamp = new Date().toISOString()
    const key = `signup_${timestamp}_${email}`
    
    await EMAILS.put(key, JSON.stringify({ email, tier, timestamp, source: data.source || 'website' }))
    
    // Also maintain a simple list for easy export
    const listRaw = await EMAILS.get('_email_list')
    const list = listRaw ? JSON.parse(listRaw) : []
    if (!list.find(e => e.email === email)) {
      list.push({ email, tier, timestamp })
      await EMAILS.put('_email_list', JSON.stringify(list))
    }

    // Add subscriber to Beehiiv (triggers welcome automation)
    try {
      await fetch('https://api.beehiiv.com/v2/publications/pub_04d54c30-77b7-4540-9366-fcc88a41dd67/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEEHIIV_API_KEY}`
        },
        body: JSON.stringify({
          email: email,
          reactivate_existing: false,
          send_welcome_email: false,
          utm_source: 'website',
          utm_medium: 'landing_page',
          custom_fields: [
            { name: 'tier_interest', value: tier }
          ],
          automation_ids: ['aut_027a901c-364a-44a6-8c43-1c927d50dbd1']
        })
      })
    } catch (beehiivErr) {
      // Don't fail the signup if Beehiiv is down
      console.error('Beehiiv API error:', beehiivErr)
    }

    return new Response(JSON.stringify({ success: true, message: 'Welcome to the list!' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}
