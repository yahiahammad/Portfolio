import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getNextStudy } from "@/lib/case-studies";
import CaseStudyContent from "./CaseStudyContent";

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];
  if (!study) return {};
  return {
    title: `${study.title} — Case Study · Yahia Hammad`,
    description: study.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];
  if (!study) notFound();
  const nextStudy = getNextStudy(slug);
  return <CaseStudyContent study={study} nextStudy={nextStudy} />;
}
