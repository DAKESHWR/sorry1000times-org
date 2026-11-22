/**
 * Amends Studio — Interactive Apology & Communication Engine
 * Redesigned and crafted in accordance with DESIGN.md
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initGenerator();
  initTemplateGallery();
  initSpeechAndExport();
  initFaqAccordion();
  updateCopyrightYear();
});

/* ==========================================================================
   1. Navbar Scroll Transformation (Transparent to Frosted Glass)
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-inner a');

  if (!mobileMenuBtn || !mobileDrawer) return;

  function toggleDrawer(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('is-open');
    mobileDrawer.classList.toggle('is-open', isOpen);
    mobileMenuBtn.classList.toggle('is-open', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  mobileMenuBtn.addEventListener('click', () => toggleDrawer());

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  document.addEventListener('click', (e) => {
    if (!mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      toggleDrawer(false);
    }
  });
}

/* ==========================================================================
   3. Apology Data Bank & Generator Engine
   ========================================================================== */
const APOLOGY_DATA = {
  emojis: {
    sincere: ['🥺', '🙏', '❤️', '🕊️', '💐', '✨', '💧'],
    playful: ['🧸', '🍪', '🥺', '🌸', '🐾', '💖', '👉👈'],
    dramatic: ['🥀', '🌧️', '📜', '⚖️', '🌩️', '🖤', '🕯️'],
    humorous: ['🤦‍♂️', '🍕', '🙃', '🤡', '🚨', '🦥', '🙈'],
    romantic: ['🌹', '❤️', '💌', '💞', '✨', '🕊️', '💍'],
    professional: ['🤝', '📋', '💼', '📌', '✉️', '⚖️']
  },

  intros: {
    sincere: [
      "I am writing this from a place of deep honesty and humility because I value you and our connection far too much to leave things unsaid.",
      "Please take a quiet moment to read this. Knowing that my behavior caused you distress or hurt weighs heavily on my mind.",
      "I want to step forward without any excuses, justifications, or deflections and take complete ownership of what happened.",
      "Your peace of mind and trust matter deeply to me, and it breaks my heart to realize that I compromised both."
    ],
    playful: [
      "Knock knock! It's me, waving a giant white flag and wearing my most sheepish apology expression...",
      "Sending you a warm hug wrapped in a mountain of apologies right now!",
      "I made a completely goofy blunder, and my day has been cloudy ever since. Can I earn your smile back?",
      "If I could rewind the clock, I'd bring your favorite treats and stop my silly mistake before it started!"
    ],
    dramatic: [
      "The silence between us hangs like an overcast sky, and I cannot let another hour slip by without opening my heart.",
      "My thoughts have been consumed by the realization of how badly I stumbled in our story.",
      "I stand before you humbled, deeply regretful, and longing to mend the harmony that we once shared.",
      "Words alone cannot erase yesterday's shadow, but every line here comes from the truest part of my conscience."
    ],
    humorous: [
      "I ran a full diagnostic check on my recent behavior, and the results came back 100% guilty of temporary foolishness.",
      "Warning: Highly remorseful human approaching. Please handle with care and maybe a comforting beverage.",
      "I am officially retiring my entry for 'Most Unnecessary Blunder of the Week'—I promise to do much better!",
      "My brain apparently took an unplanned leave of absence, leaving poor judgment in charge. I am genuinely sorry!"
    ],
    romantic: [
      "My dearest, knowing that I brought sadness to your eyes is the most painful feeling I could ever experience.",
      "You are the light in my life, and I am so deeply sorry for casting an unnecessary shadow between us.",
      "Every part of me wants to hold your hand, listen to your heart, and repair what my thoughtlessness disturbed.",
      "Your happiness is precious to me, and I am endlessly sorry for failing to treat your feelings with the care they deserve."
    ],
    professional: [
      "Please accept this correspondence as a formal and unequivocal expression of regret regarding the recent oversight.",
      "I am reaching out to address the recent miscommunication and to extend my sincere apologies for the inconvenience caused.",
      "It is of paramount importance to me that I acknowledge where expectations were not met and take decisive action to resolve the matter.",
      "I recognize the disruption this situation created and want to assure you of my full accountability in rectifying it."
    ]
  },

  situations: {
    lateReply: [
      "Leaving you waiting without a prompt response was thoughtless of me. Even during busy stretches, keeping you informed should have been my priority.",
      "I know how frustrating it is to be left on read or kept waiting. You deserved my prompt attention, and I regret dropping the ball.",
      "I failed to communicate in a timely manner, and I understand how that might have felt dismissive. That was never my intention, but the impact was real."
    ],
    forgotEvent: [
      "Overlooking an occasion that means so much to you was completely inexcusable, and I am deeply disappointed in myself for letting it slip.",
      "You deserved to be celebrated, remembered, and prioritized today. No busy calendar or distraction excuses my failure to be there for you.",
      "Special milestones are reminders of our bond, and failing to acknowledge yours is an error I take full and painful ownership of."
    ],
    madeMistake: [
      "I made a serious lapse in judgment, and looking back, I can see plainly how avoidable and unfair my actions were.",
      "I acted carelessly without weighing the consequences, and you bore the brunt of my mistake. I am ready to do whatever it takes to set this right.",
      "There is no sugarcoating what occurred: I made an error, and I am fully committed to fixing every ripple it created."
    ],
    argument: [
      "In the heat of the moment, I let defensiveness and frustration hijack my words. Things were said that were harsh, untrue, and uncalled for.",
      "I allowed pride to stand in the way of empathy, and instead of listening to understand your perspective, I lashed out. I deeply regret doing so.",
      "You deserved patience, respect, and calm discussion, not sharp reactions. I am truly sorry for raising the temperature instead of soothing it."
    ],
    missedCall: [
      "I missed your calls when you reached out, and I know the worry and frustration that causes when you need to connect.",
      "Being inaccessible when you reached out was irresponsible on my part. I apologize sincerely for leaving you hanging.",
      "Reliability is the foundation of trust, and I failed to be there when you rang. I will make sure this does not become a recurring habit."
    ],
    general: [
      "Reflecting honestly on my conduct, I recognize where I fell short of the care and standard you rightly expect from me.",
      "My actions created unnecessary stress between us, and I want to restore the comfort, warmth, and trust we've built together.",
      "I see the emotional impact of my behavior clearly, and I am here with an open heart to listen and make genuine amends."
    ]
  },

  deepReflections: [
    "Trust is nurtured over countless small moments, and I am acutely aware of how quickly a single careless choice can strain it. I never want to take your presence, patience, or kindness for granted. Looking back at how things unfolded, I realize I needed to pause, breathe, and put your emotional well-being first.",
    "Meaningful relationships thrive on reciprocal respect, emotional safety, and transparent honesty. When I allowed my momentary distraction or frustration to take the wheel, I compromised the safe space we share. I value who you are far too much to let this pass without deep self-reflection and lasting personal change.",
    "I understand that a simple 'I'm sorry' is only the starting line, not a complete remedy. Genuine restitution requires introspection, real accountability, and sustained proof over time. I have spent meaningful time considering how my choices affected your peace of mind.",
    "Throughout our journey, you have consistently treated me with grace, understanding, and generosity. Failing to return that same consideration leaves me profoundly disappointed in my own actions. I want you to know that I see this lesson clearly.",
    "It requires vulnerability to admit when one has faltered, but more importantly, it requires genuine care to tend to the feelings left in the wake. Your emotions are valid, and I refuse to minimize or rationalize the discomfort I caused."
  ],

  commitments: [
    "Moving forward, I am committed to being far more mindful, attentive, and intentional with how I communicate and show up for you.",
    "Here is my promise: I will take concrete, proactive steps to ensure this oversight is not repeated. You have my word.",
    "Whenever you are ready to talk, I am here to listen openly—without interjecting, making excuses, or trying to defend myself.",
    "I understand that rebuilding full comfort takes time, and I am prepared to be patient and earn back your peace step by step.",
    "Please tell me what would feel most supportive right now, whether that means giving you breathing room or talking through things together."
  ],

  closures: {
    sincere: "With heartfelt sincerity and hope for your forgiveness,",
    playful: "Sending warm tea, sweet treats, and endless apologies,",
    dramatic: "Humbly awaiting your peace under a gentler sky,",
    humorous: "Your thoroughly repentant friend who promises to do better,",
    romantic: "With all my love, devotion, and a repentant heart,",
    professional: "Sincerely and respectfully yours,"
  }
};

