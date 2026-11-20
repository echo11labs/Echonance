"use client";

import {
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
  Mic,
  Paperclip,
  Pause,
  Play,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.css";

export type ChatAttachment = {
  id: string;
  file: File;
  kind: "document" | "spreadsheet" | "image" | "file";
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isAudioFile(file: File) {
  return (
    file.type.startsWith("audio/") ||
    /\.(webm|mp3|wav|ogg|m4a)$/i.test(file.name)
  );
}

function getAttachmentIcon(
  kind: ChatAttachment["kind"],
  fileName: string,
  isAudio: boolean,
) {
  if (isAudio) return Mic;
  if (kind === "spreadsheet" || /\.(xlsx|xls|csv)$/i.test(fileName)) {
    return FileSpreadsheet;
  }
  if (kind === "image" || /\.(png|jpe?g|webp|gif|svg)$/i.test(fileName)) {
    return ImageIcon;
  }
  if (kind === "document" || /\.(pdf|docx?|txt|rtf)$/i.test(fileName)) {
    return FileText;
  }
  return Paperclip;
}

function AudioPlayer({ file }: { file: File }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => setPlaying(false);
    return () => {
      audio.pause();
      URL.revokeObjectURL(url);
    };
  }, [file]);

  function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }

  return (
    <button
      className={styles.attachmentAction}
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause audio" : "Play audio"}
      title={playing ? "Pause voice note" : "Play voice note"}
    >
      {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
    </button>
  );
}

export default function ChatAttachments({
  attachments,
  onRemove,
}: {
  attachments: ChatAttachment[];
  onRemove?: (id: string) => void;
}) {
  if (!attachments.length) return null;

  return (
    <ul className={styles.attachmentList} aria-label="Attachments">
      {attachments.map(({ id, file, kind }, index) => {
        const audio = isAudioFile(file);
        const Icon = getAttachmentIcon(kind, file.name, audio);
        const displayName = audio ? "Voice note" : `Attachment ${index + 1}`;

        return (
          <li className={styles.attachment} key={id}>
            <Icon aria-hidden="true" />
            <div className={styles.attachmentMeta}>
              <span className={styles.attachmentName}>{displayName}</span>
              <span className={styles.attachmentSize}>
                {formatFileSize(file.size)}
              </span>
            </div>
            {audio && <AudioPlayer file={file} />}
            {onRemove && (
              <button
                className={styles.attachmentAction}
                type="button"
                aria-label={`Remove ${displayName}`}
                title="Remove attachment"
                onClick={() => onRemove(id)}
              >
                <X aria-hidden="true" />
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
