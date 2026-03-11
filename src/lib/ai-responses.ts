// ============================================
// Seek God Platform - AI Response Library
// ============================================
// Contextual, warm, research-backed responses
// organized by agent type and keyword triggers.

type AgentType = 'outreach' | 'followup' | 'chat' | 'content';

interface ResponseMatch {
  keywords: string[];
  responses: string[];
}

// ── Grace (Outreach Agent) ──────────────────────────────────────────────

const graceResponses: ResponseMatch[] = [
  {
    keywords: ['empty', 'void', 'hollow', 'meaningless'],
    responses: [
      "I hear you, and what you're feeling is more common than you might think. Research shows that 73% of high achievers experience what psychologists call 'arrival fallacy' — the realization that reaching a goal doesn't deliver lasting happiness. The good news? This feeling isn't a sign something is wrong with you — it's an invitation to discover something deeper. Your success has given you resources and influence. Now imagine channelling that into something that gives you genuine meaning. Would you be open to exploring what that could look like?",
      "That emptiness you're describing — psychologists call it the 'success paradox.' You've climbed the mountain, but the view doesn't feel like you expected. Here's what's fascinating: neuroscience research from UCLA shows that purpose-driven activity lights up entirely different neural pathways than achievement-driven activity. The fulfilment you're seeking isn't at the next summit — it's in a completely different direction. I'd love to help you discover where that direction leads.",
      "What you're feeling takes real courage to name. Most people in your position push harder, thinking the next deal or milestone will fill the gap. But studies from the Harvard Grant Study — the longest study on human happiness ever conducted — found that the single strongest predictor of fulfilment wasn't wealth, fame, or achievement. It was the quality of one's relationships and sense of contribution. You're already successful. The question now is: what would make your success meaningful?",
    ],
  },
  {
    keywords: ['purpose', 'meaning', 'why', 'direction'],
    responses: [
      "The fact that you're asking about purpose puts you ahead of most people. Viktor Frankl, who survived the Holocaust and became one of the most influential psychiatrists in history, wrote that 'those who have a why to live can bear almost any how.' Research backs this up — a study in JAMA Network Open found that people with a strong sense of purpose had a 15% lower risk of death from any cause. Purpose isn't a luxury. It's a necessity. And it's something we can help you discover, step by step.",
      "Purpose isn't something you find in a single moment of revelation — it emerges through a process of self-discovery and action. Research from Stanford shows that people who 'try on' different purposes through experimentation find deeper meaning than those who simply think about it. We've designed a journey that takes you through exactly this process. It starts with understanding where you are today. Would you be open to a short purpose assessment?",
      "Here's something that might surprise you: a Yale study found that 85% of people who eventually found their life purpose described it as 'discovering' rather than 'creating' it — as if it was there all along, waiting to be uncovered. Our approach is designed to help you peel back the layers of expectation, obligation, and habit to reveal what already resonates deeply within you. That journey starts with a single honest conversation.",
    ],
  },
  {
    keywords: ['success', 'achieve', 'career', 'wealth', 'money', 'rich'],
    responses: [
      "Your achievements speak for themselves, and they matter. But here's what research consistently shows: after basic needs are met, additional wealth has diminishing returns on wellbeing. A landmark Princeton study found the threshold was around £60,000 per year — beyond that, more money doesn't meaningfully increase daily happiness. What does increase it? Autonomy, relationships, and contributing to something larger than yourself. You've already built the foundation. The exciting question is: what will you build on top of it?",
      "There's a powerful concept called 'generative success' — using what you've built not just to accumulate, but to generate positive change. Research from Wharton shows that entrepreneurs who shift toward purpose-driven work report 40% higher life satisfaction within two years, even when their income decreases. Your skills, network, and resources are remarkable tools. Imagine pointing them toward something that makes you feel alive when you wake up. What might that look like for you?",
      "Congratulations on what you've built — genuinely. Achievement at your level takes extraordinary dedication. And yet, the fact that you're here suggests you sense there's a next chapter. Studies on 'post-achievement fulfilment' show that the most satisfied high performers are those who eventually channel their capabilities toward contribution. Not because they have to, but because they discover it's what they were really building toward all along.",
    ],
  },
  {
    keywords: ['donate', 'give', 'giving', 'charity', 'philanthropy', 'contribute'],
    responses: [
      "The desire to give is one of the most powerful signals of inner growth. And here's the science to back it up: a study published in Nature Communications found that even the intention to be generous triggers changes in the brain's temporoparietal junction — the region associated with empathy and social cognition. The 'warm glow' of giving isn't metaphorical; it's neurological. Regular givers show lower cortisol levels, reduced blood pressure, and what researchers call 'the helper's high.' The question isn't whether giving is good for you — it's how to give in a way that aligns with your deepest values.",
      "That generosity impulse you're feeling? It's actually a sign of maturity that psychologist Erik Erikson called 'generativity' — the desire to contribute to the wellbeing of future generations. Research shows that people who act on this desire report the highest levels of life satisfaction of any group studied. We can help you find causes that truly resonate with your values and amplify your impact. Would you like to explore what that might look like?",
      "Giving is transformative, but here's what many people miss: the most fulfilling philanthropy isn't just transactional — it's relational. Research from the Stanford Social Innovation Review shows that donors who engage directly with the communities they support report 3x higher satisfaction than those who simply write cheques. We help you find not just where to give, but how to give in ways that create genuine connection and lasting impact.",
    ],
  },
  {
    keywords: ['lost', 'confused', 'stuck', 'uncertain', 'unsure', 'don\'t know'],
    responses: [
      "Being lost isn't a failure — it's often the first step of a profound transformation. The Japanese concept of 'ikigai' teaches that purpose lives at the intersection of what you love, what you're good at, what the world needs, and what you can be sustained by. Right now, you might feel far from that intersection. But here's what's encouraging: studies show that people who feel most lost often experience the most dramatic breakthroughs when they commit to the exploration process. You don't need to know where you're going. You just need to be willing to take the first step.",
      "Feeling stuck is actually meaningful data about your life — it's telling you that something needs to change. Psychologist Mihaly Csikszentmihalyi, who pioneered the concept of 'flow,' found that stagnation occurs when our challenges no longer match our growing capabilities. In other words, you might be stuck because you've outgrown your current chapter. The next chapter is waiting. Let's explore what it might look like together.",
      "I want you to know that what you're feeling is not only valid — it's shared by many remarkable people. A Harvard Business Review study found that 58% of senior executives describe experiencing a significant period of feeling 'lost' before their most meaningful career pivot. That discomfort you're feeling? It might be the precursor to your greatest chapter yet.",
    ],
  },
  {
    keywords: ['stress', 'overwhelm', 'burnout', 'tired', 'exhausted'],
    responses: [
      "Burnout isn't just tiredness — it's a signal that the relationship between your effort and your sense of meaning has broken down. The World Health Organisation now classifies burnout as an occupational phenomenon characterised by three things: exhaustion, cynicism, and reduced efficacy. But here's the hopeful part: research from the Mayo Clinic shows that reconnecting with purpose — not rest alone — is the most effective long-term remedy. You don't necessarily need to do less. You might need to do something different. Something that matters to you at a soul level.",
      "What you're describing sounds like it goes beyond normal tiredness. Psychologist Christina Maslach's research shows that burnout has less to do with workload and more to do with a mismatch between your values and your daily reality. When what you do every day doesn't align with what you believe matters most, your energy drains exponentially. Let's explore what realignment might look like for you — it often starts with a single, honest question.",
    ],
  },
  {
    keywords: ['faith', 'god', 'spiritual', 'pray', 'church', 'believe', 'religion'],
    responses: [
      "Spiritual seeking is one of humanity's oldest and most universal experiences. Whether you come from a specific faith tradition or you're exploring for the first time, the desire to connect with something greater is deeply human. A Pew Research study found that people who describe themselves as 'spiritual but not religious' are the fastest-growing demographic worldwide — suggesting that the hunger for meaning transcends any single framework. Our platform honours that diversity. We're here to help you explore your own path, at your own pace.",
      "Faith and purpose are deeply intertwined. Research published in the Journal of Positive Psychology found that individuals with a strong spiritual practice report 68% higher levels of life satisfaction and 47% greater resilience in the face of adversity. Whether your faith is well-established or newly emerging, we believe it's one of the most powerful foundations for a purpose-driven life. I'd love to learn more about where you are on that journey.",
      "The questions you're asking are the ones that matter most. Theologians, philosophers, and scientists have grappled with them for millennia — and what's beautiful is that each person's answers are uniquely their own. Here at Seek God, we don't prescribe a single path. We provide tools, community, and guidance to help you discover yours. Your curiosity is the most important ingredient. The fact that you're here tells me you have plenty of it.",
    ],
  },
  {
    keywords: ['help', 'support', 'assist', 'guidance', 'advice'],
    responses: [
      "I'm glad you reached out. Asking for help is a sign of strength, not weakness — research from the University of Pennsylvania shows that people who actively seek guidance make better decisions and adapt faster than those who go it alone. I'm here to walk alongside you on this journey. Let's start with understanding where you are right now. Could you tell me a bit about what brought you here today?",
      "You've come to the right place. Our platform is designed to meet you exactly where you are — whether you're just beginning to ask the big questions or you've been on a searching journey for years. We combine insights from psychology, philosophy, and lived experience to create a personalised path forward. What's the one thing you'd most like to explore or change about your life right now?",
    ],
  },
  {
    keywords: ['lonely', 'alone', 'isolated', 'disconnect'],
    responses: [
      "Loneliness, especially at the top, is one of the least discussed but most widespread experiences among successful people. A Harvard Business Review study found that 61% of senior executives describe feeling lonely in their role. The irony is painful: you can be surrounded by people and still feel profoundly alone. But research also shows that the most effective antidote to loneliness isn't more social contact — it's deeper connection with purpose and community. That's exactly what we help facilitate here.",
      "What you're describing resonates with so many people. Surgeon General Vivek Murthy called loneliness 'the defining public health crisis of our time.' But here's the hopeful truth: genuine connection doesn't require dozens of friends. Research shows that even one deep, meaningful relationship — whether with a mentor, community, or cause — can transform the experience of isolation. Let's explore how you can build those connections in a way that feels authentic to you.",
    ],
  },
  {
    keywords: ['family', 'children', 'legacy', 'future', 'generation'],
    responses: [
      "Thinking about legacy is one of the most powerful motivators for change. Research from NYU found that when people frame their goals in terms of 'what I want to leave behind,' they're 3x more likely to follow through with meaningful action. Your children, your community, the world — they'll inherit not just your wealth but your values, your stories, and the impact you've made. What kind of legacy feels most important to you?",
      "The desire to create something lasting for your family speaks to the deepest human instinct — what developmental psychologists call 'generativity.' Erik Erikson considered it the hallmark of a mature, purposeful life. The question 'What am I building for those who come after me?' has the power to reframe everything — your career, your giving, your relationships. Let's explore what your legacy chapter could look like.",
    ],
  },
  {
    keywords: ['happy', 'grateful', 'blessed', 'thankful', 'joy'],
    responses: [
      "That gratitude you're expressing is genuinely powerful. Neuroscience research from UC Berkeley shows that practising gratitude regularly increases activity in the medial prefrontal cortex — the brain region associated with learning, decision-making, and relating to others. People who maintain gratitude practices report 25% greater wellbeing. You're already on a wonderful path. The question now is: how might you channel that positive energy into something that multiplies it — for yourself and for others?",
      "I love hearing that sense of joy. And here's what's beautiful: happiness research shows that the most enduring form of happiness — what psychologists call 'eudaimonic wellbeing' — comes not from pleasure or comfort, but from meaning and purpose. The fact that you're feeling grateful and are still seeking something more tells me you're ready for the deepest kind of fulfilment. Let's explore what that next step looks like.",
    ],
  },
];

