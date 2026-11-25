import { ImageResponse } from "next/og";
import { BLOG_POSTS, getPostBySlug } from "@/data/posts";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Writing & Research | Seyone Gunasingham";
  const subtitle =
    post?.subtitle ??
    "Data breakdowns, empirical studies, and technical write-ups.";
  const tags = post?.tags ?? ["Data", "Engineering"];
  const metaLine = post ? `${post.date}  ·  ${post.readTime}` : "seyone.dev";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#09090b",
        backgroundImage:
          "radial-gradient(circle at 85% 15%, rgba(16, 185, 129, 0.18), transparent 45%), radial-gradient(circle at 10% 90%, rgba(59, 130, 246, 0.12), transparent 45%)",
        padding: "64px 72px",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "22px",
            fontWeight: 700,
            color: "#10b981",
            letterSpacing: "0.04em",
          }}
        >
          <span>SEYONE.DEV / BLOG</span>
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#a1a1aa",
          }}
        >
          {metaLine}
        </div>
      </div>

      {/* Main title & subtitle */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "22px",
          maxWidth: "1040px",
        }}
      >
        <div
          style={{
            fontSize: title.length > 68 ? "48px" : "56px",
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            color: "#ffffff",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "24px",
            lineHeight: 1.45,
            color: "#a1a1aa",
          }}
        >
          {subtitle.length > 155 ? `${subtitle.slice(0, 152)}...` : subtitle}
        </div>
      </div>

      {/* Bottom tags & author */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          borderTop: "1px solid #27272a",
          paddingTop: "28px",
        }}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          {tags.slice(0, 4).map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 16px",
                borderRadius: "9999px",
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                color: "#d4d4d8",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff" }}>
            Seyone Gunasingham
          </div>
          <div style={{ fontSize: "16px", color: "#a1a1aa" }}>
            Software &amp; Data Engineer
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