/* ==========================================================================
   4. Generator Tool Module
   ========================================================================== */
function initGenerator() {
  const recipientInput = document.getElementById('recipientInput');
  const situationSelect = document.getElementById('situationSelect');
  const moodSelect = document.getElementById('moodSelect');
  const intensityInput = document.getElementById('intensityInput');
  const intensityBadge = document.getElementById('intensityBadge');
  const emojiDensitySelect = document.getElementById('emojiDensitySelect');
  
  const wordChips = document.querySelectorAll('.word-chip');
  const generateBtn = document.getElementById('generateBtn');
  const randomizeBtn = document.getElementById('randomizeBtn');
  const resetAllBtn = document.getElementById('resetAllBtn');

  const outputTextarea = document.getElementById('outputTextarea');
  const emptyCanvasState = document.getElementById('emptyCanvasState');
  const wordCountDisplay = document.getElementById('wordCountDisplay');
  const charCountDisplay = document.getElementById('charCountDisplay');

  let selectedWordTarget = 100;

  // Severity Slider Updates
  if (intensityInput && intensityBadge) {
    const labels = [
      'Minor Slip-Up 😅',
      'Moderate Misstep 😬',
      'Serious Oversight 💔',
      'Deep Blunder 🌩️'
    ];
    intensityInput.addEventListener('input', (e) => {
      const idx = Math.min(Math.max(parseInt(e.target.value) - 1, 0), 3);
      intensityBadge.textContent = labels[idx];
    });
  }

  // Word Chip Selection
  wordChips.forEach(chip => {
    chip.addEventListener('click', () => {
      wordChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedWordTarget = parseInt(chip.dataset.words);
    });
  });

  // Generate Button Click
  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      generateApologyMessage();
    });
  }

  // Randomize Button Click
  if (randomizeBtn) {
    randomizeBtn.addEventListener('click', () => {
      randomizeParameters();
      generateApologyMessage();
    });
  }

  // Reset Button Click
  if (resetAllBtn) {
    resetAllBtn.addEventListener('click', () => {
      if (recipientInput) recipientInput.value = 'Elena';
      if (situationSelect) situationSelect.selectedIndex = 5;
      if (moodSelect) moodSelect.selectedIndex = 0;
      if (emojiDensitySelect) emojiDensitySelect.selectedIndex = 0;
      if (intensityInput) {
        intensityInput.value = 2;
        intensityBadge.textContent = 'Moderate Misstep 😬';
      }
      wordChips.forEach(c => c.classList.remove('active'));
      wordChips[1].classList.add('active');
      selectedWordTarget = 100;

      if (outputTextarea) outputTextarea.value = '';
      updateTextMetrics('');
      showToast('Form parameters reset to defaults.');
    });
  }

  // Real-time Textarea Stats
  if (outputTextarea) {
    outputTextarea.addEventListener('input', (e) => {
      updateTextMetrics(e.target.value);
    });
  }

  function randomizeParameters() {
    const moods = ['sincere', 'playful', 'dramatic', 'humorous', 'romantic', 'professional'];
    const situations = ['lateReply', 'forgotEvent', 'madeMistake', 'argument', 'missedCall', 'general'];
    const emojiModes = ['subtle', 'expressive', 'none'];
    const words = [50, 100, 500, 1000];

    const chosenMood = moods[Math.floor(Math.random() * moods.length)];
    const chosenSit = situations[Math.floor(Math.random() * situations.length)];
    const chosenEmoji = emojiModes[Math.floor(Math.random() * emojiModes.length)];
    const chosenWords = words[Math.floor(Math.random() * words.length)];

    if (moodSelect) moodSelect.value = chosenMood;
    if (situationSelect) situationSelect.value = chosenSit;
    if (emojiDensitySelect) emojiDensitySelect.value = chosenEmoji;

    wordChips.forEach(c => {
      c.classList.toggle('active', parseInt(c.dataset.words) === chosenWords);
    });
    selectedWordTarget = chosenWords;
  }

  function generateApologyMessage() {
    const recipient = (recipientInput && recipientInput.value.trim()) ? recipientInput.value.trim() : 'there';
    const mood = moodSelect ? moodSelect.value : 'sincere';
    const situationKey = situationSelect ? situationSelect.value : 'general';
    const emojiLevel = emojiDensitySelect ? emojiDensitySelect.value : 'subtle';

    const introList = APOLOGY_DATA.intros[mood] || APOLOGY_DATA.intros.sincere;
    const situationList = APOLOGY_DATA.situations[situationKey] || APOLOGY_DATA.situations.general;
    const emojiPack = APOLOGY_DATA.emojis[mood] || APOLOGY_DATA.emojis.sincere;
    const closureSalutation = APOLOGY_DATA.closures[mood] || APOLOGY_DATA.closures.sincere;

    function getRandomItem(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function applyEmoji(text) {
      if (emojiLevel === 'none') return text;
      const em = getRandomItem(emojiPack);
      return emojiLevel === 'expressive' ? `${em} ${text} ${em}` : `${text} ${em}`;
    }

    let paragraphs = [];

    // Salutation
    const greeting = mood === 'professional' ? `Dear ${recipient},` : `Dear ${recipient},`;
    paragraphs.push(greeting);

    // Opening Statement
    let opening = getRandomItem(introList);
    opening = opening.replace(/you/g, recipient === 'there' ? 'you' : recipient);
    paragraphs.push(applyEmoji(opening));

    // Situation & Context
    let sit = getRandomItem(situationList);
    paragraphs.push(applyEmoji(sit));

    // Depth Expansion based on Word Target
    if (selectedWordTarget >= 100) {
      const reflection = getRandomItem(APOLOGY_DATA.deepReflections);
      paragraphs.push(applyEmoji(reflection));
    }

    if (selectedWordTarget >= 500) {
      const extraReflection1 = APOLOGY_DATA.deepReflections[1];
      const extraReflection2 = APOLOGY_DATA.deepReflections[2];
      paragraphs.push(applyEmoji(extraReflection1));
      paragraphs.push(applyEmoji(extraReflection2));

      const elaboration1 = "I spent considerable time thinking about how easily misunderstandings can form when we fail to communicate with tenderness. You mean too much to me for me to sweep anything under the rug or pretend that yesterday was acceptable. Your feelings are completely justified, and I honor whatever time you need.";
      paragraphs.push(applyEmoji(elaboration1));
    }

    if (selectedWordTarget >= 1000) {
      const deepEssayChunks = [
        "When I reflect on everything we have built and the warmth we have shared, it underscores just how precious this connection is. That reality makes my thoughtlessness hurt all the more. I never want to be the reason your spirit feels weighed down.",
        "Maturity is found in confronting one's shortcomings directly and undertaking the patient work of growth. These words are not offered as an easy exit from accountability, but as a genuine pledge to be more grounded and considerate every day.",
        "Forgiveness is an organic process, not a demand. It is earned through ongoing patience, active listening, and consistent care. Whether we speak soon or whenever you feel ready, please know my door and heart remain wide open.",
        "Thank you for reading these words. They come with all my sincerity, deep care, and an unwavering wish to restore the joy and trust we share."
      ];
      deepEssayChunks.forEach(chunk => paragraphs.push(applyEmoji(chunk)));
    }

    // Action Commitment
    let commitment = getRandomItem(APOLOGY_DATA.commitments);
    paragraphs.push(applyEmoji(commitment));

    // Closure
    paragraphs.push(`\n${closureSalutation}`);

    // Emojis Only Mode Handler
    let finalResult = '';
    if (emojiLevel === 'emojis_only') {
      const emojiString = Array.from({ length: Math.min(selectedWordTarget, 55) }, () => getRandomItem(emojiPack)).join(' ');
      finalResult = `Dear ${recipient},\n\n${emojiString}\n\n(Translation: I am truly, deeply sorry! 🥺🕊️❤️)`;
    } else {
      finalResult = paragraphs.join('\n\n');
    }

    // Update Output Canvas
    if (outputTextarea) {
      outputTextarea.value = finalResult;
      updateTextMetrics(finalResult);
      showToast('Generated personalized apology! ✨');
    }
  }

  function updateTextMetrics(text) {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;

    if (wordCountDisplay) wordCountDisplay.textContent = words;
    if (charCountDisplay) charCountDisplay.textContent = chars;

    if (emptyCanvasState) {
      emptyCanvasState.style.display = text ? 'none' : 'flex';
    }
  }

  // Global Loader for Preset Templates
  window.loadTemplateIntoGenerator = function(data) {
    if (moodSelect && data.mood) moodSelect.value = data.mood;
    if (situationSelect && data.situation) situationSelect.value = data.situation;
    if (recipientInput && data.recipient) recipientInput.value = data.recipient;

    if (data.words) {
      wordChips.forEach(c => {
        c.classList.toggle('active', parseInt(c.dataset.words) === data.words);
      });
      selectedWordTarget = data.words;
    }

    if (outputTextarea && data.customText) {
      outputTextarea.value = data.customText;
      updateTextMetrics(data.customText);
    } else {
      generateApologyMessage();
    }

    const generatorSection = document.getElementById('generator');
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
}

/* ==========================================================================
   5. Curated Presets Library Module
   ========================================================================== */
const TEMPLATES_CATALOG = [
  {
    id: 't-coffee',
    title: 'The Coffee & Sweet Treat Amends ☕🍩',
    category: 'playful',
    badge: '🧸 Playful',
    mood: 'playful',
    situation: 'general',
    recipient: 'Bestie',
    words: 50,
    customText: "Dear Bestie,\n\nKnock knock! I made a totally goofy blunder and my heart has been feeling sheepish ever since. I am so sorry! Can I treat you to your favorite warm latte and donuts to earn your lovely smile back? 🥺🍩✨\n\nSending big hugs and puppy eyes,"
  },
  {
    id: 't-delayed',
    title: 'Late Reply Restorative Note 📱⚡',
    category: 'quick',
    badge: '⚡ Quick Text',
    mood: 'sincere',
    situation: 'lateReply',
    recipient: 'Alex',
    words: 50,
    customText: "Dear Alex,\n\nI am so sorry for leaving you waiting! Things got unexpectedly chaotic on my end today, but keeping you hanging was careless of me. Your time is valuable, and you deserved a prompt reply. Hope you can forgive the delay! 🙏❤️"
  },
  {
    id: 't-milestone',
    title: 'Belated Milestone & Birthday Note 🎂💐',
    category: 'sincere',
    badge: '💖 Heartfelt',
    mood: 'sincere',
    situation: 'forgotEvent',
    recipient: 'Sarah',
    words: 100,
    customText: "Dear Sarah,\n\nI am heartbroken that I allowed your special day to pass without celebrating you properly. You mean the world to me, and overlooking your milestone was an unacceptable oversight.\n\nPlease let me make it up to you with a special dinner date this week. You deserve to be celebrated and cherished! Sending all my love and sincere apologies 🎂🌸✨"
  },
  {
    id: 't-reconcile',
    title: 'Post-Argument Healing Letter 🌹🕊️',
    category: 'romantic',
    badge: '🌹 Romantic',
    mood: 'romantic',
    situation: 'argument',
    recipient: 'My Love',
    words: 100,
    customText: "My Love,\n\nIn the heat of our discussion, I let frustration cloud my heart and said things that were sharp and hurtful. Seeing sadness in your eyes breaks my soul.\n\nYou are my safe haven, and I promise to listen with patient love and tenderness. I value our harmony far too much to ever let pride stand between us. ❤️🕊️"
  },
  {
    id: 't-pro',
    title: 'Professional Project Oversight 💼📋',
    category: 'professional',
    badge: '💼 Professional',
    mood: 'professional',
    situation: 'madeMistake',
    recipient: 'Team',
    words: 100,
    customText: "Dear Team,\n\nPlease accept my sincere apologies for the oversight regarding yesterday's project deliverables. I take complete accountability for the miscommunication and resulting delay.\n\nI have revised the timeline, updated the assets, and established safeguards to ensure full reliability going forward. Thank you for your continued partnership and understanding. 🤝📋"
  },
  {
    id: 't-reflective',
    title: 'Deep Soulful Reflection Letter 🕯️📜',
    category: 'sincere',
    badge: '🎭 Deep Letter',
    mood: 'dramatic',
    situation: 'general',
    recipient: 'Dear Friend',
    words: 500,
    customText: "Dear Friend,\n\nThe silence between us has given me time to reflect on where things faltered. I stand before you with a humbled heart, acknowledging the misstep and longing to rebuild the safety and warmth we once shared...\n\n(Click below to load this full reflective letter into the editor!) 🌧️🕊️"
  }
];

function initTemplateGallery() {
  const templatesGrid = document.getElementById('templatesGrid');
  const filterPills = document.querySelectorAll('.filter-pill');

  if (!templatesGrid) return;

  renderTemplates('all');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderTemplates(pill.dataset.filter);
    });
  });

  function renderTemplates(filter) {
    templatesGrid.innerHTML = '';

    const list = filter === 'all'
      ? TEMPLATES_CATALOG
      : TEMPLATES_CATALOG.filter(t => t.category === filter || t.mood === filter);

    list.forEach(t => {
      const card = document.createElement('div');
      card.className = 'template-card';
      card.innerHTML = `
        <div>
          <div class="template-card-top">
            <span class="category-tag">${t.badge}</span>
            <span class="length-badge">${t.words} words</span>
          </div>
          <h4 class="template-card-title">${t.title}</h4>
          <p class="template-card-text">${t.customText.substring(0, 140)}...</p>
        </div>
        <button type="button" class="use-template-btn" onclick="useTemplate('${t.id}')">
          ✨ Use This Template
        </button>
      `;
      templatesGrid.appendChild(card);
    });
  }

  window.useTemplate = function(id) {
    const found = TEMPLATES_CATALOG.find(t => t.id === id);
    if (found && window.loadTemplateIntoGenerator) {
      window.loadTemplateIntoGenerator(found);
      showToast(`Loaded "${found.title}" into generator!`);
    }
  };
}

