"use client";

import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import Link from "next/link";
import type { Bean } from "../types";
import {
  pageStyle,
  formCardStyle,
  formRowStyle,
  formRowFullStyle,
  labelStyle,
  inputStyle,
  btnPrimaryStyle,
  sectionTitleStyle,
  itemsGridStyle,
  itemCardStyle,
  cardBodyStyle,
  cardNameStyle,
  cardTagStyle,
  cardFooterStyle,
  deleteBtnStyle,
  EmptyState,
  SearchBar,
  ImageUpload,
} from "../components/ui";

const ROAST_LABELS = [
  "浅煎り",
  "中浅煎り",
  "中煎り",
  "中深煎り",
  "深煎り",
];

export default function BeansPage() {
  const [beans, setBeans] = useState<Bean[]>([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [farm, setFarm] = useState("");
  const [process, setProcess] = useState("");
  const [roast, setRoast] = useState(3);
  const [taste, setTaste] = useState("");
  const [memo, setMemo] = useState("");
  const [image, setImage] = useState("");

  // 初回読み込み
  useEffect(() => {
    const fetchBeans = async () => {
      const { data, error } = await supabase
        .from("beans")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setBeans(data);
      }
    };

    fetchBeans();
  }, []);

  // 登録
  const handleAdd = async () => {
    if (!name.trim()) {
      alert("豆の名前を入力してください");
      return;
    }

    const { data, error } = await supabase
      .from("beans")
      .insert([
        {
          name,
          origin,
          farm,
          process,
          roast,
          taste,
          memo,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      alert("保存に失敗しました");
      return;
    }

    if (data) {
      setBeans((prev) => [...data, ...prev]);
    }

    setName("");
    setOrigin("");
    setFarm("");
    setProcess("");
    setRoast(3);
    setTaste("");
    setMemo("");
    setImage("");
  };

  // 削除
  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from("beans")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("削除に失敗しました");
      return;
    }

    setBeans((prev) => prev.filter((b) => b.id !== id));
  };

  const filtered = beans.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.origin.toLowerCase().includes(search.toLowerCase()) ||
      b.taste.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main style={pageStyle}>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.2rem",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            コーヒー豆
          </h1>

          <p
            style={{
              fontSize: "13px",
              color: "var(--mid)",
              marginTop: "4px",
              fontWeight: 300,
            }}
          >
            豆の記憶
          </p>
        </div>

        <Link
          href="/"
          style={{
            fontSize: "13px",
            color: "var(--mid)",
            textDecoration: "none",
          }}
        >
          ← ホーム
        </Link>
      </div>

      <div style={formCardStyle}>
        <div style={sectionTitleStyle}>新しい豆を登録</div>

        <div style={formRowStyle}>
          <div>
            <label style={labelStyle}>豆の名前</label>
            <input
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label style={labelStyle}>産地</label>
            <input
              style={inputStyle}
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
        </div>

        <div style={formRowStyle}>
          <div>
            <label style={labelStyle}>購入店</label>
            <input
              style={inputStyle}
              value={farm}
              onChange={(e) => setFarm(e.target.value)}
            />
          </div>

          <div>
            <label style={labelStyle}>精製方法</label>
            <select
              style={inputStyle}
              value={process}
              onChange={(e) => setProcess(e.target.value)}
            >
              <option value="">選択...</option>
              {["ウォッシュド", "ナチュラル", "ハニー", "アナエロビック"].map(
                (v) => (
                  <option key={v}>{v}</option>
                )
              )}
            </select>
          </div>
        </div>

        <div style={formRowFullStyle}>
          <div>
            <label style={labelStyle}>焙煎度</label>

            <div
              style={{
                textAlign: "center",
                fontSize: "13px",
                color: "var(--brown)",
                fontWeight: 500,
                marginBottom: "8px",
              }}
            >
              {ROAST_LABELS[roast - 1]}
            </div>

            <input
              type="range"
              min={1}
              max={5}
              value={roast}
              onChange={(e) => setRoast(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--brown)",
              }}
            />
          </div>
        </div>

        <div style={formRowFullStyle}>
          <div>
            <label style={labelStyle}>テイストノート</label>
            <input
              style={inputStyle}
              value={taste}
              onChange={(e) => setTaste(e.target.value)}
            />
          </div>
        </div>

        <div style={formRowFullStyle}>
          <div>
            <label style={labelStyle}>メモ</label>
            <textarea
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: "80px",
              }}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
        </div>

        <div style={formRowStyle}>
          <div>
            <label style={labelStyle}>写真</label>
            <ImageUpload
              previewSrc={image}
              onFile={setImage}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              paddingBottom: "2px",
            }}
          >
            <button
              style={btnPrimaryStyle}
              onClick={handleAdd}
            >
              登録する
            </button>
          </div>
        </div>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="豆を検索..."
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon="☕"
          text={
            beans.length
              ? "見つかりませんでした"
              : "まだ豆が登録されていません"
          }
        />
      ) : (
        <div style={itemsGridStyle}>
          {filtered.map((bean) => (
            <div
              key={bean.id}
              className="card"
              style={itemCardStyle}
            >
              <div style={cardBodyStyle}>
                <div style={cardNameStyle}>{bean.name}</div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--mid)",
                  }}
                >
                  {bean.origin}
                </div>

                {bean.process && (
                  <span style={cardTagStyle}>
                    {bean.process}
                  </span>
                )}

                {bean.taste && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--brown)",
                      marginTop: "6px",
                    }}
                  >
                    {bean.taste}
                  </div>
                )}

                {bean.memo && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--mid)",
                      marginTop: "8px",
                    }}
                  >
                    {bean.memo}
                  </div>
                )}
              </div>

              <div style={cardFooterStyle}>
                <button
                  style={deleteBtnStyle}
                  onClick={() => handleDelete(bean.id)}
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