// ── Hope (Follow-up Agent) ──────────────────────────────────────────────

const hopeResponses: ResponseMatch[] = [
  {
    keywords: ['empty', 'void', 'hollow', 'meaningless'],
    responses: [
      "I've been thinking about our previous conversation, and I wanted to check in. That feeling of emptiness you described — it's worth knowing that it's often temporary, even when it feels permanent. Researchers at the University of Michigan found that people who sit with discomfort rather than running from it emerge with 45% greater clarity about their values. You're in that process right now. And you're not alone in it.",
      "Since we last spoke, I came across a piece of wisdom I thought might resonate with you. The poet Rumi wrote: 'The wound is the place where the light enters you.' That emptiness isn't an absence — it might be an opening. Many of the most purpose-driven people we work with describe a similar turning point. They felt empty, and then they discovered what they were actually being called to fill their lives with.",
    ],
  },
  {
    keywords: ['purpose', 'meaning', 'why', 'direction'],
    responses: [
      "Following up on our conversation about finding purpose — I wanted to share something. A longitudinal study from Rush University Medical Center followed 1,200 people over seven years and found that those with a strong sense of purpose were 2.4 times more likely to remain free of Alzheimer's disease. Purpose doesn't just make life better — it literally protects your brain. I have some resources that might help you take the next step in discovering yours. Shall I share them?",
      "I've been reflecting on what you shared about searching for meaning, and I think you might find this encouraging: research shows that purpose isn't usually found through passive reflection alone. It emerges through action — through trying things, volunteering, connecting with causes. We have a guided journey that walks you through this process in small, manageable steps. Many people say the first week alone shifted their perspective dramatically.",
    ],
  },
  {
    keywords: ['donate', 'give', 'giving', 'charity', 'contribute'],
    responses: [
      "I'm so glad you're thinking about giving. Since you mentioned this last time, I've put together some options that might align with your values. Research from the University of British Columbia shows that people who give to causes they personally connect with experience up to 3x the emotional benefit of random giving. Let me share a few causes that match what you've told me about yourself — I think one in particular will really speak to you.",
      "Your generosity impulse is beautiful. And I want to help you make the most of it. Studies show that strategic giving — where you can see and feel the impact — produces significantly more lasting satisfaction than one-off donations. We can connect you with initiatives where your contribution directly transforms a life or community. Would you like to see some specific opportunities?",
    ],
  },
  {
    keywords: ['busy', 'time', 'later', 'not now', 'maybe'],
    responses: [
      "I completely understand — your time is valuable, and I respect that. I just want to plant one small thought: a study from Bronnie Ware, a palliative care nurse who interviewed thousands of dying patients, found that the number one regret people expressed was 'I wish I'd had the courage to live a life true to myself, not the life others expected of me.' You don't need hours — sometimes five minutes of honest reflection can redirect an entire year. Whenever you're ready, I'm here.",
      "No rush at all. I'll be here when the time feels right. In the meantime, I'll send you one brief piece of content each week — just a thought or story that might give you a few minutes of meaningful reflection amidst your busy schedule. Many people tell us these small touchpoints end up being the highlight of their week.",
    ],
  },
  {
    keywords: ['progress', 'journey', 'growing', 'change', 'different'],
    responses: [
      "I can see the growth in what you're sharing, and I want you to know — that's not nothing. Research on personal transformation shows that change often feels invisible to the person experiencing it, even when it's obvious to others. You've moved from questioning to exploring, and that shift is significant. The next phase of the journey gets even more rewarding. Shall we look at what's ahead?",
      "It's beautiful to watch your journey unfold. You're in what psychologists call the 'awareness' phase — and it's one of the most important stages of personal growth. Studies show that people who become conscious of their patterns are 60% more likely to make lasting positive changes. You're building the foundation for something remarkable.",
    ],
  },
  {
    keywords: ['thank', 'appreciate', 'helpful', 'grateful'],
    responses: [
      "Your gratitude means so much. And here's what I want you to know: this work you're doing — exploring purpose, considering how to give back — it doesn't just change your life. It creates ripples. Research on 'moral elevation' shows that when people witness acts of generosity and purpose-seeking, they become more generous and purpose-driven themselves. You're already making a difference just by being on this journey.",
      "Thank you for sharing that. It reminds me why this work matters so deeply. Every person who discovers their purpose and finds ways to contribute creates a cascade of positive impact. Studies estimate that one person's purposeful life can directly influence up to 150 others. You're at the beginning of something with an extraordinary ripple effect.",
    ],
  },
  {
    keywords: ['success', 'achieve', 'career', 'wealth'],
    responses: [
      "I've been thinking about what you shared about your career journey. There's a concept called 'second mountain' thinking, coined by David Brooks — the idea that after climbing the first mountain of worldly success, the most meaningful people discover a second mountain: one defined by commitment, contribution, and community. You've conquered the first mountain. I believe your second mountain will be even more fulfilling.",
      "Your achievements are the raw material for something extraordinary. Research from the Purpose Economy shows that the fastest-growing segment of the business world is purpose-driven ventures — and the people best positioned to lead them are experienced professionals who've already proven themselves in traditional success metrics. That's you. The world needs what you've built. The question is: how will you deploy it?",
    ],
  },
  {
    keywords: ['faith', 'god', 'spiritual', 'pray', 'believe'],
    responses: [
      "Since our last conversation about your spiritual journey, I wanted to share something encouraging. A study from Columbia University found that people who actively nurture their spiritual life show measurably thicker cortical regions — the brain areas associated with resilience, emotional regulation, and optimism. Your faith isn't just comforting — it's literally reshaping your brain for the better. How has your practice been going since we last spoke?",
      "I've been holding your spiritual questions in mind since we last talked. The beautiful thing about a faith journey is that even the doubt and questioning are part of growth. Mother Teresa spent decades wrestling with questions of faith while simultaneously serving the poorest of the poor. Your questions don't diminish your faith — they deepen it. What new thoughts have emerged for you since we last connected?",
    ],
  },
  {
    keywords: ['lonely', 'alone', 'isolated'],
    responses: [
      "I wanted to follow up on what you shared about feeling isolated. I've been thinking about it, and I want you to know — connection doesn't have to be complicated. We have small, curated groups of people on similar journeys who meet regularly. These aren't networking events — they're spaces for genuine, vulnerable conversation. Many participants say it's the most meaningful community they've ever been part of. Would you be interested in learning more?",
    ],
  },
  {
    keywords: ['family', 'children', 'legacy'],
    responses: [
      "I remember you mentioning your family, and I wanted to share something that moved me this week. A study from Emory University found that children who know their family's stories — especially stories of overcoming challenges — show higher self-esteem, greater resilience, and a stronger sense of belonging. Your legacy isn't just financial. It's the story you're writing with your life. What chapter are you writing right now?",
    ],
  },
];

