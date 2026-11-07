import { useMemo, useState } from 'react';
import { ArrowRight, Check, Lightbulb, MoveUpRight, Sparkles, Target, ThumbsUp } from 'lucide-react';

const alternatives = [
  {
    label: 'Manual workarounds',
    description: 'People piece together messages, forms and spreadsheets to get started.',
    opening: 'Make the first important task easier to complete in one place.',
  },
  {
    label: 'General-purpose tools',
    description: 'Broad tools can support many workflows, but may need extra setup.',
    opening: 'Show why your focused experience is simpler for this audience.',
  },
  {
    label: 'Focused alternatives',
    description: 'Specialist products may solve one part of the wider need.',
    opening: 'Connect the separate steps into one clear end-to-end journey.',
  },
];

function buildPreview(text) {
  const idea = text.trim();
  const words = idea.split(/\s+/).filter(Boolean);
  const includesWho = /student|campus|college|learner|team|people|user/i.test(idea);
  const includesSolution = /app|platform|tool|service|system|marketplace|website|help|connect|track|share/i.test(idea);
  const audience = /student|campus|college|learner/i.test(idea) ? 'students' : 'your intended audience';
  const strengths = [
    includesWho ? 'You’ve identified who this could help.' : 'You’ve started with a clear direction.',
    includesSolution ? 'There’s a practical solution to build on.' : 'The idea can be shaped into a practical solution.',
    words.length > 28 ? 'You’ve shared useful context to develop further.' : 'A focused concept is easier to test early.',
  ];
  const focusAreas = [
    includesWho ? 'Choose one specific group to speak with first.' : 'Name the first group of people who would use this.',
    includesSolution ? 'Describe what makes this approach different.' : 'Explain how your solution would work day to day.',
    'Choose one small outcome you can validate in a prototype.',
  ];

  return {
    idea,
    summary: `Your concept is aimed at ${audience}. To stand out, make its first use case clearer and show how it improves on the way people handle this today.`,
    strengths,
    focusAreas,
    positioning: includesSolution
      ? 'A focused way to help people move from the current workaround to a better outcome.'
      : 'A practical solution for one clear audience and one meaningful need.',
    nextSteps: [
      'Talk with a few people in your intended audience about how they solve this today.',
      'Compare the current workaround with the one moment your idea makes easier.',
      'Prototype that moment and ask users what they would change.',
    ],
  };
}

function IdeaReview({ review }) {
  return <section className="ideacheck-results" aria-live="polite">
    <div className="ideacheck-result-heading">
      <div><p className="ideacheck-eyebrow">IDEA REVIEW</p><h2>Competitive landscape</h2></div>
      <span className="ideacheck-preview-chip">ILLUSTRATIVE</span>
    </div>

    <div className="ideacheck-assessment">
      <div className="ideacheck-assessment-mark"><Sparkles size={17} /></div>
      <div><span className="ideacheck-section-label">EARLY OPPORTUNITY</span><p>{review.summary}</p></div>
    </div>

    <div className="ideacheck-analysis-section">
      <div className="ideacheck-section-heading"><div><span className="ideacheck-section-label">THE LANDSCAPE</span><h3>Alternatives to consider</h3></div><p>Broad patterns, not named competitors.</p></div>
      <div className="ideacheck-alternatives">
        {alternatives.map((alternative, index) => <article className="ideacheck-alternative" key={alternative.label}>
          <div className="ideacheck-alternative-top"><span>0{index + 1}</span><MoveUpRight size={14} /></div>
          <h4>{alternative.label}</h4>
          <p>{alternative.description}</p>
          <div><span>ROOM TO DIFFERENTIATE</span><strong>{alternative.opening}</strong></div>
        </article>)}
      </div>
      <p className="ideacheck-analysis-note">This is a starting framework for your own research, not a live market scan.</p>
    </div>

    <div className="ideacheck-feedback-grid">
      <article className="ideacheck-feedback-card"><div className="ideacheck-feedback-title"><span className="ideacheck-feedback-icon is-strength"><ThumbsUp size={14} /></span><h3>What’s working</h3></div><ul>{review.strengths.map((item) => <li key={item}><Check size={13} />{item}</li>)}</ul></article>
      <article className="ideacheck-feedback-card"><div className="ideacheck-feedback-title"><span className="ideacheck-feedback-icon is-improve"><Target size={14} /></span><h3>Where to focus</h3></div><ul>{review.focusAreas.map((item) => <li key={item}><ArrowRight size={13} />{item}</li>)}</ul></article>
    </div>

    <div className="ideacheck-positioning"><span className="ideacheck-positioning-icon"><Lightbulb size={15} /></span><div><span className="ideacheck-section-label">POSITIONING TO EXPLORE</span><p>{review.positioning}</p></div></div>

    <div className="ideacheck-next-steps"><div className="ideacheck-section-heading"><div><span className="ideacheck-section-label">MAKE IT REAL</span><h3>Three useful next steps</h3></div></div><ol>{review.nextSteps.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol></div>
    <p className="ideacheck-preview-note">Illustrative guidance based on your description · no idea is saved.</p>
  </section>;
}

export default function IdeaCheckPage() {
  const [idea, setIdea] = useState('');
  const [reviewedIdea, setReviewedIdea] = useState('');
  const [error, setError] = useState('');
  const review = useMemo(() => reviewedIdea ? buildPreview(reviewedIdea) : null, [reviewedIdea]);
  const submit = (event) => {
    event.preventDefault();
    if (idea.trim().length < 15) { setError('Add a little more detail to review your idea.'); return; }
    setError('');
    setReviewedIdea(idea.trim());
  };

  return <main className="ideacheck-page">
    <header className="ideacheck-heading"><div><p className="ideacheck-eyebrow"><Sparkles size={12} /> IDEACHECK</p><h1>Have an idea?<br /><span>Let’s make it better.</span></h1></div></header>
    <div className="ideacheck-layout">
      <div className="ideacheck-main-column">
        <form className="ideacheck-form" onSubmit={submit}>
          <label htmlFor="ideacheck-description">Your project idea</label>
          <textarea id="ideacheck-description" value={idea} onChange={(event) => { setIdea(event.target.value); if (error) setError(''); }} placeholder="What are you building, who is it for, and what problem does it solve?" rows={6} maxLength={1800} />
          <div className="ideacheck-form-foot"><span>{error || `${idea.length} / 1,800`}</span><button type="submit">Review my idea <ArrowRight size={15} /></button></div>
        </form>
        {review ? <IdeaReview review={review} /> : <section className="ideacheck-empty-result"><span><Lightbulb size={18} /></span><strong>Your idea analysis will appear here.</strong></section>}
      </div>
      <aside className="ideacheck-sidebar"><p className="ideacheck-eyebrow">WHAT YOU’LL GET</p><div className="ideacheck-benefit"><span>01</span><div><strong>Competitive landscape</strong><p>Compare your concept with common alternatives.</p></div></div><div className="ideacheck-benefit"><span>02</span><div><strong>Clear strengths and gaps</strong><p>See what’s promising and what to sharpen.</p></div></div><div className="ideacheck-benefit"><span>03</span><div><strong>Practical next steps</strong><p>Turn feedback into a small plan to test.</p></div></div><div className="ideacheck-tip"><Lightbulb size={15} /><span>Include the problem, who it affects, and your first solution idea.</span></div></aside>
    </div>
  </main>;
}
