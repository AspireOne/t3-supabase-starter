import type { AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Later we can use this to decrease JS size.
// const theme = extendBaseTheme({
//   components: {
//     Button,
//   },
// })

// <ChakraBaseProvider theme={theme}>

export const theme = extendTheme({
  fonts: {
    heading: "var(--font-inter)",
    body: "var(--font-inter)",
  },
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      {/* Do this to be able to import the font in chakra. */}
      <style jsx global>
        {`
            :root {
                --font-inter: ${inter.style.fontFamily};
            }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <main className={`font-sans ${inter.variable}`}>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
