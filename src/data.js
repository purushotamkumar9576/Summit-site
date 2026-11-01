// All page content lives here. Edit copy, teammates, rooms and shows without touching components.

// ---- Cloudinary photos -------------------------------------------------
// 1. Put your cloud name in .env.local:  VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
// 2. Upload one photo per teammate and set its Public ID below.
// Until both are set, the site shows a colored initial instead of a photo.
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'kephzvav'
export const PHOTO_IDS = {
  emmy: 'img2',
  maya: 'img3',
  cora: 'img4',
  hunter: 'img1',
  cast: 'img5',
  riley: 'img6',
  kai: 'img7',
}
// c_fill + g_face crops around the face; f_auto,q_auto serve the smallest good format.
export const photoUrl = (id, w = 96, h = w) =>
  CLOUD_NAME && PHOTO_IDS[id]
    ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,c_fill,g_face,w_${w},h_${h}/${PHOTO_IDS[id]}`
    : ''

export const TM = {
  emmy: { n: 'Emmy', role: 'GTM Chief of Staff', i: 'E', h: 225, head: 'Emmy coordinates the mission.',
    blurb: 'Tell Emmy the business outcome. She builds the plan, activates the right specialists, tracks approvals, and keeps every campaign aligned with your brand and revenue goals.',
    can: ['Build the launch mission', 'Assign specialist teammates', 'Manage approvals', 'Recommend next best action'] },
  maya: { n: 'Maya', role: 'Brand Strategist', i: 'M', h: 330, head: 'Maya sets the story everyone works from.',
    blurb: 'Maya turns your founder narrative and category into positioning, messaging and a pitch, then saves it to the Startup Brain so every teammate uses the same story.',
    can: ['Category positioning', 'Founder narrative', 'Messaging guide', 'Pitch story'] },
  cora: { n: 'Cora', role: 'AI Marketing', i: 'C', h: 160, head: 'Cora turns the story into campaigns.',
    blurb: 'Cora plans full-funnel campaigns, drafts content for each channel and learns from performance, always working from the approved story.',
    can: ['Campaign studio', 'Content engine', 'Nurture sequences', 'Attribution'] },
  kai: { n: 'Kai', role: 'E-commerce Booster', i: 'K', h: 35, head: 'Kai turns catalogs into repeat purchases.',
    blurb: 'Kai reads your product catalog and customer behavior to improve merchandising, conversion journeys, loyalty offers and retention.',
    can: ['Product discovery', 'Personalization', 'Offers', 'Retention'] },
  cast: { n: 'Cast', role: 'Podcast Producer', i: 'P', h: 275, head: 'Cast places your story on the right shows.',
    blurb: 'Cast matches your category, stage and audience to podcasts in the U.S., India and global markets, then prepares the pitch, briefing and follow-up.',
    can: ['Guest matching', 'Podcast outreach', 'Interview coaching', 'Clip distribution'] },
  hunter: { n: 'Hunter', role: 'AI SDR', i: 'H', h: 8, head: 'Hunter turns attention into meetings.',
    blurb: 'Hunter finds matching startups, writes personalized outreach from the approved story and books qualified meetings once you approve.',
    can: ['Account matching', 'Outreach sequences', 'Reply handling', 'Meeting booking'] },
  riley: { n: 'Riley', role: 'Revenue Intelligence', i: 'R', h: 190, head: '', blurb: '', can: [] },
}

export const TEAM_ORDER = ['emmy', 'maya', 'cora', 'hunter', 'cast', 'kai']

export const FEED = [
  { id: 'm1', who: 'maya', text: 'New category positioning is ready: “The multiplayer AI growth team for startups.”' },
  { id: 'm2', who: 'cora', text: 'Created a 3-week founder campaign from the approved podcast narrative.' },
  { id: 'm3', who: 'hunter', text: 'Found 126 matching startups. The top 40 outreach messages are prepared.' },
]
export const DONE_MSG = { id: 'done', who: 'hunter', text: 'Sequence scheduled through Email automation. 40 messages are queued and replies will sync to your CRM.' }

export const APPROVAL_ITEMS = [
  { k: 'pod', t: 'Podcast teaser', d: '30-second teaser from the founder episode, for LinkedIn and YouTube.' },
  { k: 'out', t: 'Outbound sequence', d: 'Three-step email sequence to the top 40 matched startups.' },
]

export const ROOM_TABS = [
  { key: 'gtm', label: 'GTM Room' },
  { key: 'commerce', label: 'Commerce Room' },
  { key: 'ops', label: 'Business Operations' },
]

export const ROOMS = {
  gtm: { kick: 'Acquire customers and visibility', title: 'GTM Room',
    desc: 'Build the brand, tell the founder story, launch campaigns, earn podcast visibility, and convert attention into qualified pipeline.',
    crew: ['emmy', 'maya', 'cora', 'hunter', 'cast', 'riley'],
    mission: 'Launch the founder story and book 20 qualified meetings',
    lead: 'Hunter drafts 40 outreach messages from the approved story',
    utils: [
      ['mail', 'Email automation', 'sends the approved outbound sequence'],
      ['sync', 'CRM sync', 'logs every reply and meeting in your CRM'],
      ['target', 'Contact enrichment', 'adds verified titles and emails to matched startups'],
      ['calendar', 'Meeting scheduler', 'offers time slots and books accepted meetings'],
      ['play', 'Content publisher', 'posts approved clips and articles to LinkedIn and YouTube'],
      ['file', 'Proposal builder', 'turns call notes into a proposal draft'],
    ] },
  commerce: { kick: 'Grow revenue and repeat purchases', title: 'Commerce Room',
    desc: 'Turn product catalogs and customer behavior into smarter merchandising, conversion journeys, loyalty offers, and repeat purchases.',
    crew: ['emmy', 'kai', 'cora', 'riley'],
    mission: 'Win back lapsed buyers with a loyalty offer',
    lead: 'Kai picks the products and designs the offer for lapsed buyers',
    utils: [
      ['box', 'Catalog sync', 'keeps products, prices and stock current'],
      ['tag', 'Offer builder', 'creates the loyalty offer and its rules'],
      ['mail', 'Email automation', 'sends the approved win-back journey'],
      ['store', 'Storefront publisher', 'updates featured collections on your store'],
      ['users', 'Customer segments', 'builds the lapsed-buyer list'],
      ['star', 'Review requests', 'asks recent buyers for product reviews'],
    ] },
  ops: { kick: 'Run the company', title: 'Business Operations',
    desc: 'Keep investor updates, proposals and weekly priorities moving from the same Startup Brain as the rest of the company.',
    crew: ['emmy', 'riley', 'maya'],
    mission: 'Prepare the monthly investor update and next week’s priorities',
    lead: 'Riley pulls the numbers and Emmy drafts the investor update',
    utils: [
      ['file', 'Proposal builder', 'turns call notes into a proposal draft'],
      ['calendar', 'Meeting scheduler', 'books the investor and team check-ins'],
      ['sync', 'CRM sync', 'keeps pipeline numbers in the update accurate'],
      ['mail', 'Email automation', 'sends the update to your investor list'],
      ['chart', 'Metrics sync', 'pulls revenue and growth figures into the brief'],
      ['task', 'Task tracker', 'turns weekly priorities into owned tasks'],
    ] },
}

export const MARQUEE = [['mail', 'Email automation'], ['sync', 'CRM sync'], ['target', 'Contact enrichment'], ['calendar', 'Meeting scheduler'], ['play', 'Content publisher'], ['file', 'Proposal builder'], ['box', 'Catalog sync'], ['tag', 'Offer builder'], ['users', 'Customer segments'], ['task', 'Task tracker']]

export const ENGINES = [
  { ic: 'sparkle', t: 'AI Marketing',
    d: 'Plan and produce full-funnel campaigns, from market insight and creative concepts to personalized content, nurture, and performance learning.',
    tags: ['Campaign studio', 'Content engine', 'AI SDR', 'Attribution'],
    s: 'Founder campaign · 3 weeks',
    rows: [['WK 1', 'Founder story post and podcast teaser'], ['WK 2', 'Customer proof clips and a nurture email'], ['WK 3', 'Webinar invite and outbound follow-up']] },
  { ic: 'cart', t: 'E-commerce Booster',
    d: 'Turn product catalogs and customer behavior into smarter merchandising, conversion journeys, loyalty offers, and repeat purchases.',
    tags: ['Product discovery', 'Personalization', 'Offers', 'Retention'],
    s: 'Lapsed-buyer offer',
    rows: [['WHO', 'Bought once, no order in 60 days'], ['WHAT', 'Free shipping on a featured bundle'], ['WHEN', 'Email on day 0, reminder on day 3, last call on day 7']] },
  { ic: 'mic', t: 'Brand & Podcast Strategist',
    d: 'Shape a memorable identity, create the founder narrative, prepare the pitch, and place each story across relevant U.S., India, and global podcasts.',
    tags: ['Brand identity', 'Pitch story', 'Podcast matching', 'Distribution'],
    s: 'Pitch pack · founder story',
    rows: [['STORY', 'From a bold idea to a category'], ['SHOWS', 'U.S. enterprise AI and India startup shows'], ['NEXT', 'Briefing doc, talking points, follow-up campaign']] },
]

export const GOAL_TABS = [
  { key: 'meetings', label: 'Book 20 qualified meetings' },
  { key: 'podcast', label: 'Win podcast appearances' },
  { key: 'repeat', label: 'Lift repeat purchases' },
]

export const GOALS = {
  meetings: { chain: ['emmy', 'maya', 'cora', 'hunter'], lines: {
    emmy: 'Builds a 14-day mission, assigns Maya, Cora and Hunter, and schedules your approvals.',
    maya: 'Writes the positioning and founder story that outbound and content both draw from.',
    cora: 'Turns the story into a founder campaign that warms the accounts Hunter contacts.',
    hunter: 'Finds matching startups, drafts personalized outreach and books meetings once you approve.',
    cast: 'Standing by. Joins when a podcast episode can serve as proof in outreach.',
    kai: 'Standing by. Joins when the mission includes an online store.' } },
  podcast: { chain: ['emmy', 'maya', 'cast', 'cora'], lines: {
    emmy: 'Sets target audiences and regions, then tracks each pitch through approval.',
    maya: 'Prepares the pitch story and talking points that Cast sends to hosts.',
    cast: 'Matches shows by category, stage and language, then handles outreach and interview briefings.',
    cora: 'Cuts approved episodes into clips and posts for YouTube and LinkedIn.',
    hunter: 'Standing by. Joins once an episode is live and can be used as proof in outreach.',
    kai: 'Standing by. Joins if the episode should drive traffic to a store.' } },
  repeat: { chain: ['emmy', 'kai', 'cora'], lines: {
    emmy: 'Sets the retention target and checks each offer before it goes out.',
    kai: 'Finds lapsed buyers, picks the products to feature and designs the loyalty offer.',
    cora: 'Writes the email and SMS journey that delivers the offer.',
    maya: 'Standing by. Reviews offer wording only if the brand voice needs it.',
    cast: 'Standing by. Not part of this goal.',
    hunter: 'Standing by. Not part of this goal.' } },
}

export const REGION_TABS = [
  { key: 'us', label: 'United States' },
  { key: 'india', label: 'India' },
  { key: 'global', label: 'Global' },
]

export const SHOWS = {
  us: [
    { f: 'Weekly founder interviews', a: 'Early-stage founders and operators', c: ['ai', 'enterprise'], l: 'English' },
    { f: 'Enterprise software deep dives', a: 'Buyers and technology leaders at mid-size companies', c: ['enterprise', 'ai'], l: 'English' },
    { f: 'Retail and direct-to-consumer growth show', a: 'Brand owners and e-commerce leads', c: ['retail'], l: 'English' },
    { f: 'Startup operator roundtable', a: 'Founders hiring their first go-to-market team', c: ['ai', 'retail', 'enterprise'], l: 'English' },
  ],
  india: [
    { f: 'Startup stories', a: 'Founders and angel investors across India', c: ['ai', 'retail'], l: 'English' },
    { f: 'Technology and leadership talks', a: 'Engineering and product leaders', c: ['enterprise', 'ai'], l: 'English' },
    { f: 'Regional founder conversations', a: 'First-generation founders and small-business owners', c: ['retail'], l: 'Hindi and English' },
    { f: 'SaaS from India', a: 'B2B founders selling to global customers', c: ['enterprise'], l: 'English' },
  ],
  global: [
    { f: 'Investor-focused industry podcast', a: 'Seed and Series A investors', c: ['ai', 'enterprise'], l: 'English' },
    { f: 'Cross-border founder series', a: 'Founders expanding into new markets', c: ['ai', 'retail', 'enterprise'], l: 'English' },
    { f: 'Trade and industry audio magazine', a: 'Category buyers and industry analysts', c: ['retail', 'enterprise'], l: 'English' },
  ],
}

export const CATEGORIES = [
  { value: 'ai', label: 'AI and automation' },
  { value: 'enterprise', label: 'Enterprise software' },
  { value: 'retail', label: 'Retail and e-commerce' },
]
export const STAGES = [
  { value: 'pre', label: 'Pre-seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'a', label: 'Series A' },
]
export const ANGLE = {
  pre: 'Lead with the founder’s origin story and the problem you saw first.',
  seed: 'Lead with early customer results and why the category is forming now.',
  a: 'Lead with growth proof and the market you are about to define.',
}

export const MISSION = {
  meetings: ['Launch the founder story and book 20 qualified meetings', ['emmy', 'maya', 'cora', 'hunter']],
  podcast: ['Place the founder story on matched U.S., India and global podcasts', ['emmy', 'maya', 'cast', 'cora']],
  repeat: ['Win back lapsed buyers with a loyalty offer', ['emmy', 'kai', 'cora']],
}

export const OUTCOMES = [
  { ic: 'calendar', t: 'Qualified meetings', d: 'Hunter finds matching startups, writes outreach from your approved story and books the calls you approve.', chip: 'Example: 20 meetings in a 14-day mission' },
  { ic: 'mic', t: 'Podcast visibility', d: 'Cast matches your story to shows in the U.S., India and global markets, then prepares the pitch and briefing.', chip: 'Example: 3 regions, one story' },
  { ic: 'cart', t: 'Repeat purchases', d: 'Kai turns your catalog and customer behavior into loyalty offers and win-back journeys.', chip: 'Example: buyers with no order in 60 days' },
]

export const STEPS = [
  { ic: 'target', t: 'Set one goal', d: 'Tell Emmy the business outcome you want, such as booking 20 qualified meetings.',
    who: 'emmy', say: 'Got it. I will build a 14-day mission, assign Maya, Cora and Hunter, and ask you to approve the plan.', tag: 'Mission created' },
  { ic: 'users', t: 'Your team drafts', d: 'Specialists work from the same Startup Brain, so the story, campaign and outreach all match.',
    who: 'maya', say: 'Positioning is ready: \u201CThe multiplayer AI growth team for startups.\u201D Cora and Hunter are using it now.', tag: 'Story shared with the team' },
  { ic: 'shield', t: 'You approve', d: 'Nothing goes out until you review it. Approve, edit or reject each item.',
    who: 'hunter', say: 'The top 40 outreach messages are prepared. Review them and approve when you are ready.', tag: 'Waiting for your approval' },
  { ic: 'plug', t: 'Utilities run it', d: 'Approved work is sent, scheduled and synced by the utilities you have installed.',
    who: 'cora', say: 'Approved. Email automation is sending the sequence and the CRM is logging every reply.', tag: 'Running' },
]

export const TRUST = [
  { ic: 'shield', t: 'Human approval controls', d: 'Teammates prepare the work. You decide what goes out, every time.' },
  { ic: 'layers', t: 'One shared Startup Brain', d: 'Your story, customers and goals live in one place, so every teammate stays consistent.' },
  { ic: 'plug', t: 'Installable utilities', d: 'Email, CRM, scheduling and publishing run as add-ons you turn on when you need them.' },
]

export const FAQ = [
  { q: 'What is a GTM Room?', a: 'A shared workspace built around one business goal. It holds your AI teammates, the mission, the work they produce and the utilities that carry it out, so context stays in one place.' },
  { q: 'Will the AI send things without my approval?', a: 'No. Teammates prepare the work and ask for your approval first. You can approve, edit or reject each item before any utility runs it.' },
  { q: 'What are utilities?', a: 'Utilities are the actions that get work done, such as email automation, CRM sync, contact enrichment, a meeting scheduler, a content publisher and a proposal builder. You install the ones you need.' },
  { q: 'Which podcast markets do you cover?', a: 'Cast recommends shows in the United States, India and global markets, matched to your category, stage, audience, language and goal.' },
  { q: 'How do I get started?', a: 'Create your GTM Room and start with a focused 30-day mission. Pick one goal and Emmy will set up the team and the plan.' },
  { q: 'Do I need a marketing or sales team first?', a: 'No. The room is designed for founders who want a coordinated growth team without hiring one first. You stay in charge of the decisions.' },
]
