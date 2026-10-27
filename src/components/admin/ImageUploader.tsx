"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2, UploadCloud } from "lucide-react";

type BaseProps = {
  label: string;
  hint?: string;
};

type SingleProps = BaseProps & {
  name: string;
  initialValue?: string;
  multiple?: false;
};

type MultiProps = BaseProps & {
  name: string;
  initialValues?: string[];
  multiple: true;
};

export default function ImageUploader(props: SingleProps | MultiProps) {
  const { label, hint } = props;
  const inputId = useId();
  const fileInput = useRef<HTMLInputElement>(null);
  const [urls, setUrls] = useState<string[]>(
    props.multiple ? props.initialValues ?? [] : props.initialValue ? [props.initialValue] : [],
  );
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const isMultiple = props.multiple === true;

  async function upload(files: File[]) {
    if (files.length === 0) return;
    setError("");
    setUploading(true);

    const accepted = files.slice(0, isMultiple ? 20 : 1);

    try {
      for (let index = 0; index < accepted.length; index += 1) {
        const file = accepted[index];
        setProgress(accepted.length > 1 ? `Uploading ${index + 1} of ${accepted.length}…` : "Uploading…");

        const body = new FormData();
        body.append("file", file);

        const response = await fetch("/api/admin/upload", { method: "POST", body });
        const payload = (await response.json()) as { url?: string; error?: string };

        if (!response.ok || !payload.url) {
          throw new Error(payload.error || "Upload failed.");
        }

        setUrls((current) => (isMultiple ? [...current, payload.url as string] : [payload.url as string]));
      }
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
      setProgress("");
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  function onDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    if (uploading) return;
    upload(Array.from(event.dataTransfer.files));
  }

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
      </div>

      {urls.length > 0 && (
        <div className={isMultiple ? "mb-3 grid grid-cols-3 gap-2" : "mb-3"}>
          {urls.map((url) => (
            <div
              key={url}
              className={`group relative overflow-hidden rounded-xl border border-border bg-surface ${
                isMultiple ? "aspect-square" : "aspect-[16/9]"
              }`}
            >
              <Image
                src={url}
                alt=""
                fill
                sizes={isMultiple ? "160px" : "480px"}
                className="object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={() => setUrls((current) => current.filter((item) => item !== url))}
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950/70 text-white backdrop-blur transition-colors hover:bg-red-600"
                aria-label="Remove image"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-3.5 text-sm transition-colors ${
          dragging
            ? "border-amber-500 bg-amber-50 dark:bg-amber-500/10"
            : "border-border bg-surface hover:border-amber-400 hover:bg-card"
        } ${uploading ? "pointer-events-none opacity-60" : ""}`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-card text-amber-600 shadow-sm dark:text-amber-400">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-medium text-foreground">
            {uploading ? progress : urls.length > 0 && isMultiple ? "Add more photos" : urls.length > 0 ? "Replace image" : "Choose an image or drop it here"}
          </span>
          <span className="block text-[11px] text-muted-foreground">
            JPG, PNG, WebP, AVIF or GIF · up to 8 MB
          </span>
        </span>
        <ImagePlus size={16} className="ml-auto shrink-0 text-muted-foreground" />
      </label>

      <input
        ref={fileInput}
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        multiple={isMultiple}
        className="sr-only"
        onChange={(event) => upload(Array.from(event.target.files ?? []))}
      />

      {props.multiple ? (
        <input type="hidden" name={props.name} value={JSON.stringify(urls)} />
      ) : (
        <input type="hidden" name={props.name} value={urls[0] ?? ""} />
      )}

      {error && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