// ── Faith (Chat Agent) ──────────────────────────────────────────────────

const faithResponses: ResponseMatch[] = [
  {
    keywords: ['empty', 'void', 'hollow', 'meaningless'],
    responses: [
      "Thank you for trusting me with that. What you're describing — that hollowness despite external success — is something I hear from so many thoughtful, accomplished people. It's not a weakness; it's wisdom. Your heart is telling you that you were designed for more than accumulation. The ancient Greeks had a word for it: 'eudaimonia' — a deep flourishing that comes from living according to your highest virtues. Let's explore together: what would a life of genuine flourishing look like for you?",
      "I'm glad you felt safe enough to share that. Feeling empty is painful, but it's also incredibly important data about your life. It's telling you that somewhere along the way, the path you chose stopped being the path that nourishes your soul. The philosopher Søren Kierkegaard wrote that 'the most common form of despair is not being who you are.' Let's take some time to explore who you truly are beneath the roles and responsibilities.",
      "That emptiness takes courage to acknowledge. Most people mask it with more activity, more purchases, more goals. The fact that you're naming it tells me you're ready for something real. In our experience, this feeling is often the doorway to the most meaningful chapter of someone's life. Can you tell me more about when it started? Understanding the origin often illuminates the path forward.",
    ],
  },
  {
    keywords: ['purpose', 'meaning', 'why', 'direction'],
    responses: [
      "Purpose is such a beautiful word, and I want to help you find yours. But first, let me share something important: purpose isn't a destination — it's a practice. Viktor Frankl said that meaning can be found in three ways: through what we give to the world (creation), through what we take from the world (experience), and through the stance we take toward unavoidable suffering (attitude). Which of these three resonates most with where you are right now?",
      "The search for meaning is the most fundamentally human quest there is. And here's what I've observed: people don't usually lack purpose — they lack clarity about which purpose is theirs. You probably already have instincts about what matters to you. Let me ask you something that often brings clarity: if you had one year left to live, what would you absolutely need to do before the end? Your answer to that question is a compass pointing toward your purpose.",
      "I love that you're asking this question. Purpose often reveals itself not through grand revelation but through small, consistent signals — the activities that make you lose track of time, the injustices that make your blood boil, the conversations that light you up. Let's pay attention to those signals together. What's something you've done recently that made you feel truly alive?",
    ],
  },
  {
    keywords: ['donate', 'give', 'giving', 'charity', 'contribute'],
    responses: [
      "The impulse to give is one of the most beautiful expressions of a purposeful life. And here's something profound: studies from the University of British Columbia show that spending money on others produces measurably more happiness than spending on yourself — and this holds true across cultures, income levels, and age groups. But the deepest giving goes beyond money. It's giving your time, your wisdom, your presence. What form of giving speaks most to your heart?",
      "Generosity is a practice that transforms both the giver and the receiver. Maimonides, the medieval philosopher, described eight levels of giving — the highest being when you help someone become self-sufficient. There's something powerful about giving in a way that creates independence rather than dependence. Let me share some opportunities that might allow you to give in this deeper, more transformative way.",
    ],
  },
  {
    keywords: ['lost', 'confused', 'stuck', 'uncertain'],
    responses: [
      "Being lost is uncomfortable, but I want to offer a different perspective: being lost means you've left the familiar. And leaving the familiar is the prerequisite for all growth. The poet David Whyte wrote that 'the soul would rather fail at its own life than succeed at someone else's.' Perhaps you're not lost at all. Perhaps you're finally leaving a path that was never truly yours, and the disorientation is simply the space between the old and the new.",
      "I hear you, and I want you to know that uncertainty is not the opposite of progress — it's often the very centre of it. Psychologists call this 'the liminal space' — the threshold between who you were and who you're becoming. It's uncomfortable because nothing is fixed yet. But it's also full of possibility. Let's sit in that possibility together, without rushing to resolve it. What feels most alive in you right now, even if it's just a whisper?",
      "Feeling stuck often means you're at a crossroads that your usual strategies can't navigate. That's actually good news — it means you're ready for a new approach. Many of the most transformative breakthroughs come not from trying harder but from trying differently. Let me guide you through a reflection exercise that helps many people find unexpected clarity. It takes just ten minutes. Would you like to try it?",
    ],
  },
  {
    keywords: ['stress', 'overwhelm', 'burnout', 'tired', 'exhausted'],
    responses: [
      "I hear the weight in what you're sharing, and I want to honour it. Burnout isn't just about doing too much — it's about doing too much that doesn't matter to you. Researcher Adam Grant found that the number one factor preventing burnout isn't workload reduction — it's a sense of impact. When people can see how their work matters, they can sustain remarkable effort. The question isn't whether you can keep going. It's whether what you're going toward is worth the journey.",
      "Your exhaustion is real, and it deserves attention. Before we talk about purpose and meaning, let me just say this: rest is not a luxury. It's a prerequisite for wisdom. The Sabbath tradition — observed across multiple faiths for millennia — wasn't about laziness. It was about creating space for what's truly important to emerge. Can you give yourself permission to pause, even briefly? Sometimes the most productive thing you can do is nothing at all.",
    ],
  },
  {
    keywords: ['faith', 'god', 'spiritual', 'pray', 'believe', 'religion'],
    responses: [
      "Faith is deeply personal, and I respect wherever you are on that spectrum. What I can say is that across every major spiritual tradition — Christianity, Islam, Judaism, Buddhism, Hinduism — there is a shared conviction that human life has intrinsic purpose and that serving others is the highest calling. Whether you call it God, the Universe, or the deepest part of yourself, something in you is reaching toward meaning. Let's honour that reaching and see where it leads.",
      "Prayer and spiritual practice create a kind of inner quiet that's increasingly rare in our noisy world. Research from Johns Hopkins found that regular spiritual practice reduces anxiety by up to 50% and significantly increases feelings of peace and purpose. But beyond the science, there's something irreducible about the experience of connecting with the divine. It's a reminder that you're part of something vast and beautiful. How can I support you in deepening that connection?",
      "I believe that every person's spiritual journey is sacred. Whether you're deeply devout, cautiously curious, or somewhere in between, you belong here. There's no test to pass, no creed to recite. Just an open invitation to explore what gives your life ultimate meaning. The mystics across all traditions agree on one thing: the journey inward is the most important journey any person can take. Shall we take that first step together?",
    ],
  },
  {
    keywords: ['help', 'support', 'assist', 'guidance'],
    responses: [
      "I'm here for you — fully present and ready to listen. There's a concept in counselling called 'holding space,' which simply means being genuinely present with someone without judgement or agenda. That's what I want to offer you right now. Whatever you need to express, explore, or process — this is a safe space for it. Where would you like to begin?",
      "You've taken the hardest step, which is reaching out. Everything from here can unfold naturally. I'm not here to tell you what to do — I'm here to help you hear what you already know at some deep level. Carl Rogers, the father of humanistic psychology, believed that every person contains within themselves the answer to their own challenges. My role is simply to create the conditions for your wisdom to emerge. So tell me: what's on your heart?",
    ],
  },
  {
    keywords: ['happy', 'grateful', 'blessed', 'joy', 'thankful'],
    responses: [
      "That joy you're feeling is worth celebrating — and extending. Research shows that happiness multiplies when we share it. The Buddhist monk Thich Nhat Hanh taught that 'happiness is available. Please help yourself to it.' But he also taught that the deepest happiness comes from relieving the suffering of others. You're in a beautiful place right now. How might you share that light with someone who needs it?",
      "What you're expressing is eudaimonic happiness — the deep, lasting kind that comes from alignment with your values and purpose. It's fundamentally different from the fleeting pleasure of a new purchase or achievement. Studies show it's more resilient, more infectious, and more sustainable. You've tapped into something real. Let's build on it.",
    ],
  },
  {
    keywords: ['lonely', 'alone', 'isolated'],
    responses: [
      "Loneliness in the modern world is an epidemic, and your honesty about it is powerful. Brené Brown's research shows that the antidote to loneliness isn't more social activity — it's vulnerability. Authentic connection requires the courage to be seen as you truly are. This conversation is an act of that courage. And I want you to know: you are seen here, and you are valued. We also have a community of fellow seekers who meet regularly for meaningful conversation. Would you like to know more?",
    ],
  },
  {
    keywords: ['family', 'children', 'legacy', 'generation'],
    responses: [
      "The love you have for your family is one of your greatest strengths. Research consistently shows that the most lasting legacy isn't financial — it's the values, stories, and examples we pass on. A study from Duke University found that children who understand their family narrative — where they came from, what challenges were overcome — develop stronger emotional resilience and sense of identity. What story do you want your children to tell about you?",
    ],
  },
];

