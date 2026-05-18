"use client";

import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import Link from "next/link";
import type { Cafe } from "../types";

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

export default function CafesPage() {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [drink, setDrink] = useState("");
  const [type, setType] = useState("");
  const [memo, setMemo] = useState("");
  const [image, setImage] = useState("");

  // 初回読み込み
  useEffect(() => {
    const fetchCafes = async () => {
      const { data, error } = await supabase
        .from("cafes")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("FETCH ERROR", error);
        return;
      }

      if (data) {
        setCafes(data);
      }
    };

    fetchCafes();
  }, []);

  // 登録
  const handleAdd = async () => {
    if (!name.trim()) {
      alert("店名を入力してください");
      return;
    }

    const { data, error } = await supabase
      .from("cafes")
      .insert([
        {
          name,
          location,
          drink,
          type,
          memo,
          image,
        },
      ])
      .select();

    if (error) {
      console.error("INSERT ERROR", error);
      alert("保存に失敗しました");
      return;
    }

    if (data) {
      setCafes((prev) => [...data, ...prev]);
    }

    setName("");
    setLocation("");
    setDrink("");
    setType("");
    setMemo("");
    setImage("");
  };

  // 削除
  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from("cafes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE ERROR", error);
      alert("削除に失敗しました");
      return;
    }

    setCafes((prev) =>
      prev.filter((c) => c.id !== id)
    );
  };

  // 検索
  const filtered = cafes.filter(
    (c) =>
      c.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      c.location
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      c.type
        .toLowerCase()
        .includes(search.toLowerCase())
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
              fontFamily:
                "'Cormorant Garamond', serif",
              fontSize: "2.2rem",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            カフェ探訪記
          </h1>

          <p
            style={{
              fontSize: "13px",
              color: "var(--mid)",
              marginTop: "4px",
              fontWeight: 300,
            }}
          >
            カフェの記憶
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

      {/* 登録フォーム */}
      <div style={formCardStyle}>
        <div style={sectionTitleStyle}>
          カフェを登録
        </div>

        <div style={formRowStyle}>
          <div>
            <label style={labelStyle}>
              店名
            </label>

            <input
              style={inputStyle}
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="例：喫茶 葵"
            />
          </div>

          <div>
            <label style={labelStyle}>
              場所
            </label>

            <input
              style={inputStyle}
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder="例：京都市東山区"
            />
          </div>
        </div>

        <div style={formRowStyle}>
          <div>
            <label style={labelStyle}>
              飲んだもの
            </label>

            <input
              style={inputStyle}
              value={drink}
              onChange={(e) =>
                setDrink(e.target.value)
              }
              placeholder="例：エチオピア浅煎り"
            />
          </div>

          <div>
            <label style={labelStyle}>
              タイプ
            </label>

            <select
              style={inputStyle}
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            >
              <option value="">
                選択...
              </option>

              {[
                "スペシャルティ",
                "純喫茶",
                "自家焙煎",
                "チェーン",
                "ロースタリー",
                "カフェバー",
              ].map((v) => (
                <option key={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={formRowFullStyle}>
          <div>
            <label style={labelStyle}>
              レビュー・メモ
            </label>

            <textarea
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: "80px",
              }}
              value={memo}
              onChange={(e) =>
                setMemo(e.target.value)
              }
              placeholder="雰囲気・味・おすすめなど..."
            />
          </div>
        </div>

        <div style={formRowStyle}>
          <div>
            <label style={labelStyle}>
              写真
            </label>

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

      {/* 検索 */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="カフェを検索..."
      />

      {/* 一覧 */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="🏡"
          text={
            cafes.length
              ? "見つかりませんでした"
              : "まだカフェが登録されていません"
          }
        />
      ) : (
        <div style={itemsGridStyle}>
          {filtered.map((cafe) => (
            <div
              key={cafe.id}
              className="card"
              style={itemCardStyle}
            >
              {cafe.image ? (
                <img
                  src={cafe.image}
                  alt={cafe.name}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "160px",
                    background:
                      "linear-gradient(135deg,#E8DDD0,#D4C4B0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    opacity: 0.4,
                  }}
                >
                  🏡
                </div>
              )}

              <div style={cardBodyStyle}>
                <div style={cardNameStyle}>
                  {cafe.name}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--mid)",
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  {cafe.location && (
                    <span>
                      {cafe.location}
                    </span>
                  )}

                  {cafe.type && (
                    <span style={cardTagStyle}>
                      {cafe.type}
                    </span>
                  )}
                </div>

                {cafe.drink && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--brown)",
                      marginTop: "6px",
                      fontStyle: "italic",
                    }}
                  >
                    {cafe.drink}
                  </div>
                )}

                {cafe.memo && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--mid)",
                      marginTop: "8px",
                      lineHeight: 1.5,
                    }}
                  >
                    {cafe.memo}
                  </div>
                )}
              </div>

              <div style={cardFooterStyle}>
                <button
                  style={deleteBtnStyle}
                  onClick={() =>
                    handleDelete(cafe.id)
                  }
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