/* ==========================================================================
   6. Export & Action Toolbar: Copy, TXT, WhatsApp, Speech
   ========================================================================== */
function initSpeechAndExport() {
  const copyBtn = document.getElementById('copyBtn');
  const saveTxtBtn = document.getElementById('saveTxtBtn');
  const whatsappBtn = document.getElementById('whatsappBtn');
  const speakBtn = document.getElementById('speakBtn');
  const clearOutputBtn = document.getElementById('clearOutputBtn');
  const outputTextarea = document.getElementById('outputTextarea');

  // Copy to Clipboard
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = outputTextarea ? outputTextarea.value.trim() : '';
      if (!text) {
        showToast('Generate a message first before copying! 😅');
        return;
      }
      navigator.clipboard.writeText(text)
        .then(() => showToast('Copied apology message to clipboard! 📋'))
        .catch(() => showToast('Clipboard permission denied.'));
    });
  }

  // Save to .TXT file
  if (saveTxtBtn) {
    saveTxtBtn.addEventListener('click', () => {
      const text = outputTextarea ? outputTextarea.value.trim() : '';
      if (!text) {
        showToast('Generate a message first before saving!');
        return;
      }
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `apology_message_${Date.now()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('Saved message as .TXT file! 💾');
    });
  }

  // Share to WhatsApp
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const text = outputTextarea ? outputTextarea.value.trim() : '';
      if (!text) {
        showToast('Generate a message first to share on WhatsApp!');
        return;
      }
      const encoded = encodeURIComponent(text);
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    });
  }

  // Audio Speech (Web Speech API)
  if (speakBtn) {
    speakBtn.addEventListener('click', () => {
      const text = outputTextarea ? outputTextarea.value.trim() : '';
      if (!text) {
        showToast('Generate a message first to listen!');
        return;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
        showToast('Playing apology audio speech... 🔊');
      } else {
        showToast('Speech synthesis not supported in this browser.');
      }
    });
  }

  // Clear Editor
  if (clearOutputBtn) {
    clearOutputBtn.addEventListener('click', () => {
      if (outputTextarea) {
        outputTextarea.value = '';
        const ev = new Event('input', { bubbles: true });
        outputTextarea.dispatchEvent(ev);
      }
      showToast('Editor canvas cleared.');
    });
  }
}

/* ==========================================================================
   7. FAQ Accordion Engine
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      faqItems.forEach(other => {
        if (other !== item) {
          const oTrigger = other.querySelector('.faq-trigger');
          const oContent = other.querySelector('.faq-content');
          if (oTrigger && oContent) {
            oTrigger.setAttribute('aria-expanded', 'false');
            oContent.hidden = true;
            oContent.style.maxHeight = '0px';
          }
        }
      });

      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0px';
        setTimeout(() => {
          content.hidden = true;
        }, 300);
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        content.hidden = false;
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   8. Toast Notification System
   ========================================================================== */
function showToast(message) {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>💬</span> ${message}`;

  toastContainer.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================================================
   9. Dynamic Year
   ========================================================================== */
function updateCopyrightYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