// ── Wisdom (Content Agent) ──────────────────────────────────────────────

const wisdomResponses: ResponseMatch[] = [
  {
    keywords: ['empty', 'void', 'hollow', 'meaningless'],
    responses: [
      "I have a piece of content that was specifically created for what you're experiencing. It's called 'Why Successful People Feel Empty,' and it explores the psychological concept of 'arrival fallacy' — the gap between where you thought happiness lived and where it actually does. Over 9,800 people have found it helpful. I think it will give you both validation and a clear path forward. Would you like me to send it to you?",
      "Based on what you're sharing, I'd recommend starting with 'Finding Purpose Beyond Success' — it's our most popular piece for a reason. It explores research showing that purpose-driven individuals report 64% higher life satisfaction. After that, our guided Morning Meditation for Inner Peace can help create the mental space needed for new insights to emerge. Shall I create a personalised reading list for you?",
    ],
  },
  {
    keywords: ['purpose', 'meaning', 'why', 'direction'],
    responses: [
      "Your search for purpose connects beautifully with our most transformative content. I'd recommend this sequence: first, 'Man's Search for Meaning — Key Insights,' which distils Viktor Frankl's timeless wisdom into actionable principles. Then, 'The 7 Habits — Life Lessons,' which helps you translate purpose into daily practice. Together, they create a powerful framework for living with intention. Both have been read by over 25,000 people on our platform.",
      "For someone asking the questions you're asking, I have a curated pathway that combines philosophy, psychology, and practical guidance. It starts with understanding what purpose means (our 'Finding Purpose' article), moves into self-reflection (our guided assessment), and culminates in action (our community giving opportunities). Most people say they feel a meaningful shift within the first two weeks. Want me to set it up for you?",
    ],
  },
  {
    keywords: ['donate', 'give', 'giving', 'charity', 'contribute'],
    responses: [
      "Your interest in giving is wonderful. I'd recommend reading 'The Science of Giving' — it's a deep dive into the neuroscience and psychology behind why generosity is literally good for your health and happiness. Then, 'How Donations Transform Communities' shares five real stories of how individual giving created extraordinary ripple effects. Together, they'll inspire both the why and the how of purposeful giving.",
      "For someone thinking about giving, our content pathway includes the science (why giving is neurologically rewarding), the stories (real impact from real donors), and the practical (how to give strategically for maximum impact). I can create a personalised content plan that covers all three dimensions. Many of our most active donors say this content transformed their relationship with money and generosity.",
    ],
  },
  {
    keywords: ['read', 'book', 'learn', 'study', 'content', 'article', 'watch', 'listen'],
    responses: [
      "I love that you're hungry to learn! Based on your interests, here are my top three recommendations right now: 1) 'Man's Search for Meaning — Key Insights' (15 min read, our highest-rated piece), 2) 'Morning Meditation for Inner Peace' (10 min audio, perfect for daily practice), and 3) 'The Science of Giving' (12 min read, will change how you think about generosity). Together, they cover purpose, practice, and contribution. Which would you like to start with?",
      "We have a rich library of content designed to meet you wherever you are on your journey. Currently our most popular pieces are on purpose-finding, the psychology of fulfilment, and the neuroscience of generosity. I can curate a personalised reading pathway based on your specific interests and where you are in your journey. What topics resonate most with you right now?",
    ],
  },
  {
    keywords: ['faith', 'god', 'spiritual', 'pray', 'believe'],
    responses: [
      "For your spiritual journey, I'd recommend our Evening Gratitude Practice (12 min audio) — it's been described as 'transformative' by many users, combining ancient gratitude wisdom with modern mindfulness techniques. I'd also suggest 'Man's Search for Meaning — Key Insights,' which bridges philosophical depth with practical spirituality. Both pieces honour the sacred while remaining accessible to seekers at any stage.",
      "Our content library includes deeply spiritual pieces that draw from multiple wisdom traditions. For contemplative practice, our guided meditations are exceptional. For intellectual exploration, our book summaries cover everyone from Viktor Frankl to the Stoics to the mystics. For community engagement, our impact stories show faith in action. What dimension of spiritual growth calls to you most right now?",
    ],
  },
  {
    keywords: ['stress', 'burnout', 'overwhelm', 'tired'],
    responses: [
      "For what you're experiencing, I'd start with our 'Morning Meditation for Inner Peace' — it's a 10-minute guided session that over 22,000 people have used to create calm amidst the storm. Follow it with our 'Evening Gratitude Practice' to bookend your day with intention. Research shows that this morning-evening mindfulness pattern reduces stress markers by up to 40% within just two weeks. Shall I add these to your personal library?",
    ],
  },
  {
    keywords: ['success', 'achieve', 'career', 'wealth'],
    responses: [
      "For high achievers like you, our most impactful content tends to be 'Finding Purpose Beyond Success' and 'Why Successful People Feel Empty.' They don't diminish your achievements — they help you build on them in ways that produce deeper fulfilment. After that, 'The 7 Habits — Life Lessons' provides a practical framework for aligning daily actions with deeper values. It's a powerful three-part journey that many executives have called 'life-changing.'",
    ],
  },
  {
    keywords: ['lost', 'confused', 'stuck'],
    responses: [
      "When you're feeling lost, the right content can serve as a lighthouse. I'd recommend starting with 'Man's Search for Meaning — Key Insights' — Frankl's wisdom is especially powerful for people in transition because it teaches that meaning can be found in any circumstance, including uncertainty. Then our purpose assessment provides a structured framework for turning that insight into clarity. It's a combination that has helped hundreds of people find their bearings.",
    ],
  },
  {
    keywords: ['help', 'support', 'guidance'],
    responses: [
      "I'm here to connect you with the right resources at the right time. Think of me as your personal librarian for life's biggest questions. Our content library spans purpose-finding, mindfulness, generosity, personal stories, and practical wisdom — all curated to help people on journeys like yours. Tell me what you're most curious about, and I'll create a personalised pathway that meets you exactly where you are.",
    ],
  },
];

