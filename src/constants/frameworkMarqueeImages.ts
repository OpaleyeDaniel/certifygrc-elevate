/** Ten official framework badges (COBIT, ISO seals, SOC, etc.) — `/public/framework-marquee/01.png` … `10.png`. */
export const FRAMEWORK_MARQUEE_IMAGES: string[] = Array.from({ length: 10 }, (_, i) => `/framework-marquee/${String(i + 1).padStart(2, "0")}.png`);
