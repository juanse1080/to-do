import { PropsWithChildren } from "react";

export type RenderIfProps = {
  render?: boolean;
} & PropsWithChildren;

const RenderIf = ({ render, children }: Readonly<RenderIfProps>) => {
  if (!render) return null;

  return <>{children}</>;
};

export default RenderIf;
