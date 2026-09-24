import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageSeo } from "@/lib/seo";
import { legalSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

const description =
  "Podmínky spolupráce: rozsah služeb, měsíční paušál a fakturace, vlastnictví dat a přístupy k systémům klienta.";

export const metadata: Metadata = {
  title: "Obchodní podmínky",
  ...pageSeo({ path: "/obchodni-podminky", title: "Obchodní podmínky", description, type: "article" }),
};

export default function TermsPage() {
  return (
    <>
      <JsonLd data={legalSchema({ path: "/obchodni-podminky", name: "Obchodní podmínky", description })} />
      <LegalPage eyebrow="PRÁVNÍ INFORMACE" title="Obchodní podmínky">
        <p>
          Služby poskytuje Adam Hitzger, IČO 19712049, na základě individuální smlouvy nebo objednávky. Rozsah, měsíční paušál a úroveň podpory
          vycházejí z písemného návrhu řešení, který klient odsouhlasí před zahájením prací.
        </p>
        <h2>Paušál a fakturace</h2>
        <p>
          Cena je sjednána jako měsíční paušál zahrnující návrh, vývoj, provoz, monitoring a podporu v rozsahu zvoleného balíčku.
          Fakturujeme měsíčně, se splatností 14 dní.
        </p>
        <h2>Data a vlastnictví</h2>
        <p>
          Data klienta zůstávají výhradně jeho majetkem. Přístupy k systémům klienta používáme jen v rozsahu nezbytném pro provoz automatizace.
        </p>
      </LegalPage>
    </>
  );
}
