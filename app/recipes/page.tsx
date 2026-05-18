"use client";

import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import Link from "next/link";
import type { Recipe } from "../types";

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
  MediaUpload,
} from "../components/ui";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [bean, setBean] = useState("");
  const [method, setMethod] = useState("");
  const [grind, setGrind] = useState("");
  const [dose, setDose] = useState("");
  const [water, setWater] = useState("");
  const [temp, setTemp] = useState("");
  const [time, setTime] = useState("");
  const [memo, setMemo] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");

  // 初回読み込み
  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("FETCH ERROR", error);
        return;
      }

      if (data) {
        setRecipes(data);
      }
    };

    fetchRecipes();
  }, []);

  // メディア
  const handleMedia = (
    type: "image" | "video",
    dataUrl: string
  ) => {
    if (type === "image") {
      setImage(dataUrl);
      setVideo("");
    } else {
      setVideo(dataUrl);
      setImage("");
    }
  };

  // 登録
  const handleAdd = async () => {
    if (!title.trim()) {
      alert("タイトルを入力してください");
      return;
    }

    const { data, error } = await supabase
      .from("recipes")
      .insert([
        {
          title,
          bean,
          method,
          grind,
          dose,
          water,
          temp,
          time,
          memo,
          image,
          video,
        },
      ])
      .select();

    if (error) {
      console.error("INSERT ERROR", error);
      alert("保存に失敗しました");
      return;
    }

    if (data) {
      setRecipes((prev) => [...data, ...prev]);
    }

    setTitle("");
    setBean("");
    setMethod("");
    setGrind("");
    setDose("");
    setWater("");
    setTemp("");
    setTime("");
    setMemo("");
    setImage("");
    setVideo("");
  };

  // 削除
  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from("recipes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE ERROR", error);
      alert("削除に失敗しました");
      return;
    }

    setRecipes((prev) =>
      prev.filter((r) => r.id !== id)
    );
  };

  // 検索
  const filtered = recipes.filter(
    (r) =>
      r.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      r.bean
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      r.method
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
            抽出レシピ
          </h1>

          <p
            style={{
              fontSize: "13px",
              color: "var(--mid)",
              marginTop: "4px",
              fontWeight: 300,
            }}
          >
            レシピの記憶
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
          レシピを登録
        </div>

        <div style={formRowStyle}>
          <div>
            <label style={labelStyle}>
              タイトル
            </label>

            <input
              style={inputStyle}
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="例：朝のV60"
            />
          </div>

          <div>
            <label style={labelStyle}>
              使用した豆
            </label>

            <input
              style={inputStyle}
              value={bean}
              onChange={(e) =>
                setBean(e.target.value)
              }
              placeholder="例：イルガチェフェ"
            />
          </div>
        </div>

        <div style={formRowStyle}>
          <div>
            <label style={labelStyle}>
              抽出方法
            </label>

            <input
              style={inputStyle}
              value={method}
              onChange={(e) =>
                setMethod(e.target.value)
              }
              placeholder="例：V60"
            />
          </div>

          <div>
            <label style={labelStyle}>
              グラインド
            </label>

            <select
              style={inputStyle}
              value={grind}
              onChange={(e) =>
                setGrind(e.target.value)
              }
            >
              <option value="">
                選択...
              </option>

              {[
                "極細挽き",
                "細挽き",
                "中細挽き",
                "中挽き",
                "粗挽き",
              ].map((v) => (
                <option key={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={formRowStyle}>
          <div>
            <label style={labelStyle}>
              豆の量（g）
            </label>

            <input
              style={inputStyle}
              type="number"
              value={dose}
              onChange={(e) =>
                setDose(e.target.value)
              }
            />
          </div>

          <div>
            <label style={labelStyle}>
              湯量（ml）
            </label>

            <input
              style={inputStyle}
              type="number"
              value={water}
              onChange={(e) =>
                setWater(e.target.value)
              }
            />
          </div>
        </div>

        <div style={formRowStyle}>
          <div>
            <label style={labelStyle}>
              湯温（℃）
            </label>

            <input
              style={inputStyle}
              type="number"
              value={temp}
              onChange={(e) =>
                setTemp(e.target.value)
              }
            />
          </div>

          <div>
            <label style={labelStyle}>
              抽出時間
            </label>

            <input
              style={inputStyle}
              value={time}
              onChange={(e) =>
                setTime(e.target.value)
              }
              placeholder="2:45"
            />
          </div>
        </div>

        <div style={formRowFullStyle}>
          <div>
            <label style={labelStyle}>
              メモ
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
            />
          </div>
        </div>

        <div style={formRowStyle}>
          <div>
            <label style={labelStyle}>
              写真 / 動画
            </label>

            <MediaUpload
              previewImg={image}
              previewVideo={video}
              onFile={handleMedia}
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
        placeholder="レシピを検索..."
      />

      {/* 一覧 */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="⚗️"
          text={
            recipes.length
              ? "見つかりませんでした"
              : "まだレシピが登録されていません"
          }
        />
      ) : (
        <div style={itemsGridStyle}>
          {filtered.map((rec) => (
            <div
              key={rec.id}
              className="card"
              style={itemCardStyle}
            >
              {rec.video ? (
                <video
                  src={rec.video}
                  controls
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : rec.image ? (
                <img
                  src={rec.image}
                  alt={rec.title}
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
                  ⚗️
                </div>
              )}

              <div style={cardBodyStyle}>
                <div style={cardNameStyle}>
                  {rec.title}
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
                  {rec.bean && (
                    <span>{rec.bean}</span>
                  )}

                  {rec.method && (
                    <span style={cardTagStyle}>
                      {rec.method}
                    </span>
                  )}

                  {rec.grind && (
                    <span style={cardTagStyle}>
                      {rec.grind}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    marginTop: "10px",
                    display: "grid",
                    gridTemplateColumns:
                      "1fr 1fr",
                    gap: "4px",
                  }}
                >
                  {rec.dose && (
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--mid)",
                      }}
                    >
                      豆{" "}
                      <strong
                        style={{
                          color: "var(--dark)",
                          fontWeight: 500,
                        }}
                      >
                        {rec.dose}g
                      </strong>
                    </div>
                  )}

                  {rec.water && (
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--mid)",
                      }}
                    >
                      湯量{" "}
                      <strong
                        style={{
                          color: "var(--dark)",
                          fontWeight: 500,
                        }}
                      >
                        {rec.water}ml
                      </strong>
                    </div>
                  )}

                  {rec.temp && (
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--mid)",
                      }}
                    >
                      湯温{" "}
                      <strong
                        style={{
                          color: "var(--dark)",
                          fontWeight: 500,
                        }}
                      >
                        {rec.temp}℃
                      </strong>
                    </div>
                  )}

                  {rec.time && (
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--mid)",
                      }}
                    >
                      時間{" "}
                      <strong
                        style={{
                          color: "var(--dark)",
                          fontWeight: 500,
                        }}
                      >
                        {rec.time}
                      </strong>
                    </div>
                  )}
                </div>

                {rec.memo && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--mid)",
                      marginTop: "8px",
                      lineHeight: 1.5,
                    }}
                  >
                    {rec.memo}
                  </div>
                )}
              </div>

              <div style={cardFooterStyle}>
                <button
                  style={deleteBtnStyle}
                  onClick={() =>
                    handleDelete(rec.id)
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
