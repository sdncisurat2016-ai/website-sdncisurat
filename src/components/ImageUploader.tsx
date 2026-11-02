import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X, Check, RefreshCw, Link as LinkIcon } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  aspectRatio?: 'square' | 'landscape';
  recommendedSizeText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Foto Profil Guru',
  aspectRatio = 'square',
  recommendedSizeText = 'Format JPG, PNG, atau WEBP. Maks 10MB (otomatis dioptimalkan).',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih berkas gambar yang valid (JPG, PNG, WEBP).');
      return;
    }

    setIsProcessing(true);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Max dimensions for optimization
        const maxDim = aspectRatio === 'square' ? 600 : 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.86);
          onChange(compressedDataUrl);
        } else {
          // Fallback to raw data url
          onChange(e.target?.result as string);
        }
        setIsProcessing(false);
      };
      img.onerror = () => {
        setIsProcessing(false);
        alert('Gagal memproses gambar.');
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      setIsProcessing(false);
      alert('Gagal membaca berkas.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClear = () => {
    onChange('');
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-stone-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-stone-500 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          {showUrlInput ? 'Gunakan Upload Perangkat' : 'Gunakan Tautan URL Gambar'}
        </button>
      </div>

      {showUrlInput ? (
        <div className="space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... atau /src/assets/images/..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600 font-mono"
          />
          <p className="text-[11px] text-stone-400">
            Tempelkan link gambar eksternal atau path lokal.
          </p>
        </div>
      ) : (
        <div>
          {/* Hidden native file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={handleFileChange}
            className="hidden"
          />

          {value ? (
            /* Uploaded Preview Card */
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`relative rounded-xl overflow-hidden bg-stone-200 border border-stone-300 shrink-0 ${
                    aspectRatio === 'square' ? 'w-16 h-16' : 'w-24 h-16'
                  }`}
                >
                  <img
                    src={value}
                    alt="Pratinjau Foto"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-emerald-800 text-xs font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    <span>Foto Siap Dipakai</span>
                  </div>
                  <p className="text-[11px] text-stone-500 truncate max-w-[200px] mt-0.5">
                    {fileName || (value.startsWith('data:') ? 'Tersimpan dari Perangkat' : value)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="px-2.5 py-1.5 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isProcessing ? 'animate-spin' : ''}`} />
                  Ganti
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Hapus Foto"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Drag & Drop / Click to Upload Box */
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-5 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                dragOver
                  ? 'border-emerald-600 bg-emerald-50/50'
                  : 'border-stone-200 hover:border-emerald-500 hover:bg-stone-50/70 bg-white'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-stone-800">
                {isProcessing ? 'Memproses Berkas...' : 'Pilih Foto dari Perangkat (Galeri / HP / Komputer)'}
              </p>
              <p className="text-[11px] text-stone-500 mt-1">
                Klik untuk menjelajah atau seret berkas gambar ke sini
              </p>
              <p className="text-[10px] text-stone-400 mt-1.5">
                {recommendedSizeText}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
