// Faithful coded mock of the internal "TAG REPORT" dashboard (numbers are faked).
// Used as the Featured hero visual for the Document Management System project.

const TAGS: { name: string; color: string }[] = [
  { name: 'Account Summary', color: '#1BBEC0' },
  { name: 'Address Update', color: '#E8682C' },
  { name: 'Disclosure Notice', color: '#C13DC1' },
  { name: 'Compliance Cert', color: '#CFCF3C' },
  { name: 'Welcome Packet', color: '#3A3AC4' },
  { name: 'DS-050', color: '#2E5BB8' },
  { name: 'Form 2100', color: '#B5C935' },
  { name: 'Pending Transfer', color: '#4A78C0' },
  { name: 'Coverage Doc', color: '#2BA8E0' },
  { name: 'Title Record', color: '#E7B6D6' },
  { name: 'DOC-7100-A', color: '#E8A87C' },
  { name: 'Service Clause', color: '#7A3B12' },
  { name: 'Completed Transfer', color: '#2E8B57' },
  { name: 'Valuation Report', color: '#8B3FC1' },
  { name: 'Form 2003', color: '#A8D8B0' },
  { name: 'DOC-7100-B', color: '#E85A5A' },
  { name: 'Daily Batch File', color: '#1A8A6B' },
  { name: 'ARNC Record', color: '#E8A030' },
  { name: 'Transfer Log', color: '#8B1A1A' },
  { name: 'IDEX', color: '#7BC87B' },
  { name: 'Reserve Statement', color: '#6B3410' },
  { name: 'RC-016', color: '#E84545' },
  { name: 'Master Copy', color: '#4B0082' },
];

const OVERVIEW = [500, 840, 898, 300, 570, 570, 398, 398, 920, 390, 410, 410, 882, 840, 840, 840, 840, 840];
const DETAILS = [500, 840, 898, 300, 570, 920, 398, 882, 390, 910, 410, 840];

const ROWS = [
  { name: 'Account Summary', color: '#1BBEC0', change: '40%', up: true },
  { name: 'Address Update', color: '#E8682C', change: '40%', up: false },
  { name: 'Disclosure Notice', color: '#C13DC1', change: '40%', up: true },
  { name: 'Compliance Cert', color: '#CFCF3C', change: '40%', up: true },
  { name: 'Welcome Packet', color: '#3A3AC4', change: '40%', up: true },
];

const NAVY = '#16335C';
const GRAY = '#7B8794';
const GREEN = '#1FA971';
const RED = '#E5484D';

function BarChart({
  data,
  colors,
  yLabels,
  xLabels,
  xAxisLabel,
  height = 200,
}: {
  data: number[];
  colors: string[] | string;
  yLabels: string[];
  xLabels?: string[];
  xAxisLabel?: string;
  height?: number;
}) {
  const max = 1000;
  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        {/* Y axis */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height,
            fontSize: 9,
            color: '#A6AFBC',
            textAlign: 'right',
            minWidth: 48,
          }}
        >
          {yLabels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
        {/* Plot */}
        <div style={{ position: 'relative', flex: 1, height }}>
          {yLabels.map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: (i / (yLabels.length - 1)) * height,
                borderTop: '1px dashed #E3E8EF',
              }}
            />
          ))}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-end',
              gap: 6,
            }}
          >
            {data.map((v, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <span style={{ fontSize: 9, fontWeight: 600, color: '#5B6677', marginBottom: 3 }}>{v}</span>
                <div
                  style={{
                    width: '72%',
                    height: `${(v / max) * 100}%`,
                    background: Array.isArray(colors) ? colors[i % colors.length] : colors,
                    borderRadius: '2px 2px 0 0',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* X labels */}
      {xLabels && (
        <div style={{ display: 'flex', gap: 6, marginLeft: 56, marginTop: 6 }}>
          {xLabels.map((l, i) => (
            <span key={i} style={{ flex: 1, textAlign: 'center', fontSize: 9, color: '#A6AFBC' }}>
              {l}
            </span>
          ))}
        </div>
      )}
      {xAxisLabel && (
        <div style={{ textAlign: 'center', marginLeft: 56, marginTop: 6, fontSize: 10, color: '#A6AFBC' }}>
          {xAxisLabel}
        </div>
      )}
    </div>
  );
}

function StatBlock() {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 11, color: GRAY, marginBottom: 4 }}>Total of Documents</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: NAVY, lineHeight: 1, marginBottom: 5 }}>100000</div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: GREEN, fontWeight: 600 }}>
        <i className="ph-bold ph-caret-up" style={{ fontSize: 11 }} />
        11.2% last week
      </div>
    </div>
  );
}