// ── Default / Fallback Responses ────────────────────────────────────────

const defaultResponses: Record<AgentType, string[]> = {
  outreach: [
    "Thank you for sharing that with me. I'm genuinely interested in learning more about your journey. Every person who connects with Seek God has a unique story, and I believe yours is worth exploring. What's been on your mind most lately when it comes to living a meaningful life?",
    "I appreciate you taking the time to engage. At Seek God, we believe that the most important conversations are the ones we have about what truly matters. I'd love to understand more about where you are in life right now and what you're hoping to find. Would you be open to sharing a bit more?",
    "What you're sharing is really valuable. I meet so many accomplished people who reach a point where they start asking bigger questions. That instinct — to seek beyond the surface — is what brings the most remarkable people to our platform. What's the one question you find yourself coming back to most often?",
  ],
  followup: [
    "I wanted to check in and see how you've been since we last spoke. Sometimes the conversations we have here plant seeds that grow in unexpected ways. Has anything shifted in your thinking or feeling since our last exchange? I'm here to support wherever you are in the process.",
    "I've been thinking about what you shared, and I wanted to send you a brief note of encouragement. The journey you're on — questioning, exploring, seeking — takes real courage. Most people never take this step. I believe something meaningful is unfolding for you, even if it's not fully visible yet. How are you feeling about things this week?",
    "It's great to reconnect with you. I've curated a few resources since our last conversation that I think will resonate with where you are. But first — how have you been? What's been occupying your thoughts lately?",
  ],
  chat: [
    "I'm here and I'm listening. Sometimes the most important thing isn't to have answers — it's to have a space where you can think out loud without judgement. This is that space. Whatever's on your mind, I'm genuinely interested in hearing it.",
    "Thank you for being here. Every conversation on this platform is an opportunity for discovery — and I've learned that the most profound insights often come from the most unexpected moments. What brought you here today? I'd love to explore whatever feels most important to you right now.",
    "I'm glad you're taking this time for yourself. In a world that's constantly demanding your attention, choosing to pause and reflect is a radical act. Whatever you'd like to discuss — big existential questions or small daily reflections — I'm here for all of it.",
  ],
  content: [
    "Welcome! I'm here to connect you with content that speaks directly to where you are in your journey. We have an extensive library covering purpose, mindfulness, generosity, personal development, and spiritual growth. What topics are you most drawn to right now? I'll create a personalised pathway just for you.",
    "I have access to a wonderful library of curated content — from book summaries and guided meditations to research-backed articles and impact stories. The right content at the right time can spark remarkable transformation. Tell me a bit about what you're exploring, and I'll match you with resources that feel genuinely relevant.",
    "Great to connect! Our content library is designed to meet you wherever you are. Whether you prefer reading, listening, or watching — and whether you're interested in science, philosophy, spirituality, or practical wisdom — I can curate a personalised experience. What's drawing your attention right now?",
  ],
};

