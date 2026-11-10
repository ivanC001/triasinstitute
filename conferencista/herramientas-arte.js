// Generador de arte vectorial original para la landing SPEAKER MILLIONAIRE
const fs = require('fs');
const path = require('path');
const OUT = process.argv[2];

const r = (n, d = 2) => Number(n.toFixed(d));

/* ------------------------------------------------------------------
   1. LA SALA — la platea vista desde el escenario.
   Filas de butacas que se alejan y se apagan en la oscuridad.
------------------------------------------------------------------ */
function sala() {
  const W = 1600, H = 520;
  const ROWS = 10;
  const cx = W / 2;
  const n = (v) => Number(v.toFixed(1));
  let seats = '';
  let glints = '';

  for (let i = 0; i < ROWS; i++) {
    const t = i / (ROWS - 1);
    const ease = 1 - Math.pow(1 - t, 2.1);
    const y = 468 - 352 * ease;
    const sw = 64 * (1 - 0.64 * ease);
    const sh = 42 * (1 - 0.64 * ease);
    const pitch = sw * 1.3;
    const curve = 46 * (1 - 0.55 * ease);
    const count = Math.ceil(W * 1.08 / pitch);
    const start = cx - (count - 1) * pitch / 2;
    const lum = 1 - ease;                        // las filas cercanas reciben luz de escenario
    const fill = `rgba(${Math.round(16 + 26 * lum)},${Math.round(31 + 46 * lum)},${Math.round(62 + 78 * lum)},${r(0.28 + 0.55 * lum)})`;
    const rr = n(sw * 0.34);

    let row = '', rim = '';
    for (let j = 0; j < count; j++) {
      const x = start + j * pitch;
      const k = (x - cx) / (W / 2);
      const yy = y + curve * k * k;
      row += `<rect x="${n(x - sw / 2)}" y="${n(yy)}" width="${n(sw)}" height="${n(sh)}" rx="${rr}"/>`;
      if (i < 5) rim += `M${n(x - sw / 2 + rr * 0.5)} ${n(yy + rr * 0.5)}q${n(sw / 2 - rr * 0.5)} ${n(-rr * 0.7)} ${n(sw - rr)} 0`;
    }
    seats += `<g fill="${fill}">${row}</g>`;
    if (rim) seats += `<path d="${rim}" fill="none" stroke-linecap="round" stroke="rgba(214,162,60,${r(0.07 + 0.25 * lum, 3)})" stroke-width="${n(Math.max(0.7, sh * 0.05))}"/>`;
  }

  // pequeñas luces en la platea (señalización, pantallas)
  const spots = [[180, 300], [410, 214], [742, 158], [1080, 196], [1372, 286], [1530, 352], [96, 398], [960, 126]];
  for (const [x, y] of spots) {
    glints += `<circle cx="${x}" cy="${y}" r="2.4" fill="#F6DFA0" opacity=".55"/><circle cx="${x}" cy="${y}" r="9" fill="url(#chispa)" opacity=".4"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Platea en penumbra vista desde el escenario">
  <defs>
    <radialGradient id="chispa"><stop offset="0" stop-color="#F6DFA0" stop-opacity=".9"/><stop offset="1" stop-color="#F6DFA0" stop-opacity="0"/></radialGradient>
    <linearGradient id="fundido" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".34" stop-color="#fff" stop-opacity=".75"/>
      <stop offset="1" stop-color="#fff" stop-opacity="1"/>
    </linearGradient>
    <mask id="mFundido"><rect width="${W}" height="${H}" fill="url(#fundido)"/></mask>
  </defs>
  <g mask="url(#mFundido)">${seats}${glints}</g>
</svg>`;
}

/* ------------------------------------------------------------------
   2. EL GLOBO — graticula + 16 plazas internacionales
------------------------------------------------------------------ */
function globo() {
  const S = 520, c = S / 2, R = 214;
  let grid = '';
  // paralelos
  for (let i = -4; i <= 4; i++) {
    const f = i / 5;
    const y = c + R * Math.sin(f * Math.PI / 2);
    const rx = R * Math.cos(f * Math.PI / 2);
    grid += `<ellipse cx="${c}" cy="${r(y)}" rx="${r(rx)}" ry="${r(rx * 0.14)}" fill="none" stroke="#2C5597" stroke-width="1" opacity="${r(0.30 + 0.3 * (1 - Math.abs(f)))}"/>`;
  }
  // meridianos
  for (let i = 0; i < 7; i++) {
    const rx = Math.abs(R * Math.cos((i / 7) * Math.PI));
    grid += `<ellipse cx="${c}" cy="${c}" rx="${r(Math.max(2, rx))}" ry="${R}" fill="none" stroke="#2C5597" stroke-width="1" opacity=".34"/>`;
  }

  // 16 plazas (lon/lat aproximados, proyección ortográfica centrada en -55°)
  const plazas = [
    ['México', -99, 19], ['Guatemala', -90, 15], ['Panamá', -79, 9], ['Bogotá', -74, 5],
    ['Quito', -78, -0.2], ['Lima', -77, -12], ['La Paz', -68, -16], ['Santiago', -70, -33],
    ['Buenos Aires', -58, -35], ['Montevideo', -56, -35], ['Asunción', -57, -25], ['São Paulo', -46, -23],
    ['Miami', -80, 26], ['Albuquerque', -106, 35], ['Madrid', -3, 40], ['Chicago', -88, 42],
  ];
  const lon0 = -62, lat0 = 8, toR = Math.PI / 180;
  let marks = '', arcs = '';
  const pts = [];
  for (const [nombre, lon, lat] of plazas) {
    const la = lat * toR, lo = (lon - lon0) * toR, l0 = lat0 * toR;
    const cosc = Math.sin(l0) * Math.sin(la) + Math.cos(l0) * Math.cos(la) * Math.cos(lo);
    if (cosc < 0) continue;
    const x = c + R * Math.cos(la) * Math.sin(lo);
    const y = c - R * (Math.cos(l0) * Math.sin(la) - Math.sin(l0) * Math.cos(la) * Math.cos(lo));
    pts.push([x, y, nombre, cosc]);
  }
  pts.sort((a, b) => a[3] - b[3]);
  for (const [x, y, nombre, d] of pts) {
    const op = r(0.35 + 0.65 * d);
    marks += `<circle cx="${r(x)}" cy="${r(y)}" r="${r(2.4 + 2 * d)}" fill="#E8BE62" opacity="${op}"><title>${nombre}</title></circle>`;
    marks += `<circle cx="${r(x)}" cy="${r(y)}" r="${r(9 + 6 * d)}" fill="none" stroke="#D6A23C" stroke-width="1" opacity="${r(op * 0.45)}"/>`;
  }
  // arcos entre Albuquerque y el resto
  const hub = pts.find(p => p[2] === 'Albuquerque') || pts[pts.length - 1];
  for (const p of pts) {
    if (p === hub) continue;
    const mx = (hub[0] + p[0]) / 2, my = (hub[1] + p[1]) / 2;
    const dx = p[0] - hub[0], dy = p[1] - hub[1];
    const len = Math.hypot(dx, dy);
    const ox = -dy / len * len * 0.22, oy = dx / len * len * 0.22;
    arcs += `<path d="M${r(hub[0])} ${r(hub[1])}Q${r(mx + ox)} ${r(my + oy)} ${r(p[0])} ${r(p[1])}" fill="none" stroke="url(#ruta)" stroke-width="1.1" opacity=".5"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" role="img" aria-label="Globo con las plazas donde ha trabajado el programa">
  <defs>
    <radialGradient id="esfera" cx=".34" cy=".3" r=".86">
      <stop offset="0" stop-color="#1B3A77"/><stop offset=".62" stop-color="#0C1E40"/><stop offset="1" stop-color="#061023"/>
    </radialGradient>
    <linearGradient id="ruta" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#D6A23C" stop-opacity=".1"/><stop offset=".5" stop-color="#F6DFA0" stop-opacity=".85"/><stop offset="1" stop-color="#D6A23C" stop-opacity=".1"/>
    </linearGradient>
    <clipPath id="recorte"><circle cx="${c}" cy="${c}" r="${R}"/></clipPath>
  </defs>
  <circle cx="${c}" cy="${c}" r="${R + 16}" fill="none" stroke="#D6A23C" stroke-width="1" opacity=".22"/>
  <circle cx="${c}" cy="${c}" r="${R}" fill="url(#esfera)"/>
  <g clip-path="url(#recorte)">${grid}${arcs}${marks}</g>
  <circle cx="${c}" cy="${c}" r="${R}" fill="none" stroke="#D6A23C" stroke-width="1.4" opacity=".55"/>
</svg>`;
}

/* ------------------------------------------------------------------
   3. EL EMBLEMA — lectura vectorial del trifolio TRIAS
------------------------------------------------------------------ */
function emblema() {
  const S = 240, c = S / 2;
  // nudo trifolio: la lectura geométrica de las tres cintas del logotipo
  const N = 300, crudo = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    crudo.push([Math.sin(t) + 2 * Math.sin(2 * t), Math.cos(t) - 2 * Math.cos(2 * t)]);
  }
  const xs = crudo.map(p => p[0]), ys = crudo.map(p => p[1]);
  const minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
  const minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
  const k = 196 / Math.max(maxX - minX, maxY - minY);     // caja útil de 196 px
  const dx = (minX + maxX) / 2, dy = (minY + maxY) / 2;
  const pts = crudo.map(p => `${r(c + (p[0] - dx) * k, 1)} ${r(c + (p[1] - dy) * k, 1)}`);
  const trazo = 'M' + pts[0] + 'L' + pts.slice(1).join('L') + 'Z';
  const gx = r(c - dx * k, 1), gy = r(c - dy * k, 1);   // centro de giro del nudo

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" role="img" aria-label="Emblema Trias Institute">
  <defs>
    <linearGradient id="oroCinta" x1="0" y1="0" x2=".85" y2="1">
      <stop offset="0" stop-color="#8A6318"/><stop offset=".22" stop-color="#F7E2A8"/>
      <stop offset=".46" stop-color="#D6A23C"/><stop offset=".68" stop-color="#FCF1CC"/>
      <stop offset=".86" stop-color="#C08F2C"/><stop offset="1" stop-color="#8A6318"/>
    </linearGradient>
    <linearGradient id="azulCinta" x1="0" y1="0" x2=".85" y2="1">
      <stop offset="0" stop-color="#071B42"/><stop offset=".4" stop-color="#1A4792"/>
      <stop offset=".72" stop-color="#0A2559"/><stop offset="1" stop-color="#061634"/>
    </linearGradient>
    <radialGradient id="tierra" cx=".34" cy=".28" r=".88">
      <stop offset="0" stop-color="#3568B4"/><stop offset=".6" stop-color="#123B7A"/><stop offset="1" stop-color="#05122F"/>
    </radialGradient>
  </defs>
  <path d="${trazo}" fill="none" stroke="url(#azulCinta)" stroke-width="26" stroke-linejoin="round"/>
  <path d="${trazo}" fill="none" stroke="url(#oroCinta)" stroke-width="15" stroke-linejoin="round"/>
  <path d="${trazo}" fill="none" stroke="#FFF6DC" stroke-width="2" stroke-linejoin="round" opacity=".34"/>
  <circle cx="${gx}" cy="${gy}" r="36" fill="url(#tierra)"/>
  <g stroke="#6FA2E0" stroke-width=".9" fill="none" opacity=".45">
    <ellipse cx="${gx}" cy="${gy}" rx="36" ry="12"/><ellipse cx="${gx}" cy="${gy}" rx="36" ry="26"/>
    <ellipse cx="${gx}" cy="${gy}" rx="12" ry="36"/><ellipse cx="${gx}" cy="${gy}" rx="26" ry="36"/>
  </g>
  <path transform="translate(${r(gx-c,1)} ${r(gy-c,1)}) scale(.88) translate(${r(c*0.1364,1)} ${r(c*0.1364,1)})" d="M106 96c6 4 3 11 9 14s11-2 14 5-7 10-4 16 10 4 9 11-9 5-14 10-3 12-9 11-6-9-12-13-13 0-15-7 6-9 5-15-8-11-3-16 13 0 20-5 5-12 0-11z" fill="#EBC46C" opacity=".85"/>
  <circle cx="${gx}" cy="${gy}" r="36" fill="none" stroke="url(#oroCinta)" stroke-width="3.2"/>
</svg>`;
}

/* ------------------------------------------------------------------
   4. EL PLANO DE ESCENARIO — marca de piso en cinta (divisor)
------------------------------------------------------------------ */
function marca() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40" aria-hidden="true">
  <g fill="#D6A23C">
    <rect x="12" y="17.2" width="96" height="2.6" rx="1.3" opacity=".85"/>
    <rect x="58.7" y="4" width="2.6" height="32" rx="1.3" opacity=".85"/>
    <circle cx="60" cy="18.5" r="5.6" fill="none" stroke="#D6A23C" stroke-width="1.4" opacity=".5"/>
  </g>
</svg>`;
}

const files = { 'sala.svg': sala(), 'globo.svg': globo(), 'emblema.svg': emblema() };
for (const [name, body] of Object.entries(files)) {
  fs.writeFileSync(path.join(OUT, name), body);
  console.log(name, (Buffer.byteLength(body) / 1024).toFixed(1) + ' KB');
}