function Dropdown({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 13,
        fontWeight: 600,
        color: NAVY,
      }}
    >
      {label}
      <i className="ph-bold ph-caret-down" style={{ fontSize: 11, color: GRAY }} />
    </span>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E6EAF0',
  borderRadius: 12,
  padding: '13px 16px',
  boxShadow: '0 1px 3px rgba(16,33,64,0.05)',
};

export default function DocDashboardMock() {
  return (
    <div
      style={{
        width: '100%',
        background: '#EEF1F4',
        font: "400 13px/1.4 'Poppins', sans-serif",
        color: NAVY,
        boxSizing: 'border-box',
        userSelect: 'none',
      }}
    >
      {/* ── Body ── */}
      <div style={{ padding: 14 }}>
        {/* Two cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 16, marginBottom: 16 }}>
          {/* TAG OVERVIEW */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', color: NAVY }}>TAG OVERVIEW</span>
              <Dropdown label="Record ID" />
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              <div style={{ minWidth: 92 }}>
                <StatBlock />
              </div>
              {/* Legend */}
              <div
                style={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '6px 10px',
                  fontSize: 10,
                  color: '#445063',
                  alignContent: 'start',
                }}
              >
                {TAGS.map((t, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</span>
                  </span>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 10, color: GRAY, margin: '14px 0 6px' }}># of Doc</div>
            <BarChart
              data={OVERVIEW}
              colors={TAGS.map((t) => t.color)}
              yLabels={['1 000 000', '800 000', '600 000', '400 000', '200 000', '0']}
              xAxisLabel="2023"
              height={150}
            />
          </div>

          {/* TAG REPORT DETAILS */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', color: NAVY }}>TAG REPORT DETAILS</span>
              <Dropdown label="Account Summary" />
            </div>
            {/* Week / Month toggle */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
              <div style={{ display: 'inline-flex', background: '#FFFFFF', border: '1px solid #E0E5EC', borderRadius: 8, padding: 3, boxShadow: '0 1px 2px rgba(16,33,64,0.06)' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: GRAY, padding: '5px 16px' }}>Week</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', background: '#0C5C8E', borderRadius: 6, padding: '5px 16px' }}>Month</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
              <StatBlock />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#445063', marginTop: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1BBEC0' }} />
                Account Summary
              </span>
            </div>
            <div style={{ fontSize: 10, color: GRAY, margin: '4px 0 6px' }}># of Doc</div>
            <BarChart
              data={DETAILS}
              colors="#1BBEC0"
              yLabels={['1000', '800', '600', '400', '200', '0']}
              xLabels={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
              height={150}
            />
          </div>
        </div>

        {/* WEEKLY TAG REPORT */}
        <div style={cardStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', color: NAVY, marginBottom: 14 }}>WEEKLY TAG REPORT</div>
          {/* Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1.4fr 1.2fr 0.9fr 1.1fr 1fr',
              gap: 12,
              padding: '8px 14px',
              background: '#F4F6F9',
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 600,
              color: NAVY,
            }}
          >
            <span>#</span>
            <span style={{ textAlign: 'center' }}>Tags</span>
            <span># Of Doc</span>
            <span>% Of Doc</span>
            <span>Upload Date</span>
            <span>% Change</span>
          </div>
          {/* Rows */}
          {ROWS.map((r, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1.4fr 1.2fr 0.9fr 1.1fr 1fr',
                gap: 12,
                padding: '8px 14px',
                alignItems: 'center',
                borderBottom: '1px solid #EDF0F4',
                fontSize: 12,
                color: '#3C4759',
              }}
            >
              <span style={{ color: GRAY }} />
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <span
                  style={{
                    background: r.color,
                    color: '#FFFFFF',
                    fontSize: 12,
                    fontWeight: 600,
                    padding: '6px 16px',
                    borderRadius: 8,
                    minWidth: 150,
                    textAlign: 'center',
                  }}
                >
                  {r.name}
                </span>
              </span>
              <span>1000000000</span>
              <span>20%</span>
              <span>MM/DD/YYYY</span>
              <span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    background: r.up ? '#DCFAE9' : '#FDE6E6',
                    color: r.up ? GREEN : RED,
                    fontSize: 12,
                    fontWeight: 600,
                    padding: '5px 12px',
                    borderRadius: 8,
                  }}
                >
                  <i className={r.up ? 'ph-bold ph-caret-up' : 'ph-bold ph-caret-down'} style={{ fontSize: 11 }} />
                  {r.change}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