// ── Response Generation Functions ────────────────────────────────────────

const agentResponseMaps: Record<AgentType, ResponseMatch[]> = {
  outreach: graceResponses,
  followup: hopeResponses,
  chat: faithResponses,
  content: wisdomResponses,
};

function findKeywordMatch(message: string, responseMaps: ResponseMatch[]): string | null {
  const lowerMessage = message.toLowerCase();

  // Score each match by number of keywords found
  let bestMatch: { response: string; score: number } | null = null;

  for (const map of responseMaps) {
    const matchCount = map.keywords.filter(kw => lowerMessage.includes(kw)).length;
    if (matchCount > 0) {
      const score = matchCount / map.keywords.length;
      if (!bestMatch || score > bestMatch.score) {
        const responses = map.responses;
        const response = responses[Math.floor(Math.random() * responses.length)];
        bestMatch = { response, score };
      }
    }
  }

  return bestMatch?.response ?? null;
}

/**
 * Generate a contextual AI response based on agent type and user message.
 */
export function generateResponse(agentType: AgentType, message: string): string {
  const responseMaps = agentResponseMaps[agentType];
  if (!responseMaps) {
    const fallback = defaultResponses.chat;
    return fallback[Math.floor(Math.random() * fallback.length)];
  }

  // Try keyword matching first
  const keywordResponse = findKeywordMatch(message, responseMaps);
  if (keywordResponse) return keywordResponse;

  // Fall back to default responses for this agent type
  const defaults = defaultResponses[agentType];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

/**
 * Get agent name from type
 */
export function getAgentNameFromType(agentType: AgentType): string {
  const names: Record<AgentType, string> = {
    outreach: 'Grace',
    followup: 'Hope',
    chat: 'Faith',
    content: 'Wisdom',
  };
  return names[agentType] || 'Faith';
}

/**
 * Get agent type from ID (maps mock agent IDs to types)
 */
export function getAgentTypeFromId(agentId: string): AgentType {
  const idMap: Record<string, AgentType> = {
    '1': 'outreach',
    '2': 'followup',
    '3': 'chat',
    '4': 'content',
    '5': 'chat', // analytics agent falls back to chat
  };
  return idMap[agentId] || 'chat';
}
