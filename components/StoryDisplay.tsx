
import React from 'react';
import { exportToPDF } from '../utils/pdfExport';

interface StoryDisplayProps {
  content: string;
  onSave?: () => void;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ content, onSave }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePDF = () => {
    const lines = content.split('\n').filter(l => l.trim() !== '');
    const title = lines[0] || "Meu Romance IA";
    const body = lines.slice(1).join('\n');
    exportToPDF(title, body);
  };

  return (
    <div className="mt-8 bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-rose-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400"></div>
      
      <div className="flex flex-wrap justify-end gap-3 mb-6">
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 text-sm font-semibold transition-colors flex items-center gap-2"
        >
          {copied ? '✅ Copiado!' : '📋 Copiar Texto'}
        </button>
        <button
          onClick={handlePDF}
          className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-sm font-semibold transition-colors flex items-center gap-2"
        >
          📄 Exportar PDF
        </button>
      </div>

      <div className="prose prose-rose max-w-none">
        {content.split('\n').map((para, i) => (
          para.trim() ? (
            <p key={i} className={`mb-4 leading-relaxed text-slate-700 ${i === 0 ? 'text-2xl font-serif text-rose-800 font-bold mb-8 text-center border-b pb-4 border-rose-100' : 'text-lg'}`}>
              {para}
            </p>
          ) : <br key={i} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-rose-300 font-romantic text-2xl italic">Fim da história...</p>
      </div>
    </div>
  );
};

export default StoryDisplay;
