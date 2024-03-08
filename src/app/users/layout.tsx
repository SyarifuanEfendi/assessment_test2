import { Provider } from "./provider";
import { Suspense } from "react";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <Provider>
        {children}
      </Provider>
    </Suspense>
  );
}
