import React from "react";

export const pageStyle: React.CSSProperties = {
  padding: "2.5rem 2rem",
  maxWidth: "900px",
  margin: "0 auto",
};

export const formCardStyle: React.CSSProperties = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "6px",
  padding: "1.75rem",
  marginBottom: "2rem",
};

export const formRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
  marginBottom: "1rem",
};

export const formRowFullStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "1rem",
  marginBottom: "1rem",
};

export const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.08em",
  color: "var(--mid)",
  textTransform: "uppercase",
  fontWeight: 500,
  marginBottom: "6px",
  display: "block",
};

export const inputStyle: React.CSSProperties = {
  background: "var(--cream)",
  border: "1px solid var(--border)",
  padding: "9px 12px",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  color: "var(--dark)",
  borderRadius: "3px",
  outline: "none",
  width: "100%",
};

export const btnPrimaryStyle: React.CSSProperties = {
  background: "var(--dark)",
  color: "var(--cream)",
  border: "none",
  padding: "10px 20px",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "13px",
  letterSpacing: "0.04em",
  cursor: "pointer",
  borderRadius: "3px",
  width: "100%",
};

export const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "1rem",
  fontStyle: "italic",
  color: "var(--mid)",
  marginBottom: "1rem",
  paddingBottom: "8px",
  borderBottom: "1px solid var(--border)",
};

export const itemsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "1.25rem",
};

export const itemCardStyle: React.CSSProperties = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "6px",
  overflow: "hidden",
};

export const cardBodyStyle: React.CSSProperties = {
  padding: "1rem 1.1rem 0.9rem",
};

export const cardNameStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "1.15rem",
  fontWeight: 400,
  marginBottom: "4px",
  color: "var(--dark)",
};

export const cardTagStyle: React.CSSProperties = {
  background: "#E8DDD0",
  color: "var(--brown)",
  fontSize: "11px",
  padding: "2px 8px",
  borderRadius: "2px",
  letterSpacing: "0.03em",
};

export const cardFooterStyle: React.CSSProperties = {
  padding: "8px 1.1rem",
  display: "flex",
  justifyContent: "flex-end",
  borderTop: "1px solid var(--border)",
};

export const deleteBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "var(--light)",
  fontSize: "12px",
  cursor: "pointer",
  padding: "4px 8px",
  borderRadius: "2px",
};

export function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--mid)" }}>
      <div style={{ fontSize: "2.5rem", opacity: 0.3, marginBottom: "1rem" }}>{icon}</div>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.3rem",
        fontWeight: 300,
        fontStyle: "italic",
      }}>
        {text}
      </div>
    </div>
  );
}

export function SearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div style={{ position: "relative", marginBottom: "1.5rem" }}>
      <span style={{
        position: "absolute",
        left: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--light)",
        fontSize: "16px",
        pointerEvents: "none",
      }}>⌕</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          ...inputStyle,
          paddingLeft: "36px",
          background: "var(--card)",
        }}
      />
    </div>
  );
}

export function ImageUpload({
  previewSrc,
  onFile,
  label = "クリックして画像を選択",
}: {
  previewSrc: string;
  onFile: (dataUrl: string) => void;
  label?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) onFile(ev.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{
      border: "1px dashed var(--border)",
      borderRadius: "3px",
      padding: "1rem",
      cursor: "pointer",
      textAlign: "center",
      fontSize: "12px",
      color: "var(--mid)",
      background: "var(--cream)",
      position: "relative",
      overflow: "hidden",
      minHeight: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", zIndex: 1 }}
      />
      {previewSrc ? (
        <img
          src={previewSrc}
          alt="preview"
          style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "3px", display: "block" }}
        />
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
}

export function MediaUpload({
  previewImg,
  previewVideo,
  onFile,
}: {
  previewImg: string;
  previewVideo: string;
  onFile: (type: "image" | "video", dataUrl: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (file.type.startsWith("image/")) onFile("image", result);
      else onFile("video", result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{
      border: "1px dashed var(--border)",
      borderRadius: "3px",
      cursor: "pointer",
      background: "var(--cream)",
      position: "relative",
      overflow: "hidden",
      minHeight: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleChange}
        style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", zIndex: 1 }}
      />
      {previewVideo ? (
        <video
          src={previewVideo}
          controls
          style={{ width: "100%", height: "140px", objectFit: "cover" }}
        />
      ) : previewImg ? (
        <img
          src={previewImg}
          alt="preview"
          style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "3px" }}
        />
      ) : (
        <span style={{ fontSize: "12px", color: "var(--mid)", padding: "1rem" }}>
          クリックして画像・動画を選択
        </span>
      )}
    </div>
  );
}
