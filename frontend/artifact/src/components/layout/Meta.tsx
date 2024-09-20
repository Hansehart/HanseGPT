import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface MetaContent {
  title: string;
  description: string;
  image: string;
}

const Meta: React.FC = () => {
  const location = useLocation();
  const defaultImage = 'https://hansehart.de/icon512.png';

  const getMetaContent = (path: string): MetaContent => {
    switch (path) {
      case '/company':
        return {
          title: 'Hansehart - Unternehmen',
          description: 'Entdecke Hansehart. Arbeitsweise, Motivation und Ziele!',
          image: defaultImage
        };
      case '/contact':
        return {
          title: 'Hansehart - Kontakt',
          description: 'Trete in Kontakt mit uns. Wir freuen uns auf deine Anfrage!',
          image: defaultImage
        };
      default:
        return {
          title: 'Hansehart - Innovative Software',
          description: 'Entdecke Leistungen von Hansehart. Wir entwickeln Produkte, die begeistern!',
          image: defaultImage
        };
    }
  };

  const { title, description, image } = getMetaContent(location.pathname);

  return (
    <Helmet>
      <title>Hansehart</title>
      <meta name="description" content={description} />
      <meta property="og:url" content={`https://hansehart.de${location.pathname}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="Hansehart" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
    </Helmet>
  );
};

export default Meta;