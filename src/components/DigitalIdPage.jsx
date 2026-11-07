import { useEffect, useState } from 'react';
import { ArrowDownToLine, Check, Copy, ExternalLink, ShieldCheck } from 'lucide-react';
import QRCode from 'qrcode';
import campuscodeLogoMark from '../assets/campuscode-logo-mark.png';

const profile = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@campuscode.example',
  campusCodeId: 'CC-240128',
  role: 'Student · IIIT Nagpur',
  accountStatus: 'Active',
  verified: true,
  avatarUrl: '',
  publicProfileUrl: 'https://campuscode.example/profile/CC-240128',
};

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}

function roundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

async function downloadPng(profile, qrDataUrl) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 760;
  const context = canvas.getContext('2d');
  if (!context) return;
  context.fillStyle = '#f7f7f4';
  context.fillRect(0, 0, canvas.width, canvas.height);
  roundedRect(context, 56, 56, 1088, 648, 28);
  context.fillStyle = '#fff';
  context.fill();
  context.strokeStyle = '#e4e4df';
  context.lineWidth = 2;
  context.stroke();
  context.fillStyle = '#7665ff';
  context.fillRect(56, 56, 8, 648);

  const logo = new Image();
  logo.src = campuscodeLogoMark;
  await new Promise((resolve) => { logo.onload = resolve; logo.onerror = resolve; });
  if (logo.complete && logo.naturalWidth) context.drawImage(logo, 94, 96, 42, 42);
  context.fillStyle = '#151515';
  context.font = '600 25px Inter, Arial, sans-serif';
  context.fillText('CAMPUSCODE', 150, 125);
  context.fillStyle = profile.verified ? '#597a1b' : '#6a6250';
  context.font = '500 17px Inter, Arial, sans-serif';
  context.fillText(profile.verified ? 'VERIFIED' : 'NOT VERIFIED', 930, 120);
  context.fillStyle = profile.verified ? '#a8e62e' : '#e3c879';
  context.beginPath(); context.arc(908, 114, 5, 0, Math.PI * 2); context.fill();
  context.strokeStyle = '#ededeb'; context.lineWidth = 2; context.beginPath(); context.moveTo(94, 165); context.lineTo(1106, 165); context.stroke();

  context.fillStyle = '#f0eeff'; context.beginPath(); context.arc(176, 305, 57, 0, Math.PI * 2); context.fill();
  if (profile.avatarUrl) {
    try {
      const avatar = new Image(); avatar.crossOrigin = 'anonymous'; avatar.src = profile.avatarUrl;
      await new Promise((resolve, reject) => { avatar.onload = resolve; avatar.onerror = reject; });
      context.save(); context.beginPath(); context.arc(176, 305, 49, 0, Math.PI * 2); context.clip(); context.drawImage(avatar, 127, 256, 98, 98); context.restore();
    } catch {
      context.fillStyle = '#5849d6'; context.font = '600 29px Inter, Arial, sans-serif'; context.textAlign = 'center'; context.fillText(initials(profile.name), 176, 315); context.textAlign = 'left';
    }
  } else {
    context.fillStyle = '#5849d6'; context.font = '600 29px Inter, Arial, sans-serif'; context.textAlign = 'center'; context.fillText(initials(profile.name), 176, 315); context.textAlign = 'left';
  }

  context.fillStyle = '#888880'; context.font = '500 14px Inter, Arial, sans-serif'; context.fillText('STUDENT NAME', 280, 250);
  context.fillStyle = '#171715'; context.font = '600 34px Inter, Arial, sans-serif'; context.fillText(profile.name, 280, 291);
  context.fillStyle = '#66665f'; context.font = '400 20px Inter, Arial, sans-serif'; context.fillText(profile.role, 280, 326);
  const fields = [['EMAIL', profile.email], ['CAMPUSCODE ID', profile.campusCodeId], ['ACCOUNT STATUS', profile.accountStatus]];
  fields.forEach(([label, value], index) => {
    const x = 100 + (index % 2) * 470;
    const y = 430 + Math.floor(index / 2) * 115;
    context.fillStyle = '#888880'; context.font = '500 13px Inter, Arial, sans-serif'; context.fillText(label, x, y);
    context.fillStyle = '#252522'; context.font = '500 20px Inter, Arial, sans-serif'; context.fillText(String(value), x, y + 34);
  });
  if (qrDataUrl) {
    const qr = new Image(); qr.src = qrDataUrl;
    await new Promise((resolve) => { qr.onload = resolve; qr.onerror = resolve; });
    if (qr.complete && qr.naturalWidth) context.drawImage(qr, 900, 440, 148, 148);
    context.fillStyle = '#777770'; context.font = '500 12px Inter, Arial, sans-serif'; context.textAlign = 'center'; context.fillText('SCAN TO VERIFY PROFILE', 974, 610); context.textAlign = 'left';
  }
  const link = document.createElement('a');
  link.download = `campuscode-digital-id-${profile.campusCodeId}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export default function DigitalIdPage() {
  const [qrImage, setQrImage] = useState('');
  const [copied, setCopied] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(profile.publicProfileUrl, { width: 256, margin: 1, errorCorrectionLevel: 'M', color: { dark: '#111111', light: '#ffffff' } })
      .then((url) => { if (active) setQrImage(url); })
      .catch(() => { if (active) setQrImage(''); });
    return () => { active = false; };
  }, [profile]);

  const copyProfileLink = async () => {
    if (!profile?.publicProfileUrl) return;
    try {
      await navigator.clipboard.writeText(profile.publicProfileUrl);
      setCopied(true);
      setNotice('Profile link copied');
      window.setTimeout(() => setCopied(false), 1800);
      window.setTimeout(() => setNotice(''), 2200);
    } catch { setNotice('Could not copy the profile link'); }
  };
  const handleDownload = async (format) => {
    setDownloadOpen(false);
    if (format === 'pdf') { window.print(); return; }
    if (profile && qrImage) await downloadPng(profile, qrImage);
  };

  return <main className="dashboard-content dashboard-digital-id-content">
    <section className="digital-id-page">
      <header className="digital-id-heading"><div><p className="digital-id-eyebrow">YOUR IDENTITY</p><h1>Digital ID</h1></div></header>
      <>
        <article className="digital-id-card" id="digital-id-card">
          <div className="digital-id-card-top"><div className="digital-id-brand"><img src={campuscodeLogoMark} alt="" /><span>CAMPUSCODE</span><i>DEMO</i></div><span className={`digital-id-verified${profile.verified ? ' is-verified' : ''}`}>{profile.verified && <ShieldCheck size={14} />}{profile.verified ? 'Verified' : 'Unverified'}</span></div>
          <div className="digital-id-identity"><div className="digital-id-avatar">{profile.avatarUrl ? <img src={profile.avatarUrl} alt={`${profile.name} profile`} /> : <span>{initials(profile.name)}</span>}</div><div className="digital-id-name-block"><p>STUDENT PROFILE</p><h2>{profile.name}</h2><span>{profile.role}</span></div></div>
          <div className="digital-id-details"><div><span>EMAIL</span><strong>{profile.email}</strong></div><div><span>CAMPUSCODE ID</span><strong>{profile.campusCodeId}</strong></div><div><span>ACCOUNT STATUS</span><strong className="digital-id-status"><i />{profile.accountStatus}</strong></div></div>
          <div className="digital-id-card-footer"><div><strong>CampusCode</strong><span>Student identity</span></div>{qrImage ? <div className="digital-id-qr-wrap"><img className="digital-id-qr" src={qrImage} alt="QR code linking to the public profile" /><span>SCAN TO VERIFY</span></div> : <div className="digital-id-qr-unavailable" aria-label="Profile verification link unavailable" />}</div>
        </article>
        <div className="digital-id-actions"><div className="digital-id-download-wrap"><button className="digital-id-download" onClick={() => handleDownload('png')} disabled={!qrImage}><ArrowDownToLine size={15} />Download ID</button><button className="digital-id-download-menu-toggle" aria-label="More download formats" aria-expanded={downloadOpen} onClick={() => setDownloadOpen(!downloadOpen)}>⌄</button>{downloadOpen && <div className="digital-id-download-menu"><button onClick={() => handleDownload('png')}>Download PNG</button><button onClick={() => handleDownload('pdf')}>Save as PDF</button></div>}</div><button className="digital-id-copy" onClick={copyProfileLink} disabled={!profile.publicProfileUrl}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy Profile Link'}<ExternalLink size={12} /></button></div>
      </>
      {notice && <div className="digital-id-notice" role="status">{notice}</div>}
    </section>
  </main>;
}
