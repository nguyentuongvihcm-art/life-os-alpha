import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Wallet, TrendingUp, Flame, Brain, Upload, AlertTriangle, CheckCircle2 } from 'lucide-react';
import './styles/app.css';

const screens = [
  { id: 'today', label: 'Today', icon: Home },
  { id: 'finance', label: 'Money', icon: Wallet },
  { id: 'trading', label: 'Trade', icon: TrendingUp },
  { id: 'pole', label: 'Pole', icon: Flame },
  { id: 'ai', label: 'Why', icon: Brain }
];

function App() {
  const [active, setActive] = useState('today');

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark">✦</div>
          <div>
            <h1>Life OS</h1>
            <p>Alpha · Decision Support</p>
          </div>
        </div>

        <nav className="sideNav">
          {screens.map((s) => {
            const Icon = s.icon;
            return (
              <button key={s.id} className={active === s.id ? 'active' : ''} onClick={() => setActive(s.id)}>
                <Icon size={19} />
                {s.label}
              </button>
            );
          })}
        </nav>

        <div className="sideNote">
          <strong>Rule</strong>
          <p>No decoration. Solve problems.</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="date">Saturday · 28 June 2026</p>
            <h2>{screens.find((s) => s.id === active)?.label}</h2>
          </div>
          <span className="pill">For Vi</span>
        </header>

        {active === 'today' && <Today setActive={setActive} />}
        {active === 'finance' && <Finance />}
        {active === 'trading' && <Trading />}
        {active === 'pole' && <Pole />}
        {active === 'ai' && <AI />}
      </main>

      <nav className="bottomNav">
        {screens.map((s) => {
          const Icon = s.icon;
          return (
            <button key={s.id} className={active === s.id ? 'active' : ''} onClick={() => setActive(s.id)}>
              <Icon size={22} />
              <span>{s.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function Card({ children, className = '' }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function Decision({ number, title, subtitle, why, action, onClick }) {
  return (
    <Card className="decision">
      <div className="number">{number}</div>
      <div className="decisionContent">
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <div className="whyLine">{why}</div>
      </div>
      <button className="primaryBtn" onClick={onClick}>{action}</button>
    </Card>
  );
}

function Today({ setActive }) {
  return (
    <div className="screen">
      <Card className="hero">
        <h1>Hôm nay chỉ cần làm 3 việc.</h1>
        <p>AI ưu tiên theo deadline, tiền, trading risk và lịch tập. Không thêm việc nếu chưa xong 3 việc này.</p>
      </Card>

      <div className="stack">
        <Decision
          number="1"
          title="Buyer Costing"
          subtitle="Deadline 17:00 · làm trước 12:00"
          why="Vì đây là việc có deadline rõ nhất và ảnh hưởng trực tiếp đến công việc/thu nhập."
          action="Why"
          onClick={() => setActive('ai')}
        />
        <Decision
          number="2"
          title="Trading: Review only"
          subtitle="CPI 19:30 · chưa đủ điều kiện vào lệnh"
          why="Không trade trước tin. Upload chart chỉ để chấm setup và đặt điều kiện chờ."
          action="Open"
          onClick={() => setActive('trading')}
        />
        <Decision
          number="3"
          title="Pole: Fireman Spin"
          subtitle="50 phút · tập kỹ thuật, không tăng độ khó"
          why="Beginner nên ưu tiên làm đúng, tránh chấn thương vai/cổ tay."
          action="Start"
          onClick={() => setActive('pole')}
        />
      </div>

      <div className="workspaceGrid">
        <button onClick={() => setActive('finance')}><Wallet />Finance<span>Tiền hiện có / khoản phải trả</span></button>
        <button onClick={() => setActive('trading')}><TrendingUp />Trading<span>Upload chart / chờ điều kiện</span></button>
        <button onClick={() => setActive('pole')}><Flame />Pole<span>Bài hôm nay / upload practice</span></button>
        <button onClick={() => setActive('ai')}><Brain />AI<span>Vì sao AI khuyên vậy</span></button>
      </div>
    </div>
  );
}

function Finance() {
  return (
    <div className="screen">
      <div className="grid two">
        <Card>
          <h2>Finance</h2>
          <div className="metrics">
            <Metric label="Tiền hiện có" value="28.5M" />
            <Metric label="Khoản phải trả" value="32M" tone="warn" />
            <Metric label="Chi an toàn hôm nay" value="300K" />
          </div>

          <div className="rows">
            <Row label="Thu nhập tháng" value="25M" />
            <Row label="Sinh hoạt" value="10M" />
            <Row label="Học phí" value="8M" />
            <Row label="Trả nợ" value="32M" />
          </div>
        </Card>

        <Card>
          <h2>AI Note</h2>
          <p className="muted">Hôm nay không phát sinh khoản chi lớn. Nếu cần mua gì trên 300K, ghi lại lý do trước khi chi.</p>
          <Row label="Quyết định" value="Giữ tiền mặt" />
          <Row label="Lý do" value="Còn khoản cố định" />
          <Row label="Hành động" value="Ghi chi tiêu cuối ngày" />
        </Card>
      </div>
    </div>
  );
}

function Trading() {
  const [preview, setPreview] = useState(null);
  const [review, setReview] = useState(null);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  function generateReview() {
    setReview({
      recommendation: 'WAIT',
      score: '78/100',
      why: 'Vùng setup có ý tưởng, nhưng chưa đủ xác nhận. Chờ BOS/retest hoặc candle close rõ hơn.',
      next: 'Không vào lệnh ngay. Đặt alert ở vùng xác nhận.',
      risk: '0.5% max'
    });
  }

  return (
    <div className="screen">
      <div className="grid two">
        <Card>
          <h2>Trading</h2>
          <p className="muted">Mục tiêu màn hình này: quyết định có nên giao dịch hay không.</p>

          <label className="uploadBox">
            {preview ? <img src={preview} alt="Chart preview" /> : <div><Upload /><span>Upload chart</span></div>}
            <input type="file" accept="image/*" onChange={handleFile} />
          </label>

          <div className="formGrid">
            <select><option>BTCUSD</option><option>XAUUSD</option><option>XAGUSD</option></select>
            <select><option>H4</option><option>H1</option><option>M15</option><option>M5</option></select>
          </div>

          <button className="primaryWide" onClick={generateReview}>Review setup</button>
        </Card>

        <Card>
          <h2>AI Review</h2>
          {!review ? (
            <p className="muted">Upload chart rồi bấm Review. Alpha trả review giả lập theo flow: Recommendation → Why → Conditions.</p>
          ) : (
            <div className="review">
              <Row label="Recommendation" value={review.recommendation} tone="warn" />
              <Row label="Setup score" value={review.score} />
              <Row label="Risk" value={review.risk} />
              <p><strong>Why:</strong> {review.why}</p>
              <p><strong>Next action:</strong> {review.next}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Pole() {
  const [preview, setPreview] = useState(null);
  const [feedback, setFeedback] = useState(null);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  return (
    <div className="screen">
      <div className="grid two">
        <Card>
          <h2>Pole</h2>
          <p className="muted">Hôm nay: Fireman Spin. Làm đúng trước khi làm đẹp.</p>
          <Step title="1. Warm-up 10 phút" text="Vai, cổ tay, hông." />
          <Step title="2. Technique 20 phút" text="5 reps trái + 5 reps phải." />
          <Step title="3. Lỗi cần tránh" text="Vai nhô lên, kéo tay quá nhiều, không siết core." />
          <Step title="4. Khi đau" text="Dừng. Chuyển mobility. Không cố." />
        </Card>

        <Card>
          <h2>Upload practice</h2>
          <label className="uploadBox">
            {preview ? <img src={preview} alt="Practice preview" /> : <div><Upload /><span>Upload practice</span></div>}
            <input type="file" accept="image/*" onChange={handleFile} />
          </label>

          <button className="primaryWide" onClick={() => setFeedback('Tập trung vai thấp và landing mềm. Chưa cần học động tác mới.')}>Review practice</button>

          {feedback && (
            <div className="feedback">
              <CheckCircle2 />
              <p>{feedback}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function AI() {
  return (
    <div className="screen">
      <Card>
        <h2>AI explains decisions</h2>
        <Flow title="1. Observe" text="Deadline, tiền, chart, sức khỏe, lịch tập." />
        <Flow title="2. Decide priority" text="Việc nào ảnh hưởng nhiều nhất hôm nay?" />
        <Flow title="3. Recommend" text="Đưa 1 hành động rõ ràng." />
        <Flow title="4. Explain why" text="Luôn có lý do và điều kiện." />
        <Flow title="5. Learn" text="Sau khi Vi làm xong, AI điều chỉnh ngày mai." />
      </Card>
    </div>
  );
}

function Metric({ label, value, tone = '' }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong className={tone}>{value}</strong>
    </div>
  );
}

function Row({ label, value, tone = '' }) {
  return (
    <div className="row">
      <span>{label}</span>
      <strong className={tone}>{value}</strong>
    </div>
  );
}

function Step({ title, text }) {
  return (
    <div className="step">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function Flow({ title, text }) {
  return (
    <div className="flow">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
