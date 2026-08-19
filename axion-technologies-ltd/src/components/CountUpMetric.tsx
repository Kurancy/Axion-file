import React, { useEffect, useState, useRef } from "react";

interface CountUpMetricProps {
  value: string;
  duration?: number; // duration in ms
}

function parseMetric(valStr: string) {
  const match = valStr.match(/(\d[\d,.]*)/);
  if (!match) {
    return { prefix: "", suffix: valStr, value: 0, decimals: 0, hasCommas: false };
  }
  const numStr = match[1];
  const index = valStr.indexOf(numStr);
  const prefix = valStr.substring(0, index);
  const suffix = valStr.substring(index + numStr.length);
  
  const hasCommas = numStr.includes(",");
  const cleanNumStr = numStr.replace(/,/g, "");
  const value = parseFloat(cleanNumStr) || 0;
  
  const dotIndex = cleanNumStr.indexOf(".");
  const decimals = dotIndex !== -1 ? cleanNumStr.length - dotIndex - 1 : 0;
  
  return { prefix, suffix, value, decimals, hasCommas };
}

function formatNumber(num: number, decimals: number, hasCommas: boolean): string {
  let str = num.toFixed(decimals);
  if (hasCommas) {
    const parts = str.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    str = parts.join(".");
  }
  return str;
}

// Ease out quad function
const easeOutQuad = (t: number) => t * (2 - t);

export default function CountUpMetric({ value: rawValue, duration = 1500 }: CountUpMetricProps) {
  const [display, setDisplay] = useState("");
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const parsed = parseMetric(rawValue);
    // Initialize display value with 0
    setDisplay(`${parsed.prefix}${formatNumber(0, parsed.decimals, parsed.hasCommas)}${parsed.suffix}`);

    const parentCard = containerRef.current?.closest(".case-study-card");
    const targetToObserve = parentCard || containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let startTime: number | null = null;
          const targetValue = parsed.value;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = easeOutQuad(progress);
            const currentVal = easedProgress * targetValue;
            
            setDisplay(`${parsed.prefix}${formatNumber(currentVal, parsed.decimals, parsed.hasCommas)}${parsed.suffix}`);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (targetToObserve) {
      observer.observe(targetToObserve);
    }

    return () => {
      observer.disconnect();
    };
  }, [rawValue, duration]);

  return (
    <span ref={containerRef} className="font-display font-bold">
      {display}
    </span>
  );
}
