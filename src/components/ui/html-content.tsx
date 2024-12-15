"use client";

import DOMPurify from "isomorphic-dompurify";
import { useMemo } from "react";

interface Props {
  htmlString: string;
}

export const HtmlContent = ({ htmlString }: Props) => {
  const sanitizedContent = useMemo(
    () => DOMPurify.sanitize(htmlString),
    [htmlString]
  );

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};
