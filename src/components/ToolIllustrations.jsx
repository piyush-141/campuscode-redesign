import React from 'react';

const SharedDefs = ({ prefix }) => <defs>
  <linearGradient id={`${prefix}-paper`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#f7f5ff"/></linearGradient>
  <linearGradient id={`${prefix}-violet`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a99aff"/><stop offset="1" stopColor="#705cf1"/></linearGradient>
  <linearGradient id={`${prefix}-lime`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c5ef72"/><stop offset="1" stopColor="#8dcc28"/></linearGradient>
  <radialGradient id={`${prefix}-aura`}><stop stopColor="#a493ff" stopOpacity=".24"/><stop offset="1" stopColor="#a493ff" stopOpacity="0"/></radialGradient>
  <filter id={`${prefix}-shadow`} x="-40%" y="-40%" width="180%" height="190%"><feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#6a58d8" floodOpacity=".17"/></filter>
  <filter id={`${prefix}-soft`} x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#4f45a3" floodOpacity=".12"/></filter>
</defs>;

function IdeaCheckArt() {
  return <svg viewBox="0 0 300 220" role="img" aria-label="A dimensional checklist with an idea bulb and completed checks">
    <SharedDefs prefix="idea" />
    <ellipse className="art-aura" cx="170" cy="125" rx="112" ry="80" fill="url(#idea-aura)" />
    <g className="idea-document-float">
      <rect x="83" y="29" width="150" height="174" rx="19" fill="#dcd5ff" opacity=".55" transform="rotate(7 158 116) translate(8 9)" />
      <g filter="url(#idea-shadow)" transform="rotate(-7 158 116)">
        <rect x="76" y="24" width="150" height="174" rx="18" fill="url(#idea-paper)" stroke="#e7e2ff" />
        <rect x="91" y="39" width="39" height="39" rx="12" fill="#f0edff" />
        <path d="M110 47c-7 0-12 5-12 12 0 5 3 8 6 11 1 1 2 3 2 4h8c0-2 1-3 2-5 3-3 5-6 5-10 0-7-5-12-11-12Z" fill="none" stroke="#7964ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M106 77h9m-8 4h7" stroke="#7964ff" strokeWidth="2" strokeLinecap="round" />
        <path d="m110 39 1-4m-15 10-3-2m31 2 3-2" stroke="#a393ff" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="140" y="48" width="69" height="8" rx="4" fill="#dcd6ff" />
        <rect x="140" y="64" width="57" height="6" rx="3" fill="#ebe8fa" />
        <rect x="91" y="91" width="119" height="1" fill="#eeeaf8" />
        <g className="idea-check idea-check-one"><circle cx="103" cy="112" r="8" fill="url(#idea-lime)"/><path d="m99 112 3 3 6-7" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="119" y="108" width="72" height="7" rx="3.5" fill="#d9efb3"/></g>
        <g className="idea-check idea-check-two"><circle cx="103" cy="139" r="8" fill="url(#idea-lime)"/><path d="m99 139 3 3 6-7" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="119" y="135" width="63" height="7" rx="3.5" fill="#d9efb3"/></g>
        <g className="idea-check idea-check-three"><circle cx="103" cy="166" r="8" fill="#efeff1"/><rect x="119" y="162" width="48" height="7" rx="3.5" fill="#e9e9eb"/></g>
      </g>
    </g>
  </svg>;
}

function HackMateArt() {
  return <svg viewBox="0 0 230 180" role="img" aria-label="Overlapping teammate profile tiles">
    <SharedDefs prefix="mate" />
    <ellipse className="art-aura" cx="125" cy="102" rx="91" ry="66" fill="url(#mate-aura)" />
    <g className="profile-tile profile-tile-back" filter="url(#mate-soft)" transform="rotate(8 143 83)">
      <rect x="93" y="38" width="83" height="91" rx="17" fill="url(#mate-paper)" stroke="#ebe7ff" />
      <circle cx="134" cy="72" r="17" fill="#eef8d8"/><circle cx="134" cy="68" r="7" fill="#9acb42"/><path d="M121 83c2-8 7-11 13-11s11 3 13 11" fill="#a8d765"/>
      <rect x="112" y="98" width="44" height="5" rx="2.5" fill="#e6e4ec"/><rect x="120" y="108" width="28" height="4" rx="2" fill="#efedf3"/>
    </g>
    <g className="profile-tile profile-tile-front" filter="url(#mate-shadow)" transform="rotate(-7 90 99)">
      <rect x="43" y="53" width="86" height="94" rx="18" fill="url(#mate-paper)" stroke="#e7e2ff" />
      <circle cx="86" cy="89" r="18" fill="#eeeaff"/><circle cx="86" cy="84" r="7" fill="#8874ff"/><path d="M72 101c2-8 8-12 14-12s12 4 14 12" fill="#a391ff"/>
      <rect x="63" y="118" width="47" height="5" rx="2.5" fill="#ded9fa"/><rect x="72" y="128" width="29" height="4" rx="2" fill="#eeecf6"/>
    </g>
    <circle className="mate-spark" cx="184" cy="49" r="9" fill="url(#mate-lime)"/><path d="M184 44v10m-5-5h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>;
}

function RuleBotArt() {
  return <svg viewBox="0 0 230 180" role="img" aria-label="Layered conversation bubbles with a gentle typing indicator">
    <SharedDefs prefix="rule" />
    <ellipse className="art-aura" cx="122" cy="104" rx="95" ry="62" fill="url(#rule-aura)" />
    <g className="chat-bubble chat-bubble-back" filter="url(#rule-soft)">
      <rect x="100" y="73" width="91" height="56" rx="18" fill="url(#rule-paper)" stroke="#ebe8f7"/><path d="m123 125-3 14 18-12" fill="#fbfaff" stroke="#ebe8f7" strokeLinejoin="round"/>
      <circle cx="125" cy="101" r="4" fill="#c7c0ef"/><circle cx="145" cy="101" r="4" fill="#c7c0ef"/><circle cx="165" cy="101" r="4" fill="#c7c0ef"/>
    </g>
    <g className="chat-bubble chat-bubble-front" filter="url(#rule-shadow)">
      <rect x="40" y="42" width="104" height="61" rx="18" fill="url(#rule-violet)"/><path d="m68 99-4 16 21-13" fill="#806af5"/>
      <circle cx="70" cy="72" r="4.5" fill="white"/><circle cx="91" cy="72" r="4.5" fill="white"/><circle cx="112" cy="72" r="4.5" fill="white"/>
    </g>
    <circle className="rule-notification" cx="173" cy="52" r="7" fill="url(#rule-lime)"/>
  </svg>;
}

function RoundAnalyserArt() {
  return <svg viewBox="0 0 230 180" role="img" aria-label="Three dimensional analytics bars for round based review">
    <SharedDefs prefix="round" />
    <ellipse className="art-aura" cx="120" cy="116" rx="91" ry="49" fill="url(#round-aura)" />
    <g className="chart-tile" filter="url(#round-shadow)" transform="rotate(-5 116 100)">
      <rect x="48" y="45" width="132" height="91" rx="17" fill="url(#round-paper)" stroke="#e9e5ff"/>
      <path d="M65 116h101" stroke="#eceaf1" strokeWidth="1.5" strokeLinecap="round"/>
      <rect className="chart-bar chart-bar-one" x="72" y="91" width="19" height="25" rx="7" fill="url(#round-violet)"/>
      <rect className="chart-bar chart-bar-two" x="104" y="73" width="19" height="43" rx="7" fill="url(#round-violet)"/>
      <rect className="chart-bar chart-bar-three" x="136" y="56" width="19" height="60" rx="7" fill="url(#round-violet)"/>
      <circle cx="162" cy="59" r="6" fill="url(#round-lime)"/>
    </g>
  </svg>;
}

function StudentPanelArt() {
  return <svg viewBox="0 0 230 180" role="img" aria-label="A friendly minimal student support assistant">
    <SharedDefs prefix="student" />
    <ellipse className="art-aura" cx="120" cy="112" rx="93" ry="56" fill="url(#student-aura)" />
    <path className="bot-antenna" d="M116 47v-9" stroke="#9b89ff" strokeWidth="3" strokeLinecap="round"/><circle className="bot-antenna-dot" cx="116" cy="34" r="6" fill="url(#student-violet)"/>
    <g className="bot-body" filter="url(#student-shadow)">
      <rect x="55" y="51" width="122" height="91" rx="29" fill="url(#student-paper)" stroke="#e6e1ff" strokeWidth="1.5"/>
      <rect x="46" y="77" width="12" height="37" rx="6" fill="#d8d1ff"/><rect x="174" y="77" width="12" height="37" rx="6" fill="#d8d1ff"/>
      <rect x="73" y="69" width="86" height="50" rx="20" fill="url(#student-violet)"/>
      <ellipse className="bot-eye" cx="98" cy="93" rx="5" ry="6" fill="white"/><ellipse className="bot-eye" cx="134" cy="93" rx="5" ry="6" fill="white"/>
      <path d="M105 105c6 6 16 6 22 0" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="67" cy="130" r="3" fill="#b9ec64"/><circle cx="165" cy="130" r="3" fill="#b9ec64"/>
    </g>
    <circle className="bot-pulse" cx="185" cy="55" r="7" fill="url(#student-lime)"/>
  </svg>;
}

const illustrations = {
  idea: IdeaCheckArt,
  teammate: HackMateArt,
  rules: RuleBotArt,
  rounds: RoundAnalyserArt,
  student: StudentPanelArt,
};

export default function ToolIllustration({ kind }) {
  const Illustration = illustrations[kind];
  return <div className={`tool-illustration tool-illustration-${kind}`} aria-hidden="true"><Illustration /></div>;
}
