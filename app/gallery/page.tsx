import SubPageHero from "@/components/SubPageHero";
import ExpressionMarquee from "@/components/ExpressionMarquee";
import { getExpressionImages } from "@/lib/gallery";
import { pageMetadata } from "@/lib/site";
import content from "@/data/content.json";

export const metadata = pageMetadata("/gallery");
export default async function GalleryPage() {
  const images = await getExpressionImages();
  return <main id="main-content"><SubPageHero href="/gallery" /><ExpressionMarquee images={images} comicDecorations={content.expressionGallery.comicDecorations} title="表情ギャラリー" subtitle="Visual Gallery" /></main>;
}
