import React from "react";
import { Container, FirstLetter, RestOfTitle } from "./Title.styles";

interface CategoryTitleProps {
  children: string;
}

const Title: React.FC<CategoryTitleProps> = ({ children }) => {
  const firstLetter = children.charAt(0).toUpperCase();
  const restOfTitle = children.slice(1);

  return (
    <Container>
      <FirstLetter>{firstLetter}</FirstLetter>
      <RestOfTitle>{restOfTitle}</RestOfTitle>
    </Container>
  );
};

export default Title;
