import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';

// export const metadata: Metadata = {
//   title: "Sign In | FrenchGuestPost",
//   description: "Sign in to your marketplace account",
// };

// Generate dynamic metadata using translations
export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pageMetadata.signIn' });

  return {
    title: t('title'),
    description: t('description'),
  };
} 