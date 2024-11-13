import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Container from "@mui/material/Container";
import { Trans } from "react-i18next/TransWithoutContext";
import ArtCanvas from "@/components/art-canvas/art-canvas/art-canvas";
import ArtSearchCanvas from "@/components/art-canvas/art-search-canvas/art-search-canvas";
import Grid from "@mui/material/Grid2";
type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "home");

  return {
    title: t("title"),
  };
}

export default async function Home({ params }: Props) {
  const { t } = await getServerTranslation(params.language, "home");

  return (
    <Container maxWidth="lg">
       <Grid container spacing={2}>
        <Grid size={6}>
          <ArtCanvas
            images={[
              '/images/placeholder1.jpg',
              '/images/placeholder2.jpg', 
              '/images/placeholder3.jpg',
              '/images/placeholder4.jpg',
              '/images/placeholder5.jpg',
              '/images/placeholder6.jpg'
            ]}
            columns={3}
            spacing={2}
            maxItems={6}
          />
        </Grid>
        <Grid size={6}>
          <ArtSearchCanvas />
        </Grid>
      </Grid>
      
    </Container>
    
  );
}
