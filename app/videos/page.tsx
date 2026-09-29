import SubPageHero from "@/components/SubPageHero";
import ArchiveSections from "@/components/ArchiveSections";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/videos");
export const dynamic = "force-dynamic";
export default function VideosPage() {
  return <main id="main-content"><SubPageHero href="/videos" /><ArchiveSections /></main>;
}
