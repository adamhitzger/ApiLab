import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageSeo } from "@/lib/seo";
import { legalSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

const description =
  "Jaké osobní údaje zpracováváme, jak dlouho a proč, jak pracujeme s cookies a jaká máte práva.";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  ...pageSeo({ path: "/ochrana-osobnich-udaju", title: "Ochrana osobních údajů · AUTOMA", description, type: "article" }),
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={legalSchema({ path: "/ochrana-osobnich-udaju", name: "Ochrana osobních údajů", description })} />
      <LegalPage eyebrow="PRÁVNÍ INFORMACE" title="Ochrana osobních údajů">
        <p>
          Správcem osobních údajů je Adam Hitzger, IČO 19712049. Údaje vyplněné v kontaktním formuláři (jméno, e-mail, telefon, zpráva)
          zpracováváme výhradně za účelem odpovědi na vaši poptávku a jednání o spolupráci, a to po dobu nezbytně nutnou.
        </p>
        <h2>Cookies</h2>
        <p>
          Web používá nezbytné cookies pro svůj chod a — pouze s vaším souhlasem — statistické a marketingové cookies.
          Souhlas spravujete přes lištu Cookiebot a kdykoli ho změníte odkazem „Nastavení cookies“ v patičce.
        </p>
        <h2>Vaše práva</h2>
        <p>
          Máte právo na přístup ke svým údajům, jejich opravu, výmaz či omezení zpracování a právo podat stížnost u Úřadu pro ochranu osobních údajů.
          Ozvěte se na hello@automa.cz.
        </p>
      </LegalPage>
    </>
  );
}
