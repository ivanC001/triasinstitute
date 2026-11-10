const fs = require('fs');

const svgScroll = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="100%" height="100%" preserveAspectRatio="none">
  <defs>
    <radialGradient id="parchmentGrad" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#fffcf2" />
      <stop offset="35%" stop-color="#fbf1da" />
      <stop offset="70%" stop-color="#ebd29f" />
      <stop offset="88%" stop-color="#cca262" />
      <stop offset="96%" stop-color="#8c4c16" />
      <stop offset="100%" stop-color="#451f08" />
    </radialGradient>
    <radialGradient id="burnVignette" cx="50%" cy="50%" r="50%">
      <stop offset="68%" stop-color="rgba(69,31,8,0)" />
      <stop offset="86%" stop-color="rgba(110,54,16,0.25)" />
      <stop offset="94%" stop-color="rgba(90,38,10,0.65)" />
      <stop offset="98%" stop-color="rgba(60,22,6,0.92)" />
      <stop offset="100%" stop-color="rgba(35,12,3,0.98)" />
    </radialGradient>
    <filter id="tornRough" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>

  <!-- Burnt Edge Silhouette -->
  <g filter="url(#tornRough)">
    <path d="M 35 30 Q 200 24, 400 28 Q 600 24, 765 32 Q 775 280, 770 550 Q 776 820, 765 1068 Q 600 1076, 400 1072 Q 200 1078, 35 1068 Q 24 820, 30 550 Q 25 280, 35 30 Z" fill="#381705" opacity="0.95" />
    <path d="M 42 36 Q 200 32, 400 34 Q 600 32, 758 40 Q 765 280, 762 550 Q 766 820, 758 1060 Q 600 1068, 400 1064 Q 200 1070, 42 1060 Q 34 820, 38 550 Q 32 280, 42 36 Z" fill="url(#parchmentGrad)" />
    <path d="M 42 36 Q 200 32, 400 34 Q 600 32, 758 40 Q 765 280, 762 550 Q 766 820, 758 1060 Q 600 1068, 400 1064 Q 200 1070, 42 1060 Q 34 820, 38 550 Q 32 280, 42 36 Z" fill="url(#burnVignette)" />
  </g>

  <!-- Ruled Writing Lines -->
  <g stroke="#b0874e" stroke-width="0.8" opacity="0.32" stroke-dasharray="5 2.5">
    <line x1="85" y1="160" x2="715" y2="160" />
    <line x1="85" y1="205" x2="715" y2="205" />
    <line x1="85" y1="250" x2="715" y2="250" />
    <line x1="85" y1="295" x2="715" y2="295" />
    <line x1="85" y1="340" x2="715" y2="340" />
    <line x1="85" y1="385" x2="715" y2="385" />
    <line x1="85" y1="430" x2="715" y2="430" />
    <line x1="85" y1="475" x2="715" y2="475" />
    <line x1="85" y1="520" x2="715" y2="520" />
    <line x1="85" y1="565" x2="715" y2="565" />
    <line x1="85" y1="610" x2="715" y2="610" />
    <line x1="85" y1="655" x2="715" y2="655" />
    <line x1="85" y1="700" x2="715" y2="700" />
    <line x1="85" y1="745" x2="715" y2="745" />
    <line x1="85" y1="790" x2="715" y2="790" />
    <line x1="85" y1="835" x2="715" y2="835" />
    <line x1="85" y1="880" x2="715" y2="880" />
    <line x1="85" y1="925" x2="715" y2="925" />
    <line x1="85" y1="970" x2="715" y2="970" />
  </g>

  <!-- Vintage Corner Accents -->
  <g stroke="#8c5e26" stroke-width="1.5" fill="none" opacity="0.45">
    <path d="M 75 95 L 75 75 L 95 75" />
    <path d="M 725 95 L 725 75 L 705 75" />
    <path d="M 75 995 L 75 1015 L 95 1015" />
    <path d="M 725 995 L 725 1015 L 705 1015" />
  </g>
</svg>`;

fs.writeFileSync('assets/images/parchment_scroll_frame.svg', svgScroll, 'utf8');

const svgCard = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 650" width="100%" height="100%" preserveAspectRatio="none">
  <defs>
    <radialGradient id="cardParchGrad" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#fffcf2" />
      <stop offset="45%" stop-color="#fbf1da" />
      <stop offset="75%" stop-color="#ebd29f" />
      <stop offset="90%" stop-color="#cca262" />
      <stop offset="97%" stop-color="#8c4c16" />
      <stop offset="100%" stop-color="#451f08" />
    </radialGradient>
    <radialGradient id="cardBurn" cx="50%" cy="50%" r="50%">
      <stop offset="70%" stop-color="rgba(69,31,8,0)" />
      <stop offset="88%" stop-color="rgba(110,54,16,0.3)" />
      <stop offset="96%" stop-color="rgba(80,32,8,0.75)" />
      <stop offset="100%" stop-color="rgba(40,15,4,0.96)" />
    </radialGradient>
    <filter id="cardRough" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>

  <g filter="url(#cardRough)">
    <path d="M 35 25 Q 300 20, 500 22 Q 800 20, 965 28 Q 975 200, 970 325 Q 976 480, 965 625 Q 700 630, 500 628 Q 300 632, 35 625 Q 25 480, 28 325 Q 24 200, 35 25 Z" fill="#381705" opacity="0.92" />
    <path d="M 40 30 Q 300 25, 500 27 Q 800 25, 960 33 Q 968 200, 964 325 Q 969 480, 960 620 Q 700 625, 500 623 Q 300 627, 40 620 Q 30 480, 34 325 Q 30 200, 40 30 Z" fill="url(#cardParchGrad)" />
    <path d="M 40 30 Q 300 25, 500 27 Q 800 25, 960 33 Q 968 200, 964 325 Q 969 480, 960 620 Q 700 625, 500 623 Q 300 627, 40 620 Q 30 480, 34 325 Q 30 200, 40 30 Z" fill="url(#cardBurn)" />
  </g>

  <g stroke="#b0874e" stroke-width="0.75" opacity="0.25" stroke-dasharray="4 2">
    <line x1="70" y1="120" x2="930" y2="120" />
    <line x1="70" y1="165" x2="930" y2="165" />
    <line x1="70" y1="210" x2="930" y2="210" />
    <line x1="70" y1="255" x2="930" y2="255" />
    <line x1="70" y1="300" x2="930" y2="300" />
    <line x1="70" y1="345" x2="930" y2="345" />
    <line x1="70" y1="390" x2="930" y2="390" />
    <line x1="70" y1="435" x2="930" y2="435" />
    <line x1="70" y1="480" x2="930" y2="480" />
    <line x1="70" y1="525" x2="930" y2="525" />
    <line x1="70" y1="570" x2="930" y2="570" />
  </g>
</svg>`;

fs.writeFileSync('assets/images/parchment_card_bg.svg', svgCard, 'utf8');
console.log('SVGs created successfully!');
